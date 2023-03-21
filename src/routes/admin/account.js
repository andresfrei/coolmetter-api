import { Router } from 'express'
import { getAccount } from '../../controllers/account.controller.js'

const router = Router()

// Shop routes
router.get('/', getAccount)

export default router
