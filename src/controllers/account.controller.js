import { findAccountByPhoneService } from '../services/account.service.js'
import msg from './../config/messajesResponses.js'
const { notFound } = msg

export async function getAccountByPhone (req, res) {
  const { phone } = req.params
  const response = await findAccountByPhoneService(phone)
  if (response.status !== 200) return res.status(notFound.status).send(notFound.data)
  return res.status(response.status).json(response.data)
}
