import { Button } from "@/components/ui/Button"
import { Editor } from "@/components/Editor"
import { db } from "@/lib/db"

export default async function Page({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
  })
  return (
    <div className="flex flex-col items-start gap-6">
      <div className="border-b pb-5 border-gray-200 ">
        <div className="flex -ml-2 -mt-2 flex-wrap items-baseline">
          <div className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            Create Post
          </div>
          <p className="ml-2 mt-1 truncate text-gray-500 text-sm">
            in r/{slug}
          </p>
        </div>
      </div>

      {/* form */}
      <Editor subredditId={subreddit?.id} />
      <div className="w-full flex justify-end">
        <Button type="submit" className="w-full" form="subreddit-post-form">
          Post
        </Button>
      </div>
    </div>
  )
}
