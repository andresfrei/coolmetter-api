import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const schema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    shops: [],
    status: { type: Number, enum: [0, 1, 2, 3], default: 0 }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

schema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

schema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export default model('Account', schema)
