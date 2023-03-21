import { Router } from 'express'
import { createProduct, getProducts } from '../../controllers/product.controller.js'
import { validateNewProduct } from '../../validator/product.validate.js'

const router = Router()

router.get('/', getProducts)
router.post('/', validateNewProduct, createProduct)

export default router
