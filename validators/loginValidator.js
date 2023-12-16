import z from "zod";

// creating an object schema
const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters." })
        .max(255, { message: "Email must not be more than 255 characters." }),
    password: z
        .string({ required_error: "Password is required" })
        .min(4, { message: "Password must be at least of 4 characters." })
        .max(128, { message: "Password must not be more than 128 characters." }),
});

export default loginSchema
