import axios from "axios";

export interface InstagramMedia {
  id: string;
  caption?: string;
  media_url?: string;
  thumbnail_url?: string; // For video posts
  permalink?: string;
  timestamp?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  like_count?: number;
  comments_count?: number;
}

export interface InstagramUser {
  id: string;
  username: string;
  account_type?: string;
  media_count?: number;
}

export class InstagramService {
  private accessToken: string;
  private baseUrl = "https://graph.instagram.com";

  constructor() {
    this.accessToken = process.env.INSTAGRAM_ACCESS_TOKEN || "";
    if (!this.accessToken) {
      console.warn(
        "Instagram Access Token not provided. Instagram API calls will fail."
      );
    }
  }

  /**
   * Fetch recent posts for the authenticated user
   * Note: Instagram Basic Display API only allows fetching your own posts
   */
  async getRecentPosts(
    userId: string = "me",
    limit: number = 20
  ): Promise<InstagramMedia[]> {
    try {
      if (!this.accessToken) {
        throw new Error("Instagram Access Token is required");
      }

      console.log(`Fetching Instagram posts for user: ${userId}`);

      const response = await axios.get(`${this.baseUrl}/${userId}/media`, {
        params: {
          fields:
            "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count",
          limit: limit,
          access_token: this.accessToken,
        },
      });

      if (response.data && response.data.data) {
        return response.data.data.map((post: any) => ({
          id: post.id,
          caption: post.caption || "",
          media_url: post.media_url,
          thumbnail_url: post.thumbnail_url, // For video posts
          permalink: post.permalink,
          timestamp: post.timestamp,
          media_type: post.media_type,
          like_count: post.like_count,
          comments_count: post.comments_count,
        }));
      }

      return [];
    } catch (error: any) {
      console.error(
        "Error fetching Instagram posts:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to fetch Instagram posts: ${
          error.response?.data?.error?.message || error.message
        }`
      );
    }
  }

  /**
   * Fetch user information for the authenticated user
   * Note: Instagram Basic Display API only allows fetching your own user info
   */
  async getAccountInfo(userId: string = "me"): Promise<{
    id: string;
    username: string;
    account_type?: string;
    media_count?: number;
  }> {
    try {
      if (!this.accessToken) {
        throw new Error("Instagram Access Token is required");
      }

      console.log(`Fetching Instagram account info for user: ${userId}`);

      const response = await axios.get(`${this.baseUrl}/${userId}`, {
        params: {
          fields: "id,username,account_type,media_count",
          access_token: this.accessToken,
        },
      });

      if (response.data) {
        return {
          id: response.data.id,
          username: response.data.username,
          account_type: response.data.account_type,
          media_count: response.data.media_count,
        };
      }

      throw new Error("No account data returned");
    } catch (error: any) {
      console.error(
        "Error fetching Instagram account info:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to fetch Instagram account info: ${
          error.response?.data?.error?.message || error.message
        }`
      );
    }
  }

  /**
   * Search for users by username (requires Instagram Graph API and Business account)
   * This is a placeholder for future implementation with Graph API
   */
  async searchUserByUsername(username: string): Promise<InstagramUser | null> {
    // Instagram Basic Display API doesn't support searching other users
    // This would require Instagram Graph API with a Business account
    console.warn(
      "User search by username requires Instagram Graph API with Business account"
    );
    throw new Error("User search not available with current API configuration");
  }

  /**
   * Refresh the access token (for long-lived tokens)
   */
  async refreshAccessToken(): Promise<string> {
    try {
      if (!this.accessToken) {
        throw new Error("Current access token is required for refresh");
      }

      const response = await axios.get(
        "https://graph.instagram.com/refresh_access_token",
        {
          params: {
            grant_type: "ig_refresh_token",
            access_token: this.accessToken,
          },
        }
      );

      if (response.data && response.data.access_token) {
        this.accessToken = response.data.access_token;
        return response.data.access_token;
      }

      throw new Error("Failed to refresh access token");
    } catch (error: any) {
      console.error(
        "Error refreshing access token:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to refresh access token: ${
          error.response?.data?.error?.message || error.message
        }`
      );
    }
  }

  /**
   * Validate the current access token
   */
  async validateToken(): Promise<boolean> {
    try {
      if (!this.accessToken) {
        return false;
      }

      await this.getAccountInfo();
      return true;
    } catch (error) {
      console.error("Access token validation failed:", error);
      return false;
    }
  }
}
