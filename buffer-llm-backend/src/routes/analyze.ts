import { Router, Request, Response } from "express";
import { Account } from "../models/Account";
import { Post } from "../models/Post";
import { OpenAIService } from "../services/openaiService";

const router = Router();
const openaiService = new OpenAIService();

interface AnalyzeRequest {
  instagramAccountId?: string;
  instagramUsername?: string;
}

router.post(
  "/analyze",
  async (req: Request<{}, {}, AnalyzeRequest>, res: Response) => {
    try {
      const { instagramAccountId, instagramUsername } = req.body;

      if (!instagramAccountId && !instagramUsername) {
        return res.status(400).json({
          success: false,
          error: "Instagram account ID or username is required",
        });
      }

      // Find the account by ID or username
      let account;
      if (instagramAccountId) {
        account = await Account.findOne({ instagramAccountId });
      } else if (instagramUsername) {
        account = await Account.findOne({ username: instagramUsername });
      }
      if (!account) {
        return res.status(404).json({
          success: false,
          error: "Account not found. Please crawl posts first.",
        });
      }

      // Find unanalyzed posts for this account
      const unanalyzedPosts = await Post.find({
        accountId: account._id,
        analyzed: false,
        caption: { $exists: true, $ne: "" }, // Only analyze posts with captions
      }).limit(50); // Limit to prevent timeout

      if (unanalyzedPosts.length === 0) {
        return res.json({
          success: true,
          message: "No unanalyzed posts found",
          data: {
            accountId: account._id,
            instagramAccountId: account.instagramAccountId,
            analyzedCount: 0,
          },
        });
      }

      let analyzedCount = 0;
      let errorCount = 0;

      // Analyze each post
      for (const post of unanalyzedPosts) {
        try {
          if (post.caption) {
            const analysis = await openaiService.analyzePost(post.caption);

            post.analysisResult = analysis;
            post.analyzed = true;
            await post.save();

            analyzedCount++;

            // Add small delay to avoid rate limiting
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        } catch (error) {
          console.error(`Error analyzing post ${post._id}:`, error);
          errorCount++;
          // Continue with other posts even if one fails
        }
      }

      // Update account's last analyzed timestamp
      account.lastAnalyzedAt = new Date();
      await account.save();

      res.json({
        success: true,
        data: {
          accountId: account._id,
          instagramAccountId: account.instagramAccountId,
          totalPostsToAnalyze: unanalyzedPosts.length,
          analyzedCount,
          errorCount,
          lastAnalyzedAt: account.lastAnalyzedAt,
        },
      });
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to analyze posts",
      });
    }
  }
);

export default router;
