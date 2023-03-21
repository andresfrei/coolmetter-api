import { Router } from 'express'
import shop from './shop.js'
import account from './account.js'
import category from './category.js'
import product from './product.js'
import { validateShopToken } from '../../middleware/shop.middleware.js'

const router = Router()

router.use('/account', account)
router.use('/shop', shop)
router.use('/category', validateShopToken, category)
router.use('/product', validateShopToken, product)

export default router
