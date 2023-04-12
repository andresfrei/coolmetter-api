import { model, Schema } from 'mongoose'

const schema = new Schema(
  {
    url: { type: String, require: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('Link', schema)
