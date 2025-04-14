const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  Client_Id: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "users",
  },
  Booking_Id: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "booking",
  },
  Amount: {
    type: Number,
    require: true,
  },
  razorpay_order_id: {
    type: String,
    require: true,
  },
  razorpay_payment_id: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("payment", paymentSchema);
