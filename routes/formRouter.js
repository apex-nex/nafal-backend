import express from 'express'
import { formSubmit, form, deleteRecords } from '../controllers/formController.js'

const routerForm = express.Router()

routerForm.use(express.urlencoded({ extended: true }))
routerForm.use(express.json())

routerForm.get('/form', form)

routerForm.post('/form', formSubmit)

routerForm.post('/form', deleteRecords)

export default routerForm