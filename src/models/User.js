import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const AccountSchema = new Schema(
  {
    whatsapp: String,
    userName: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    address: [],
    status: { type: Number, enum: [0, 1, 2, 3], default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

AccountSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

AccountSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default model("User", AccountSchema);
