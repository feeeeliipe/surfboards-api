import { Schema, model } from "mongoose";

const SurfboardSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    length: {
      type: String,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Surfboard", SurfboardSchema);
