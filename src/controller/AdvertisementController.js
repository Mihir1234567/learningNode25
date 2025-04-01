const AdvertisementModel = require("../model/AdvertisementModel");
const path = require("path");
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

const AddAdvertisement = async (req, res) => {
  try {
    const newAd = await AdvertisementModel.create(req.body);
    res.status(201).json({
      message: "Advertisement Created",
      data: newAd,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAdvertisement = async (req, res) => {
  try {
    const allAd = await AdvertisementModel.find();
    res.status(200).json({
      message: "All the Advertisements",
      data: allAd,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteAdvertisement = async (req, res) => {
  try {
    const deletedAd = await AdvertisementModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Advertisement Deleted Successfully!",
      data: deletedAd,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAdvertisementById = async (req, res) => {
  try {
    const fetchedAdById = await AdvertisementModel.findById(req.params.id);
    res.status(200).json({
      message: "Advertisement Fetched Successfully!",
      data: fetchedAdById,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateAdvertisement = async (req, res) => {
  try {
    const updatedAd = await AdvertisementModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Update Successful.",
      data: updatedAd,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const AddAdvertisementWithFile = async (req, res) => {
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

      req.body.AdURL = cloudinaryResponse.secure_url;
      console.log(cloudinaryResponse.secure_url);

      const savedHording = await AdvertisementModel.create(req.body);

      res.status(201).json({
        message: "Hording With File Created SuccessFully",
        data: savedHording,
      });
    }
  });
};

const getAdByUserID = async (req, res) => {
  try {
    const showAd = await AdvertisementModel.find({
      userID: req.params.userID,
    });
    res.status(200).json({
      message: "Ads Fetched Successfully ",
      data: showAd,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = {
  getAdByUserID,
  getAdvertisement,
  AddAdvertisement,
  deleteAdvertisement,
  updateAdvertisement,
  getAdvertisementById,
  AddAdvertisementWithFile,
};
