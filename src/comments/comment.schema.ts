import * as z from "zod";

export const CreateCommentSchema = z.object({
    content: z
        .string()
        .min(1, "You must write something.")
        .max(2000, "Comment must be less than 2000 characters.")
            // make "spaces only" as invalid character
        .refine(val => val.trim().length > 0, {
            message: "You must write something."
        })
})

export const UpdateCommentSchema = z.object({
    content: z
        .string()
        .min(1, "You must write something.")
        .max(2000, "Comment must be less than 2000 characters.")
        .refine(val => val.trim().length > 0, {
            message: "You must write something."
        })
})
