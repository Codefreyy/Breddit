"use client"

import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { User } from "@prisma/client"
import { Label } from "./ui/Label"
import { useForm } from "react-hook-form"
import { UsernameFormValidator, UsernameType } from "@/lib/validators/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { toast } from "@/hooks/use-toast"

interface UsernameFormProps {
  user: Pick<User, "id" | "name">
  className: string
}

export default function UsernameForm({
  user,
  className,
  ...props
}: UsernameFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UsernameType>({
    resolver: zodResolver(UsernameFormValidator),
    defaultValues: {
      name: user?.name || "",
    },
  })

  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async ({ name }: UsernameType) => {
      const payload = { name }
      const res = await axios.patch(`/api/username`, payload)
      return res
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            variant: "destructive",
            description: "Username already exists",
          })
        }
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong",
        })
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Username updated successfully.",
      })
    },
  })

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit((e) => updateUsername(e))}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your username</CardTitle>
          <CardDescription>
            Please enter a display name you are comfortable with.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-[2.5rem] h-[2.3rem] grid place-items-center">
              <span className="text-sm text-zinc-400">u/</span>
            </div>
            <Label className="sr-only">Username</Label>
            <Input
              size={32}
              {...register("name")}
              id="name"
              className="w-[400px] pl-8"
              placeholder={`${user.name}`}
            />
            {errors.name ? (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            ) : null}
          </div>
        </CardContent>
        <CardFooter>
          <Button isLoading={isLoading} type="submit">
            Save
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
