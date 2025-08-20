import mongoose from "mongoose";
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: { type: String, required: true },
  workingDays: { type: [String], required: true },
  shiftStart: { type: String, required: true },
  shiftEnd: { type: String, required: true },
  supervisor: { type: Schema.Types.ObjectId, ref: "Employee", required: false },
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
});

export default mongoose.model("Group", groupSchema);
