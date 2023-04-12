import { Router } from 'express'
import { getLinkController } from '../../controllers/link.controller.js'

const router = Router()

router.get('/:id', getLinkController)

export default router
