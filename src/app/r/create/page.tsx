"use client"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { CreateSubredditPayload } from "@/lib/validators/subreddit"
import { toast } from "@/hooks/use-toast"
import { useCustomToast } from "@/hooks/use-custom-toast"

const Page = () => {
  const [input, setInput] = useState("")
  const router = useRouter()
  const { loginToast } = useCustomToast()

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: input.trim(),
      }
      const { data } = await axios.post("/api/subreddit", payload)
      return data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return toast({
            title: "Subreddit already exists",
            description: "Please choose a different subreddit name",
            variant: "destructive",
          })
        }

        if (error.response?.status === 422) {
          return toast({
            title: "Invalid subreddit name",
            description: "Please choose a name between 3 and 21 characters",
            variant: "destructive",
          })
        }

        if (error.response?.status === 401) {
          return loginToast()
        }
      }

      toast({
        title: "There was an error",
        description: "Please try again later",
        variant: "destructive",
      })
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`)
      toast({
        title: "Success",
        description: `Community ${data} created!`,
      })
    },
  })

  return (
    <li className="container flex items-center h-full mx-auto max-w-3xl ">
      <div className="relative bg-white w-full h-fit rounded-lg p-4 space-y-6">
        <h1 className="font-semibold text-3xl md:text-4xl mb-4">
          Create a community
        </h1>
        <hr className="bg-zinc-500 h-px"></hr>
        <div>
          <p className="text-lg font-medium">Name</p>
          <p className=" text-xs pb-2">
            Community names including capitalization cannot be changed.
          </p>
          <div className="relative ">
            <p className="absolute text-sm left-0 w-8 inset-y-0  text-zinc-400 grid place-items-center">
              r/
            </p>
            <Input
              className="pl-6"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
        <div className="flex mt-5 gap-4 justify-end">
          <Button variant="subtle" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => createCommunity()}
            isLoading={isLoading}
            disabled={input.length == 0 || isLoading}
          >
            Create Community
          </Button>
        </div>
      </div>
    </li>
  )
}

export default Page
