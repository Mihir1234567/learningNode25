const bookingModel = require("../model/BookingModel");

/* ------------------------------- AddBooking ------------------------------- */
const addBookings = async (req, res) => {
  try {
    const addBooking = await bookingModel.create(req.body);
    res.status(201).json({
      message: "Booking Added Successfully",
      data: addBooking,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/* ------------------------------- GetBooking ------------------------------- */
const getBookings = async (req, res) => {
  try {
    const getBooking = await bookingModel
      .find()
      .populate("Clint_Id Hoarding_Id");
    res.status(200).json({
      message: "Booking Fetched Successfully",
      data: getBooking,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/* ----------------------------- GetBookingById ---------------------------- */
const getBookingsById = async (req, res) => {
  try {
    const getBookingById = await bookingModel
      .findById(req.params.id)
      .populate("Clint_Id Hoarding_Id");
    res.status(200).json({
      message: "Booking Fetched Successfully",
      data: getBookingById,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/* ------------------------------- DeleteById ------------------------------- */
const deleteBookingsById = async (req, res) => {
  try {
    const deleteBookingById = await bookingModel
      .findByIdAndDelete(req.params.id)
      .populate("Clint_Id Hoarding_Id");
    res.status(200).json({
      message: "Booking Deleted Successfully",
      data: deleteBookingById,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
module.exports = {
  addBookings,
  getBookings,
  getBookingsById,
  deleteBookingsById,
};
