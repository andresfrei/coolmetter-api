import { Router } from 'express'
import { getAccountByPhone } from '../../controllers/account.controller.js'

const router = Router()

// Device Routes
router.use('/:phone', getAccountByPhone)
router.use('/:phone/devices', getAccountByPhone)

router.get('*', (_req, res) => {
  res.status(404)
  res.render('404')
})

export default router
