const routes = require("express").Router();
const areaController = require("../controller/AreaController");

routes.post("/addArea", areaController.addAreas);
routes.get("/", areaController.getAreas);
routes.get("/:id", areaController.getAreasById);
routes.get("/getAreaByCityId/:cityId", areaController.getAreaByCityId);
routes.delete("/deleteArea/:id", areaController.deleteAreasById);
module.exports = routes;
