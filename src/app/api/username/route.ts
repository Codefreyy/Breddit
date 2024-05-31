import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { UsernameFormValidator } from "@/lib/validators/form"

export async function PATCH(req: Request) {
    try {

        const body = await req.json()

        const { name } = UsernameFormValidator.parse(body)

        const session = await getAuthSession()
        if (!session) {
            return new Response("Unauthorized", { status: 401 })
        }

        const username = await db.user.findFirst({
            where: {
                name
            }
        })

        if (username) {
            return new Response("Username already exists", { status: 409 })
        }

        await db.user.update({
            where: {
                id: session.user.id
            },
            data: {
                name
            }
        })

        return new Response('Username updated successfully.', { status: 200 })

    } catch (error) {
        return new Response("Something went wrong.", { status: 500 })
    }
}