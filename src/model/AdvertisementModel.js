const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdvertisementSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "users",
    // require: true,
  },

  AdName: {
    type: String,
    require: true,
  },

  AdURL: {
    type: String,
  },
  AdContent: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("advertisement", AdvertisementSchema);
