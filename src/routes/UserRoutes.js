const routes = require("express").Router();
const userController = require("../controller/UserController");

routes.post("/user", userController.addUser);
routes.get("/users", userController.getUsers);
routes.get("/user/:id", userController.getUserById);
routes.delete("/user/:id", userController.deleteUserById);
routes.post("/user/signup", userController.signUp);
routes.post("/user/login", userController.login);
routes.post("/user/forgotPassword", userController.forgotPassword);
routes.post("/user/resetPassword", userController.resetPassword);

module.exports = routes;
