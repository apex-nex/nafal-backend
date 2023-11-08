import { findUser } from "../services/registerServices.js"
import bcrypt from 'bcrypt'

const loginPage = (req, res) => {
    res.render('login')
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    const user = await findUser(email)
    // console.log(user)

    console.log(user.length)

    if (user.length > 0) {
        let validateUser = await bcrypt.compare(password, user[0].password)
        if (validateUser === true) {
            res.render("dashboard", {
                name: user[0].name,
                message: 'Your Registration Is Successful'
            })
        } else {
            res.send('wrong email or password')
        }
    } else {
        res.send('user not found try again or register user')
    }

}

export { loginPage, loginUser }