import express from 'express'
import { postForm, getAllForms, deleteForms, updateFormStatus, getFormFilter } from '../controllers/formController.js'
import formSchema from '../validators/formValidator.js'
import validate from '../middlewares/validateMiddleware.js'

const router = express.Router()

router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.route("/").post(validate(formSchema), postForm)

router.get('/', getAllForms)

router.delete('/delete', deleteForms)

router.patch('/update', updateFormStatus)

router.get('/filter', getFormFilter)

export default router