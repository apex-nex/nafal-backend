import express from 'express'
import { loginControl } from '../controllers/loginControllers.js'

const loginRouter = express.Router()

loginRouter.post('/login', loginControl)

export { loginRouter }