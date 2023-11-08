import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  mobile: { type: Number, required: true },
  subject: { type: String, required: false },
  comments: { type: String, required: true },
});

const customerModel = new mongoose.model("customer", customerSchema, "customer");

export default customerModel;
