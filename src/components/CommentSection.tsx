import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import PostComment from "./PostComment"
import { Vote } from "@prisma/client"

interface CommentSectionProps {
  postId: string
}

const CommentSection = async ({ postId }: CommentSectionProps) => {
  const session = await getAuthSession()
  const comments = await db.comment.findMany({
    where: {
      postId,
      replyToId: null,
    },
    include: {
      author: true,
      votes: true,
      replies: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  })

  return (
    <div className="flex flex-col gap-y-4 mt-4">
      <hr className="w-full h-px my-6" />
      {/* Create Comment */}
      <div className="flex flex-col gap-y-6 mt-4">
        {comments
          .filter((comment) => !comment.replyToId)
          .map((topLevelComment) => {
            const topLevelCommentVoteAmt = topLevelComment.votes.reduce(
              (acc, vote) => {
                if (vote.type == "UP") return acc + 1
                if (vote.type == "DOWN") return acc - 1
                return acc
              },
              0
            )

            const topLevelCommentVote = topLevelComment.votes.find(
              () => (vote: Vote) => vote.userId === session?.user.id
            )

            return (
              <div key={topLevelComment.id} className="flex flex-col">
                <div className="mb-2">
                  <PostComment
                    topLevelCommentVoteAmt={topLevelCommentVoteAmt}
                    topLevelCommentVote={topLevelCommentVote}
                    comment={topLevelComment}
                  />
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default CommentSection
