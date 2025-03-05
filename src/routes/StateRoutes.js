const routes = require("express").Router();
const stateController = require("../controller/StateController");

routes.post("/addState", stateController.addState);
routes.get("/", stateController.getStates);

routes.get("/:id", stateController.getStatesById);
routes.delete("/deleteState/:id", stateController.deleteStatesById);
module.exports = routes;
