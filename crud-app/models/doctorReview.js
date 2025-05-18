const mongoose = require("mongoose");

const doctorReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    visitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visit",
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const DoctorReview = mongoose.model("DoctorReview", doctorReviewSchema);
module.exports = DoctorReview;
