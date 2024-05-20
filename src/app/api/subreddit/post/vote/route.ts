import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { PostVoteValidator } from "@/lib/validators/vote"
import { z } from "zod"

const CACHE_AFTER_UPVOTES = 1

export async function PATCH(req: Request) {
    try {
        const body = await req.json()

        const { postId, voteType } = PostVoteValidator.parse(body)

        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const exsitingVote = await db.vote.findFirst({
            where: {
                postId,
                userId: session.user.id
            }
        })

        const post = await db.post.findUnique({
            where: {
                id: postId
            },
            include: {
                author: true,
                votes: true
            }
        })

        if (!post) {
            return new Response('Post not found', { status: 404 })
        }

        if (exsitingVote) {
            if (exsitingVote.type == voteType) {
                await db.vote.delete({
                    where: {
                        id: exsitingVote.id
                    }
                })

                // recount the votes
                const votesAmt = post.votes.reduce((acc, vote) => {
                    if (vote.type == 'UP') acc += 1
                    if (vote.type == 'DOWN') acc -= 1
                    return acc
                }, 0)

                return new Response('Vote removed', { status: 200 })

            }



            await db.vote.update({
                where: {
                    id: exsitingVote.id
                },
                data: {
                    type: voteType
                }
            })

            // recount the votes
            const votesAmt = post.votes.reduce((acc, vote) => {
                if (vote.type == 'UP') acc += 1
                if (vote.type == 'DOWN') acc -= 1
                return acc
            }, 0)

            return new Response('Voted', { status: 200 })



        }

        await db.vote.create({
            data: {
                type: voteType,
                userId: session.user.id,
                postId,
                id: 0 // Add the "id" property with a default value
            }
        })

        // recount the votes
        const votesAmt = post.votes.reduce((acc, vote) => {
            if (vote.type == 'UP') acc += 1
            if (vote.type == 'DOWN') acc -= 1
            return acc
        }, 0)

        return new Response('Voted', { status: 200 })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }
        return new Response('Could not vote at this time. Please try again later.', { status: 500 })
    }
}