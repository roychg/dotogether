const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const shortid = require("shortid");
const { DBError } = require("lib/error.handler");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    avatar: { type: String },
    sid: {
      type: String,
      default: () => shortid.generate(),
      unique: true,
      index: true
    }
  },
  { timestamps: true }
);

userSchema.statics.findByEmail = async email => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    return Promise.reject(new DBError(`can't find a user ${error}`));
  }
};

userSchema.statics.createUser = async function(userinfo) {
  try {
    return await new this({ ...userinfo }).save();
  } catch (error) {
    return Promise.reject(new DBError(`can't create a user ${error}`));
  }
};

const User = model("users", userSchema);
module.exports = User;
