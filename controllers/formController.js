import { findFormData, formData, deleteForm } from "../services/formServices.js";

const formSubmit = async (req, res) => {
  try {

    const { name, email, mobile, subject, comments } = req.body;
    console.log("formData", req.body);

    const status = await formData(name, email, mobile, subject, comments);

    if (status === "Success") {
      res.status(201).json({ message: "Record Added Successfully!", data: req.body});
    } else {
      res.status(400).json({ error: "Error occur during submitting contact form!" });
    }
  } catch (error) {
    res.status(500).send("Internal server error")
  }
};

const form = async (req, res) => {
  try {

    const formData = await findFormData()

    if (formData.length > 0) {
      res.status(200).json({
        count:formData.length, 
        results: formData,
        next : null,
        previous : null
      })
    } else {
      res.status(400).json({ error: 'Records not found' })
    }
  } catch (error) {
    res.status(500).send("Internal server error")
  }
};

const deleteRecords = async (req, res) => {
  try {
    const { ids } = req.body;

    const status = await deleteForm({ ids});

    if (status === "Success") {
      res.status(200).json({ message: "Records Deleted Successfully!" });
    } else {
      res.status(404).json({ error: "No matching records found for deletion." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export { formSubmit, form, deleteRecords };
