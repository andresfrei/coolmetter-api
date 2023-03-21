import { categoryResponse } from '../config/messageResponse.js'
import Categoty from '../models/category.model.js'

export async function findCategoriesService (query) {
  const { shopId } = query
  if (!shopId) return categoryResponse.invalidQuery
  const categories = await Categoty.find(query)
  return { status: 200, data: { categories } }
}

export async function findCategoryService (query) {
  const categoty = await Categoty.findOne(query)
  if (!categoty) return categoryResponse.notFound
  return { status: 200, data: { categoty } }
}

export async function createCategoryService (data) {
  const { name, shopId } = data
  const isCategoty = await findCategoryService({ shopId, name })
  if (isCategoty.status === 200) return categoryResponse.nameExist
  const category = await Categoty.create(data)
  return { status: 201, data: category }
}
