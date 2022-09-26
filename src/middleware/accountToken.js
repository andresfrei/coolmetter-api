import jwt from "jsonwebtoken";
import { getTokenFromCookie } from "../lib/cookie.js";

export default async function accountToken(req, res, next) {
  const { headers } = req;
  const { authorization } = headers;
  let token = null;

  if (authorization) {
    token = authorization.replace(/^Bearer\s/, "");
  }

  if (!token) {
    token = getTokenFromCookie(req);
  }

  if (!token) {
    return res.status(401).send({ msg: "Auth false" });
  }

  const account = await jwt.verify(token, process.env.JWT_SECRET);
  req.headers["token"] = account;
  next();
}
