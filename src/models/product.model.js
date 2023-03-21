import { model, Schema, Types } from 'mongoose'

const schema = new Schema(
  {
    shopId: { type: Types.ObjectId, require: true },
    categoryId: { type: Types.ObjectId, require: true },
    code: { type: String, require: true },
    product: { type: String },
    description: { type: String, require: true },
    options: {},
    avatar: { type: String },
    price: { type: Number },
    active: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('Product', schema)
