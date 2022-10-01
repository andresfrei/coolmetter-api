export default async function shopToken(req, res, next) {
  const { shopID } = req.token;

  if (!shopID) {
    return res.status(401).send({ msg: "I do not select shop !!!" });
  }

  next();
}
