import Account from "../../models/Account.js";
import Shop from "../../models/Shop.js";

export async function getAccount(req, res) {
  const { headers, query } = req;
  const { token } = headers;
  const { accountID, shopID } = token;
  const { shop } = query;
  try {
    const account = await Account.findById({ _id: accountID }).select({
      password: 0,
    });

    if (!account)
      return res.status(404).json({ msg: "Account does not exists" });

    if (shop && shopID) {
      const shop = await Shop.findById({
        _id: shopID,
        accountID,
      });
      return res.json({ account, shop });
    }
    return res.json({ account });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}
