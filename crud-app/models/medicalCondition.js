const mongoose = require("mongoose");

const medicalConditionSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    createdFromVisitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visit",
      required: false,
    },

    name: { type: String, required: true },
    diagnosedDate: { type: Date, required: true },
    notes: { type: String },

    active: { type: Boolean, default: true },

    severity: {
      type: String,
      enum: ["mild", "moderate", "severe", "critical"],
      default: "moderate",
    },

    conditionType: {
      type: String,
      enum: ["chronic", "acute", "genetic", "infectious", "mental", "other"],
      default: "chronic",
    },

    icd10Code: { type: String },

    medications: [
      {
        medicationName: String,
        dosage: String,
        frequency: String,
      },
    ],

    selfReported: { type: Boolean, default: false },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

const MedicalCondition = mongoose.model(
  "MedicalCondition",
  medicalConditionSchema
);
export default MedicalCondition;
