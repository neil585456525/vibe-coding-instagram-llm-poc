import { Template, ApiResponse } from "../types";

const API_BASE_URL = "http://localhost:4000/api";

export const api = {
  // Get templates for a specific Instagram account
  getTemplates: async (identifier: string): Promise<Template[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/templates/${identifier}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse<{ templates: Template[] }> =
        await response.json();
      if (data.success && data.data) {
        return data.data.templates;
      }
      return [];
    } catch (error) {
      console.error("Error fetching templates:", error);
      return [];
    }
  },

  // Generate new templates for an Instagram account
  generateTemplates: async (
    instagramUsername: string,
    accountTheme?: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/generate-templates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instagramUsername,
          accountTheme,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<any> = await response.json();
      return data.success;
    } catch (error) {
      console.error("Error generating templates:", error);
      return false;
    }
  },

  // Generate content using a template
  generateContentWithTemplate: async (
    templateId: string,
    baseText: string,
    additionalContext?: string
  ): Promise<{ success: boolean; content?: string; error?: string }> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/generate-content-with-template`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            templateId,
            baseText,
            additionalContext,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<{
        generatedContent: string;
        templateTitle: string;
        tone: string;
        structure: string;
        tags: string[];
      }> = await response.json();

      if (data.success && data.data) {
        return {
          success: true,
          content: data.data.generatedContent,
        };
      }
      return {
        success: false,
        error: "Failed to generate content",
      };
    } catch (error) {
      console.error("Error generating content with template:", error);
      return {
        success: false,
        error: "Failed to generate content",
      };
    }
  },
};
