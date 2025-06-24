const express = require("express");
const medicationRouter = require("../controllers/medicationController.js");

const router = express.Router();

// Route to get all medications
router
  .route("/")
  .get(medicationRouter.getMedications)
  // Route to create a new medication
  .post(medicationRouter.createMedication);

// Route to get, update, or delete a specific medication by ID
router
  .route("/:id")
  .get(medicationRouter.getMedication)
  .patch(medicationRouter.updateMedication)
  .delete(medicationRouter.deleteMedication);

// Export the router
module.exports = router;
