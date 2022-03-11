const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  loginUser,
} = require("../controller/userController");
const { authHandler } = require("../middleware/authHandler");

router.route("/").get(authHandler, getUsers).post(addUser);
router
  .route("/:id")
  .put(authHandler, updateUser)
  .delete(authHandler, deleteUser);
router.post("/login", authHandler, loginUser);

module.exports = router;
