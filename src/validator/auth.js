import { check } from 'express-validator'
import { validateResult } from '../lib/validator.js'

const validateLogin = [
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty().isLength({ min: 6, max: 15 }),
  (req, res, next) => validateResult(req, res, next)
]

const validateRegister = [
  check('email').exists().notEmpty(),
  check('name').exists().notEmpty(),
  check('phone').exists().notEmpty().isLength(14),
  check('password').exists().notEmpty().isLength({ min: 6, max: 15 }),
  (req, res, next) => validateResult(req, res, next)
]

export { validateLogin, validateRegister }
