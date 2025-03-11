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
    const getPayment = await paymentModel.find();
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
    const getPaymentById = await paymentModel.findById(res.params.id);
    res.status(201).json({
      message: "Payment Fetched Successfully",
      data: getPaymentById,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/* ---------------------------- DeletePaymentById --------------------------- */
const deletePaymentsById = async (req, res) => {
  try {
    const deletePaymentById = await paymentModel.findByIdAndDelete(
      res.params.id
    );
    res.status(201).json({
      message: "Payments Deleted Successfully",
      data: deletePaymentById,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  addPayments,
  getPayments,
  getPaymentsById,
  deletePaymentsById,
};
