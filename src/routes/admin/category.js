import { Router } from 'express'
import { createCategory, getCategories } from '../../controllers/category.controller.js'
import { validateNewCategoy } from '../../validator/category.validate.js'

const router = Router()

router.get('/', getCategories)
router.post('/', validateNewCategoy, createCategory)

export default router
