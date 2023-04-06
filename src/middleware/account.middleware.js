import jwt from 'jsonwebtoken'
import { COOKIE_ACCOUNT } from '../config/consts.js'
import messageResponse from '../config/messajesResponses.js'
import { findAccountService } from '../services/account.service.js'

const { authFalse, invalidToken } = messageResponse

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
