import jwt from 'jsonwebtoken'
import { COOKIE_ACCOUNT } from '../config/consts.js'
import msg from '../config/messajesResponses.js'
import { findAccountService } from '../services/account.service.js'
import { keys } from '../config/keys.js'

const { authFalse, invalidToken, invalidData } = msg

export async function validateKey (req, res, next) {
  const { authorization } = req.headers
  if (!authorization) return res.status(invalidToken.status).send(invalidToken.data)
  const key = authorization.split(' ')[1]
  const isKey = keys.filter(item => item === key)
  if (isKey.length === 0) return res.status(invalidData.status).send(invalidData.data)
  next()
}

export async function validateAccountToken (req, res, next) {
  const { authorization } = req.headers
  let token = null
  if (authorization) {
    token = authorization.split(' ')[1]
    const parts = token.split('.')
    if (parts.length !== 3) {
      token = null
    }
  }
  if (!token) { token = req.cookies[COOKIE_ACCOUNT] }
  if (!token) return res.status(authFalse.status).json(authFalse.data)
  try {
    const session = jwt.verify(token, process.env.JWT_SECRET)
    const { idAccount } = session
    if (!idAccount) return res.status(authFalse.status).send(authFalse.data)
    req.headers.token = session
    next()
  } catch (error) {
    return res.status(authFalse.status).send(authFalse.data)
  }
}

export async function validateAccount (req, res, next) {
  const { idAccount } = req.headers.token
  const response = await findAccountService({ _id: idAccount })
  const { status } = response
  if (status !== 200) return res.status(invalidToken.status).send(invalidToken.data)
  next()
}
