const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      url: String,
      publicId: String,
    },
    role: {
      type: String,
      enum: ["user", "organizer", "admin"],
      default: "user",
    },
    profile: {
      bio: String,
      interests: [String],
      location: {
        city: {
          type: String,
          enum: ["olavarria", "tandil", "azul", "laplata", "bolivar"],
        },
        address: String,
      },
      socialMedia: {
        facebook: String,
        instagram: String,
        twitter: String,
      },
    },
    preferences: {
      notifications: {
        email: {
          type: Boolean,
          default: true,
        },
        push: {
          type: Boolean,
          default: true,
        },
        sms: {
          type: Boolean,
          default: false,
        },
      },
      categories: [
        {
          type: String,
          enum: ["music", "culture", "food", "sports", "technology", "art", "family"],
        },
      ],
    },
    events: {
      organized: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
        },
      ],
      attended: [
        {
          event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
          },
          attendedAt: Date,
          rating: Number,
          review: String,
        },
      ],
      favorites: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
        },
      ],
    },
    verification: {
      email: {
        isVerified: {
          type: Boolean,
          default: false,
        },
        token: String,
        expiresAt: Date,
      },
      phone: {
        isVerified: {
          type: Boolean,
          default: false,
        },
        code: String,
        expiresAt: Date,
      },
    },
    resetPassword: {
      token: String,
      expiresAt: Date,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    lastLogin: Date,
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: Date,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password
        delete ret.resetPassword
        delete ret.verification
        return ret
      },
    },
  },
)

// Indexes
userSchema.index({ email: 1 })
userSchema.index({ "profile.location.city": 1 })
userSchema.index({ role: 1, status: 1 })

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`
})

// Virtual for account lock status
userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Method to increment login attempts
userSchema.methods.incLoginAttempts = function () {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 },
    })
  }

  const updates = { $inc: { loginAttempts: 1 } }

  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }
  }

  return this.updateOne(updates)
}

module.exports = mongoose.model("User", userSchema)
