const routes = require("express").Router();
const paymentController = require("../controller/PaymentController");

routes.get("/", paymentController.getPayments);
routes.post("/addPayments", paymentController.addPayments);
routes.post("/getPaymentsById/:id", paymentController.getPaymentsById);
routes.post("/deletePaymentById/:id", paymentController.deletePaymentsById);
module.exports={routes}
