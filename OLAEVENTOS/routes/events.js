const express = require("express")
const { body } = require("express-validator")
const eventController = require("../controllers/eventController")
const auth = require("../middleware/auth")
const upload = require("../middleware/upload")

const router = express.Router()

// Validation rules
const eventValidation = [
  body("title").trim().isLength({ min: 3, max: 200 }).withMessage("El título debe tener entre 3 y 200 caracteres"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("La descripción debe tener entre 10 y 2000 caracteres"),
  body("category")
    .isIn(["music", "culture", "food", "sports", "technology", "art", "family"])
    .withMessage("Categoría inválida"),
  body("date").isISO8601().withMessage("Fecha inválida"),
  body("time")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Hora inválida (formato HH:MM)"),
  body("location.name").trim().isLength({ min: 3, max: 100 }).withMessage("Nombre del lugar requerido"),
  body("location.address").trim().isLength({ min: 5, max: 200 }).withMessage("Dirección requerida"),
  body("location.city").isIn(["olavarria", "tandil", "azul", "laplata", "bolivar"]).withMessage("Ciudad inválida"),
  body("price.amount").isFloat({ min: 0 }).withMessage("Precio debe ser mayor o igual a 0"),
  body("capacity").isInt({ min: 1 }).withMessage("Capacidad debe ser mayor a 0"),
]

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - category
 *         - date
 *         - time
 *         - location
 *         - price
 *         - capacity
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del evento
 *         title:
 *           type: string
 *           description: Título del evento
 *         description:
 *           type: string
 *           description: Descripción del evento
 *         category:
 *           type: string
 *           enum: [music, culture, food, sports, technology, art, family]
 *         date:
 *           type: string
 *           format: date
 *         time:
 *           type: string
 *           pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'
 *         location:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             address:
 *               type: string
 *             city:
 *               type: string
 *               enum: [olavarria, tandil, azul, laplata, bolivar]
 *         price:
 *           type: object
 *           properties:
 *             amount:
 *               type: number
 *             currency:
 *               type: string
 *               default: ARS
 *         capacity:
 *           type: integer
 *           minimum: 1
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Obtener lista de eventos
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *           enum: [all, olavarria, tandil, azul, laplata, bolivar]
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     events:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Event'
 *                     pagination:
 *                       type: object
 */
router.get("/", eventController.getEvents)

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Obtener evento por ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento no encontrado
 */
router.get("/:id", eventController.getEvent)

/**
 * @swagger
 * /api/events/city/{city}:
 *   get:
 *     summary: Obtener eventos por ciudad
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *           enum: [all, olavarria, tandil, azul, laplata, bolivar]
 *     responses:
 *       200:
 *         description: Eventos por ciudad obtenidos exitosamente
 */
router.get("/city/:city", eventController.getEventsByCity)

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Crear nuevo evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post("/", auth, eventValidation, eventController.createEvent)

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Actualizar evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Evento actualizado exitosamente
 *       403:
 *         description: Sin permisos
 *       404:
 *         description: Evento no encontrado
 */
router.put("/:id", auth, eventValidation, eventController.updateEvent)

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Eliminar evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento eliminado exitosamente
 *       403:
 *         description: Sin permisos
 *       404:
 *         description: Evento no encontrado
 */
router.delete("/:id", auth, eventController.deleteEvent)

/**
 * @swagger
 * /api/events/{id}/register:
 *   post:
 *     summary: Registrarse en un evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registrado exitosamente
 *       400:
 *         description: Ya registrado o evento lleno
 *       404:
 *         description: Evento no encontrado
 */
router.post("/:id/register", auth, eventController.registerForEvent)

// Upload event images
router.post("/:id/images", auth, upload.array("images", 5), async (req, res) => {
  try {
    // Handle image upload logic here
    res.json({
      success: true,
      message: "Imágenes subidas exitosamente",
      data: req.files,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al subir imágenes",
    })
  }
})

module.exports = router
