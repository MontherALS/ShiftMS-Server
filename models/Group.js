const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: { type: String, required: true },
  workingDays: { type: [String], required: true },
  shiftStart: { type: String, required: true },
  shiftEnd: { type: String, required: true },
  supervisor: { type: String, require: false },

  //ref to Employee model (NOTE: refresh about populating references in Mongoose)
  // employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
});

module.exports = mongoose.model("Group", groupSchema);
