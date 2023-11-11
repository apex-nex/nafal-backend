import { createUser } from '../services/registerServices.js'
import bcrypt from 'bcrypt'

let registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password, repassword } = req.body

    //add functionality to if req.body get empty values

    bcrypt.hash(password, 10, async (err, hash) => {

        // all code in bcrypt.hash can optimized
        let status = await createUser(name, email, mobile, hash)

        if (password == repassword) {
            if (status === 'success') {
                res.status(201).json({name: name, message: 'Your Registration Is Successful'})
            } else {
                res.status(400).json({error: 'Registration Unsuccessful'})
            }
        } else {
            res.status(400).json({error: 'Password and Re Password did not match'})
        }
    })
    } catch (error) {
        res.status(500).send("Internal server error")
    }
    
}
export { registerUser };