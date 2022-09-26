import Shop from "../models/Shop.js";

export async function findShop(query) {
  const shop = await Shop.findOne(query);
  return shop;
}
