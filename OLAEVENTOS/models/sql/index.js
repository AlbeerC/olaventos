const { DataTypes } = require("sequelize")
const { getConnections } = require("../../config/database")

// Get SQL connection
const sequelize = getConnections().sql

// Define models
const User = sequelize?.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    avatar: {
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.ENUM("user", "organizer", "admin"),
      defaultValue: "user",
    },
    bio: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.ENUM("olavarria", "tandil", "azul", "laplata", "bolivar"),
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "suspended"),
      defaultValue: "active",
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastLogin: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  },
)

const Event = sequelize?.define(
  "Event",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("music", "culture", "food", "sports", "technology", "art", "family"),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    locationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locationAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.ENUM("olavarria", "tandil", "azul", "laplata", "bolivar"),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    currency: {
      type: DataTypes.STRING(3),
      defaultValue: "ARS",
    },
    isFree: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    organizerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    images: {
      type: DataTypes.JSON,
    },
    tags: {
      type: DataTypes.JSON,
    },
    status: {
      type: DataTypes.ENUM("draft", "published", "cancelled", "completed"),
      defaultValue: "draft",
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
    },
    ratingCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "events",
    timestamps: true,
    indexes: [
      {
        fields: ["date", "city"],
      },
      {
        fields: ["category", "status"],
      },
      {
        fields: ["featured", "date"],
      },
    ],
  },
)

const Product = sequelize?.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("ropa", "accesorios", "tecnologia", "souvenirs"),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    originalPrice: {
      type: DataTypes.DECIMAL(10, 2),
    },
    currency: {
      type: DataTypes.STRING(3),
      defaultValue: "ARS",
    },
    images: {
      type: DataTypes.JSON,
    },
    variants: {
      type: DataTypes.JSON,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sku: {
      type: DataTypes.STRING,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "discontinued"),
      defaultValue: "active",
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
    },
    ratingCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    tags: {
      type: DataTypes.JSON,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  },
)

const Booking = sequelize?.define(
  "Booking",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "events",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled", "attended"),
      defaultValue: "pending",
    },
    paymentMethod: {
      type: DataTypes.STRING(50),
    },
    paymentId: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "bookings",
    timestamps: true,
  },
)

// Define associations if sequelize is available
if (sequelize) {
  // User associations
  User.hasMany(Event, { foreignKey: "organizerId", as: "organizedEvents" })
  User.hasMany(Booking, { foreignKey: "userId", as: "bookings" })

  // Event associations
  Event.belongsTo(User, { foreignKey: "organizerId", as: "organizer" })
  Event.hasMany(Booking, { foreignKey: "eventId", as: "bookings" })

  // Booking associations
  Booking.belongsTo(User, { foreignKey: "userId", as: "user" })
  Booking.belongsTo(Event, { foreignKey: "eventId", as: "event" })
}

module.exports = {
  User,
  Event,
  Product,
  Booking,
  sequelize,
}
