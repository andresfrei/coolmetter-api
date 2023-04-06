import { Router } from 'express'
import { getAccount, editAccount } from '../../controllers/account.controller.js'

const router = Router()

router.get('/', getAccount)
router.patch('/', editAccount)

export default router
