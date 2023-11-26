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

        const finalOutput = { errors: transformedErrors };

        // res.status(400).json(finalOutput)

        const error = {
            status: 400,
            response: finalOutput
        }

        next(error)
    }
}

export default validate