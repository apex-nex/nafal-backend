import { createUser } from '../services/registerServices.js'
import bcrypt from 'bcrypt'

let registerUser = async (req, res) => {
    const { name, email, mobile, password, repassword } = req.body

    //add functionality to if req.body get empty values

    bcrypt.hash(password, 10, async (err, hash) => {

        // all code in bcrypt.hash can optimized
        let status = await createUser(name, email, mobile, hash)

        if (password == repassword) {
            if (status == 'success') {
                res.send({
                    name: name,
                    message: 'Your Registration Is Successful'
                })
            } else {
                res.send('Registration Un Successful')
            }
        } else {
            res.send('Password and Re Password did not match')
        }

    })
}
export { registerUser };