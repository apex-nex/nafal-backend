import { findUser } from "../services/registerServices.js"
import bcrypt from 'bcrypt'

const loginUser = async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body.values

    const user = await findUser(email)
    console.log(user)

    console.log(user.length)

    if (user.length > 0) {
        let validateUser = await bcrypt.compare(password, user[0].password)
        if (validateUser) {
            res.status(200).json({name: user[0].name, message: 'Login Successful'})
        } else {
            res.status(400).json({error: 'wrong email or password'})
        }
    } else {
        res.status(400).json({error: 'user not found try again or register user'})
    }
    } catch (error) {
        res.status(500).send("Internal server error")
    }
    

}

export { loginUser }