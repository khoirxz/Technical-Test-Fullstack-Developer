import express from "express";

import {
  fetchAllData,
  getSigleData,
  createNewData,
  updateData,
  deleteData,
  searchData,
} from "../controllers/CarController.js";

const router = express.Router();

router.get("/api/cars", fetchAllData);
router.get("/api/cars/:id", getSigleData);
router.post("/api/cars", createNewData);
router.patch("/api/cars/:id", updateData);
router.delete("/api/cars/:id", deleteData);
// search by merk
router.post("/api/cars/merk", searchData);

export default router;
