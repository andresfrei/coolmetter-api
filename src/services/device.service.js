import res from '../config/messajesResponses.js'
import Account from '../models/account.model.js'

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
  const data = account || {}
  return { status: 200, data }
}

function cleanAccount (account) {
  const { password, ...restOfAccount } = account.toJSON()
  return restOfAccount
}
