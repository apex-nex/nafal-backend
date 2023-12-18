import express from 'express'
import { postForm, getFormData, deleteFormItems, updateFormStatusById } from '../controllers/formController.js'
import formSchema from '../validators/formValidator.js'
import validate from '../middlewares/validateMiddleware.js'

const routerForm = express.Router()

routerForm.use(express.urlencoded({ extended: true }))
routerForm.use(express.json())

routerForm.route("/form").post(validate(formSchema), postForm)

routerForm.get('/form', getFormData)

routerForm.delete('/form/items', deleteFormItems)

routerForm.patch('/form/update/status', updateFormStatusById)

export default routerForm