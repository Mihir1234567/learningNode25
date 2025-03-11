const stateModel = require("../model/StateModel");

//AddState
const addState = async (req, res) => {
  try {
    const state = await stateModel.create(req.body);
    res.status(201).json({
      message: "State Added Successfully",
      data: state,
    });
  } catch (error) {
    res.json({ error: error });
  }
};

//GetState
const getStates = async (req, res) => {
  try {
    const getState = await stateModel.find();
    res.status(200).json({
      message: "States Fetched Successfully",
      data: getState,
    });
  } catch (error) {
    res.json({ error: error });
  }
};

//deleteStateById
const deleteStatesById = async (req, res) => {
  try {
    const deleteStateById = await stateModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "States Deleted Successfully",
      data: deleteStateById,
    });
  } catch (error) {
    res.json({ error: error });
  }
};
//GetStateById
const getStatesById = async (req, res) => {
  try {
    const getStateById = await stateModel.findById(req.params.id);
    res.status(200).json({
      message: "States Fetched Successfully",
      data: getStateById,
    });
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports = { getStates, addState, getStatesById, deleteStatesById };
