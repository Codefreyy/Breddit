import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { CommentVoteValidator } from "@/lib/validators/vote"

export async function PATCH(req: Request) {
    try {

        const body = await req.json()

        const { commentId, voteType } = CommentVoteValidator.parse(body)

        const session = await getAuthSession()
        if (!session) {
            return new Response("Unauthorized", { status: 401 })
        }

        const existingVote = await db.commentVote.findFirst({
            where: {
                userId: session.user.id,
                commentId
            }
        })

        if (existingVote) {
            if (existingVote.type == voteType) {
                // the user is voting the same way again, so remove their vote
                await db.commentVote.delete({
                    where: {
                        id: existingVote.id
                    }
                })
                return new Response("Vote removed", { status: 200 })
            } else {
                await db.commentVote.update({
                    where: {
                        id: existingVote.id
                    },
                    data: {
                        type: voteType
                    }
                })
                return new Response("Vote updated", { status: 200 })
            }
        }

        // if the user hasn't voted on this comment yet, create a new vote
        await db.commentVote.create({
            data: {
                type: voteType,
                commentId,
                userId: session.user.id
            }
        })
        return new Response("Vote created", { status: 200 })

    } catch (error) {
        return new Response("Something went wrong.", { status: 500 })
    }
}