import CarModel from "../models/CarsModel.js";
import mongoose from "mongoose";

// fetch all
export const fetchAllData = async (req, res) => {
  try {
    const response = await CarModel.find().sort({ createdAt: -1 });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// fetch one
export const getSigleData = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "not found" });

  try {
    const response = await CarModel.findOne({
      _id: _id,
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// create
export const createNewData = async (req, res) => {
  const data = req.body;

  const newData = new CarModel({
    ...data,
    createdAt: new Date().toDateString(),
  });

  try {
    await newData.save();

    res.status(201).json(newData);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

// update
export const updateData = async (req, res) => {
  const { id: _id } = req.params;
  const data = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "not found" });

  try {
    const updateData = await CarModel.findByIdAndUpdate(_id, data, {
      new: true,
    });

    res.status(201).json(updateData);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// delete
export const deleteData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "not found" });

  try {
    await CarModel.findByIdAndDelete(id);

    res.status(201).json({ status: "deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
