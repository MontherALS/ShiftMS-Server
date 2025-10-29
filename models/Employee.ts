import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface Employee {
  name: string;
  phone: string;
  group?: mongoose.Types.ObjectId;
  admin: mongoose.Types.ObjectId;
}
const employeeSchema = new Schema<Employee>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },

    group: { type: Schema.Types.ObjectId, ref: "Group" },
    admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  },
  { timestamps: true }
);
export default mongoose.model<Employee>("Employee", employeeSchema);
