import { z } from "zod";


export const PostValidator = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters long"
    }).max(100, {
        message: "Title must be at most 100 characters long"
    }),
    subredditId: z.string(),
    content: z.any()
})

export type PostCreationType = z.infer<typeof PostValidator>;
