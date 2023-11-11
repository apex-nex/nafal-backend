import express from 'express'
import { loginUser } from '../controllers/loginController.js'

const routerLogin = express.Router()

routerLogin.post('/login', loginUser)

export default routerLogin