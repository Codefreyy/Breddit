import Link from "next/link"
import { toast } from "./use-toast"
import { buttonVariants } from "@/components/ui/Button"

export const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Login required",
      description: "Please login to continue",
      variant: "default",
      action: (
        <Link
          onClick={() => dismiss()}
          href="/sign-in"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          Log In
        </Link>
      ),
    })
  }

  return { loginToast }
}
