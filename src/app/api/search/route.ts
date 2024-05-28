import { db } from "@/lib/db"

export async function GET(req: Request) {
    try {
        // get the query params
        const url = new URL(req.url)
        const q = url.searchParams.get('q')

        if (!q) return new Response('No query provided', { status: 400 })
        const res = await db.subreddit.findMany({
            where: {
                name: {
                    contains: q
                }
            },
            include: {
                _count: true
            },
            take: 5
        })

        return new Response(JSON.stringify(res), { status: 200 })


    } catch (error) {

    }
}