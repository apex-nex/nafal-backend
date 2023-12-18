import FormModel from "../models/formModel.js";

const formData = async (name, email, mobile, subject, comments) => {
  const form = new FormModel({ name, email, mobile, subject, comments, date: new Date().toISOString() });
  await form.save();
  return "Success";
};


const findFormData = async (query) => {
  const data = await FormModel.find(query).sort({ _id: -1 });
  return data
}

export { formData, findFormData, };