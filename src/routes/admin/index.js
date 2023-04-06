import { Router } from 'express'

/* import category from './category.js'
 import account from './account.js'
import product from './product.js'
import payment from './payment.js'
import { validateShopToken } from '../../middleware/shop.middleware.js' */

import sync from './sync.js'

const router = Router()

router.use('/sync', sync)
// router.use('/account', account)
// router.use('/shop', shop)
// router.use('/category', category)
// router.use('/product', validateShopToken, product)
// router.use('/payment', validateShopToken, payment)

export default router
