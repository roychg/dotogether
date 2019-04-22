const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const shortid = require("shortid");
const { DBError } = require("lib/error.handler");
const Double = require("@mongoosejs/double");

const listSchema = new Schema({
  title: { type: String, required: true },
  pos: { type: Double },
  sid: { type: String, default: () => shortid.generate() , unique: true, index: true},
  bid: { type: Schema.Types.String, ref: "boards", required: true },
  isArchived: { type: Boolean, default: false }
}, {timestamps: true});

listSchema.statics.createList = async function(listinfo) {
  try {
    return await new this({ ...listinfo }).save();
  } catch (error) {
    return Promise.reject(new DBError(`can't create a list ${error}`));
  }
};

const List = model("lists", listSchema);
module.exports = List;
