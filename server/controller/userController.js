const asyncHandler = require("express-async-handler");
const UserModel = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = asyncHandler(async (req, res) => {
  const user = await UserModel.find();

  res.status(200).json(user);
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.findById(req.user._id);

  res.status(200).json(users);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  const comparedPwd = await bcrypt.compare(password, user.password);

  if (user || comparedPwd) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: createToken(user._id),
    });
  } else {
    throw new Error("error");
  }
});

const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    throw new Error("user already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: createToken(user._id),
    });
  } else {
    throw new Error("Invalid user data");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = await UserModel.findById(req.user._id);

  if (!userId) {
    res.json({ message: "Not user" });
  } else {
    await userId.delete();
    res.status(200).json({ id: userId });
  }
});

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { getAllUsers, getUsers, addUser, deleteUser, loginUser };

// const updateUser = asyncHandler(async (req, res) => {
//   const id = req.params.id;
//   const { name, email, password } = req.body;

//   const checkEmail = await UserModel.findOne({ email });
//   const checkUser = await UserModel.findById(req.user._id);

//   if (checkEmail && checkUser) {
//     const userId = await UserModel.findByIdAndUpdate(
//       req.user._id,
//       { name, email, password },
//       { new: true }
//     );

//     res.status(200).json(userId);
//   } else {
//     throw new Error("No found email");
//   }
// });
