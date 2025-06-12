const mongoose = require("mongoose");

const patientProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    allergies: {
      type: [String],
      default: [],
    },

    height: {
      type: Number,
    },

    weight: {
      type: Number,
    },

    medicalHistoryNote: {
      type: String,
    },

    maritalStatus: {
      type: String,
      enum: ["single", "married", "divorced", "widowed"],
      default: "single",
    },

    isSmoker: {
      type: Boolean,
      default: false,
    },

    dependentsCount: {
      type: Number,
      default: 0,
    },

    activityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active"],
      default: "sedentary",
    },

    dietType: {
      type: String,
      enum: ["normal", "low-carb", "vegetarian", "keto", "other"],
      default: "normal",
    },

    educationLevel: {
      type: String,
      enum: ["none", "primary", "secondary", "higher"],
      default: "none",
    },

    lastCheckupDate: {
      type: Date,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

const PatientProfile = mongoose.model("PatientProfile", patientProfileSchema);
export default PatientProfile;
