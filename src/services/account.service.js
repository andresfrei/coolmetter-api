import res from '../config/messajesResponses.js'
import Account from '../models/account.model.js'
import { createLinkService } from './link.service.js'
import { urlFrontend } from '../config/urls.js'
import { createToken } from '../lib/token.js'

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
