const Notification = require("../models/notification");
const HandlerFactory = require("./handlerFactory");

// Get All Notifications
const getNotifications = HandlerFactory.getAll(Notification);

// Get Single Notification
const getNotification = HandlerFactory.getOne(Notification);

// Create New Notification
const createNotification = HandlerFactory.createOne(Notification);

// Update Notification
const updateNotification = HandlerFactory.updateOne(Notification);

// Delete Notification
const deleteNotification = HandlerFactory.deleteOne(Notification);

module.exports = {
  getNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification
};
