import { handleHttpError } from '../lib/validator.js'
import { createLogService } from '../services/log.service.js'

export async function createLogController (req, res) {
  try {
    const { token } = req.headers
    const { values } = req.body
    const response = await createLogService(token, values)
    res.status(response.status).send(response.data)
  } catch (e) {
    handleHttpError(res, e)
  }
}
