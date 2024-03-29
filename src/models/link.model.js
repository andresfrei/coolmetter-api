import { model, Schema } from 'mongoose'

const schema = new Schema(
  {
    payload: { type: Object, require: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('Link', schema)
