import { User } from "@prisma/client"
import { FC } from "react"
import { Avatar, AvatarFallback } from "./ui/Avatar"
import Image from "next/image"
import { Icons } from "./Icons"
import { AvatarProps } from "@radix-ui/react-avatar"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative w-full h-full aspect-square">
          <Image
            fill
            src={user.image}
            alt="user profile"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icons.user className="bg-zinc-100" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}

export default UserAvatar
