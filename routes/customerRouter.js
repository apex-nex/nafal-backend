import express from 'express'
import { customerForm } from '../controllers/customerController.js'

const routerCustomer = express.Router()

routerCustomer.post('/contact', customerForm)

export default routerCustomer