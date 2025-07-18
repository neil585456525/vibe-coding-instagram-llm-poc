import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  instagramMediaId: string;
  accountId: mongoose.Types.ObjectId;
  caption?: string;
  mediaUrl?: string;
  thumbnailUrl?: string; // For video posts
  mediaType?: string; // "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  likesCount?: number; // From Instagram API
  commentsCount?: number; // From Instagram API
  timestamp?: Date;
  analyzed: boolean;
  analysisResult?: {
    tone?: string;
    structure?: string;
    prompt?: string;
    themes?: string[];
    sentimentScore?: number;
  };
  createdAt: Date;
}

const PostSchema: Schema = new Schema({
  instagramMediaId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
    index: true,
  },
  caption: {
    type: String,
    default: null,
  },
  mediaUrl: {
    type: String,
    default: null,
  },
  thumbnailUrl: {
    type: String,
    default: null,
  },
  mediaType: {
    type: String,
    enum: ["IMAGE", "VIDEO", "CAROUSEL_ALBUM"],
    default: null,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  commentsCount: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: null,
  },
  analyzed: {
    type: Boolean,
    default: false,
    index: true,
  },
  analysisResult: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for efficient querying
PostSchema.index({ accountId: 1, analyzed: 1 });
PostSchema.index({ accountId: 1, timestamp: -1 });

export const Post = mongoose.model<IPost>("Post", PostSchema);
