import {Router} from 'express'
import {register, login, refreshToken, logout, logoutAll} from '../controllers/auth.controller.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/refresh-token', refreshToken)
router.post('/logout', logout)
router.post('/logout-all/:userId', logoutAll)


export default router