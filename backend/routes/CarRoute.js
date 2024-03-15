import express from "express";

import {
  fetchAllData,
  getSigleData,
  createNewData,
  updateData,
  deleteData,
} from "../controllers/CarController.js";

const router = express.Router();

router.get("/api/cars", fetchAllData);
router.get("/api/cars/:id", getSigleData);
router.post("/api/cars", createNewData);
router.patch("/api/cars/:id", updateData);
router.delete("/api/cars/:id", deleteData);

export default router;
