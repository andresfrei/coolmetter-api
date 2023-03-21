import express from 'express'
import { getShopByUid } from '../../controllers/shop.controller.js'

const router = express.Router()

router.get('/:uid', getShopByUid)

export default router
