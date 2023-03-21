import { model, Schema, Types } from 'mongoose'

const schema = new Schema(
  {
    accountId: { type: Types.ObjectId },
    shopId: { type: Types.ObjectId },
    creditId: { type: Types.ObjectId },
    currency: { type: String },
    description: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    length: { type: Number }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('Buy', schema)
