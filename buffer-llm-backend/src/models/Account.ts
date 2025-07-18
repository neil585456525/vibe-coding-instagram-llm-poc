import mongoose, { Schema, Document } from "mongoose";

export interface IAccount extends Document {
  instagramAccountId: string;
  username?: string;
  accountType?: string;
  mediaCount?: number;
  lastCrawledAt?: Date;
  lastAnalyzedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema: Schema = new Schema({
  instagramAccountId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  username: {
    type: String,
    default: null,
  },
  accountType: {
    type: String,
    default: null,
  },
  mediaCount: {
    type: Number,
    default: null,
  },
  lastCrawledAt: {
    type: Date,
    default: null,
  },
  lastAnalyzedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
AccountSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const Account = mongoose.model<IAccount>("Account", AccountSchema);
