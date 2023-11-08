import userModel from "../models/loginModel.js"

const createUser = async (name, email, mobile, password) => {
    const user = new userModel({ name: name, email: email, mobile: mobile, password: password })

    await user.save()

    return 'success'
}

const findUser = async (userEmail) => {
    const user = await userModel.find({ email: userEmail })
    return user
}

export { createUser, findUser }