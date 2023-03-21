import { matchedData } from 'express-validator'
import { handleHttpError } from '../lib/validator.js'
import { createCategoryService, findCategoriesService } from '../services/category.service.js'

export async function getCategories (req, res) {
  const { shopId } = req.headers.token
  const { query } = req
  try {
    const response = await findCategoriesService({ ...query, shopId })
    res.status(response.status).send(response.data)
  } catch (e) {
    handleHttpError(res, e)
  }
}

export async function createCategory (req, res) {
  try {
    const body = matchedData(req)
    const { shopId } = req.headers.token
    body.shopId = shopId
    const response = await createCategoryService(body)
    res.status(response.status).send(response.data)
  } catch (e) {
    handleHttpError(res, e)
  }
}
