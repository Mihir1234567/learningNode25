const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hordingSchema = new Schema({
  hordingDimension: {
    type: String,
    require: true,
  },
  hordingType: {
    enum: ["Unipole", "Billboard", "Gantry", "Digital"],
    type: String,
    require: true,
  },
  AvailabilityStatus: {
    type: Boolean,
    default: true,
  },
  hourlyRate: {
    type: Number,
    require: true,
  },
  hordingURL: {
    type: String,
    require: true,
  },
  stateId: {
    type: Schema.Types.ObjectId,
    ref: "state",
    require: true,
  },
  cityId: {
    type: Schema.Types.ObjectId,
    ref: "city",
    require: true,
  },
  areaId: {
    type: Schema.Types.ObjectId,
    ref: "area",
    require: true,
  },
  latitude: {
    type: Number,
    require: true,
  },
  longitude: {
    type: Number,
    require: true,
  },
});
module.exports = mongoose.model("hording", hordingSchema);
