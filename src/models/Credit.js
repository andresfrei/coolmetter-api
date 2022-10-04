import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    currency: { type: String },
    description: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    length: { type: Number },
    active: { type: Boolean },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Product", schema);
