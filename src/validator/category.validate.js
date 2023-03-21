import { check } from 'express-validator'
import { validateResult } from '../lib/validator.js'

export const validateNewCategoy = [
  check('name').exists().notEmpty(),
  (req, res, next) => validateResult(req, res, next)
]
