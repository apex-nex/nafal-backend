const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        next()
    } catch (err) {

        const errorArray = err.errors
        const transformedErrors = errorArray.reduce((acc, error) => {
            const key = error.path[0];
            const value = error.message;
            acc[key] = value;
            return acc;
        }, {});

        const error = { status: 400, error: transformedErrors }
        next(error)
    }
}

export default validate