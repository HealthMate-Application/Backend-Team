const express = require("express");
const medicalConditionController = require("../controllers/medicalConditionController.js");

const router = express.Router();

// Route to get all medical conditions
router
  .route("/")
  .get(medicalConditionController.getMedicalConditions)
  // Route to create a new medical condition
  .post(medicalConditionController.createMedicalCondition);

// Route to get, update, or delete a specific medical condition by ID
router
  .route("/:id")
  .get(medicalConditionController.getMedicalCondition)
  .patch(medicalConditionController.updateMedicalCondition)
  .delete(medicalConditionController.deleteMedicalCondition);

// Export the router
module.exports = router;
