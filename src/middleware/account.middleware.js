import jwt from 'jsonwebtoken'
import { COOKIE_ACCOUNT } from '../config/consts.js'
import { loginResponse } from '../config/messageResponse.js'
import { findAccountService } from '../services/account.service.js'

export async function validateAccountToken (req, res, next) {
  const { authorization } = req.headers
  const { authFalse } = loginResponse
  let token = null
  if (authorization) {
    token = authorization.split(' ')[1]
    const parts = token.split('.')
    if (parts.length !== 3) {
      token = null
    }
  }
  if (!token) { token = req.cookies[COOKIE_ACCOUNT] }
  if (!token) return res.status(authFalse.status).send(authFalse.message)
  try {
    const account = jwt.verify(token, process.env.JWT_SECRET)
    req.headers.token = account
    next()
  } catch (error) {
    return res.status(authFalse.status).send(authFalse.message)
  }
}

export async function validateAccount (req, res, next) {
  const { accountId } = req.headers.token
  const response = await findAccountService({ _id: accountId })
  const { status } = response
  const { invalidToken } = loginResponse
  if (status !== 200) return res.status(invalidToken.status).send(invalidToken.data)
  next()
}
