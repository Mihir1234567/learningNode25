const { json } = require("express");
const userModel = require("../model/UserModel"); //import userModel
const bcrypt = require("bcrypt"); //import bcrypt

const signUp = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    const addedUser = await userModel.create(req.body);
    res.status(201).json({
      message: "New User Has Been Added",
      data: addedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      data: error,
    });
  }
};

const login = async (req, res) => {
  const hashedPassword = req.body.password;
  const email = req.body.email;

  const foundUserFromEmil = await userModel
    .findOne({ email: email })
    .populate("roleId");

  if (foundUserFromEmil != null) {
    const isMatch = bcrypt.compareSync(
      hashedPassword,
      foundUserFromEmil.password
    );
    if (isMatch === true) {
      res.status(200).json({
        message: "Login Successfully",
        data: foundUserFromEmil,
      });
    } else {
      res.status(404).json({
        message: "Invalid Password",
      });
    }
  } else {
    res.status(404).json({
      message: "Invalid Email",
    });
  }
};

const addUser = async (req, res) => {
  try {
    const addedUser = await userModel.create(req.body);
    res.status(201).json({
      message: "New User Has Been Added",
      data: addedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      data: err,
    });
  }
};

const getUsers = async (req, res) => {
  const users = await userModel
    .find()
    .populate({ path: "roleId", select: "name -_id" });
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
module.exports = {
  login,
  signUp,
  addUser,
  getUsers,
  getUserById,
  deleteUserById,
};
