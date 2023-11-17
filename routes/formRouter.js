import express from 'express'
import { formSubmit, form, deleteFormItem  } from '../controllers/formController.js'

const routerForm = express.Router()

routerForm.use(express.urlencoded({ extended: true }))
routerForm.use(express.json())

routerForm.get('/form', form)

routerForm.post('/form', formSubmit)

routerForm.delete('/form/items', deleteFormItem)

export default routerForm