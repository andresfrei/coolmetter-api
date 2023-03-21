import { Router } from 'express'
import { getShop, createShop, getShops } from '../../controllers/shop.controller.js'
import { validateNewShop } from '../../validator/shop.validate.js'

const router = Router()

router.post('/', validateNewShop, createShop)
router.get('/:shopId', getShop)
router.get('/', getShops)

export default router
