import { Router } from 'express'
import { createSyncController } from '../../controllers/sync.controller.js'
import { validateNewSync } from '../../validator/sync.validate.js'

const router = Router()

router.post('/', validateNewSync, createSyncController)

export default router
