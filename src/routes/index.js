import { Router } from 'express'
import { validateAccountToken } from '../middleware/account.middleware.js'

import auth from './auth/index.js'
import shop from './shop/index.js'
import order from './order/index.js'
import admin from './admin/index.js'

export const router = Router()

// Admin Routes
router.use('/admin', validateAccountToken, admin)

// Auth Routes
router.use('/auth', auth)

// API Routes
router.use('/shop', shop)
router.use('/order', order)

router.get('/', (req, res) => {
  res.send('<H1>tuPedido-Api</H1>')
})

router.get('*', (req, res) => {
  res.status(404)
  res.render('404')
})
