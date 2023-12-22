import express from 'express'
import bodyParser from 'body-parser'
import { postAdmin, postLogin, authAdmin } from '../controllers/adminController.js'
import signupSchema from '../validators/signupValidator.js'
import validate from '../middlewares/validateMiddleware.js'
import authMiddleware from '../middlewares/auth-middleware.js'
import loginSchema from '../validators/loginValidator.js'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.route("/register").post(validate(signupSchema), postAdmin)
router.route("/login").post(validate(loginSchema), postLogin)
router.route("/auth").get(authMiddleware, authAdmin)

export default router