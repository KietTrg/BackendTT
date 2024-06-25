import express from 'express'
import { login, myAuth, register } from '../controllers/author'
import verifyToken from '../middlewares/auth'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/get-me', verifyToken, myAuth)

export default router
