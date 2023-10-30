import mongoose from "mongoose";

const loginSchema = mongoose.Schema({
    email:{type:String},
    password:{types:String}
})

let loginModel = mongoose.model('login', loginSchema)

export default loginModel