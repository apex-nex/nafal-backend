import express from 'express'
import { loginPage, loginUser } from '../controllers/loginController.js'

const routerLogin = express.Router()

routerLogin.get('/login', loginPage)

routerLogin.post('/login', loginUser)

export default routerLogin