const routes = require("express").Router();
const cityController = require("../controller/CityController");

routes.post("/addCity", cityController.addCity);
routes.get("/", cityController.getCity);
routes.get("/:id", cityController.getCitysById);
routes.delete("/deleteCity/:id", cityController.deleteCitysById);
routes.get("/getCityByStateId/:stateId", cityController.getCityByStateId);
module.exports = routes;
