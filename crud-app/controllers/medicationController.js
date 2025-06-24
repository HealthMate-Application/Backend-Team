const Medication = require("../models/medication");
const HandlerFactory = require("./handlerFactory");

// Get All Medications
const getMedications = HandlerFactory.getAll(Medication);

// Get Single Medication
const getMedication = HandlerFactory.getOne(Medication);

// Create New Medication
const createMedication = HandlerFactory.createOne(Medication);

// Update Medication
const updateMedication = HandlerFactory.updateOne(Medication);

// Delete Medication
const deleteMedication = HandlerFactory.deleteOne(Medication);

module.exports = {
  getMedications,
  getMedication,
  createMedication,
  updateMedication,
  deleteMedication
};
