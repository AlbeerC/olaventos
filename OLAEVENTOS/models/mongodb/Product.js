const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    category: {
      type: String,
      required: true,
      enum: ["ropa", "accesorios", "tecnologia", "souvenirs"],
    },
    price: {
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      currency: {
        type: String,
        default: "ARS",
      },
      originalPrice: Number,
    },
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
        publicId: String,
      },
    ],
    variants: [
      {
        name: String, // e.g., "Talle", "Color"
        options: [String], // e.g., ["S", "M", "L"], ["Rojo", "Azul"]
      },
    ],
    inventory: {
      stock: {
        type: Number,
        required: true,
        min: 0,
      },
      sku: {
        type: String,
        unique: true,
        sparse: true,
      },
      trackInventory: {
        type: Boolean,
        default: true,
      },
    },
    specifications: {
      weight: Number,
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
      },
      material: String,
      care: String,
    },
    seo: {
      slug: {
        type: String,
        unique: true,
        sparse: true,
      },
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "discontinued"],
      default: "active",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: String,
        images: [String],
        verified: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    tags: [String],
    relatedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
)

// Indexes
productSchema.index({ category: 1, status: 1 })
productSchema.index({ featured: -1, createdAt: -1 })
productSchema.index({ "seo.slug": 1 })
productSchema.index({ tags: 1 })

// Virtual for discount percentage
productSchema.virtual("discountPercentage").get(function () {
  if (this.price.originalPrice && this.price.originalPrice > this.price.amount) {
    return Math.round(((this.price.originalPrice - this.price.amount) / this.price.originalPrice) * 100)
  }
  return 0
})

// Virtual for availability
productSchema.virtual("isAvailable").get(function () {
  return this.status === "active" && (!this.inventory.trackInventory || this.inventory.stock > 0)
})

// Pre-save middleware
productSchema.pre("save", function (next) {
  // Generate slug if not provided
  if (!this.seo.slug) {
    this.seo.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  // Update rating average
  if (this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0)
    this.rating.average = totalRating / this.reviews.length
    this.rating.count = this.reviews.length
  }

  next()
})

module.exports = mongoose.model("Product", productSchema)
