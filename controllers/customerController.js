import { customersData } from "../services/customerFormServices.js";

const customerForm = async (req, res) => {
  const { name, email, mobile, subject, comments } = req.body; 
  console.log("customerData", req.body);

  const status = await customersData(name, email, mobile, subject, comments);

  if (status === "Success") {
    res.send("Record Added Successfully!");
  } else {
    res.send("Error occur during post contact form!");
  }
  
};

export { customerForm };
