const express = require("express");
const radilogyController = require("../controllers/radiologyController.js");

const router = express.Router();

// Route to get all radiology records
router
  .route("/")
  .get(radilogyController.getRadiologyRecords)
  // Route to create a new radiology record
  .post(radilogyController.createRadiologyRecord);

// Route to get, update, or delete a specific radiology record by ID
router
  .route("/:id")
  .get(radilogyController.getRadiologyRecord)
  .patch(radilogyController.updateRadiologyRecord)
  .delete(radilogyController.deleteRadiologyRecord);

// Export the router
module.exports = router;
