import mongoose, { Schema } from "mongoose";

const carSchema = Schema({
  title: Schema.Types.String,
  description: Schema.Types.String,
  price: Schema.Types.Number,
  merk: Schema.Types.String,
  type: Schema.Types.String,
  stock: Schema.Types.Number,
  createdAt: { type: Date },
  modifiedAt: { type: Date },
});

const CarModel = mongoose.model("car", carSchema);

export default CarModel;
