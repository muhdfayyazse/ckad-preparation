const mongoose = require("mongoose");

const User = require("./User.model");

const connection = "mongodb://" + process.env.MONGODB_SERVICE + "/" + process.env.MONGODB_SCHEMA;

const connectDb = () => {
  console.log(connection);
  return mongoose.connect(connection);
};

module.exports = connectDb;
