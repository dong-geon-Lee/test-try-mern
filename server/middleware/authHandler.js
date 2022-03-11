const jwt = require("jsonwebtoken");
const UserModel = require("../models/usersModel");
const asyncHandler = require("express-async-handler");

const authHandler = asyncHandler(async (req, res, next) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const verifyJwt = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserModel.findById(verifyJwt.id).select("-password");

      next();
    } catch (error) {
      console.log(error.message);
      throw new Error("Not authorized");
    }
  }

  if (!token || null) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { authHandler };
