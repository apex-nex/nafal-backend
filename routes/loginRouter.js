import express from 'express'
import { loginPage, loginUser } from '../controllers/loginController.js'
import { customerForm } from '../controllers/customerControll.js'

const routerLogin = express.Router()

routerLogin.get('/login', loginPage)

routerLogin.post('/login', loginUser)

routerLogin.post('/customersupport', customerForm)

export default routerLogin