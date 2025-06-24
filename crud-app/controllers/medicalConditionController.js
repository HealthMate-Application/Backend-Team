const MedicalCondition = require("../models/medicalCondition");
const HandlerFactory = require("./handlerFactory");

// Get All Medical Conditions
const getMedicalConditions = HandlerFactory.getAll(MedicalCondition);

// Get Single Medical Condition
const getMedicalCondition = HandlerFactory.getOne(MedicalCondition);

// Create New Medical Condition
const createMedicalCondition = HandlerFactory.createOne(MedicalCondition);

// Update Medical Condition
const updateMedicalCondition = HandlerFactory.updateOne(MedicalCondition);

// Delete Medical Condition
const deleteMedicalCondition = HandlerFactory.deleteOne(MedicalCondition);

module.exports = {
  getMedicalConditions,
  getMedicalCondition,
  createMedicalCondition,
  updateMedicalCondition,
  deleteMedicalCondition
};
