const Prescription = require('../models/prescription');
const HandlerFactory = require('./handlerFactory');

// Get All Prescriptions
const getPrescriptions = HandlerFactory.getAll(Prescription);

// Get Single Prescription
const getPrescription = HandlerFactory.getOne(Prescription);

// Create New Prescription
const createPrescription = HandlerFactory.createOne(Prescription);

// Update Prescription
const updatePrescription = HandlerFactory.updateOne(Prescription);

// Delete Prescription
const deletePrescription = HandlerFactory.deleteOne(Prescription);

module.exports = {
  getPrescriptions,
  getPrescription,
  createPrescription,
  updatePrescription,
  deletePrescription
};