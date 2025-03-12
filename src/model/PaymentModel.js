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
  Payment_Method: {
    enum: ["Cash", "Check", "Card", "Upi"],
    type: String,
    require: true,
  },
  Payment_Status: {
    type: Boolean,
    require: true,
  },
  transcationRef: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("payment", paymentSchema);
