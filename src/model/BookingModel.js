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
  Start_Time: {
    type: String,
    require: true,
  },
  End_Time: {
    type: String,
    require: true,
  },
  Total_Cost: {
    type: Number,
    // require: true,
  },
  Payment_Status: {
    type: Boolean,
    // require: true,
  },

  AddContent: {
    type: String,
    require: true,
  },

  addBannerUrl: {
    type: String,
    // require: true,
  },
});

module.exports = mongoose.model("booking", bookingSchema);
