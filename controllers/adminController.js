import { createUser } from '../services/adminServices.js'
import bcrypt from 'bcrypt'
import { findUser } from "../services/adminServices.js"

let registerAdmin = async (req, res) => {
    try {
        const { name, email, mobile, password, repassword } = req.body

        //add functionality to if req.body get empty values

        bcrypt.hash(password, 10, async (err, hash) => {

            // all code in bcrypt.hash can optimized
            let status = await createUser(name, email, mobile, hash)

            if (password == repassword) {
                if (status === 'success') {
                    res.status(201).json({ name: name, message: 'Your Registration Is Successful' })
                } else {
                    res.status(400).json({ error: 'Registration Unsuccessful' })
                }
            } else {
                res.status(400).json({ error: 'Password and Re Password did not match' })
            }
        })
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}

const loginAdmin = async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body.values

        const user = await findUser(email)
        console.log(user)

        console.log(user.length)

        if (user.length > 0) {
            let validateUser = await bcrypt.compare(password, user[0].password)
            if (validateUser) {
                res.status(200).json({ name: user[0].name, message: 'Login Successful' })
            } else {
                res.status(400).json({ error: 'Login failed: Invalid email or password' })
            }
        } else {
            res.status(400).json({ error: 'user not found try again or register user' })
        }
    } catch (error) {
        res.status(500).send("Login failed: Internal server error")
    }
}

export { registerAdmin, loginAdmin };