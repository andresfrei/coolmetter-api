import { Router } from 'express'

import sync from './sync.js'
import log from './log.js'
// import { getNodesFromDevice } from '../../controllers/device.controller.js'
// import { validateDeviceToken } from '../../middleware/device.middleware.js'
// import { validateAccountToken } from '../../middleware/account.middleware.js'

const router = Router()

router.use('/sync', sync)
router.use('/log', log)
// router.get('/', validateAccountToken, validateDeviceToken, getNodesFromDevice)

export default router
