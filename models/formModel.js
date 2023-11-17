import mongoose from "mongoose";

const formSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  mobile: { type: Number, required: true },
  subject: { type: String, required: false },
  comments: { type: String, required: true },
});

const FormModel = new mongoose.model("form", formSchema);

export default FormModel;
