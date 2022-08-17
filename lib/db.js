const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI;

const connect = async () => {
  
  await mongoose.connect(mongoUri, { useNewUrlParser: true });
};

exports.connect = connect;
