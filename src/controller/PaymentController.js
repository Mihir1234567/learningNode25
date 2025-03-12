const paymentModel = require("../model/PaymentModel");

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
};
