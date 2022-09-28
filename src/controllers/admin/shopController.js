import { COOKIE_ACCOUNT } from "../../config/consts.js";
import { serialize } from "cookie";
import { createToken } from "../../lib/token.js";
import Shop from "../../models/Shop.js";

export async function getShop(req, res) {
  const { headers, query, params } = req;
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
