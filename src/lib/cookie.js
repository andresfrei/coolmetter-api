import cookie from 'cookie'
import { COOKIE_ACCOUNT } from '../config/consts.js'

export function getTokenFromCookie (req) {
  const { headers } = req

  if (!headers?.cookie) return null
  const cookies = cookie.parse(headers.cookie)
  const token = cookies[COOKIE_ACCOUNT]
  return token
}
