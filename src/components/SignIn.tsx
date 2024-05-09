import Link from "next/link"
import { Icons } from "./Icons"
import UserAuthForm from "./UserAuthForm"

export default function SignIn() {
  return (
    <div className="container mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col text-center space-y-2">
        <Icons.logo className="w-6 h-6 mx-auto" />
        <h1 className="font-semibold text-2xl tracking-tight">Welcome back</h1>
        <p className="max-w-xs text-sm mx-auto">
          By continuing, you are setting up a Breadit account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
      <UserAuthForm />
      <p className="px-8 text-center text-sm text-zinc-700">
        New Breddit User?{" "}
        <Link
          href="sign-up"
          className="hover:text-zinc-800 cursor-pointer text-zinc-700 hover:underline underline-offset-2"
        >
          Sign Up
        </Link>
      </p>
    </div>
  )
}
