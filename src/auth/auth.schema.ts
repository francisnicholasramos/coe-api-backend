import * as z from "zod";

export const SignUpSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters.")
        .max(20, "Username must be at most 20 characters.")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
    email: z
        .string()
        .regex(
            /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
            "Please enter a valid email address."
        ),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .max(64, "Password must be at most 64 characters.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
        .regex(/[0-9]/, "Password must contain at least one number.")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character.")
})
