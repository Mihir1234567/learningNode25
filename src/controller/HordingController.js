const path = require("path");
const hordingModel = require("../model/HordingModel");
const multer = require("multer");
const cloudinaryUtil = require("../util/CloudinaryUtil");

/* --------------------------------- storage -------------------------------- */

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

/* ------------------------------ multerObject ------------------------------ */

const upload = multer({
  storage: storage,
}).single("image");

/* ------------------------------ //AddHording ------------------------------ */
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

/* ------------------------------ //GetHording ------------------------------ */
const getHordings = async (req, res) => {
  try {
    const getHording = await hordingModel
      .find()
      .populate("stateId areaId cityId");
    res.status(200).json({
      message: "Hording Fetched Successfully",
      data: getHording,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/* ---------------------------- //GetHordingById ---------------------------- */
const getHordingsById = async (req, res) => {
  try {
    const getHordingById = await hordingModel
      .findById(req.params.id)
      .populate("stateId areaId cityId");
    res.status(200).json({
      message: "Hording Fetched Successfully",
      data: getHordingById,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/* ------------------------ //GetHordingByIdAndDelete ----------------------- */
const deleteHordingsById = async (req, res) => {
  try {
    const deleteHordingById = await hordingModel
      .findByIdAndDelete(req.params.id)
      .populate("stateId areaId cityId");
    res.status(200).json({
      message: "Hording Deleted Successfully",
      data: deleteHordingById,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/* --------------------------- AddHordingWithFile; -------------------------- */
const addHordingWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      const cloudinaryResponse = await cloudinaryUtil.addFileToCloudinary(
        req.file
      );
      console.log(cloudinaryResponse);
      console.log(req.body);
      // console.log(req);

      /* --------------------------- storeDataInDatabase -------------------------- */
      req.body.hordingURL = cloudinaryResponse.secure_url;
      const savedHording = await hordingModel.create(req.body);

      res.status(201).json({
        message: "Hording Saved Successfully",
        data: savedHording,
      });
    }
  });
};

module.exports = {
  addHordings,
  getHordings,
  getHordingsById,
  deleteHordingsById,
  addHordingWithFile,
};
