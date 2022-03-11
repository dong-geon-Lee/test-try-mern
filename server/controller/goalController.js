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

  const updatedGoal = await GoalsModel.findByIdAndUpdate(goalId, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const deleteId = await GoalsModel.findById(req.params.id);

  if (!deleteId) {
    throw new Error("Not Found Id");
  }

  await GoalsModel.remove(deleteId);

  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoal, addGoal, updateGoal, deleteGoal };
