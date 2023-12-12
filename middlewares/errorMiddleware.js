const errorMiddleware = (err, req, res, nest) => {
    const status = err.status || 500
    const error = err.error || "BACKEND ERROR"

    return res.status(status).json({ error })
}

export default errorMiddleware