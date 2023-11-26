import z from "zod";

// creating an object schema
const signupSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least of 3 characters." })
        .max(255, { message: "Name must not be more than 255 characters." }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters." })
        .max(255, { message: "Email must not be more than 255 characters." }),
    mobile: z
        .string({ required_error: "Mobile is required" })
        .min(10, { message: "Mobile must be at least of 10 characters." })
        .max(20, { message: "Mobile must not be more than 20 characters." }),
    password: z
        .string({ required_error: "Password is required" })
        .min(6, { message: "Password must be at least of 6 characters." })
        .max(1024, { message: "Password must not be more than 1024 characters." }),
});

export default signupSchema
