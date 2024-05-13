import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { SubredditSubscriptionValidator } from "@/lib/validators/subreddit"
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
        const { subredditId } = SubredditSubscriptionValidator.parse(body)

        const subscription = await db.subscription.findFirst({
            where: {
                subredditId, userId: session.user.id,
            },
        })

        if (!subscription) {
            return new Response('You did not subscribe to this community!', { status: 400 })
        }

        const subreddit = await db.subreddit.findFirst({
            where: {
                id: subredditId
            }
        })

        if (subreddit?.creatorId == session.user.id) {
            return new Response('You cannot unsubscribe from a community you created!', { status: 400 })
        }

        await db.subscription.delete({
            where: {
                subscriptionId: subscription.subscriptionId
            }
        })


        return new Response(subredditId)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 422 })

        }
        return new Response('Could not unsubscribe, please try again later', { status: 500 })
    }
}