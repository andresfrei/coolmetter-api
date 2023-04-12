import { Router } from 'express'
import { getLinkController } from '../../controllers/link.controller.js'
import { validateIdLink } from '../../validator/link.validate.js'

const router = Router()

router.get('/:id', validateIdLink, getLinkController)

export default router
