const { json } = require("express");
const userModel = require("../model/UserModel"); //import userModel
const bcrypt = require("bcrypt"); //import bcrypt
const mailUtil = require("../util/MailUtil");
const jwt = require("jsonwebtoken");
const secret = "eAdvertisement";

/* --------------------------------- Signup --------------------------------- */
const signUp = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    req.body.password = hashedPassword;
    const addedUser = await userModel.create(req.body);
    await mailUtil.sendMail(
      addedUser.email,
      "Welcome To eAdvertisement",
      "Again Welcome To eAdvertisement By Mihir "
    );
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

/* ---------------------------------- Login --------------------------------- */
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

/* --------------------------------- AddUser -------------------------------- */
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

/* --------------------------------- GetUser -------------------------------- */
const getUsers = async (req, res) => {
  const users = await userModel
    .find()
    .populate({ path: "roleId", select: "name -_id" });
  res.json({
    message: "Users Fetched Successfully",
    data: users,
  });
};

/* ------------------------------- GetUserById ------------------------------ */
const getUserById = async (req, res) => {
  const userById = await userModel.findById(req.params.id);
  res.json({
    Message: "User Found ",
    data: userById,
  });
};

/* ----------------------------- DeleteUserById ----------------------------- */
const deleteUserById = async (req, res) => {
  const deleteUser = await userModel.findByIdAndDelete(req.params.id);
  res.json({
    message: "User has been Deleted",
    data: deleteUser,
  });
};

/* ----------------------------- ForgotPassword ----------------------------- */
const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const foundUser = await userModel.findOne({ email: email });
  if (foundUser) {
    const token = await jwt.sign(foundUser.toObject(), secret);
    // console.log(token);
    const url = `http://localhost:5173/resetPassword/${token}`;
    const mailContent = `<html> <a href="${url}">Reset Password</a><html>`;
    await mailUtil.sendMail(foundUser.email, "Reset Password", mailContent);
    res.status(200).json({ Success: true, message: "E-mail Send to the user" });
  } else {
    res.json({ Success: false, message: "User Not Found. Register First..." });
  }
};

/* ------------------------------ ResetPassword ----------------------------- */
const resetPassword = async (req, res) => {
  try {
    const token = req.body.token;
    const newPassword = req.body.newPassword;

    // Check if token and newPassword are provided
    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ error: "Token and new password are required" });
    }

    // Verify the token to get user details
    const userFromToken = jwt.verify(token, secret);

    // Generate salt and hash the new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    // Update the user's password in the database
    const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id, {
      password: hashedPassword,
    });

    // If no user is found, handle the error
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Password Updated Successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  login,
  signUp,
  addUser,
  getUsers,
  getUserById,
  resetPassword,
  deleteUserById,
  forgotPassword,
};
