import { z } from "zod";


export const UsernameFormValidator = z.object({
    name: z
        .string()
        .min(3)
        .max(32)
        .regex(/^[a-zA-Z0-9_]+$/),
})

export type UsernameType = z.infer<typeof UsernameFormValidator>;
