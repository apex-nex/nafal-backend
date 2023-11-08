import customersModel from "../src/models/customerModel.js";

const customersData = async (name,email,mobile,subject,comments) => {
  const customer = new customersModel({name:name,email:email,mobile:mobile,subject:subject,comments:comments});

  await customer.save();
  return "Success"

}

export {customersData};