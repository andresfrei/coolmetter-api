import { matchedData } from 'express-validator'
import { handleHttpError } from '../lib/validator.js'
import { createProductService, findProductsService } from '../services/product.service.js'

export async function getProducts (req, res) {
  const { shopId } = req.headers.token
  const { query } = req
  try {
    const response = await findProductsService({ ...query, shopId })
    res.status(response.status).send(response.data)
  } catch (e) {
    handleHttpError(res, e)
  }
}

export async function createProduct (req, res) {
  try {
    const body = matchedData(req)
    const { shopId } = req.headers.token
    body.shopId = shopId
    const response = await createProductService(body)
    res.status(response.status).send(response.data)
  } catch (e) {
    handleHttpError(res, e)
  }
}
