const routes = require("express").Router();
const bookingController = require("../controller/BookingController");

routes.post("/addBooking", bookingController.addBookings);
routes.get("/", bookingController.getBookings);
routes.get("/getBookingById/:id", bookingController.getBookingsById);
routes.delete("/deleteBookingById/:id", bookingController.deleteBookingsById);

module.exports = routes;
