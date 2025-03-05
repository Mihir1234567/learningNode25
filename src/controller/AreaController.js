const areaModel = require("../model/AreaModel");

//AddArea
const addAreas = async (req, res) => {
  try {
    const addArea = await areaModel.create(req.body);
    res.status(201).json({
      message: "Area Added Successfully",
      data: addArea,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//GetArea
const getAreas = async (req, res) => {
  try {
    const getArea = await areaModel.find().populate("cityId stateId");
    res.status(201).json({
      message: "Area Fetched Successfully",
      data: getArea,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//GetAreaById
const getAreasById = async (req, res) => {
  try {
    const getAreaById = await areaModel
      .findById(req.params.id)
      .populate("cityId stateId");
    res.status(201).json({
      message: "Area Fetched Successfully",
      data: getAreaById,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//DeleteById
const deleteAreasById = async (req, res) => {
  try {
    const deleteAreaById = await areaModel
      .findByIdAndDelete(req.params.id)
      .populate("cityId stateId");
    res.status(201).json({
      message: "Area Fetched Successfully",
      data: deleteAreaById,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
module.exports = { addAreas, getAreas, getAreasById, deleteAreasById };
