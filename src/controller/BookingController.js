const bookingModel = require("../model/BookingModel");
const path = require("path");
const multer = require("multer");
const cloudinaryUtil = require("../util/CloudinaryUtil");

/* --------------------------------- storage -------------------------------- */

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

/* ------------------------------ multerObject ------------------------------ */

const upload = multer({
  storage: storage,
}).single("image");

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
      .populate("Clint_Id AdId  Hoarding_Id");
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

/* --------------------------- AddBookingWithFile; -------------------------- */
const addBookingWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      const cloudinaryResponse = await cloudinaryUtil.addFileToCloudinary(
        req.file
      );
      console.log(cloudinaryResponse);
      console.log(req.body);
      // console.log(req);

      /* --------------------------- storeDataInDatabase -------------------------- */
      req.body.addBannerUrl = cloudinaryResponse.secure_url;
      const savedBooking = await bookingModel.create(req.body);

      res.status(201).json({
        message: "Booking Saved Successfully",
        data: savedBooking,
      });
    }
  });
};

/* --------------------------- GetBookingByUserId --------------------------- */
const getBookingByUserId = async (req, res) => {
  try {
    const getBookingByUserId = await bookingModel
      .find({
        Clint_Id: req.params.id,
      })
      .populate("AdId Hoarding_Id");
    res.status(200).json({
      message: "Booking Fetched Successfully",
      data: getBookingByUserId,
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
  addBookingWithFile,
  getBookingByUserId,
};
