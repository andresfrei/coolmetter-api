import jwt from "jsonwebtoken";
import { getTokenFromCookie } from "../lib/cookie.js";

export default async function accountToken(req, res, next) {
  const { authorization } = req.headers;
  let token = null;

  if (authorization) {
    token = authorization.split(" ")[1];
    const parts = token.split(".");
    if (parts.length != 3) {
      token = null;
    }
  }

  if (!token) {
    token = getTokenFromCookie(req);
  }

  if (!token) {
    return res.status(401).send({ msg: "Auth false" });
  }

  try {
    const account = jwt.verify(token, process.env.JWT_SECRET);
    req.headers["token"] = account;
    next();
  } catch (error) {
    return res.status(401).send({ msg: "Auth false" });
  }
}
