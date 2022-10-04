import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    accountID: { type: Types.ObjectId },
    shopID: { type: Types.ObjectId },
    creditID: { type: Types.ObjectId },
    currency: { type: String },
    description: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    length: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Order", schema);
