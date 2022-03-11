const asyncHandler = require("express-async-handler");
const GoalsModel = require("../models/goalsModel");

const getGoal = asyncHandler(async (req, res) => {
  const goals = await GoalsModel.find({ user: req.user._id });

  res.status(200).json(goals);
});

const addGoal = asyncHandler(async (req, res) => {
  const goal = await GoalsModel.create({
    text: req.body.text,
    user: req.user._id,
  });

  res.status(200).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
  const goalId = await GoalsModel.findById(req.params.id);

  if (!goalId) {
    throw new Error("Not found goal Id");
  }

  const updatedGoal = await GoalsModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const deleteId = await GoalsModel.findById(req.params.id);

  if (!deleteId) {
    throw new Error("Not Found Goal Id");
  }

  if (!req.user) {
    throw new Error("User Not Found");
  }

  if (deleteId.user.toString() !== req.user.id) {
    throw new Error("User not auth!!");
  }

  await GoalsModel.remove(deleteId);

  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoal, addGoal, updateGoal, deleteGoal };
