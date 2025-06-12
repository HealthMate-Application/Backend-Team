const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    sideEffects: {
      type: String,
    },

    manufacturer: {
      type: String,
    },

    category: {
      type: String,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Medication = mongoose.model("Medication", medicationSchema);
module.exports = Medication;
