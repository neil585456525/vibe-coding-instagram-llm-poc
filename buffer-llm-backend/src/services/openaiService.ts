import OpenAI from "openai";

export interface PostAnalysis {
  tone: string;
  structure: string;
  prompt: string;
  themes: string[];
  sentimentScore: number;
}

export interface TemplateGeneration {
  title: string;
  promptTemplate: string;
  tone: string;
  structure: string;
  tags: string[];
}

export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key is required");
    }

    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async analyzePost(caption: string): Promise<PostAnalysis> {
    try {
      const prompt = `
        Analyze the following Instagram post caption and provide a structured analysis:

        Caption: "${caption}"

        Please provide your analysis in the following JSON format:
        {
          "tone": "describe the tone (e.g., professional, casual, inspirational, humorous)",
          "structure": "describe the structure (e.g., hook-story-CTA, list-format, question-answer)",
          "prompt": "extract or create a prompt template that could generate similar content",
          "themes": ["list", "of", "main", "themes"],
          "sentimentScore": number between -1 and 1 (negative to positive)
        }
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an expert social media content analyzer. Respond only with valid JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error("No response from OpenAI");
      }

      // Clean the response content to handle markdown formatting
      let cleanContent = content.trim();

      // Remove markdown code block markers if present
      if (cleanContent.startsWith("```json")) {
        cleanContent = cleanContent
          .replace(/^```json\s*/, "")
          .replace(/\s*```$/, "");
      } else if (cleanContent.startsWith("```")) {
        cleanContent = cleanContent
          .replace(/^```\s*/, "")
          .replace(/\s*```$/, "");
      }

      cleanContent = cleanContent.trim();

      return JSON.parse(cleanContent) as PostAnalysis;
    } catch (error) {
      console.error("Error analyzing post with OpenAI:", error);
      throw new Error("Failed to analyze post");
    }
  }

  async generateTemplates(
    analyzedPosts: any[],
    accountTheme?: string
  ): Promise<TemplateGeneration[]> {
    try {
      const postsText = analyzedPosts
        .map(
          (post) =>
            `Caption: ${post.caption}\nTone: ${
              post.analysisResult?.tone
            }\nThemes: ${post.analysisResult?.themes?.join(", ")}`
        )
        .join("\n\n---\n\n");

      const prompt = `
        Based on the following analyzed Instagram posts${
          accountTheme ? ` for a ${accountTheme} account` : ""
        }, generate 10-15 reusable post templates:

        ${postsText}

        Generate diverse templates that capture different tones, structures, and themes found in these posts. Each template should be reusable and adaptable.

        Respond with a JSON array in this format:
        [
          {
            "title": "descriptive title for the template",
            "promptTemplate": "a prompt that could generate similar content (use [TOPIC], [PRODUCT], etc. as placeholders)",
            "tone": "the tone this template represents",
            "structure": "the content structure",
            "tags": ["relevant", "tags"]
          }
        ]
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an expert social media content strategist. Respond only with valid JSON array.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error("No response from OpenAI");
      }

      // Clean the response content to handle markdown formatting
      let cleanContent = content.trim();

      // Remove markdown code block markers if present
      if (cleanContent.startsWith("```json")) {
        cleanContent = cleanContent
          .replace(/^```json\s*/, "")
          .replace(/\s*```$/, "");
      } else if (cleanContent.startsWith("```")) {
        cleanContent = cleanContent
          .replace(/^```\s*/, "")
          .replace(/\s*```$/, "");
      }

      cleanContent = cleanContent.trim();

      return JSON.parse(cleanContent) as TemplateGeneration[];
    } catch (error) {
      console.error("Error generating templates with OpenAI:", error);
      throw new Error("Failed to generate templates");
    }
  }

  async generateContentWithTemplate(
    baseText: string,
    promptTemplate: string,
    tone?: string,
    additionalContext?: string
  ): Promise<string> {
    try {
      const systemPrompt = `You are an expert social media content creator. Generate engaging Instagram post content based on the provided template and user input. Maintain the specified tone and style.`;

      const userPrompt = `
        Template: ${promptTemplate}
        Base text/topic: ${baseText}
        ${tone ? `Desired tone: ${tone}` : ""}
        ${additionalContext ? `Additional context: ${additionalContext}` : ""}

        Generate a complete Instagram post caption that follows the template structure while incorporating the base text. Make it engaging, authentic, and ready to post. Include relevant hashtags if appropriate for the template style.
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 500,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error("No response from OpenAI");
      }

      return content.trim();
    } catch (error) {
      console.error("Error generating content with template:", error);
      throw new Error("Failed to generate content");
    }
  }
}
