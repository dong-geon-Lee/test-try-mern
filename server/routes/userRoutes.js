const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  deleteUser,
  loginUser,
  getAllUsers,
} = require("../controller/userController");
const { authHandler } = require("../middleware/authHandler");

router.route("/").get(authHandler, getUsers).post(addUser);
router.get("/all", getAllUsers);
router.post("/login", loginUser);
router.delete("/:id", authHandler, deleteUser);

module.exports = router;
