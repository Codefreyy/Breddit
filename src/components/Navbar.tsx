import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/Button"
import { Icons } from "./Icons"

export default function Navbar() {
  return (
    <div className="fixed top-0 inset-x-0  h-fit  py-2 border-b border-zinc-300 bg-zinc-100 z-[10] ">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* icon */}
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="w-8 h-8 sm:w-6 sm:h-6" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            {" "}
            Breddit
          </p>
        </Link>

        <Link href="/sign-in" className={buttonVariants()}>
          Sign In
        </Link>
      </div>
    </div>
  )
}
