const userModel = require("../model/UserModel");

const addUser = async (req, res) => {
  const addedUser = await userModel.create(req.body);
  res.json({
    message: "New User Has Been Added",
    data: addedUser,
  });
};

const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.json({
    message: "Users Fetched Successfully",
    data: users,
  });
};
const getUserById = async (req, res) => {
  const userById = await userModel.findById(req.params.id);
  res.json({
    Message: "User Found ",
    data: userById,
  });
};
const deleteUserById = async (req, res) => {
  const deleteUser = await userModel.findByIdAndDelete(req.params.id);
  res.json({
    message: "User has been Deleted",
    data: deleteUser,
  });
};
module.exports = { addUser, getUsers, getUserById, deleteUserById };
