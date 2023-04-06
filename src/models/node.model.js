import { model, Schema, Types } from 'mongoose'
import { nodeTypes, nodeStatus } from '../config/enums.js'

const schema = new Schema(
  {
    idAccount: { type: Types.ObjectId, require: true, ref: 'Account' },
    idDevice: { type: Types.ObjectId, require: true, ref: 'Device' },
    uid: { type: String, require: true },
    name: { type: String },
    type: { type: String, enum: nodeTypes },
    value: { type: Number, default: 0 },
    status: { type: Number, enum: nodeStatus, default: 1 }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

/* schema.index({ uid: 1, type: -1 }) */

export default model('Node', schema)
