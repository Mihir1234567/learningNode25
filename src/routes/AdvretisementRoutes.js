const routes = require("express").Router();
const AdvertisementController = require("../controller/AdvertisementController");

routes.post("/addAdvertisement", AdvertisementController.AddAdvertisement);
routes.post(
  "/addAdvertisementWithFile",
  AdvertisementController.AddAdvertisementWithFile
);

routes.get("/getAllAdvertisement", AdvertisementController.getAdvertisement);

routes.delete(
  "/deleteAdvertisement/:id",
  AdvertisementController.deleteAdvertisement
);

routes.get(
  "/getAdvertisementById/:id",
  AdvertisementController.getAdvertisementById
);

routes.get(
  "/getAdvertisementByUserId/:userID",
  AdvertisementController.getAdByUserID
);

routes.put(
  "/updateAdvertisement/:id",
  AdvertisementController.updateAdvertisement
);

module.exports = routes;
