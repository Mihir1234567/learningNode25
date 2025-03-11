const path = require("path");

const cloudinary = require("cloudinary").v2;

const addFileToCloudinary = async (file) => {
  cloudinary.config({
    cloud_name: "dy6fyjfsp",
    api_key: "913577278321255",
    api_secret: "-v92H8gpOKKuO-Bj-1kzoESuqzA",
  });

  const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
  return cloudinaryResponse;
};
module.exports = { addFileToCloudinary };
