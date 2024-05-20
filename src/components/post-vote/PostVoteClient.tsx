import { FC } from "react"
import { Button } from "../ui/Button"
import { cn } from "@/lib/utils"
import { ArrowBigDown, ArrowBigUp } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { VoteType } from "@prisma/client"
import axios from "axios"
import { PostVoteRequest } from "@/lib/validators/vote"

interface PostVoteClientProps {
  postId: string
  currentVote: any
  initialVoteAmt: number
}

const PostVoteClient: FC<PostVoteClientProps> = ({
  postId,
  currentVote,
  initialVoteAmt,
}) => {
  const { isLoading, data, mutate } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      // vote
      const payload: PostVoteRequest = {
        postId,
        voteType,
      }

      const { data } = await axios.patch("/api/subreddit/post/vote", payload)
    },
  })

  return (
    <div className="flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      <Button size="sm" variant="ghost" arial-label="upvote">
        <ArrowBigUp
          className={cn("w-4 h-4", {
            "text-emerald-500 fill-emerald-400": currentVote?.type === "UP",
          })}
        />
      </Button>
      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {" "}
        {initialVoteAmt}
      </p>
      <Button size="sm" variant="ghost" arial-label="downvote">
        <ArrowBigDown
          className={cn("w-4 h-4", {
            "text-emerald-500 fill-emerald-400": currentVote?.type === "UP",
          })}
        />
      </Button>
    </div>
  )
}

export default PostVoteClient
