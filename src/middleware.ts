import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

    const token = await getToken({ req })
    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', req.url))
    }
}

export const config = {
    matcher: ['/r/create', '/r/:path*/submit'],
}