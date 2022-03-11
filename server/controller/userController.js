const asyncHandler = require("express-async-handler");
const UserModel = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.findById(req.user._id);

  if (!users) {
    throw new Error("No user");
  }

  res.status(200).json(users);
});

const loginUser = asyncHandler(async (req, res) => {
  const users = await UserModel.findById(req.user._id);

  if (!users) {
    throw new Error("No user");
  } else {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("add a email or password");
    }

    res.status(200).json({ id: createToken(users.id) });
  }
});

const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.compare(password, salt);

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const newUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    token: createToken(user._id),
  };

  res.status(200).json(newUser);
});

const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  const checkEmail = await UserModel.findOne({ email });
  const checkUser = await UserModel.findById(req.user._id);

  if (checkEmail && checkUser) {
    const userId = await UserModel.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );

    res.status(200).json(userId);
  } else {
    throw new Error("No found email");
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

module.exports = { getUsers, addUser, updateUser, deleteUser, loginUser };
