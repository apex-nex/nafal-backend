import formModel from "../models/formModel.js";

const formData = async (name, email, mobile, subject, comments) => {
  const form = new formModel({ name, email, mobile, subject, comments });

  await form.save();
  return "Success"
}

const findFormData = async () => {
  const data = await formModel.find()
  return data
}

const deleteForm = async (id) => {
  const dlt = await formModel.deleteOne(id)
  return "Success"
} 

export { formData, findFormData, deleteForm };