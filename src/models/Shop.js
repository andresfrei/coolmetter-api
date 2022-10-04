import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    accountID: { type: Types.ObjectId },
    name: { type: String },
    uid: { type: String, unique: true },
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
    credits: {
      count: { type: Number, default: 0, expiration: { type: Date } },
    },
    status: { type: Number, enum: [0, 1, 2, 3], default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Shop", schema);
