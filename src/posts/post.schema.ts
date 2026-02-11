import * as z from "zod";

export const CreatePostSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required.")
        .max(200, "Title must be less than 200."),
    content: z
        .string()
        .min(1, "Content cannot be empty.")
        .max(10000, "Content must be less than 10000."),
    published: z
        .boolean()
        .default(false)
})

export const UpdatePostSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required.")
        .max(200, "Title must be less than 200."),
    content: z
        .string()
        .min(1, "Content cannot be empty.")
        .max(10000, "Content must be less than 10000."),
    published: z
        .boolean()
        .optional()
})
