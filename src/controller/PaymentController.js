const paymentModel = require("../model/PaymentModel");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { error } = require("console");
require("dotenv").config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
/* ------------------------------- CreateOrder ------------------------------ */
const createOrder = async (req, res) => {
  try {
    const { amount, receipt } = req.body;
    const options = {
      amount: amount,
      currency: "INR",
      receipt: receipt,
    };

    const order = await razorpayInstance.orders.create(options);

    if (!order) {
      return res.status(500).json({
        error: "Order Creation Failed",
      });
    }

    return res.status(200).json({
      data: order,
    });
  } catch (error) {
    console.error("Error Creating Order", error.message);
  }
};

/* ------------------------------ verifyPayment ----------------------------- */
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    console.log(req.body);

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing required Razorpay payment details",
      });
    }

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature. Payment verification failed.",
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during payment verification",
      error: error.message,
    });
  }
};

/* ------------------------------- AddPayment ------------------------------- */
const addPayments = async (req, res) => {
  try {
    const addPayment = await paymentModel.create(req.body);
    res.status(201).json({
      message: "Payment Added Successfully",
      data: addPayment,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/* ------------------------------- GetPayment ------------------------------- */
const getPayments = async (req, res) => {
  try {
    const getPayment = await paymentModel
      .find()
      .populate("Client_Id Booking_Id");
    res.status(201).json({
      message: "Payments Fetched Successfully",
      data: getPayment,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/* ----------------------------- GetPaymentById ----------------------------- */
const getPaymentsById = async (req, res) => {
  try {
    const getPaymentById = await paymentModel.findById(req.params.id);
    res.status(201).json({
      message: "Payment Fetched Successfully",
      data: getPaymentById,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ---------------------------- DeletePaymentById --------------------------- */
const deletePaymentsById = async (req, res) => {
  try {
    const deletePaymentById = await paymentModel.findByIdAndDelete(
      req.params.id
    );
    res.status(201).json({
      message: "Payments Deleted Successfully",
      data: deletePaymentById,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addPayments,
  getPayments,
  getPaymentsById,
  deletePaymentsById,
  verifyPayment,
  createOrder,
};
