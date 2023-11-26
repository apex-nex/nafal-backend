import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
})

// secure the password with the bycrypt
adminSchema.pre("save", async function (next) {
    const admin = this

    if (!admin.isModified("password")) {
        next()
    }

    try {
        const saltRound = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(admin.password, saltRound)
        admin.password = hash_password
    } catch (error) {
        next(error)
    }
})

// compare the password
adminSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

// json web token
adminSchema.methods.generateToken = async function () {
    console.log("this", this)
    try {
        return jwt.sign({
            adminId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        )
    } catch (error) {
        console.error(error)
    }
}

const AdminModel = new mongoose.model("Admin", adminSchema)

export default AdminModel
