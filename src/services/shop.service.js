import Shop from '../models/shop.model.js'
import { createToken } from '../lib/token.js'
import { addShopToAccount } from './account.service.js'
import { shopResponse } from '../config/messageResponse.js'
import { findCategoriesService } from './category.service.js'
import { findProductsService } from './product.service.js'

export async function findShopService (query) {
  const { accountId, shopId, detail } = query
  if (!accountId || !shopId) return shopResponse.invalidQuery
  const shop = await Shop.findOne({ _id: shopId, accountId })
  if (!shop) return shopResponse.notFound
  const token = await createToken({ accountId, shopId })
  if (!detail) return { status: 200, data: { shop, token } }
  const detailData = await findCategoriesAndProducts(shopId)
  return { status: 200, data: { shop, ...detailData, token } }
}

export async function createShopService (data) {
  const { accountId, uid, name } = data
  const uidShop = await Shop.findOne({ uid })
  if (uidShop) return shopResponse.uidExist
  const newShop = await Shop.create(data)
  const shopId = newShop._id.toString()
  addShopToAccount(accountId, { shopId, name })
  return { status: 201, data: newShop }
}

export async function findShopsService (query) {
  const { accountId } = query
  if (!accountId) return shopResponse.invalidQuery
  const shops = await Shop.find({ accountId }).select(['_id', 'uid', 'name'])
  return { status: 200, data: shops }
}

export async function findShopByUid (uid) {
  if (!uid) return shopResponse.uidNotValid
  const shop = await Shop.findOne({ uid })
  if (!shop) return shopResponse.notFound
  const shopId = shop._id.toString()
  const detailData = await findCategoriesAndProducts(shopId)
  return { status: 200, data: { shop, ...detailData } }
}

async function findCategoriesAndProducts (shopId) {
  if (!shopId) return shopResponse.invalidQuery
  const resCategories = await findCategoriesService({ shopId })
  const resProducts = await findProductsService({ shopId })
  const { categories } = resCategories.data
  const { products } = resProducts.data
  return { categories, products }
}
