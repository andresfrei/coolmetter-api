import { Router } from 'express'
import { validateAccountToken, validateKey } from '../middleware/account.middleware.js'

import auth from './auth/index.js'
import admin from './admin/index.js'
import device from './device/index.js'
import chat from './chat/index.js'
import link from './link/index.js'

export const router = Router()

// Auth Routes
router.use('/auth', auth)

// Chat Routes
router.use('/chat', validateKey, chat)

// Links Routes
router.use('/link', link)

// Admin Routes
router.use('/admin', validateAccountToken, admin)

// Device Routes
router.use('/device', device)

router.get('/', (req, res) => {
  res.send('<H1>CoolMetter-Api</H1>')
})

router.get('*', (req, res) => {
  res.status(404)
  res.render('404')
})
