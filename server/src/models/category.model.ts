import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    // Category name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // URL-friendly name
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Category description
    description: {
      type: String,
      trim: true,
    },

    // Parent category (for nested categories)
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    // Category status
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // Display order
    sortOrder: {
      type: Number,
      default: 0,
    },

    // Featured category
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
categorySchema.index({ parentCategory: 1, status: 1 });
categorySchema.index({ name: 1 });
categorySchema.index({ slug: 1 });

const Category = mongoose.model("Category", categorySchema);

export default Category;
