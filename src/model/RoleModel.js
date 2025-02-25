const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roleSchema = new Schema({});
module.exports = mongoose.model("roles", roleSchema);
