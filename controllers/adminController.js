import { createAdmin } from '../services/adminServices.js'
import bcrypt from 'bcrypt'
import { findAdmin } from "../services/adminServices.js"
import AdminModel from '../models/adminModal.js'

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
                let status =  await createAdmin(name, email, mobile, hash)

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



const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body.values

        const admin = await findAdmin(email)
        const adminInstance = new AdminModel.findOne({ email });
        // const adminInstance = new findAdmin(email)

        if (admin.length > 0) {
            let validateAdmin = await bcrypt.compare(password, admin[0].password)
            if (validateAdmin) {
                res.status(200).json({ 
                    name: admin[0].name, 
                    message: 'Login Successful', 
                    // token: adminInstance.generateToken(),
                    // adminID: adminInstance._id.toString(),
                })
            } else {
                res.status(400).json({ error: 'Login failed: Invalid email or password' })
            }
        } else {
            res.status(400).json({ error: 'admin not found try again or register admin' })
        }
    } catch (error) {
        res.status(500).send("Login failed: Internal server error (code 1)")
    }
}

export { registerAdmin, loginAdmin };