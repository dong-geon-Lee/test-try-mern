const mongoose = require("mongoose");

const connectedDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connectd...`.underline.yellow);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectedDB;
