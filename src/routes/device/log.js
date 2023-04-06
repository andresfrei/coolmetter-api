import express from 'express'
import { validateAccountToken } from '../../middleware/account.middleware.js'
import { validateLogToken } from '../../middleware/log.middleware.js'
import { createLogController } from '../../controllers/log.controller.js'
// import { validateNewLog } from '../../validator/log.validate.js'

const router = express.Router()

router.post('/',
  validateAccountToken,
  validateLogToken,
  createLogController
)

export default router
