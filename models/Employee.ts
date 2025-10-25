import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface Employee {
  name: string;
  phone: string;
  email: string;
  group: mongoose.Types.ObjectId;
}
const employeeSchema = new Schema<Employee>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  group: { type: Schema.Types.ObjectId, ref: "Group" },
});
export default mongoose.model<Employee>("Employee", employeeSchema);
