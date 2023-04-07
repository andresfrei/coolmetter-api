import { check, param } from 'express-validator'
import { validateResult } from '../lib/validator.js'

const validateNewSync = [
  check('hash').exists().isLength(7),
  (req, res, next) => validateResult(req, res, next)
]

const validateHashSync = [
  param('hash').exists().isLength(7),
  check('name').isString(),
  check('nodes').isArray().exists(),
  (req, res, next) => validateResult(req, res, next)
]

const validateReSync = [
  check('idAccount').isString().exists().isLength(24),
  check('idDevice').isString().exists().isLength(24),
  (req, res, next) => validateResult(req, res, next)
]

export { validateNewSync, validateHashSync, validateReSync }
