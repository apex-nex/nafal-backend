import AdminModel from "../models/adminModal.js"

const createUser = async (name, email, mobile, password) => {
    const user = new AdminModel({ name: name, email: email, mobile: mobile, password: password })

    await user.save()

    return 'success'
}

const findUser = async (userEmail) => {
    const user = await AdminModel.find({ email: userEmail })
    return user
}

export { createUser, findUser }