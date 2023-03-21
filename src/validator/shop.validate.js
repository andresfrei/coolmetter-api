import { check } from 'express-validator'
import { validateResult } from '../lib/validator.js'

const validateNewShop = [
  check('name').exists().notEmpty(),
  check('uid').exists().notEmpty(),
  (req, res, next) => validateResult(req, res, next)
]

export { validateNewShop }
