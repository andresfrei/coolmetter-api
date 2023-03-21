import { model, Schema, Types } from 'mongoose'

const schema = new Schema(
  {
    accountId: { type: Types.ObjectId },
    shopId: { type: Types.ObjectId },
    description: { type: String },
    currency: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    length: { type: Number },
    active: { type: Boolean }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('Credit', schema)
