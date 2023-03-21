import Account from '../models/account.model.js'
import { createToken, validToken } from '../lib/token.js'
import { findAccountService } from './account.service.js'
import { loginResponse } from '../config/messageResponse.js'

export async function loginService ({ email, password }) {
  if (!email) return loginResponse.invalidToken
  const response = await findAccountService({ email })
  if (response.status !== 200) return loginResponse.invalidToken
  const account = response.data
  if (!(await account.comparePassword(password))) return loginResponse.authFalse
  if (account.status === 0) return loginResponse.noValidate
  const token = await createToken({ accountId: account._id.toString() })
  return { status: 200, data: { account: cleanAccount(account), token } }
}

export async function registerService ({ email, name, password }) {
  const account = await Account.findOne({ email })
  if (account) return loginResponse.emailExist
  const newAccount = new Account({ email, name })
  newAccount.password = await newAccount.encryptPassword(password)
  await newAccount.save()

  /* TODO: Aca se envía el correo de validacion */

  return { status: 201, data: { account: cleanAccount(newAccount) } }
}

export async function validateService (token) {
  if (!token) return loginResponse.invalidToken
  const session = validToken(token)
  if (!session?.accountId) return loginResponse.invalidToken
  const account = await Account.findById({ _id: session.accountId })
  if (account?.status !== 0) return loginResponse.invalidToken
  account.status = 1
  await account.save()
  return loginResponse.validateAccount
}

function cleanAccount (account) {
  const { password, ...restOfAccount } = account.toJSON()
  return restOfAccount
}
