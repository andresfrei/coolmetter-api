import express from 'express'
import { reSyncDeviceController, syncDeviceController } from '../../controllers/sync.controller.js'
import { validateHashSync, validateReSync } from '../../validator/sync.validate.js'

const router = express.Router()

router.post('/:hash', validateHashSync, syncDeviceController)
router.put('/', validateReSync, reSyncDeviceController)

export default router
