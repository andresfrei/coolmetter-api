import { handleHttpError } from '../lib/validator.js'
import { findLinkService } from '../services/link.service.js'

export async function getLinkController (req, res) {
  try {
    const { id } = req.params
    const response = await findLinkService(id)
    const { status, data } = response
    return res.status(status).send(data)
  } catch (e) {
    handleHttpError(res, e)
  }
}
