import express from 'express'
import bodyParser from 'body-parser'
import { registerAdmin, loginAdmin, Admin } from '../controllers/adminController.js'
import signupSchema from '../validators/signupValidator.js'
import validate from '../middlewares/validateMiddleware.js'
import authMiddleware from '../middlewares/auth-middleware.js'
import loginSchema from '../validators/loginValidator.js'

const routerAdmin = express.Router()

routerAdmin.use(bodyParser.urlencoded({ extended: true }))
routerAdmin.use(bodyParser.json())

routerAdmin.route("/register").post(validate(signupSchema), registerAdmin)
routerAdmin.route("/login").post(validate(loginSchema), loginAdmin)
routerAdmin.route("/auth").get(authMiddleware, Admin)

export default routerAdmin