const express = require("express");
const doctorReviewController = require("../controllers/doctorReviewController.js");

const router = express.Router();

// Route to get all doctor reviews
router
  .route("/")
  .get(doctorReviewController.getDoctorReviews)
  // Route to create a new doctor review
  .post(doctorReviewController.createDoctorReview);

// Route to get, update, or delete a specific doctor review by ID
router
  .route("/:id")
  .get(doctorReviewController.getDoctorReview)
  .patch(doctorReviewController.updateDoctorReview)
  .delete(doctorReviewController.deleteDoctorReview);

// Export the router
module.exports = router;
