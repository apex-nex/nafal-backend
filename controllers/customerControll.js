import { customersData } from "../services/customerFormServices.js";

const customerForm = async (req, res) => {
  const customerData = req.body;
  const { name, email, mobile, subject, comments } = customerData;
  console.log(customerData);

  await customersData(name, email, mobile, subject, comments);

  res.send("Success!");
};

export { customerForm };
