import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  companyName: { require: true, type: String },

  email: { require: true, type: String, unique: true },

  password: { require: true, type: String },
});
export default mongoose.model("Users", usersSchema);
