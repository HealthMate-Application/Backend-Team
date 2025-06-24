const exporess = require("express");
const prescriptionController = require("../controllers/prescriptionController.js");

const router = exporess.Router();

// Route to get all prescriptions
router
  .route("/")
  .get(prescriptionController.getPrescriptions)
  // Route to create a new prescription
  .post(prescriptionController.createPrescription);

// Route to get, update, or delete a specific prescription by ID
router
  .route("/:id")
  .get(prescriptionController.getPrescription)
  .patch(prescriptionController.updatePrescription)
  .delete(prescriptionController.deletePrescription);

// Export the router
module.exports = router;
