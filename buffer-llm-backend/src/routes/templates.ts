import { Router, Request, Response } from "express";
import { Account } from "../models/Account";
import { Post } from "../models/Post";
import { Template } from "../models/Template";
import { OpenAIService } from "../services/openaiService";

const router = Router();
const openaiService = new OpenAIService();

interface GenerateTemplatesRequest {
  instagramAccountId?: string;
  instagramUsername?: string;
  accountTheme?: string;
}

router.post(
  "/generate-templates",
  async (req: Request<{}, {}, GenerateTemplatesRequest>, res: Response) => {
    try {
      const { instagramAccountId, instagramUsername, accountTheme } = req.body;

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

      // Find analyzed posts for this account
      const analyzedPosts = await Post.find({
        accountId: account._id,
        analyzed: true,
        analysisResult: { $exists: true, $ne: null },
      }).limit(100); // Use a reasonable sample size

      if (analyzedPosts.length === 0) {
        return res.status(400).json({
          success: false,
          error: "No analyzed posts found. Please analyze posts first.",
        });
      }

      // Generate templates using OpenAI
      const generatedTemplates = await openaiService.generateTemplates(
        analyzedPosts,
        accountTheme
      );

      // Clear existing templates for this account (optional - you might want to version instead)
      await Template.deleteMany({ accountId: account._id });

      const savedTemplates = [];

      // Save each generated template
      for (const template of generatedTemplates) {
        // Find example posts that match this template's characteristics
        const examplePosts = analyzedPosts
          .filter(
            (post) =>
              post.analysisResult?.tone
                ?.toLowerCase()
                .includes(template.tone.toLowerCase()) ||
              template.tags.some((tag) =>
                post.analysisResult?.themes?.some((theme: string) =>
                  theme.toLowerCase().includes(tag.toLowerCase())
                )
              )
          )
          .slice(0, 3) // Limit to 3 examples per template
          .map((post) => post._id);

        const savedTemplate = await Template.create({
          accountId: account._id,
          title: template.title,
          promptTemplate: template.promptTemplate,
          tone: template.tone,
          structure: template.structure,
          tags: template.tags,
          examplePostIds: examplePosts,
          editable: true,
        });

        savedTemplates.push(savedTemplate);
      }

      res.json({
        success: true,
        data: {
          accountId: account._id,
          instagramAccountId: account.instagramAccountId,
          templatesGenerated: savedTemplates.length,
          templates: savedTemplates.map((template) => ({
            id: template._id,
            title: template.title,
            tone: template.tone,
            structure: template.structure,
            tags: template.tags,
            examplePostCount: template.examplePostIds.length,
          })),
          basedOnPosts: analyzedPosts.length,
        },
      });
    } catch (error) {
      console.error("Template generation error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to generate templates",
      });
    }
  }
);

// GET endpoint to retrieve templates for an account
router.get("/templates/:identifier", async (req: Request, res: Response) => {
  try {
    const { identifier } = req.params;

    // Try to find account by Instagram account ID first, then by username
    let account = await Account.findOne({ instagramAccountId: identifier });
    if (!account) {
      account = await Account.findOne({ username: identifier });
    }
    if (!account) {
      return res.status(404).json({
        success: false,
        error: "Account not found",
      });
    }

    // Get templates for this account
    const templates = await Template.find({ accountId: account._id })
      .populate("examplePostIds", "caption instagramMediaId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        accountId: account._id,
        instagramAccountId: account.instagramAccountId,
        templates,
      },
    });
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch templates",
    });
  }
});

// POST endpoint to generate content using a template
interface GenerateContentRequest {
  templateId: string;
  baseText: string;
  additionalContext?: string;
}

router.post(
  "/generate-content-with-template",
  async (req: Request<{}, {}, GenerateContentRequest>, res: Response) => {
    try {
      const { templateId, baseText, additionalContext } = req.body;

      if (!templateId || !baseText) {
        return res.status(400).json({
          success: false,
          error: "Template ID and base text are required",
        });
      }

      // Find the template
      const template = await Template.findById(templateId);
      if (!template) {
        return res.status(404).json({
          success: false,
          error: "Template not found",
        });
      }

      // Generate content using OpenAI
      const generatedContent = await openaiService.generateContentWithTemplate(
        baseText,
        template.promptTemplate,
        template.tone,
        additionalContext
      );

      res.json({
        success: true,
        data: {
          templateId: template._id,
          templateTitle: template.title,
          baseText,
          generatedContent,
          tone: template.tone,
          structure: template.structure,
          tags: template.tags,
        },
      });
    } catch (error) {
      console.error("Content generation error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to generate content",
      });
    }
  }
);

export default router;
