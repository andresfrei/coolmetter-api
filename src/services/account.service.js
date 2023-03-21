import { accountResponse } from '../config/messageResponse.js'
import Account from '../models/account.model.js'

export async function addShopToAccount (accountId, { shopId, name }) {
  await Account.findByIdAndUpdate(accountId, {
    $push: { shops: { shopId, name } }
  })
}

export async function findAccountService (query) {
  const { noPassword, ...restOfQuery } = query
  const { _id, email } = restOfQuery
  if (!_id && !email) return accountResponse.invalidQuery
  const account = await Account.findOne(restOfQuery)
  if (!account) return accountResponse.notFound
  if (!noPassword) return { status: 200, data: account }
  const cleanData = await cleanAccount(account)
  return { status: 200, data: cleanData }
}

function cleanAccount (account) {
  const data = JSON.stringify(account)
  const { password, ...restOfAccount } = data
  return restOfAccount
}
