import express from 'express'
import { postForm, getAllForms, deleteForms, updateFormStatus, getFormFilter } from '../controllers/formController.js'
import formSchema from '../validators/formValidator.js'
import validate from '../middlewares/validateMiddleware.js'
import authMiddleware from '../middlewares/auth-middleware.js'

const router = express.Router()

router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.route("/").post(validate(formSchema), postForm)
router.route("/").get(authMiddleware, getAllForms)
router.route("/delete").delete(authMiddleware, deleteForms)
router.route("/update").patch(authMiddleware, updateFormStatus)
router.route("/filter").get(authMiddleware, getFormFilter)

export default router