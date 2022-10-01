export default async function shopToken(req, res, next) {
  const { token } = req;

  if (!token?.shopID) {
    return res.status(401).send({ msg: "I do not select shop !!!" });
  }

  next();
}
