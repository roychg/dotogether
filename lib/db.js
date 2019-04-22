const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI;

const connect = async () => {
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  await mongoose.connect(mongoUri, { useNewUrlParser: true });
};

exports.connect = connect;
