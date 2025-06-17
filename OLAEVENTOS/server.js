const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const compression = require("compression")
const rateLimit = require("express-rate-limit")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const { createServer } = require("http")
const { Server } = require("socket.io")

// Import configurations and utilities
require("dotenv").config()
const logger = require("./utils/logger")
const { connectDatabases } = require("./config/database")
const errorHandler = require("./middleware/errorHandler")

// Import routes
const authRoutes = require("./routes/auth")
const eventRoutes = require("./routes/events")
const userRoutes = require("./routes/users")
const productRoutes = require("./routes/products")
const cityRoutes = require("./routes/cities")
const bookingRoutes = require("./routes/bookings")

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OLAEVENTOS API",
      version: "1.0.0",
      description: "API para la plataforma de eventos OLAEVENTOS",
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:5000",
        description: "Servidor de desarrollo",
      },
    ],
  },
  apis: ["./routes/*.js"],
}

const specs = swaggerJsdoc(swaggerOptions)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.",
})

// Middleware
app.use(helmet())
app.use(compression())
app.use(limiter)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  })
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cities", cityRoutes)
app.use("/api/bookings", bookingRoutes)

// Socket.IO for real-time features
io.on("connection", (socket) => {
  logger.info(`Usuario conectado: ${socket.id}`)

  socket.on("join-event", (eventId) => {
    socket.join(`event-${eventId}`)
    logger.info(`Usuario ${socket.id} se unió al evento ${eventId}`)
  })

  socket.on("disconnect", () => {
    logger.info(`Usuario desconectado: ${socket.id}`)
  })
})

// Error handling middleware
app.use(errorHandler)

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  })
})

const PORT = process.env.PORT || 5000

// Start server
async function startServer() {
  try {
    // Connect to databases
    await connectDatabases()

    server.listen(PORT, () => {
      logger.info(`🚀 Servidor corriendo en puerto ${PORT}`)
      logger.info(`📚 Documentación API: http://localhost:${PORT}/api-docs`)
      logger.info(`🏥 Health check: http://localhost:${PORT}/health`)
    })
  } catch (error) {
    logger.error("Error al iniciar el servidor:", error)
    process.exit(1)
  }
}

startServer()

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM recibido, cerrando servidor...")
  server.close(() => {
    logger.info("Servidor cerrado")
    process.exit(0)
  })
})

module.exports = { app, io }
