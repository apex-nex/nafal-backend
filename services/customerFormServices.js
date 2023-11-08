import customersModel from "../src/models/customerModel.js";

const customersData = async (name,email,mobile,subject,comments) => {
  const customer = new customersModel({name,email,mobile,subject,comments});

  await customer.save();
  return "Success"

}

export {customersData};