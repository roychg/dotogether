const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI || "mongodb://dongs11:00000000@127.0.0.1:27017/todogether";

const connect = async () => {
  
  await mongoose.connect(mongoUri, { useNewUrlParser: true });
};

exports.connect = connect;
