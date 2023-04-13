import res from '../config/messajesResponses.js'
import Account from '../models/account.model.js'
import { createLinkService } from './link.service.js'
import { urlFrontend } from '../config/urls.js'
import { createToken, validToken } from '../lib/token.js'
import { findDevicesNodesService } from './device.service.js'
import { Types } from 'mongoose'

export async function findAccountService (params) {
  const { noPassword, ...query } = params
  const { _id, email } = query
  if (!_id && !email) return res.invalidQuery
  const account = await Account.findOne(query)
  if (!account) return res.notFound
  if (!noPassword) return { status: 200, data: account }
  const cleanData = await cleanAccount(account)
  return { status: 200, data: cleanData }
}

export async function findAccountByToken (token) {
  const { authFalse } = res
  const session = validToken(token)
  const { idAccount } = session
  if (!idAccount) return authFalse
  const account = await Account.findById(idAccount).select(['_id', 'name', 'phone', 'email'])
  if (!account) return authFalse
  const devices = await findDevicesNodesService({ idAccount: Types.ObjectId(idAccount) })
  return { status: 200, data: { account, devices } }
}

export async function findAccountByPhoneService (phone) {
  const account = await Account.findOne({ phone }).select(['name', 'email'])
  if (!account) return { status: 200, data: {} }
  const idAccount = account._id.toString()
  const token = await createToken({ idAccount })
  const link = await createLinkService({ token })
  const { name, email } = account
  const idLink = link.data.idLink
  const newLink = urlFrontend.link + '/' + idLink
  return { status: 200, data: { name, email, link: newLink } }
}

function cleanAccount (account) {
  const { password, ...restOfAccount } = account.toJSON()
  return restOfAccount
}
