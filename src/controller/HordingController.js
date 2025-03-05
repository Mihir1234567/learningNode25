const hordingModel = require("../model/HordingModel");

//AddHording
const addHordings = async (req, res) => {
  try {
    const addHording = await hordingModel.create(req.body);
    res.status(201).json({
      message: "Hording Added Successfully",
      data: addHording,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//GetHording
const getHordings = async (req, res) => {
  try {
    const getHording = await hordingModel
      .find()
      .populate("stateId areaId cityId");
    res.status(201).json({
      message: "Hording Fetched Successfully",
      data: getHording,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//GetHordingById
const getHordingsById = async (req, res) => {
  try {
    const getHordingById = await hordingModel
      .findById(req.params.id)
      .populate("stateId areaId cityId");
    res.status(201).json({
      message: "Hording Fetched Successfully",
      data: getHordingById,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//GetHordingByIdAndDelete
const deleteHordingsById = async (req, res) => {
  try {
    const deleteHordingById = await hordingModel
      .findByIdAndDelete(req.params.id)
      .populate("stateId areaId cityId");
    res.status(201).json({
      message: "Hording Deleted Successfully",
      data: deleteHordingById,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
module.exports = {
  addHordings,
  getHordings,
  getHordingsById,
  deleteHordingsById,
};
