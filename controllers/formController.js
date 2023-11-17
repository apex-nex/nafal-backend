import FormModel from "../models/formModel.js";
import { findFormData, formData } from "../services/formServices.js";

const formSubmit = async (req, res) => {
  console.log("formData", req.body);
  try {
    const { name, email, mobile, subject, comments } = req.body?.values;

    const status = await formData(name, email, mobile, subject, comments);

    if (status === "Success") {
      res
        .status(201)
        .json({ message: "Record Added Successfully!", data: req.body });
    } else {
      res
        .status(400)
        .json({ error: "Error occur during submitting contact form!" });
    }
  } catch (error) {
    res.status(500).send("Internal server error");
    console.log(error);
  }
};

const form = async (req, res) => {
  try {
    const formData = await findFormData();

    if (formData.length > 0) {
      res.status(200).json({
        count: formData.length,
        results: formData,
        next: null,
        previous: null,
      });
    } else {
      res.status(400).json({ error: "Records not found" });
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const deleteFormItem = async (req, res) => {
  try {
    const itemIds = req.body;
    if (!Array.isArray(itemIds) || itemIds.length === 0) {
      return res
        .status(400)
        .json({
          error:
            "Invalid or missing IDs. Please provide an array of IDs in the request body.",
        });
    } else {
      if (itemIds.length === 1) {
        const result = await FormModel.findByIdAndRemove(itemIds[0]);
        if (result) {
          res.status(200).json({ massage: "Item deleted successfully" });
        } else {
          res.status(400).json({ error: "Item not found" });
        }
      } else {
        const results = await FormModel.deleteMany({ _id: itemIds });
        if (results.deletedCount > 0) {
          res.status(200).json({ massage: "Items deleted successfully" });
        } else {
          res.status(400).json({ error: "Items not found" });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ error: "Error Occured!" });
  }
};

export { formSubmit, form, deleteFormItem };
