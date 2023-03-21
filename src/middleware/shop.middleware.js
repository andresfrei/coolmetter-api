export async function validateShopToken (req, res, next) {
  const { shopId } = req.headers.token
  if (!shopId) return res.status(401).send({ message: 'I do not select shop !!!' })
  next()
}
