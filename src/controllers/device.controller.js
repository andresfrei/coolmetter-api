import { handleHttpError } from '../lib/validator.js'
import { findNodesFromDevice } from '../services/node.service.js'

export async function getNodesFromDevice (req, res) {
  try {
    const { idDevice } = req.headers.token
    const response = await findNodesFromDevice(idDevice)
    res.status(response.status).send(response.data)
  } catch (e) {
    handleHttpError(res, e)
  }
}
