const roleModel = require("../model/RoleModel");
const getAllRoles = async (req, res) => {
  const roles = await roleModel.find();
  res.json({ message: "role fetched successfully", data: roles });
};
const addRole = async (req, res) => {
  const savedRole = await roleModel.create(req.body);
  res.json({
    message: "Data Saved Successfully",
    data: savedRole,
  });
};
const deleteRole = async (req, res) => {
  const deletedRole = await roleModel.findByIdAndDelete(req.params.id);
  res.json({
    message: "The role has been deleted",
    data: deletedRole,
  });
};
const getRoleById = async (req, res) => {
  const foundRole = await roleModel.findById(req.params.id);
  res.json({
    message: "Found The Role",
    data:foundRole
  })
};
module.exports = { getAllRoles, addRole, deleteRole, getRoleById };
