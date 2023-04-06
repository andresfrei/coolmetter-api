import { matchedData } from 'express-validator'
import { handleHttpError } from '../lib/validator.js'
import { createSyncService, syncHashService } from '../services/sync.service.js'

export async function syncDeviceController (req, res) {
  try {
    const { hash } = req.params
    const { name, nodes } = req.body
    const response = await syncHashService(hash, { name, nodes })
    res.status(response.status).send(response.data)
  } catch (e) {
    handleHttpError(res, e)
  }
}

export async function createSyncController (req, res) {
  try {
    const body = matchedData(req)
    const { idAccount } = req.headers.token
    const { hash } = body
    const response = await createSyncService({ idAccount, hash })
    res.status(response.status).send(response.data)
  } catch (e) {
    handleHttpError(res, e)
  }
}
