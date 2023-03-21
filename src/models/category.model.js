import { model, Schema, Types } from 'mongoose'

const schema = new Schema(
  {
    shopId: { type: Types.ObjectId, require: true },
    name: { type: String, require: true },
    head: { type: Boolean, default: true },
    avatar: { type: String },
    active: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('Category', schema)
