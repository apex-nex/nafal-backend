import express from 'express'
import { customerForm } from '../controllers/customerController.js'
import bodyParser from 'body-parser'

const routerCustomer = express.Router()

routerCustomer.use(bodyParser.urlencoded({ extended: true }))

routerCustomer.post('/contact', customerForm)

export default routerCustomer