const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
  Clint_Id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  Hoarding_Id: {
    type: Schema.Types.ObjectId,
    ref: "hording",
  },
  Total_Cost: {
    type: Number,
    // require: true,
  },
  Payment_Status: {
    type: Boolean,
    // require: true,
  },
  AdId: {
    type: Schema.Types.ObjectId,
    // require: true,
    ref: "advertisement",
  },
});

module.exports = mongoose.model("booking", bookingSchema);
