// https://nextjs.org/docs/api-reference/next/server
// https://github.com/vercel/examples/blob/main/edge-functions/basic-auth-password/pages/_middleware.ts
import { NextResponse } from 'next/server'

export function middleware(req) {
  return NextResponse.rewrite('https://google.com')
}

export const config = {
  matcher: ['/private', '/private/:path*']
}
