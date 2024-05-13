import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { PostValidator } from "@/lib/validators/post"
import { z } from "zod"

export async function POST(req: Request) {
    try {
        // is the user login?
        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        // get the payload from the request
        const body = await req.json()
        const { subredditId, title, content } = PostValidator.parse(body)

        const subscriptionExists = await db.subscription.findFirst({
            where: {
                subredditId, userId: session.user.id,
            },
        })

        if (!subscriptionExists) {
            return new Response('Please subscribe to post', { status: 400 })
        }

        await db.post.create({
            data: {
                title,
                content,
                authorId: session.user.id,
                subredditId
            }
        })

        return new Response("OK")
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 422 })

        }
        return new Response('Could not post to subreddit, please try again later', { status: 500 })
    }
}