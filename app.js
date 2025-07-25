const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//express object
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

/* ------------------------ //To Accept Data as Json ------------------------ */
app.use(express.json());

/* -------------------------- // import role routes ------------------------- */
const roleRoutes = require("./src/routes/RoleRoutes");
app.use(roleRoutes);

/* -------------------------- //import user routes -------------------------- */
const userRoutes = require("./src/routes/UserRoutes");
app.use(userRoutes);

/* -------------------------- //import state routes ------------------------- */
const stateRoutes = require("./src/routes/StateRoutes");
app.use("/state", stateRoutes);

/* -------------------------- //import city routes -------------------------- */
const cityRoutes = require("./src/routes/CityRoutes");
app.use("/city", cityRoutes);

/* -------------------------- //import area routes -------------------------- */
const areaRoutes = require("./src/routes/AreaRoutes");
app.use("/area", areaRoutes);

/* ------------------------- //import hording routes ------------------------ */
const hordingRoutes = require("./src/routes/HordingRoutes");
app.use("/hording", hordingRoutes);

/* ------------------------- //import booking routes ------------------------ */
const bookingRoutes = require("./src/routes/BookingRoutes");
app.use("/booking", bookingRoutes);

// /* -------------------------- import payment routes ------------------------- */
const paymentRoutes = require("./src/routes/PaymentRoutes");
app.use("/payment", paymentRoutes);

/* ----------------------- import Advertisement routes ---------------------- */
app.use("/ad", require("./src/routes/AdvretisementRoutes"));

mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(() => {
  console.log("database connected....");
});
//Server Creation
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});