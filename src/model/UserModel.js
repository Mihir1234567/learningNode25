const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  fName: {
    type: String,
  },
  lName: {
    type: String,
  },
  age: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "roles",
  },
});
module.exports = mongoose.model("users", userSchema);
