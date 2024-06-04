"use client"

import { FC } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu"
import UserAvatar from "./UserAvatar"
import { User } from "next-auth"
import Link from "next/link"
import { signOut } from "next-auth/react"
// todo: remove this
import { useRouter } from "next/navigation"

interface UserAccountNavProps {
  user: Pick<User, "image" | "name" | "email">
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="w-8 h-8"
          user={{
            image: user.image || null,
            name: user.name || null,
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col gap-1">
            <div className="font-medium flex gap-3 items-center">
              {user.name}{" "}
            </div>
            <p className="w-[200px] truncate text-sm text-zinc-600">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">Feed</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/r/create">Create community</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            })
          }}
          className="cursor-pointer"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
