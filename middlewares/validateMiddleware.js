const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        next()
    } catch (err) {
        // console.log("err", err)
        const message = err.errors[0].message
        res.status(400).json({ msg: message })
    }
}

export default validate