import express from 'express'
import { formSubmit, form, deleteFormItem } from '../controllers/formController.js'
import formSchema from '../validators/formValidator.js'
import validate from '../middlewares/validateMiddleware.js'

const routerForm = express.Router()

routerForm.use(express.urlencoded({ extended: true }))
routerForm.use(express.json())

// routerForm.route("/form").post(validate(formSchema), formSubmit)
routerForm.post('/form', formSubmit)

routerForm.get('/form', form)

routerForm.delete('/form/items', deleteFormItem)

export default routerForm