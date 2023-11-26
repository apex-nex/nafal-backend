const errorMiddleware = (err, req, res, nest) => {
    const status = err.status || 500
    const message = err.message || "BACKEND ERROR"
    const response = err.response || "Error from Backend"

    return res.status(status).json({ message, response })
}

export default errorMiddleware