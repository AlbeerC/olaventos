const jwt = require("jsonwebtoken")
const User = require("../models/mongodb/User")
const { User: SQLUser } = require("../models/sql")
const { getConnections } = require("../config/database")
const logger = require("../utils/logger")

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token de acceso requerido",
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const connections = getConnections()
    let user = null

    if (connections.mongodb) {
      user = await User.findById(decoded.id).select("-password")
    } else if (connections.sql) {
      user = await SQLUser.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
      })
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token inválido",
      })
    }

    if (user.status !== "active") {
      return res.status(401).json({
        success: false,
        message: "Cuenta inactiva",
      })
    }

    req.user = user
    next()
  } catch (error) {
    logger.error("Auth middleware error:", error)
    res.status(401).json({
      success: false,
      message: "Token inválido",
    })
  }
}

// Admin middleware
const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Acceso denegado. Se requieren permisos de administrador",
        })
      }
      next()
    })
  } catch (error) {
    next(error)
  }
}

// Organizer middleware
const organizerAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (!["organizer", "admin"].includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Acceso denegado. Se requieren permisos de organizador",
        })
      }
      next()
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { auth, adminAuth, organizerAuth }
