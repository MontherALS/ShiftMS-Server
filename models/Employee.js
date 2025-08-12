const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  group: { type: Schema.Types.ObjectId, ref: "Group" },
});

module.exports = mongoose.model("Employee", employeeSchema);
