const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    visitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visit",
      required: true,
    },

    medications: [
      {
        medicationId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medication",
        },
        dosage: String,
        frequency: String,
        durationDays: Number,
      },
    ],

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

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;
