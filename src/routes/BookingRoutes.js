const routes = require("express").Router();
const bookingController = require("../controller/BookingController");

routes.post("/addBooking", bookingController.addBookings);
routes.post("/addBookingWithFile", bookingController.addBookingWithFile);
routes.get("/", bookingController.getBookings);
routes.get("/getBookingById/:id", bookingController.getBookingsById);
routes.get("/getBookingByUserId/:id", bookingController.getBookingByUserId);
routes.delete("/deleteBookingById/:id", bookingController.deleteBookingsById);

module.exports = routes;
