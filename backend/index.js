import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dontenv from "dotenv";

import CarRoute from "./routes/CarRoute.js";

dontenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
  res.end();
});
app.use(CarRoute);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
