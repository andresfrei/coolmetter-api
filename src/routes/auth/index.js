import express from 'express'
import { validateLogin, validateRegister } from '../../validator/auth.validate.js'
import { loginAccount, registerAccount, validateAccount } from '../../controllers/auth.controller.js'

const router = express.Router()

router.post('/login', validateLogin, loginAccount)
router.post('/register', validateRegister, registerAccount)
router.get('/validate', validateAccount)

export default router
