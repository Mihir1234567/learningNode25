const cityModel = require("../model/CityModel");

/* -------------------------------- //AddCity ------------------------------- */
const addCity = async (req, res) => {
  try {
    const city = await cityModel.create(req.body);
    res.status(201).json({
      message: "City Added Successfully",
      data: city,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/* -------------------------------- //GetCity ------------------------------- */
const getCity = async (req, res) => {
  try {
    const citys = await cityModel.find().populate("stateId");
    res.status(200).json({
      message: "City Fetched Successfully",
      data: citys,
    });
  } catch (error) {
    res.json({ error: error });
  }
};
/* ------------------------------ //GetCityById ----------------------------- */
const getCitysById = async (req, res) => {
  try {
    const cityById = await cityModel
      .findById(req.params.id)
      .populate("stateId");
    res.status(200).json({
      message: "City Fetched Successfully",
      data: cityById,
    });
  } catch (error) {
    res.json({ error: error });
  }
};
/* ------------------------------ //GetCityById ----------------------------- */
const deleteCitysById = async (req, res) => {
  try {
    deleteCityById = await cityModel
      .findByIdAndDelete(req.params.id)
      .populate("stateId");
    res.status(200).json({
      message: "City Deleted Successfully",
      data: deleteCityById,
    });
  } catch (error) {
    res.json({ error: error });
  }
};

/* --------------------------- //GetStateByCityId --------------------------- */
const getCityByStateId = async (req, res) => {
  try {
    const citysByStateId = await cityModel
      .find({ stateId: req.params.stateId })
      .populate("stateId");
    res.status(200).json({
      message: "City Fetched Successfully",
      data: citysByStateId,
    });
  } catch (error) {
    res.json({ error: error });
  }
};
module.exports = {
  addCity,
  getCity,
  getCitysById,
  getCityByStateId,
  deleteCitysById,
};
