const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    category: {
      type: String,
      required: true,
      enum: ["music", "culture", "food", "sports", "technology", "art", "family"],
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
        enum: ["olavarria", "tandil", "azul", "laplata", "bolivar"],
      },
      coordinates: {
        lat: Number,
        lng: Number,
      },
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
      isFree: {
        type: Boolean,
        default: false,
      },
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    attendees: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        registeredAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["registered", "attended", "cancelled"],
          default: "registered",
        },
      },
    ],
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [
      {
        url: String,
        alt: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    tags: [String],
    status: {
      type: String,
      enum: ["draft", "published", "cancelled", "completed"],
      default: "draft",
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
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
      website: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Indexes
eventSchema.index({ date: 1, "location.city": 1 })
eventSchema.index({ category: 1, status: 1 })
eventSchema.index({ featured: -1, date: 1 })
eventSchema.index({ "location.coordinates": "2dsphere" })

// Virtual for attendee count
eventSchema.virtual("attendeeCount").get(function () {
  return this.attendees.filter((a) => a.status === "registered").length
})

// Virtual for available spots
eventSchema.virtual("availableSpots").get(function () {
  return this.capacity - this.attendeeCount
})

// Pre-save middleware
eventSchema.pre("save", function (next) {
  // Update rating average
  if (this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0)
    this.rating.average = totalRating / this.reviews.length
    this.rating.count = this.reviews.length
  }
  next()
})

module.exports = mongoose.model("Event", eventSchema)
