import UsernameForm from "@/components/UsernameForm"
import { authOptions, getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const session = await getAuthSession()
  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-bold md:text-4xl">Settings</h1>

        <UsernameForm
          user={{
            id: session?.user.id,
            username: session?.user.username ?? "",
          }}
        />
      </div>
    </div>
  )
}
