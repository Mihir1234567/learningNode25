const routes = require("express").Router();
const userController = require("../controller/UserController");

routes.post("/user", userController.addUser);
routes.get("/users", userController.getUsers);
routes.get("/user/:id", userController.getUserById);
routes.delete("/user/:id", userController.deleteUserById);

module.exports = routes;
