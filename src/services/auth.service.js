import Account from '../models/account.model.js'
import { createToken, validToken } from '../lib/token.js'
import { findAccountService } from './account.service.js'
import res from '../config/messajesResponses.js'

export async function loginService ({ email, password }) {
  if (!email) return res.invalidToken
  const response = await findAccountService({ email })
  if (response.status !== 200) return res.authFalse
  const account = response.data
  if (!(await account.comparePassword(password))) return res.authFalse
  if (account.status === 0) return res.noValidate
  const token = await createToken({ idAccount: account._id.toString() })
  return { status: 200, data: { account: cleanAccount(account), token } }
}

export async function registerService ({ email, name, password }) {
  const account = await Account.findOne({ email })
  if (account) return res.emailExist
  const newAccount = new Account({ email, name })
  newAccount.password = await newAccount.encryptPassword(password)
  await newAccount.save()

  /* TODO: Aca se envía el correo de validacion */

  return { status: 201, data: { account: cleanAccount(newAccount) } }
}

export async function validateService (token) {
  if (!token) return res.invalidToken
  const session = validToken(token)
  if (!session?.idAccount) return res.invalidToken
  const account = await Account.findById({ _id: session.accountId })
  if (account?.status !== 0) return res.invalidToken
  account.status = 1
  await account.save()
  return res.validateAccount
}

function cleanAccount (account) {
  const { password, ...restOfAccount } = account.toJSON()
  return restOfAccount
}
