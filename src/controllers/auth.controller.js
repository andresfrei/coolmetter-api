import { matchedData } from 'express-validator'
import { COOKIE_ACCOUNT } from '../config/consts.js'
import { handleHttpError } from '../lib/validator.js'
import { loginService, registerService, validateService } from '../services/auth.service.js'

export async function loginAccount (req, res) {
  const { email, password } = req.body
  const response = await loginService({ email, password })
  if (response.status === 200) {
    res.cookie(COOKIE_ACCOUNT, response.data.token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: !process.env.DEV,
      sameSite: 'lax'
    })
  }
  return res.status(response.status).json(response.data)
}

export async function registerAccount (req, res) {
  try {
    const body = matchedData(req)
    const { email, password, name } = body
    const response = await registerService({ email, password, name })
    return res.send(response.data).status(response.status)
  } catch (e) {
    handleHttpError(res, e)
  }
}

export async function validateAccount (req, res) {
  try {
    const { token } = req.query
    const response = await validateService(token)
    return res.send(response.data).status(response.status)
  } catch (e) {
    handleHttpError(res, e)
  }
}
