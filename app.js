const express = require("express");
const mongoose = require("mongoose");
//express object
const app = express();

const roleRoutes = require("./src/routes/RoleRoutes");
app.use(roleRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(() => {
  console.log("database connected....");
});

//Server Creation
const PORT = 3000;
app.listen(PORT, () => {
  console.log("The server has started");
});
