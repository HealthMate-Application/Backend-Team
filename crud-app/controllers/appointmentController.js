const Appointment = require('../models/appointment');
const HandlerFactory = require('./handlerFactory');

// Get All Appointments
const getAppointments = HandlerFactory.getAll(Appointment);

// Get Single Appointment
const getAppointment = HandlerFactory.getOne(Appointment);

// Create New Appointment
const createAppointment = HandlerFactory.createOne(Appointment);

// Update Appointment
const updateAppointment = HandlerFactory.updateOne(Appointment);

// Delete Appointment
const deleteAppointment = HandlerFactory.deleteOne(Appointment);

module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
};