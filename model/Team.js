const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const shortid = require("shortid");
const { DBError } = require("lib/error.handler");

const teamSchema = new Schema({
  name: {
    type: String,
    required:true,
    maxlength: [10, "Name is too long! > 10"]
  },
  sid: { type: String, default: () => shortid.generate() , unique: true, index: true},
  members: [
    {
      _id: false,
      id: { type: Schema.Types.String, ref: "users", required: true }
    }
  ]
},{ timestamps: true });

teamSchema.statics.createTeam = async function(creator, teamInfo) {
  // console.log(creator, ' amd ', teamInfo)
  // can we do the below job using pre middleware?
  const ti = {
    ...teamInfo,
    members: [{ id: creator }]
  };
  try {
    return await new this({ ...ti }).save();
  } catch (e) {
    return Promise.reject(new DBError(e.errors.name.message));
  }
};

teamSchema.statics.removeTeam = async function(teamId) {
  try {
    return await this.findOneAndRemove({ idShort: teamId });
  } catch (error) {
    return Promise.reject(new DBError(e.errors.name.message));
    // return Promise.reject(new DBError(`can't create a team ${error}`));
  }
};

const Team = model("teams", teamSchema);
module.exports = Team;
