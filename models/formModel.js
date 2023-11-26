import { Schema, model } from "mongoose";

const formSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  mobile: { type: Number, required: true },
  subject: { type: String, required: false },
  comments: { type: String, required: true },
});

const FormModel = new model("Form", formSchema);

export default FormModel;
