import { Router, Request, Response } from "express";
import { Account } from "../models/Account";
import { Post } from "../models/Post";
import { InstagramService } from "../services/instagramService";

const router = Router();
const instagramService = new InstagramService();

interface CrawlRequest {
  instagramUsername?: string; // Optional since we'll use authenticated user
}

router.post(
  "/crawl",
  async (req: Request<{}, {}, CrawlRequest>, res: Response) => {
    try {
      // With Instagram Basic Display API, we can only access the authenticated user's content
      // The username parameter is optional and mainly for display purposes

      // First validate the Instagram API token
      const isTokenValid = await instagramService.validateToken();
      if (!isTokenValid) {
        return res.status(401).json({
          success: false,
          error:
            "Instagram API access token is invalid or not provided. Please check your INSTAGRAM_ACCESS_TOKEN environment variable.",
        });
      }

      // Get account info from Instagram API (authenticated user)
      const accountInfo = await instagramService.getAccountInfo();

      // Find or create account using the Instagram user ID
      let account = await Account.findOne({
        instagramAccountId: accountInfo.id,
      });
      if (!account) {
        account = await Account.create({
          instagramAccountId: accountInfo.id,
          username: accountInfo.username,
          accountType: accountInfo.account_type,
          mediaCount: accountInfo.media_count,
        });
      } else {
        // Update existing account with latest info
        account.username = accountInfo.username;
        account.accountType = accountInfo.account_type;
        account.mediaCount = accountInfo.media_count;
        account.lastCrawledAt = new Date();
        await account.save();
      }

      // Fetch recent posts from Instagram (authenticated user)
      const instagramPosts = await instagramService.getRecentPosts();

      let newPostsCount = 0;
      let skippedPostsCount = 0;
      let updatedPostsCount = 0;

      // Process each post
      for (const igPost of instagramPosts) {
        // Check if post already exists
        const existingPost = await Post.findOne({
          instagramMediaId: igPost.id,
        });

        if (!existingPost) {
          await Post.create({
            instagramMediaId: igPost.id,
            accountId: account._id,
            caption: igPost.caption || "",
            mediaUrl: igPost.media_url,
            thumbnailUrl: igPost.thumbnail_url, // For video posts
            mediaType: igPost.media_type, // Store media type
            likesCount: igPost.like_count || 0,
            commentsCount: igPost.comments_count || 0,
            timestamp: igPost.timestamp
              ? new Date(igPost.timestamp)
              : undefined,
            analyzed: false,
          });
          newPostsCount++;
        } else {
          // Update existing post with new fields if they're missing
          const updateFields: any = {};

          if (!existingPost.thumbnailUrl && igPost.thumbnail_url) {
            updateFields.thumbnailUrl = igPost.thumbnail_url;
          }

          if (!existingPost.mediaType && igPost.media_type) {
            updateFields.mediaType = igPost.media_type;
          }

          if (existingPost.likesCount === 0 && igPost.like_count) {
            updateFields.likesCount = igPost.like_count;
          }

          if (existingPost.commentsCount === 0 && igPost.comments_count) {
            updateFields.commentsCount = igPost.comments_count;
          }

          // Update if we have new fields to add
          if (Object.keys(updateFields).length > 0) {
            await Post.findByIdAndUpdate(existingPost._id, updateFields);
            updatedPostsCount++;
          } else {
            skippedPostsCount++;
          }
        }
      }

      // Update account's last crawled timestamp
      account.lastCrawledAt = new Date();
      await account.save();

      res.json({
        success: true,
        data: {
          accountId: account._id,
          instagramAccountId: account.instagramAccountId,
          username: account.username,
          accountType: account.accountType,
          mediaCount: account.mediaCount,
          totalPostsFetched: instagramPosts.length,
          newPostsAdded: newPostsCount,
          existingPostsUpdated: updatedPostsCount,
          skippedDuplicates: skippedPostsCount,
          lastCrawledAt: account.lastCrawledAt,
        },
      });
    } catch (error) {
      console.error("Crawl error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to crawl Instagram posts",
      });
    }
  }
);

// Get all posts for a specific account
router.get("/posts/:accountId?", async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;

    let posts;
    let account = null;

    if (accountId) {
      // Fetch posts for specific account
      posts = await Post.find({ accountId })
        .sort({ timestamp: -1 })
        .populate("accountId");

      account = await Account.findById(accountId);
    } else {
      // Fetch all posts from all accounts (most recent first)
      posts = await Post.find({}).sort({ timestamp: -1 }).populate("accountId");
    }

    res.json({
      success: true,
      data: {
        posts,
        account,
        totalCount: posts.length,
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch posts",
    });
  }
});

// Get latest account that was crawled
router.get("/latest-account", async (req: Request, res: Response) => {
  try {
    const account = await Account.findOne({}).sort({ lastCrawledAt: -1 });

    if (!account) {
      return res.json({
        success: true,
        data: null,
      });
    }

    const posts = await Post.find({ accountId: account._id }).sort({
      timestamp: -1,
    });

    res.json({
      success: true,
      data: {
        account,
        posts,
        totalCount: posts.length,
      },
    });
  } catch (error) {
    console.error("Error fetching latest account:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch latest account",
    });
  }
});

export default router;
