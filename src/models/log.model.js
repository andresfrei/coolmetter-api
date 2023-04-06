import { model, Schema, Types } from 'mongoose'

const schema = new Schema(
  {
    idDevice: { type: Types.ObjectId, require: true, ref: 'Device' },
    uid: { type: String, require: true },
    value: { type: Number, require: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('Log', schema)
