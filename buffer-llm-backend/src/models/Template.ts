import mongoose, { Schema, Document } from "mongoose";

export interface ITemplate extends Document {
  accountId: mongoose.Types.ObjectId;
  title: string;
  promptTemplate: string;
  tone?: string;
  structure?: string;
  tags: string[];
  examplePostIds: mongoose.Types.ObjectId[];
  editable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TemplateSchema: Schema = new Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  promptTemplate: {
    type: String,
    required: true,
  },
  tone: {
    type: String,
    default: null,
  },
  structure: {
    type: String,
    default: null,
  },
  tags: {
    type: [String],
    default: [],
  },
  examplePostIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  editable: {
    type: Boolean,
    default: true,
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
TemplateSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Index for efficient searching
TemplateSchema.index({ accountId: 1, tags: 1 });

export const Template = mongoose.model<ITemplate>("Template", TemplateSchema);
