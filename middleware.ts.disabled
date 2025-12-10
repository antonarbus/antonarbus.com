import { NextResponse } from "next/server";

export function middleware(req) {
  return NextResponse.rewrite('https://google.com')
}

export const config = {
  matcher: ['/private', '/private/:path*']
}
