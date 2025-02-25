const roleModel = require("../model/RoleModel");
const getAllRoles = async (req, res) => {
  const roles = await roleModel.find();
  res.json({ message: "role fetched successfully", data: roles });
};
module.exports = { getAllRoles };
