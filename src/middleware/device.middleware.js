import Device from '../models/device.model.js'
import msg from '../config/messajesResponses.js'
const { invalidToken } = msg

export async function validateDeviceToken (req, res, next) {
  const { idDevice } = req.headers.token
  const device = await Device.findById(idDevice)
  if (!device) return res.status(invalidToken.status).send(invalidToken.data)
  next()
}
