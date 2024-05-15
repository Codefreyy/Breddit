import type { Post } from "@prisma/client"
import { FC } from "react"

interface PostProps {
  post: Post
}

const Post: FC<PostProps> = ({ post }) => {
  return <div>{post.title}</div>
}

export default Post
