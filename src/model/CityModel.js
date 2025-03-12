const mongoose = require("mongoose");
const { schema } = require("./RoleModel");
const Schema = mongoose.Schema;

const citySchema = new Schema(
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
  },
  { timestamps: true }
);
module.exports = mongoose.model("city", citySchema);
