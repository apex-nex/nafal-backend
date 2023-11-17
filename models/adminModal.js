import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    password: { type: String, required: true },
    isAdmin: { type: String, default: false },
})

const RegisterModel = new mongoose.model("Admin", adminSchema);

export default RegisterModel;