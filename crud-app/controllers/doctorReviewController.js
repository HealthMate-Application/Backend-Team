const DoctorReview = require("../models/doctorReview");
const HandlerFactory = require("./handlerFactory");

// Get All Doctor Reviews
const getDoctorReviews = HandlerFactory.getAll(DoctorReview);

// Get Single Doctor Review
const getDoctorReview = HandlerFactory.getOne(DoctorReview);

// Create New Doctor Review
const createDoctorReview = HandlerFactory.createOne(DoctorReview);

// Update Doctor Review
const updateDoctorReview = HandlerFactory.updateOne(DoctorReview);

// Delete Doctor Review
const deleteDoctorReview = HandlerFactory.deleteOne(DoctorReview);

module.exports = {
  getDoctorReviews,
  getDoctorReview,
  createDoctorReview,
  updateDoctorReview,
  deleteDoctorReview
};
