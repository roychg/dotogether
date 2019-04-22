const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const shortid = require("shortid");
const { DBError } = require("lib/error.handler");
const Double = require('@mongoosejs/double')

const taskSchema = new Schema({
  title: { type:String, required:true },
  duedate:{type: String, default: null},
  desc:{type:String },
  pos: {type: Double },
  isArchived: { type: Boolean, default: false },
  sid: { type: String, default: () => shortid.generate() , unique: true, index: true},
  lid: { type: Schema.Types.String, ref:'lists', required: true },
  bid: { type: Schema.Types.String, ref:'boards', required: true },
}, { timestamps: true});

taskSchema.statics.createTask = async function(taskinfo) {
  // console.log("Task Info Schema ", taskinfo);
  try {
    return await new this({ ...taskinfo }).save();
  } catch (error) {
    return Promise.reject(new DBError(`can't create a task ${error}`));
  }
};

const Task = model("tasks", taskSchema);
module.exports = Task;
