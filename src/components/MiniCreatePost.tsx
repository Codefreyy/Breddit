"use client"

import { Session } from "next-auth"
import UserAvatar from "./UserAvatar"
import { Input } from "./ui/Input"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/Button"
import { ImageIcon, Link2 } from "lucide-react"

export function MiniCreatePost({ session }: { session: Session | null }) {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <>
      <div className="overflow-hidden rounded-md bg-white shadow">
        <div className="h-full px-6 py-4 flex items-center justify-between gap-6">
          <div className="relative">
            <UserAvatar
              user={{
                name: session?.user.image || null,
                image: session?.user.image || null,
              }}
              className="w-6 h-6"
            />
            <span className="absolute bottom-0 right-0 bg-green-500 rounded-full outline outline-2 outline-white  w-2 h-2" />
          </div>
          <Input
            onClick={() => router.push(pathname + "/submit")}
            readOnly
            placeholder="Create Post"
          />
          <div className="flex">
            <Button
              variant="ghost"
              onClick={() => router.push(pathname + "/submit")}
            >
              <ImageIcon className="text-zinc-600" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push(pathname + "/submit")}
            >
              <Link2 className="text-zinc-600" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
