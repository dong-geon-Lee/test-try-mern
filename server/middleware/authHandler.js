const jwt = require("jsonwebtoken");
const UserModel = require("../models/usersModel");

const authHandler = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];

      const verifyJwt = jwt.verify(token, process.env.JWT_SECRET);

      console.log(verifyJwt);

      req.user = await UserModel.findById(verifyJwt.id).select("-password");

      console.log(req.user);

      next();
    } catch (error) {
      console.log(error.message);
    }
  } 
};

module.exports = { authHandler };
