import SignIn from "@/components/SignIn"
import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

const page = () => {
  return (
    <div className="absolute inset-0">
      <div className="flex flex-col max-w-2xl h-full justify-center items-center mx-auto gap-20">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start -mt-20"
          )}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Home
        </Link>
        <SignIn />
      </div>
    </div>
  )
}

export default page
