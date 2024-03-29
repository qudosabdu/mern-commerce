const MONGO_URI = process.env.MONGO_URI;
const mongoose = require("mongoose");

const conectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = conectDB;
