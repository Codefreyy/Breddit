"use client"

import { ExtendedPost } from "@/types/db"
import { FC, useEffect, useRef } from "react"
import { useIntersection } from "@mantine/hooks"
import { useInfiniteQuery } from "@tanstack/react-query"
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config"
import axios from "axios"
import Post from "./Post"
import { Vote } from "@prisma/client"
import { useSession } from "next-auth/react"
import { Loader2 } from "lucide-react"

interface PostFeedProps {
  initialPosts: ExtendedPost[]
  subredditName?: string
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts, subredditName }) => {
  const { data: session } = useSession()
  const lastPostRef = useRef<HTMLDivElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["posts"],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!subredditName ? `&subredditName=${subredditName}` : "")

      const { data } = await axios.get(query)
      return data as ExtendedPost[]
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  const _posts = data?.pages.flatMap((page) => page) ?? initialPosts

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {_posts?.map((post, index) => {
        const voteAmt = post.votes.reduce((acc: number, vote: Vote) => {
          if (vote.type == "UP") acc + 1
          if (vote.type == "DOWN") acc - 1
          return acc
        }, 0)

        const currentVote = post.votes.find(
          (vote: Vote) => vote.userId === session?.user.id
        )

        if (_posts.length === index + 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post
                post={post}
                subredditName={post.subreddit.name}
                commentAmt={post.comments.length}
                votesAmt={voteAmt}
                currentVote={currentVote}
              />
            </li>
          )
        } else {
          return (
            <Post
              key={post.id}
              post={post}
              subredditName={post.subreddit.name}
              commentAmt={post.comments.length}
              votesAmt={voteAmt}
              currentVote={currentVote}
            />
          )
        }
      })}

      {isFetchingNextPage && (
        <li className="flex justify-center">
          <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
        </li>
      )}
    </ul>
  )
}

export default PostFeed
