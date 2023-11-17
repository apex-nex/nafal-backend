import mongoose from "mongoose";

const loginSchema = mongoose.Schema({
    email: { type: String },
    password: { type: String },
})

let LoginModel = mongoose.model('admin', loginSchema)

export default LoginModel