import { matchedData } from 'express-validator'
import { handleHttpError } from '../lib/validator.js'
import { createShopService, findShopByUid, findShopService, findShopsService } from '../services/shop.service.js'

export async function getShop (req, res) {
  try {
    const { shopId } = req.params
    const { accountId } = req.headers.token
    const { detail } = req.query
    const response = await findShopService({ accountId, shopId, detail })
    return res.status(response.status).send(response.data)
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

export async function getShops (req, res) {
  const { token } = req.headers
  const { accountId } = token
  const response = await findShopsService({ accountId })
  return res.status(response.status).send(response.data)
}

export async function createShop (req, res) {
  const body = matchedData(req)
  try {
    const { accountId } = req.headers.token
    body.accountId = accountId
    const response = await createShopService(body)
    return res.status(response.status).send(response.data)
  } catch (e) {
    handleHttpError(res, e)
  }
}

export async function getShopByUid (req, res) {
  try {
    const { uid } = req.params
    const response = await findShopByUid(uid)
    return res.status(response.status).send(response.data)
  } catch (e) {
    handleHttpError(res, e)
  }
}

/* export async function emitMessage (req, res) {
  const { params, body } = req
  const { id } = params
  const socketOnline = getShopOnline(id)
  if (!socketOnline?.socketId) {
    return res.status(404).send('not found')
  }
  io.to(socketOnline.socketId).emit('order', body)
  res.send({ msg: 'ok' })
} */
