import { model, Schema, Types } from 'mongoose'
import { deviceModels, deviceStatus } from '../config/enums.js'

const schema = new Schema(
  {
    idAccount: { type: Types.ObjectId, require: true, ref: 'Account' },
    name: { type: String },
    model: { type: String, enum: deviceModels, required: true },
    firmware: { type: String, required: true },
    nodes: [{ type: String, required: true }],
    status: { type: Number, enum: deviceStatus, default: 0 }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

/* schema.index({ uid: 1, type: -1 }) */

export default model('Device', schema)
