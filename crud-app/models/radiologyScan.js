const mongoose = require("mongoose");

const radiologyScanSchema = new mongoose.Schema(
  {
    visitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visit",
      required: true,
    },

    imagePath: {
      type: String,
      required: true,
    },

    scanType: {
      type: String,
      enum: ["X-Ray", "MRI", "CT-Scan", "Ultrasound", "Other"],
      default: "Other",
    },

    aiAnalysisResult: {
      type: String,
    },

    selfReported: {
      type: Boolean,
      default: false,
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const RadiologyScan = mongoose.model("RadiologyScan", radiologyScanSchema);
module.exports = RadiologyScan;
