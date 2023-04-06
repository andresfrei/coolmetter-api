import express from 'express'
import { syncDeviceController } from '../../controllers/sync.controller.js'
import { validateHashSync } from '../../validator/sync.validate.js'

const router = express.Router()

router.post('/:hash', validateHashSync, syncDeviceController)

export default router
