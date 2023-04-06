import { model, Schema, Types } from 'mongoose'

const schema = new Schema(
  {
    idAccount: { type: Types.ObjectId, require: true, ref: 'Account' },
    hash: { type: String, require: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('Sync', schema)
