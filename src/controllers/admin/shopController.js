import { COOKIE_ACCOUNT } from "../../config/consts.js";
import { serialize } from "cookie";
import { createToken } from "../../lib/token.js";
import Shop from "../../models/Shop.js";
import Account from "../../models/Account.js";
import { token } from "morgan";
import { matchedData } from "express-validator";
import { handleHttpError } from "../../lib/validator.js";

export async function getShop(req, res) {
  const { headers, params } = req;
  const { token } = headers;
  const { accountID, shopID } = token;
  const { id } = params;
  let newToken = "";
  try {
    const shop = await Shop.findById({ _id: id });
    if (shop?.accountID != accountID)
      return res.status(404).json({ msg: "Not found" });

    if (shopID != id) {
      const { accountID, email, name } = token;
      newToken = await createToken({
        accountID,
        email,
        name,
        shopID: id,
      });

      const serialized = serialize(COOKIE_ACCOUNT, newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
      res.setHeader("Set-Cookie", serialized);
    }

    const data = { shop };

    if (newToken != "") data.token = newToken;

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

export async function createShop(req, res) {
  const body = matchedData(req);
  const { token } = req.headers;
  try {
    body.accountID = token.accountID;
    console.log(body);
    const shop = new Shop(body);
    await shop.save();
    const account = await Account.findById({ _id: token.accountID });
    console.log(account);
    account.shops.insert = { shopID: shop._id, name: shop.name };
    console.log(account);
    await account.save();
    console.log(account);
    res.status(201).json({ shop });
  } catch (e) {
    handleHttpError(res, e);
  }
}
