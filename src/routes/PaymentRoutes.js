const routes = require("express").Router();
const paymentController = require("../controller/PaymentController");

routes.get("/", paymentController.getPayments);
routes.post("/addPayments", paymentController.addPayments);
routes.get("/getPaymentsById/:id", paymentController.getPaymentsById);
routes.delete("/deletePaymentById/:id", paymentController.deletePaymentsById);
routes.post("/createOrder", paymentController.createOrder);
routes.post("/verifyPayment", paymentController.verifyPayment);
module.exports = routes;
