import { model, Schema } from 'mongoose'

const schema = new Schema(
  {
    uid: { type: String, require: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('Key', schema)
