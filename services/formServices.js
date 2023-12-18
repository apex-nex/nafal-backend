import FormModel from "../models/formModel.js";

const formData = async (name, email, mobile, subject, comments, date) => {
  console.log("currentDate", date)
  const form = new FormModel({ name, email, mobile, subject, comments, date});

  await form.save();
  return "Success"
}

const findFormData = async () => {
  const data = await FormModel.find()
  return data
}

export { formData, findFormData, };