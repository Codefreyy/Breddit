"use client"

import { Button } from "@/components/ui/Button"
import { useCustomToast } from "@/hooks/use-custom-toast"
import { useToast } from "@/hooks/use-toast"
import { SubscribeToSubredditPayload } from "@/lib/validators/subreddit"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { is } from "date-fns/locale"
import { unsubscribe } from "diagnostics_channel"
import { useRouter } from "next/navigation"
import { startTransition } from "react"
interface SubscribeLeaveToggleProps {
  isSubscribed: boolean
  subredditId: string
  subredditName: string
}

const SubscribeLeaveToggle = ({
  isSubscribed,
  subredditId,
  subredditName,
}: SubscribeLeaveToggleProps) => {
  const { loginToast } = useCustomToast()
  const { toast } = useToast()
  const router = useRouter()

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      // leave community
      const payload: SubscribeToSubredditPayload = {
        subredditId: subredditId,
      }

      const { data } = await axios.post("/api/subreddit/subscribe", {
        data: payload,
      })
      return data
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: "There was an error",
        description: "Please try again later",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      // handle success
      toast({
        title: "Subscribed",
        description: `You have successfully subscribed to r/${subredditName}`,
      })
      startTransition(() => {
        router.refresh()
      })
    },
  })

  const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      // leave community
      const payload: SubscribeToSubredditPayload = {
        subredditId: subredditId,
      }

      const { data } = await axios.post("/api/subreddit/unsubscribe", {
        data: payload,
      })
      return data
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: "There was an error",
        description: "Please try again later",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `You have successfully unsubscribed to r/${subredditName}`,
      })
      startTransition(() => {
        router.refresh()
      })
    },
  })

  return isSubscribed ? (
    <Button
      onClick={() => unsubscribe()}
      isLoading={isUnsubLoading}
      className="w-full mt-1 mb-4"
    >
      Leave community
    </Button>
  ) : (
    <Button
      onClick={() => subscribe()}
      isLoading={isSubLoading}
      className="w-full mt-1 mb-4"
    >
      Join to Post
    </Button>
  )
}

export default SubscribeLeaveToggle
