const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "appointment",
        "checkup_reminder",
        "medication_reminder",
        "general",
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "sent", "seen"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
