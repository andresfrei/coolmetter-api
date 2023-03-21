import { productResponse } from '../config/messageResponse.js'
import Product from '../models/product.model.js'

export async function findProductsService (query) {
  console.log(query, ' query')
  const { shopId } = query
  if (!shopId) return productResponse.invalidQuery
  const products = await Product.find(query)
  return { status: 200, data: { products } }
}

export async function findProductService (query) {
  const product = await Product.findOne(query)
  if (!product) return productResponse.notFound
  return { status: 200, data: { product } }
}

export async function createProductService (data) {
  const { code, shopId } = data
  const isProduct = await findProductService({ shopId, code })
  if (isProduct.status === 200) return productResponse.codeExist
  const category = await Product.create(data)
  return { status: 201, data: category }
}
