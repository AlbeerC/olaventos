const Event = require("../models/mongodb/Event")
const { Event: SQLEvent } = require("../models/sql")
const { getConnections } = require("../config/database")
const logger = require("../utils/logger")
const { validationResult } = require("express-validator")

class EventController {
  // Get all events with filters
  async getEvents(req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        city,
        category,
        date,
        featured,
        search,
        sortBy = "date",
        sortOrder = "asc",
      } = req.query

      const skip = (page - 1) * limit
      const connections = getConnections()

      let events = []
      let total = 0

      // Build filter object
      const filter = { status: "published" }

      if (city && city !== "all") filter["location.city"] = city
      if (category) filter.category = category
      if (featured) filter.featured = featured === "true"
      if (date) {
        const targetDate = new Date(date)
        filter.date = {
          $gte: new Date(targetDate.setHours(0, 0, 0, 0)),
          $lt: new Date(targetDate.setHours(23, 59, 59, 999)),
        }
      }
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { tags: { $in: [new RegExp(search, "i")] } },
        ]
      }

      // Sort object
      const sort = {}
      sort[sortBy] = sortOrder === "desc" ? -1 : 1

      if (connections.mongodb) {
        // MongoDB query
        events = await Event.find(filter)
          .populate("organizer", "firstName lastName avatar")
          .sort(sort)
          .skip(skip)
          .limit(Number.parseInt(limit))
          .lean()

        total = await Event.countDocuments(filter)
      } else if (connections.sql) {
        // SQL query
        const whereClause = { status: "published" }
        if (city && city !== "all") whereClause.city = city
        if (category) whereClause.category = category
        if (featured) whereClause.featured = featured === "true"

        const result = await SQLEvent.findAndCountAll({
          where: whereClause,
          include: [
            {
              model: connections.sql.models.User,
              as: "organizer",
              attributes: ["firstName", "lastName", "avatar"],
            },
          ],
          order: [[sortBy, sortOrder.toUpperCase()]],
          offset: skip,
          limit: Number.parseInt(limit),
        })

        events = result.rows
        total = result.count
      }

      res.json({
        success: true,
        data: {
          events,
          pagination: {
            currentPage: Number.parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalEvents: total,
            hasNext: page * limit < total,
            hasPrev: page > 1,
          },
        },
      })
    } catch (error) {
      logger.error("Error getting events:", error)
      res.status(500).json({
        success: false,
        message: "Error al obtener eventos",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      })
    }
  }

  // Get single event by ID
  async getEvent(req, res) {
    try {
      const { id } = req.params
      const connections = getConnections()
      let event = null

      if (connections.mongodb) {
        event = await Event.findById(id)
          .populate("organizer", "firstName lastName avatar email phone")
          .populate("attendees.user", "firstName lastName avatar")
      } else if (connections.sql) {
        event = await SQLEvent.findByPk(id, {
          include: [
            {
              model: connections.sql.models.User,
              as: "organizer",
              attributes: ["firstName", "lastName", "avatar", "email", "phone"],
            },
          ],
        })
      }

      if (!event) {
        return res.status(404).json({
          success: false,
          message: "Evento no encontrado",
        })
      }

      res.json({
        success: true,
        data: event,
      })
    } catch (error) {
      logger.error("Error getting event:", error)
      res.status(500).json({
        success: false,
        message: "Error al obtener evento",
      })
    }
  }

  // Create new event
  async createEvent(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Datos inválidos",
          errors: errors.array(),
        })
      }

      const eventData = {
        ...req.body,
        organizer: req.user.id,
      }

      const connections = getConnections()
      let event = null

      if (connections.mongodb) {
        event = new Event(eventData)
        await event.save()
        await event.populate("organizer", "firstName lastName avatar")
      } else if (connections.sql) {
        event = await SQLEvent.create({
          ...eventData,
          organizerId: req.user.id,
        })
      }

      res.status(201).json({
        success: true,
        message: "Evento creado exitosamente",
        data: event,
      })
    } catch (error) {
      logger.error("Error creating event:", error)
      res.status(500).json({
        success: false,
        message: "Error al crear evento",
      })
    }
  }

  // Update event
  async updateEvent(req, res) {
    try {
      const { id } = req.params
      const connections = getConnections()
      let event = null

      if (connections.mongodb) {
        event = await Event.findById(id)
        if (!event) {
          return res.status(404).json({
            success: false,
            message: "Evento no encontrado",
          })
        }

        // Check if user is organizer or admin
        if (event.organizer.toString() !== req.user.id && req.user.role !== "admin") {
          return res.status(403).json({
            success: false,
            message: "No tienes permisos para editar este evento",
          })
        }

        Object.assign(event, req.body)
        await event.save()
      } else if (connections.sql) {
        event = await SQLEvent.findByPk(id)
        if (!event) {
          return res.status(404).json({
            success: false,
            message: "Evento no encontrado",
          })
        }

        if (event.organizerId !== req.user.id && req.user.role !== "admin") {
          return res.status(403).json({
            success: false,
            message: "No tienes permisos para editar este evento",
          })
        }

        await event.update(req.body)
      }

      res.json({
        success: true,
        message: "Evento actualizado exitosamente",
        data: event,
      })
    } catch (error) {
      logger.error("Error updating event:", error)
      res.status(500).json({
        success: false,
        message: "Error al actualizar evento",
      })
    }
  }

  // Delete event
  async deleteEvent(req, res) {
    try {
      const { id } = req.params
      const connections = getConnections()
      let event = null

      if (connections.mongodb) {
        event = await Event.findById(id)
        if (!event) {
          return res.status(404).json({
            success: false,
            message: "Evento no encontrado",
          })
        }

        if (event.organizer.toString() !== req.user.id && req.user.role !== "admin") {
          return res.status(403).json({
            success: false,
            message: "No tienes permisos para eliminar este evento",
          })
        }

        await Event.findByIdAndDelete(id)
      } else if (connections.sql) {
        event = await SQLEvent.findByPk(id)
        if (!event) {
          return res.status(404).json({
            success: false,
            message: "Evento no encontrado",
          })
        }

        if (event.organizerId !== req.user.id && req.user.role !== "admin") {
          return res.status(403).json({
            success: false,
            message: "No tienes permisos para eliminar este evento",
          })
        }

        await event.destroy()
      }

      res.json({
        success: true,
        message: "Evento eliminado exitosamente",
      })
    } catch (error) {
      logger.error("Error deleting event:", error)
      res.status(500).json({
        success: false,
        message: "Error al eliminar evento",
      })
    }
  }

  // Register for event
  async registerForEvent(req, res) {
    try {
      const { id } = req.params
      const userId = req.user.id
      const connections = getConnections()

      if (connections.mongodb) {
        const event = await Event.findById(id)
        if (!event) {
          return res.status(404).json({
            success: false,
            message: "Evento no encontrado",
          })
        }

        // Check if already registered
        const alreadyRegistered = event.attendees.some((attendee) => attendee.user.toString() === userId)

        if (alreadyRegistered) {
          return res.status(400).json({
            success: false,
            message: "Ya estás registrado en este evento",
          })
        }

        // Check capacity
        if (event.attendeeCount >= event.capacity) {
          return res.status(400).json({
            success: false,
            message: "El evento está lleno",
          })
        }

        event.attendees.push({ user: userId })
        await event.save()
      }

      res.json({
        success: true,
        message: "Registrado exitosamente en el evento",
      })
    } catch (error) {
      logger.error("Error registering for event:", error)
      res.status(500).json({
        success: false,
        message: "Error al registrarse en el evento",
      })
    }
  }

  // Get events by city
  async getEventsByCity(req, res) {
    try {
      const { city } = req.params
      const connections = getConnections()
      let events = []

      const filter = {
        status: "published",
        date: { $gte: new Date() },
      }

      if (city !== "all") {
        filter["location.city"] = city
      }

      if (connections.mongodb) {
        events = await Event.find(filter).populate("organizer", "firstName lastName").sort({ date: 1 }).limit(20)
      }

      res.json({
        success: true,
        data: events,
      })
    } catch (error) {
      logger.error("Error getting events by city:", error)
      res.status(500).json({
        success: false,
        message: "Error al obtener eventos por ciudad",
      })
    }
  }
}

module.exports = new EventController()
