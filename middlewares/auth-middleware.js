import jwt from "jsonwebtoken"
import AdminModel from "../models/adminModal.js"

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        const error = { status: 401, error: "Unauthorized HTTP, Token not provided" }
        next(error)
    }

    const jwtToken = token?.replace("Bearer", "").trim()

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)

        const adminData = await AdminModel.findOne({ email: isVerified.email }).
            select({
                password: 0,
            })

        if (req.originalUrl === "/api/admin/auth") {
            req.body = adminData
            req.token = token
            req.userID = adminData._id
        }

        next()

    } catch (err) {
        const error = { status: 401, error: "Unauthorized invalid token." }
        next(error)
    }

}

export default authMiddleware