import { serialize } from "cookie";
import Account from "../models/Account.js";
import { createToken } from "../lib/token.js";
import { COOKIE_ACCOUNT } from "../config/consts.js";

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email) return res.status(401).json({ auth: false });

  const account = await Account.findOne({ email });
  const status = account?.status;

  if (!status) {
    return res.status(401).json({ auth: false });
  }

  /* const isPassword = await account.comparePassword(password);
    if (!isPassword) {
      return res.status(401).json({ auth: false });
    } */

  const { name, _id } = account;
  const token = await createToken({ accountID: _id, email, name });

  const serialized = serialize(COOKIE_ACCOUNT, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  res.setHeader("Set-Cookie", serialized);
  return res.json(account);
}
