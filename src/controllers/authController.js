import { matchedData } from "express-validator";
import Account from "../models/Account.js";
import { createToken } from "../lib/token.js";
import { COOKIE_ACCOUNT } from "../config/consts.js";
import { handleHttpError } from "../lib/validator.js";

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email) return res.status(401).json({ auth: false });

  const data = await Account.find({ email });
  const account = data[0];
  const status = account?.status;

  if (!status) {
    return res.status(401).json({ auth: false });
  }

  const isPassword = await account.comparePassword(password);
  if (!isPassword) {
    return res.status(401).json({ auth: false });
  }

  const { name, _id } = account;
  const token = await createToken({ accountID: _id, email, name });

  res.cookie(COOKIE_ACCOUNT, token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  return res.json({ account, token });
}

export async function register(req, res) {
  try {
    const body = matchedData(req);
    const account = new Account(body);
    account.password = await account.encryptPassword(body.password);
    //const accountId = account._id.toString();
    //const defaultClientId = await createFinalConsumer(accountId);
    //account.defaultClientId = defaultClientId;
    await account.save();
    return res.send({ data: account }).status(201);
  } catch (e) {
    handleHttpError(res, e);
  }
}
