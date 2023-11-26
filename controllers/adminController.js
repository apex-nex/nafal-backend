import { createAdmin } from '../services/adminServices.js'
import bcrypt from 'bcrypt'
import { findAdmin } from "../services/adminServices.js"
import AdminModel from '../models/adminModal.js'

// User Registration Logic

const registerAdmin = async (req, res) => {
    try {
        const { name, email, mobile, password, repassword } = req.body

        // Check for empty values in req.body
        if (!name || !email || !mobile || !password || !repassword) {
            return res.status(400).json({ error: 'Please provide all required fields' })
        }

        // Check if email already exists
        const adminExist = await AdminModel.findOne({ email })

        if (adminExist) {
            return res.status(400).json({ error: 'Email is already registered Please login' })
        }

        // bcrypt can be improve
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).send("Registration failed: Internal server error (Code 1)")
            }

            try {
                let status = await createAdmin(name, email, mobile, hash)

                if (password === repassword) {
                    if (status === 'success') {
                        res.status(201).json({ name: name, message: 'Your registration was successful.' })
                    } else {
                        res.status(400).json({ error: 'Registration was unsuccessful' })
                    }
                } else {
                    res.status(400).json({ error: 'Password and Re Password did not match' })
                }
            } catch (error) {
                res.status(500).send("Registration failed: Internal server error (Code 2)")
            }
        })
    } catch (error) {
        res.status(500).send("Registration failed: Internal server error (Code 3)")
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

        const admin = await bcrypt.compare(password, adminExit.password)

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
        res.status(500).send("Login failed: Internal server error (code 1)")
    }
}

export { registerAdmin, loginAdmin };