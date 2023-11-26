import { createAdmin } from '../services/adminServices.js'
import bcrypt from 'bcrypt'
import { findAdmin } from "../services/adminServices.js"
import AdminModel from '../models/adminModal.js'

// User Registration Logic

const registerAdmin = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body

        // Check if email already exists
        const adminExist = await AdminModel.findOne({ email })

        if (adminExist) {
            return res.status(400).json({ message: 'Email is already registered Please login' })
        }

        let status = await createAdmin(name, email, mobile, password)

        if (status === 'success') {
            res.status(201).json({ name: name, message: 'Your registration was successful.' })
        } else {
            res.status(400).json({ message: 'Registration was unsuccessful' })
        }

    } catch (error) {
        res.status(500).send("Internal server error")
    }
}

// User Login Logic

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body.values

        const adminExit = await AdminModel.findOne({ email })

        if (!adminExit) {
            return res.status(400).json({ message: "Login failed: Invalid Credentials" })
        }

        const admin = await adminExit.comparePassword(password)

        if (admin) {
            res.status(200).json({
                message: "Login Successful",
                token: await adminExit.generateToken(),
                adminId: adminExit._id.toString(),
            })
        } else {
            return res.status(401).json({ message: "Login failed: Invalid Credentials" })
        }

    } catch (error) {
        res.status(500).send("Internal server error")
    }
}

export { registerAdmin, loginAdmin };