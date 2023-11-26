import { createAdmin } from '../services/adminServices.js'
import bcrypt from 'bcrypt'
import { findAdmin } from "../services/adminServices.js"
import AdminModel from '../models/adminModal.js'

// User Registration Logic

const registerAdmin = async (req, res, next) => {
    try {
        const { name, email, mobile, password } = req.body

        // Check if email already exists
        const adminExist = await AdminModel.findOne({ email })

        if (adminExist) {
            const error = { status: 400, message: "Email is already registered Please login" }
            next(error)
        }

        let status = await createAdmin(name, email, mobile, password)

        if (status === 'success') {
            res.status(201).json({ name: name, message: 'Your registration was successful.' })
        } else {
            const error = { status: 400, message: "Registration was unsuccessful" }
            next(error)
        }

    } catch (err) {
        // res.status(500).send("Internal server error")
        const error = { message: "Internal server error" }
        next(error)
    }
}

// User Login Logic

const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body.values

        const adminExit = await AdminModel.findOne({ email })

        if (!adminExit) {
            const error = { status: 400, message: "Login failed: Invalid Credentials" }
            next(error)
        }

        const admin = await adminExit.comparePassword(password)

        if (admin) {
            res.status(200).json({
                message: "Login Successful",
                token: await adminExit.generateToken(),
                adminId: adminExit._id.toString(),
            })
        } else {
            const error = { status: 401, message: "Login failed: Invalid Credentials" }
            next(error)
        }

    } catch (err) {
        const error = { message: "Internal server error" }
        next(error)
    }
}

export { registerAdmin, loginAdmin };