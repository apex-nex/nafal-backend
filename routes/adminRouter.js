import express from 'express'
import bodyParser from 'body-parser'
import { registerAdmin } from '../controllers/adminController.js'
import { loginAdmin } from '../controllers/adminController.js'

const routerAdmin = express.Router()

routerAdmin.use(bodyParser.urlencoded({ extended: true }))
routerAdmin.use(bodyParser.json())

routerAdmin.post('/register', registerAdmin)
routerAdmin.post('/login', loginAdmin)

export default routerAdmin