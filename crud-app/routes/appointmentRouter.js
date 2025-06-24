const express = require("express");
const appointmentController = require("../controllers/appointmentController.js");

const router = express.Router();

// Route to get all appointments
router
  .route("/")
  .get(appointmentController.getAppointments)
  // Route to create a new appointment
  .post(appointmentController.createAppointment);

// Route to get, update, or delete a specific appointment by ID
router
  .route("/:id")
  .get(appointmentController.getAppointment)
  .patch(appointmentController.updateAppointment)
  .delete(appointmentController.deleteAppointment);

// Export the router
module.exports = router;
