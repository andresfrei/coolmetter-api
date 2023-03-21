import { findAccountService } from '../services/account.service.js'

export async function getAccount (req, res) {
  const { accountId } = req.headers.token
  const response = await findAccountService({ _id: accountId, noPassword: true })
  return res.status(response.status).send(response.data)
}
