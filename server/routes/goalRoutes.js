const express = require("express");
const router = express.Router();
const {
  getGoal,
  addGoal,
  updateGoal,
  deleteGoal,
} = require("../controller/goalController");
const { authHandler } = require("../middleware/authHandler");

router.route("/").get(authHandler, getGoal).post(authHandler, addGoal);
router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
