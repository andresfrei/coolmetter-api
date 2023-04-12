import { param } from 'express-validator'
import { validateResult } from '../lib/validator.js'

const validateIdLink = [
  param('id').exists().isLength(24),
  (req, res, next) => validateResult(req, res, next)
]

export { validateIdLink }
