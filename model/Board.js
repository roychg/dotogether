const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const shortid = require("shortid");
const { DBError } = require("lib/error.handler");

const boardSchema = new Schema(
  {
    title: { type: String, required: true },
    sid: { type: String, default: () => shortid.generate() , unique: true, index: true},
    owner: { type: Schema.Types.String, ref: "users", required: true },
    color: { type: String, default: "#229954" },
    type: { type: String, enum: ["personal", "team"], default: "personal" },
    teamId: { type: Schema.Types.String, ref: "teams" },
    isArchived: { type: Boolean, default: false }
  },
  { timestamps: true }
);

boardSchema.statics.createBoard = async function(boardinfo) {
  try {
    return await new this({ ...boardinfo }).save();
  } catch (error) {
    return Promise.reject(new DBError(`can't create a Board ${error}`));
  }
};

const Board = model("boards", boardSchema);
module.exports = Board;
