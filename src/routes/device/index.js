import { Router } from 'express'

import sync from './sync.js'
import log from './log.js'

const router = Router()

router.use('/sync', sync)
router.use('/log', log)

export default router
