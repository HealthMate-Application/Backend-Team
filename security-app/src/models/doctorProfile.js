const mongoose = require("mongoose");

const doctorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    licenseNumber: {
      type: String,
      required: true,
    },

    clinicAddress: {
      type: String,
    },

    availableTimes: [
      {
        day: {
          type: String,
          enum: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        from: String,
        to: String,
      },
    ],
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const DoctorProfile = mongoose.model("DoctorProfile", doctorProfileSchema);
module.exports = DoctorProfile;
