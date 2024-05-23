"use client"

import { Button } from "@/components/ui/Button"
import { useCustomToast } from "@/hooks/use-custom-toast"
import { useToast } from "@/hooks/use-toast"
import { SubscribeToSubredditPayload } from "@/lib/validators/subreddit"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { startTransition, useState } from "react"

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
  const [localIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed)
  const { loginToast } = useCustomToast()
  const { toast } = useToast()
  const router = useRouter()

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      // leave community
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      }

      const { data } = await axios.post("/api/subreddit/subscribe", payload)
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
      setLocalIsSubscribed(true)

      startTransition(() => {
        router.refresh()
      })
      toast({
        title: "Subscribed",
        description: `You have successfully subscribed to r/${subredditName}`,
      })
    },
  })

  const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      // leave community
      const payload: SubscribeToSubredditPayload = {
        subredditId: subredditId,
      }

      const { data } = await axios.post("/api/subreddit/unsubscribe", payload)
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
      setLocalIsSubscribed(false)
      startTransition(() => {
        router.refresh()
      })
      toast({
        title: "Success",
        description: `You have successfully unsubscribed to r/${subredditName}`,
      })
    },
  })

  return localIsSubscribed ? (
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
