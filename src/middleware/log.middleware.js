import msg from '../config/messajesResponses.js'

export async function validateLogToken (req, res, next) {
  const { idDevice, nodes } = req.headers.token
  const { values } = req.body
  if (!idDevice || !nodes || !values) return res.status(msg.invalidToken.status).send(msg.invalidToken.data)
  const verifyInclude = values.map(value => nodes.includes(value.uid))
  if (verifyInclude.includes(false)) return res.status(msg.invalidData.status).send(msg.invalidData.data)
  next()
}
