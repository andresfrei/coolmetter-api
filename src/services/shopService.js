import Shop from "../models/Shop.js";

export async function findShop(query) {
  const data = await Shop.find(query);
  console.log(data);
  const shop = data[0];
  return shop;
}
