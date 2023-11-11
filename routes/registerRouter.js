import express from 'express'
import bodyParser from 'body-parser'
import { registerUser } from '../controllers/registerController.js'

const routerRegister = express.Router()

routerRegister.use(bodyParser.urlencoded({ extended: true }))
routerRegister.use(bodyParser.json())

routerRegister.post('/register', registerUser)

export default routerRegister