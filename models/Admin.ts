import mongoose from "mongoose";

const Schema = mongoose.Schema;

type AdminType = {
  email: string;
  password: string;
};
const adminSchema = new Schema<AdminType>(
  {
    email: { require: true, type: String, unique: true },
    password: { require: true, type: String },
  },
  { timestamps: true }
);
export default mongoose.model<AdminType>("Admin", adminSchema);
