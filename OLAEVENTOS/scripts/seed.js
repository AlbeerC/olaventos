const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

// Import models
const User = require("../models/mongodb/User")
const Event = require("../models/mongodb/Event")
const Product = require("../models/mongodb/Product")

// Sample data
const sampleUsers = [
  {
    firstName: "Admin",
    lastName: "OLAEVENTOS",
    email: "admin@olaeventos.com.ar",
    password: "admin123",
    role: "admin",
    profile: {
      bio: "Administrador de la plataforma OLAEVENTOS",
      location: { city: "olavarria" },
    },
  },
  {
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan@example.com",
    password: "password123",
    role: "organizer",
    profile: {
      bio: "Organizador de eventos musicales",
      location: { city: "olavarria" },
    },
  },
]

// Function to seed the database
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    // Hash passwords
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        return { ...user, password: hashedPassword }
      }),
    )

    // Seed users
    await User.insertMany(hashedUsers)
    console.log("Users seeded successfully")

    // Disconnect from MongoDB
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

// Run the seed function
seedDatabase()
