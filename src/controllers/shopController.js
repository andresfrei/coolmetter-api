import { findShop } from "../services/shopService.js";

export const getShop = async (req, res) => {
  const { params } = req;
  const { uid } = params;
  const shop = await findShop({ uid });
  return shop
    ? res.json(shop)
    : res.status(404).json({ msg: "Shop not found" });
};
