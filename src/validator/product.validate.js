import { check } from 'express-validator'
import { validateResult } from '../lib/validator.js'

export const validateNewProduct = [
  check('shopId').exists().notEmpty(),
  check('code').exists().notEmpty(),
  check('product').exists().notEmpty(),
  check('description').exists().notEmpty(),
  check('options').isObject(),
  check('avatar').isString(),
  check('price').exists().isNumeric(),
  check('active').isBoolean(),
  (req, res, next) => validateResult(req, res, next)
]
