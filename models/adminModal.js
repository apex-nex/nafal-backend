import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
})

// json web token
adminSchema.methods.generateToken = () => {
    try {
        return jwt.sign({
            adminId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d"
        }
        )
    } catch (error) {
        console.error(error)
    }
}

const AdminModel = new mongoose.model("Admin", adminSchema)

export default AdminModel
