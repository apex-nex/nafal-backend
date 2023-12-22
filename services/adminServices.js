import AdminModel from "../models/adminModal.js"

const createAdmin = async (name, email, mobile, password) => {
    const admin = new AdminModel({ name: name, email: email, mobile: mobile, password: password })
    await admin.save()
    return 'success'
}

export { createAdmin }