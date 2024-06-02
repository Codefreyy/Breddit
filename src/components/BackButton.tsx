"use client"
import { ChevronLeft } from "lucide-react"
import { FC } from "react"
import { buttonVariants } from "./ui/Button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface BackButtonProps {}

const BackButton: FC<BackButtonProps> = ({}) => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.back()}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "self-start -mt-20 hover:cursor-pointer"
      )}
    >
      <ChevronLeft className="w-4 h-4" />
      {"Back to community"}
    </div>
  )
}

export default BackButton
