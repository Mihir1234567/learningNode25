const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const areaSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    stateId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "state",
    },
    cityId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "city",
    },
    pincode: {
      type: Number,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("area", areaSchema);
