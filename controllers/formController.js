import FormModel from "../models/formModel.js";
import { findFormData, formData } from "../services/formServices.js";

const formSubmit = async (req, res, next) => {
  try {
    const { name, email, mobile, subject, comments } = req.body;

    const status = await formData(name, email, mobile, subject, comments);

    if (status === "Success") {
      res.status(201).json({ 
        message: "message send Successfully!",
        ok: true,
        status: 201,
        statusText: "Created", 
      });
    } else {
      const error = { status: 400, message: "message not delivered!" }
      next(error)
    }
  } catch (err) {
    const error = { response: "Internal server error" }
    next(error)
  }
};

const form = async (req, res, next) => {
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
      const error = { status: 400, message: "Records not found" }
      next(error)
    }
  } catch (err) {
    const error = { message: "Internal server error" }
    next(error)
  }
};

const deleteFormItem = async (req, res, next) => {
  try {
    const itemIds = req.body;
    if (!Array.isArray(itemIds) || itemIds.length === 0) {
      return res.status(400).json({
        error: "Invalid or missing IDs. Please provide an array of IDs in the request body.",
      });
    } else {
      if (itemIds.length === 1) {
        const result = await FormModel.findByIdAndRemove(itemIds[0]);
        if (result) {
          res.status(200).json({ massage: "Item deleted successfully" });
        } else {
          const error = { status: 400, message: "Item not found" }
          next(error)
        }
      } else {
        const results = await FormModel.deleteMany({ _id: itemIds });
        if (results.deletedCount > 0) {
          res.status(200).json({ massage: "Items deleted successfully" });
        } else {
          const error = { status: 400, message: "Item not found" }
          next(error)
        }
      }
    }
  } catch (err) {
    const error = { message: "Internal server error" }
    next(error)
  }
};

export { formSubmit, form, deleteFormItem };
