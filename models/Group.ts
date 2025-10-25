import mongoose from "mongoose";
const Schema = mongoose.Schema;

type Group = {
  name: string;
  workingDays: string[];
  shiftStart: string;
  shiftEnd: string;
  supervisor: mongoose.Types.ObjectId;
  employees: mongoose.Types.ObjectId[];
  admin: mongoose.Types.ObjectId;
};
const groupSchema = new Schema<Group>(
  {
    name: { type: String, required: true },
    workingDays: { type: [String], required: true },
    shiftStart: { type: String, required: true },
    shiftEnd: { type: String, required: true },

    supervisor: { type: Schema.Types.ObjectId, ref: "Employee", required: false },
    employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
    admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<Group>("Group", groupSchema);
