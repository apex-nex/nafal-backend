import express from 'express'
import bodyParser from 'body-parser'
import { registerAdmin, loginAdmin } from '../controllers/adminController.js'
import signupSchema from '../validators/adminValidator.js'
import validate from '../middlewares/validateMiddleware.js'

const routerAdmin = express.Router()

routerAdmin.use(bodyParser.urlencoded({ extended: true }))
routerAdmin.use(bodyParser.json())

routerAdmin.route("/register").post(validate(signupSchema), registerAdmin)
routerAdmin.route("/login").post(loginAdmin)

export default routerAdmin