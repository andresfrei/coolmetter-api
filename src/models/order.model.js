import { model, Schema, Types } from 'mongoose'

const schema = new Schema(
  {
    accountID: { type: Types.ObjectId },
    shopID: { type: Types.ObjectId },
    header: {},
    body: {},
    footer: {},
    status: { type: Number, enum: [0, 1, 2, 3], default: 0 }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('Order', schema)
