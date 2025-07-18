export interface Account {
  _id: string;
  instagramAccountId: string;
  username: string;
  accountType?: string; // From Instagram API
  mediaCount?: number; // From Instagram API (use as postCount)
  // Legacy fields for compatibility - these won't be populated from Instagram API
  fullName?: string; // Not available from Instagram Basic Display API
  profilePicUrl?: string; // Not available from Instagram Basic Display API
  isPrivate?: boolean; // Not available from Instagram Basic Display API
  postCount?: number; // Use mediaCount instead
  followerCount?: number; // Not available from Instagram Basic Display API
  followingCount?: string; // Not available from Instagram Basic Display API
}

export interface Post {
  _id: string;
  instagramMediaId: string;
  accountId: string;
  caption?: string;
  mediaUrl?: string;
  thumbnailUrl?: string; // For video posts
  mediaType?: string; // "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  timestamp: string;
  likesCount?: number; // From Instagram API
  commentsCount?: number; // From Instagram API
  analyzed: boolean;
  analysisResult?: {
    tone?: string;
    structure?: string;
    prompt?: string;
    themes?: string[];
    sentimentScore?: number;
  };
  createdAt: string;
}

export interface Template {
  _id: string;
  title: string;
  promptTemplate: string;
  tone?: string;
  structure?: string;
  tags: string[];
  examplePostIds: string[];
  editable: boolean;
  createdAt: string;
  updatedAt: string;
  icon?: string;
  badge?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
