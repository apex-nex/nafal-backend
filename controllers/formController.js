import { Types } from 'mongoose';
import FormModel from "../models/formModel.js";
import { findFormData, formData } from "../services/formServices.js";

const postForm = async (req, res, next) => {
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

const getFormData = async (req, res, next) => {
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


const deleteFormItems = async (req, res, next) => {
  console.log('first', req.body);

  try {
    const itemIds = req.body;

    if (!Array.isArray(itemIds) || itemIds.length === 0) {
      return res.status(400).json({
        error: "Invalid payload or missing IDs. Please provide an array of IDs in the request body.",
      });
    }

    // Check if all itemIds are valid ObjectId
    if (itemIds.some(id => !Types.ObjectId.isValid(id))) {
      return res.status(400).json({
        error: "One or more provided IDs are invalid.",
      });
    }

    if (itemIds.length === 1) {
      const result = await FormModel.findByIdAndRemove(itemIds[0]);

      if (result) {
        return res.status(200).json({ message: "Item deleted successfully" });
      } else {
        return next({ status: 400, message: "Item not found" });
      }
    }

    const results = await FormModel.deleteMany({ _id: itemIds });

    if (results.deletedCount > 0) {
      return res.status(200).json({ message: "Items deleted successfully" });
    } else {
      return next({ status: 400, message: "Items not found" });
    }

  } catch (err) {
    return next({ status: 500, message: "Internal server error" });
  }
};


export { postForm, getFormData, deleteFormItems };
