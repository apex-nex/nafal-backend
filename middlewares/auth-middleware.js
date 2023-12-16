import jwt from "jsonwebtoken"
import AdminModel from "../models/adminModal.js"

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" })
    }

    const jwtToken = token.replace("Bearer", "").trim()

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)

        const adminData = await AdminModel.findOne({ email: isVerified.email }).
            select({
                password: 0,
            })

        req.body = adminData
        req.token = token
        req.userID = adminData._id

        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized invalid token." })
    }

}

export default authMiddleware