const mongoose = require("mongoose")
const { Sequelize } = require("sequelize")
const logger = require("../utils/logger")

// MongoDB connection
let mongoConnection = null

// SQL connection (PostgreSQL/MySQL)
let sqlConnection = null

// Database configurations
const dbConfigs = {
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/olaeventos",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  postgresql: {
    database: process.env.PG_DATABASE || "olaeventos",
    username: process.env.PG_USERNAME || "postgres",
    password: process.env.PG_PASSWORD || "password",
    host: process.env.PG_HOST || "localhost",
    port: process.env.PG_PORT || 5432,
    dialect: "postgres",
  },
  mysql: {
    database: process.env.MYSQL_DATABASE || "olaeventos",
    username: process.env.MYSQL_USERNAME || "root",
    password: process.env.MYSQL_PASSWORD || "password",
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    dialect: "mysql",
  },
}

// Connect to MongoDB
async function connectMongoDB() {
  try {
    mongoConnection = await mongoose.connect(dbConfigs.mongodb.uri, dbConfigs.mongodb.options)
    logger.info("✅ MongoDB conectado exitosamente")
    return mongoConnection
  } catch (error) {
    logger.error("❌ Error conectando a MongoDB:", error.message)
    throw error
  }
}

// Connect to SQL Database (PostgreSQL or MySQL)
async function connectSQL(dialect = "postgresql") {
  try {
    const config = dbConfigs[dialect]
    sqlConnection = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
      logging: (msg) => logger.debug(msg),
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    })

    await sqlConnection.authenticate()
    logger.info(`✅ ${dialect.toUpperCase()} conectado exitosamente`)

    // Sync models (create tables if they don't exist)
    await sqlConnection.sync({ alter: true })
    logger.info(`✅ Tablas sincronizadas en ${dialect.toUpperCase()}`)

    return sqlConnection
  } catch (error) {
    logger.error(`❌ Error conectando a ${dialect.toUpperCase()}:`, error.message)
    throw error
  }
}

// Connect to all configured databases
async function connectDatabases() {
  const connections = []

  // Connect to MongoDB if configured
  if (process.env.USE_MONGODB === "true") {
    try {
      await connectMongoDB()
      connections.push("MongoDB")
    } catch (error) {
      logger.warn("MongoDB no disponible, continuando sin él")
    }
  }

  // Connect to SQL database if configured
  const sqlDialect = process.env.SQL_DIALECT || "postgresql"
  if (process.env.USE_SQL === "true") {
    try {
      await connectSQL(sqlDialect)
      connections.push(sqlDialect.toUpperCase())
    } catch (error) {
      logger.warn(`${sqlDialect.toUpperCase()} no disponible, continuando sin él`)
    }
  }

  if (connections.length === 0) {
    logger.warn("⚠️  No hay bases de datos configuradas, usando datos en memoria")
  } else {
    logger.info(`🎯 Bases de datos activas: ${connections.join(", ")}`)
  }
}

// Get active connections
function getConnections() {
  return {
    mongodb: mongoConnection,
    sql: sqlConnection,
  }
}

module.exports = {
  connectDatabases,
  connectMongoDB,
  connectSQL,
  getConnections,
  mongoose,
  Sequelize: sqlConnection,
}
