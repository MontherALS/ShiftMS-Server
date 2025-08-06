const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  position: { type: String, required: true },
  admin: { type: Boolean, default: false },
});

module.exports = mongoose.model("Employee", employeeSchema);
