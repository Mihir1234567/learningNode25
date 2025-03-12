const routes = require("express").Router();
const paymentController = require("../controller/PaymentController");

routes.get("/", paymentController.getPayments);
routes.post("/addPayments", paymentController.addPayments);
routes.get("/getPaymentsById/:id", paymentController.getPaymentsById);
routes.delete("/deletePaymentById/:id", paymentController.deletePaymentsById);
module.exports = routes;
