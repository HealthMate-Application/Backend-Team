const express = require("express");
const visitController = require("../controllers/visitController.js");

const router = express.Router();

// Route to get all visits
router
  .route("/")
  .get(visitController.getVisits)
  // Route to create a new visit
  .post(visitController.createVisit);

// Route to get, update, or delete a specific visit by ID
router
  .route("/:id")
  .get(visitController.getVisit)
  .patch(visitController.updateVisit)
  .delete(visitController.deleteVisit);

// Export the router
module.exports = router;
