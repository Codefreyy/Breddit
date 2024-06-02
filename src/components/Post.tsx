import { formatTimeToNow } from "@/lib/utils"
import type { Post, User, Vote } from "@prisma/client"
import { MessageSquare } from "lucide-react"
import Link from "next/link"

import { FC, useRef } from "react"
// import EditorOutput from "./EditorOutput"
import PostVoteClient from "./post-vote/PostVoteClient"

export type PartialVote = Pick<Vote, "type">

interface PostProps {
  post: Post & {
    author: User
    votes: Vote[]
  }
  votesAmt: number
  subredditName: string
  currentVote?: PartialVote
  commentAmt: number
}

const Post: FC<PostProps> = ({
  post,
  votesAmt,
  subredditName,
  currentVote,
  commentAmt,
}) => {
  const pRef = useRef<HTMLDivElement>(null)
  return (
    <div className="rounded-md bg-white shadow">
      <div className="flex justify-between px-6 py-4">
        {/* PostVoteClient */}
        <PostVoteClient
          postId={post.id}
          initialVote={currentVote?.type}
          initialVoteAmt={votesAmt}
        />
        <div className="w-0 flex-1">
          <div className=" max-h-40 mt-1 text-xs text-gray-500">
            {subredditName ? (
              <>
                <a
                  href={`/r/${subredditName}`}
                  className="underline  text-gray-800"
                >
                  r/{subredditName}
                </a>
                <span className="px-1">·</span>
              </>
            ) : null}
            <span className=" text-gray-500">
              Posted by u/{post.author.username}{" "}
            </span>
            {formatTimeToNow(new Date(post.createdAt))}
          </div>

          <a href={`/r/${subredditName}/post/${post.id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
              {post.title}
            </h1>
          </a>
          {/* content */}
          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            {/* <EditorOutput content={post.content} /> */}
            {pRef.current?.clientHeight == 160 ? (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
            ) : null}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">
        <Link
          href={`/r/${subredditName}/post/${post.id}`}
          className="w-fit flex gap-2 items-center "
        >
          <MessageSquare className="w-4 h-4" />
          {commentAmt} Comments
        </Link>{" "}
      </div>
    </div>
  )
}

export default Post
