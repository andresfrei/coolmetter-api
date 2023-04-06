import { paymentResponse } from '../config/messageResponse.js'
import { findPaymentService } from '../services/payment.service.js'

export async function newPaymentMiddleware (req, res, next) {
  const { shopId } = req.headers.token
  const { type } = req.body
  const response = await findPaymentService({ shopId, type })
  const { existType } = paymentResponse
  if (response.status === 200) return res.status(existType.status).send(existType.data)
  next()
}
