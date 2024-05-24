import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"


export async function PATCH(req: Request) {
    try {
        const session = await getAuthSession()
        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const body = await req.json()
        const { voteType, commentId } = body

        // if no existing vote, create a new vote
        await db.commentVote.create({
            data: {
                type: voteType,
                commentId,
                userId: session.user.id,
            },
        })

        return new Response('OK')
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }
        return new Response(
            'Could not vote to this comment. Please try later',
            { status: 500 }
        )
    }
}