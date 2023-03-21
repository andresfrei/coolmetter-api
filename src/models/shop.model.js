import { model, Schema, Types } from 'mongoose'

const schema = new Schema(
  {
    accountId: { type: Types.ObjectId, require: true },
    name: { type: String },
    uid: { type: String, unique: true, require: true },
    address: { type: Object },
    phone: { type: String },
    whatsApp: { type: String },
    avatar: { type: String },
    delivery: { type: Object },
    currency: { type: String },
    payments: { type: Array },
    googleSheetsUrl: { type: String },
    credits: { type: Number, default: 0 },
    status: { type: Number, enum: [0, 1, 2, 3], default: 0 }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

schema.index({ uid: 1, type: -1 })

export default model('Shop', schema)
