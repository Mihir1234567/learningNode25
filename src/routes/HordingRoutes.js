const routes = require("express").Router();
const hordingController = require("../controller/HordingController");
routes.post("/addHording", hordingController.addHordings);
routes.get("/", hordingController.getHordings);
routes.get("/:id", hordingController.getHordingsById);
routes.delete("/deleteHording/:id", hordingController.deleteHordingsById);
module.exports = routes;
