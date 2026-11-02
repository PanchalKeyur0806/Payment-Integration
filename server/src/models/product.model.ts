import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Basic information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      trim: true,
    },

    // Product identification
    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    // Category
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    brand: {
      type: String,
      trim: true,
    },

    // Pricing
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    compareAtPrice: {
      type: Number,
      min: 0,
      default: null,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },

    // Inventory
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    trackInventory: {
      type: Boolean,
      default: true,
    },

    lowStockThreshold: {
      type: Number,
      default: 10,
    },

    // Product images
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // Product variants
    hasVariants: {
      type: Boolean,
      default: false,
    },

    variants: [
      {
        name: String,
        sku: String,
        options: [
          {
            name: String,
            value: String,
          },
        ],
        price: Number,
        stock: {
          type: Number,
          default: 0,
        },
        image: String,
      },
    ],

    // Product status
    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "draft",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Product statistics
    totalSales: {
      type: Number,
      default: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ price: 1 });
productSchema.index({ status: 1, isFeatured: 1 });

const Product = mongoose.model("Product", productSchema);

export default Product;
