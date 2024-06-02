import { buttonVariants } from "@/components/ui/Button"
import { getAuthSession } from "@/lib/auth"
import { HomeIcon } from "lucide-react"
import Link from "next/link"
import CustomFeed from "@/components/CustomFeed"
import GeneralFeed from "@/components/GeneralFeed"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default async function Home() {
  const session = await getAuthSession()
  return (
    <>
      <h1 className="text-3xl font-bold md:text-4xl">Your feed</h1>
      <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4">
        {/* feed */}
        {/* @ts-expect-error server component */}
        {session ? <CustomFeed /> : <GeneralFeed />}
        {/* subreddit info */}
        <div className="h-fit order-first md:order-last  rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-emerald-100 flex items-center gap-2 px-6 py-4">
            <HomeIcon className="w-4 h-4" />
            <span className="font-semibold">Home</span>
          </div>
          <div className="divide-gray-100 p-6 flex flex-col justify-between gap-6 text-sm leading-6">
            {/* todo:fixed when scrolling */}
            <p className="text-zinc-500">
              Your personal Breadit homepage come here to check in with your
              favorite communities.
            </p>
            <Link href="/r/create" className={`${buttonVariants()} w-full`}>
              Create Community
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
