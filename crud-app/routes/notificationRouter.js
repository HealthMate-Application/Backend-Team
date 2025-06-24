const express = require("express");
const notificationController = require("../controllers/notificationController.js");

const router = express.Router();

// Route to get all notifications
router
  .route("/")
  .get(notificationController.getNotifications)
  // Route to create a new notification
  .post(notificationController.createNotification);

// Route to get, update, or delete a specific notification by ID
router
  .route("/:id")
  .get(notificationController.getNotification)
  .patch(notificationController.updateNotification)
  .delete(notificationController.deleteNotification);

// Export the router
module.exports = router;
