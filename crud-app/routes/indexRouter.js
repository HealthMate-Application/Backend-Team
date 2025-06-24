const appointmentRouter = require("./appointmentRouter");
const doctorReviewRouter = require("./doctorReviewRouter.js");
const medicalConditionRouter = require("./medicalConditionRouter.js");
const medicationRouter = require("./medicationRouter.js");
const notificationRouter = require("./notificationRouter.js");
const prescriptionRouter = require("./prescriptionRouter.js");
const radiologyRouter = require("./radiologyRouter.js");
const visitRouter = require("./visitRouter.js");

const mountRoutes = (app) => {
  // Mount the all routes
  app.use("/api/v1/appointments", appointmentRouter);
  app.use("/api/v1/doctor-review", doctorReviewRouter);
  app.use("/api/v1/medical-conditions", medicalConditionRouter);
  app.use("/api/v1/medications", medicationRouter);
  app.use("/api/v1/notifications", notificationRouter);
  app.use("/api/v1/prescriptions", prescriptionRouter);
  app.use("/api/v1/radiology", radiologyRouter);
  app.use("/api/v1/visits", visitRouter);
};

module.exports = mountRoutes;
