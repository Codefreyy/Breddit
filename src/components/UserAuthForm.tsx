"use client"

import { cn } from "@/lib/utils"
import React, { FC, useState } from "react"
import { Button } from "./ui/Button"
import { Icons } from "./Icons"
import { signIn } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const signInWithGoogle = () => {
    setIsLoading(true)
    try {
      signIn("google")
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error signing in with Google. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        isLoading={isLoading}
        onClick={signInWithGoogle}
        size="sm"
        className="w-full"
      >
        {isLoading ? null : <Icons.google className="w-4 h-4 mr-2" />}
        Google
      </Button>
    </div>
  )
}

export default UserAuthForm
