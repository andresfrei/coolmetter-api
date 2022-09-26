import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    accountID: { type: Types.ObjectId },
    name: { type: String },
    uri: { type: String, unique: true },
    address: { type: Object },
    phone: { type: String },
    whatsApp: { type: String },
    avatar: { type: String },
    delivery: { type: Object },
    currency: { type: String },
    payments: { type: Array },
    googleSheetsUrl: { type: String },
    categories: { type: Array },
    products: { type: Array },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Shop", schema);
