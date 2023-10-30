import loginModel from "../models/loginModel.js"

const loginControl = async (req, res) => {
    const user = new loginModel({
        email: "anasmomin064@gmail.com",
        password: "abcd"
    })
    user.save().then(() => {
        res.send("user Saved")
    }).catch((err) => {
        console.log(err)
    });


}

export { loginControl }