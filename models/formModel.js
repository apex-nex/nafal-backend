import { Schema, model } from "mongoose";

const formSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  mobile: { type: Number, required: true },
  subject: { type: String, required: false },
  status: { type: String, default: "pending" },
  comments: { type: String, required: true },
  date: { type: String, required: false},
});

const FormModel = new model("Form", formSchema);

export default FormModel;
