import { Types } from 'mongoose';
import FormModel from "../models/formModel.js";
import { findFormData, formData } from "../services/formServices.js";

const postForm = async (req, res, next) => {
  try {
    const { name, email, mobile, subject, comments } = req.body;
    const status = await formData(name, email, mobile, subject, comments);

    if (status === "Success") {
      res.status(201).json({
        message: "Form recorded successfully!!",
        ok: true,
        status: 201,
        statusText: "Created",
      });
    } else {
      const error = { status: 400, error: "Oops! Something went wrong. Please try again." };
      next(error);
    }
  } catch (err) {
    console.error(err)
    const error = { status: 500, error: "Internal server error." };
    next(error);
  }
};

const getAllFormData = async (req, res, next) => {
  const { search, date, date_end } = req.query;
  const queryObject = {};

  if (search) {
    queryObject.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { mobile: { $regex: search } },
      { status: { $regex: search, $options: 'i' } },
    ];
  }

  // if (date && date_end) {
  //   queryObject.createdAt = {
  //     $gte: new Date(date),
  //     $lte: new Date(date_end),
  //   };
  // }

  // console.log("queryObject", queryObject)

  try {
    const formData = await findFormData(queryObject);


    // const dateStart = new Date(date); // Specify your start date
    // const dateEnd = new Date(date_end); // Specify your end date
    // // console.log("formData", formData)

    // const filteredData = formData.filter(item => {
    //   const itemDate = new Date(item.date);
    //   return itemDate >= dateStart && itemDate <= dateEnd;
    // });
    // console.log("filteredData", filteredData)


    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedFormData = formData.slice(startIndex, endIndex);

    // Determine if there are more results
    const hasMoreResults = endIndex < formData.length;

    // Build next and previous links
    let nextLink = null;
    let previousLink = null;

    if (hasMoreResults) {
      nextLink = `/form?page=${page + 1}&limit=${limit}`;
    }

    if (page > 1) {
      previousLink = `/form?page=${page - 1}&limit=${limit}`;
    }

    res.status(200).json({
      count: formData.length,
      results: paginatedFormData,
      next: nextLink,
      previous: previousLink,
    });

  } catch (err) {
    const error = { error: "Internal server error" };
    console.error(err)
    next(error);
  }
};

const deleteFormItems = async (req, res, next) => {

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
        return res.status(201).json({
          message: "Record deleted successfully!!",
          ok: true,
          status: 200,
          statusText: "Deleted",
          result: itemIds,
        });
      } else {
        return next({ status: 404, error: "Item not found" });
      }
    }

    const results = await FormModel.deleteMany({ _id: itemIds });

    if (results.deletedCount > 0) {
      return res.status(200).json({ message: "Items deleted successfully" });
    } else {
      return next({ status: 404, error: "Items not found" });
    }

  } catch (err) {
    return next({ status: 500, error: "Internal server error" });
  }
};

const updateFormStatusById = async (req, res, next) => {
  const { id, status } = req.body;

  // Check if the payload is empty
  if (!id || !status) {
    return next({ status: 404, error: 'Invalid payload. Both id and status are required.' });
  }

  // Define the allowed status values
  const allowedStatusValues = ['pending', 'contacted', 'resolved'];

  // Validate if the provided status is valid
  if (!allowedStatusValues.includes(status)) {
    return next({ status: 400, error: 'Invalid status value' });
  }

  try {
    // Find and update the record by ID
    const updatedForm = await FormModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedForm) {
      return next({ status: 404, error: 'Form not found' });
    }

    res.status(200).json({
      message: "Status updated successfully!!",
      ok: true,
      status: 200,
      statusText: "Updated",
      result: updatedForm,
    });
  } catch (error) {
    return next({ status: 500, error: 'Internal Server Error' });
  }
};


export { postForm, getAllFormData, deleteFormItems, updateFormStatusById };
