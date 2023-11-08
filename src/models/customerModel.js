import mongoose from "mongoose";

const customersSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  subject: { type: String },
  comments: { type: String, required: true },
});

const customersModel = new mongoose.model("customer", customersSchema);

export default customersModel;
