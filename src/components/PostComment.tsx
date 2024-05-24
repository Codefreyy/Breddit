"use ref"

import { Comment, CommentVote, User, Vote, VoteType } from "@prisma/client"
import { useRef } from "react"
import UserAvatar from "./UserAvatar"
import { formatTimeToNow } from "@/lib/utils"

type ExtendedComment = Comment & {
  votes: CommentVote[]
  author: User
}

interface PostCommentProps {
  votesAmt: number
  currentVote: CommentVote | undefined
  comment: ExtendedComment
}

export default function PostComment({
  votesAmt,
  currentVote,
  comment,
}: PostCommentProps) {
  const commentRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={commentRef}>
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.name,
          }}
          className="h-6 w-6"
        />
        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900">
            u/{comment.author.username}
          </p>
          <p className="max-h-40 truncate text-xs text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>

      <p className="text-sm text-zinc-900 mt-2">{comment.text}</p>
    </div>
  )
}
