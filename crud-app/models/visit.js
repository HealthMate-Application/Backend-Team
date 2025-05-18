const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    medicalConditionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalCondition",
      required: false, // زيارة مرتبطة بمرض مزمن لو موجود
    },

    visitDate: {
      type: Date,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    diagnosis: {
      type: String,
    },

    notes: {
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
const Visit = mongoose.model("Visit", visitSchema);
module.exports = Visit;
