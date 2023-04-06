import { check } from 'express-validator'
import { validateResult } from '../lib/validator.js'

const validateNewLog = [
  check('values').exists().isObject(),
  (req, res, next) => validateResult(req, res, next)
]

export { validateNewLog }
