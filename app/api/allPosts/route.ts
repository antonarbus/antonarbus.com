import { NextResponse } from 'next/server'

// Make this route dynamic so it doesn't get pre-rendered at build time
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Load the generated exports file at runtime
    // Use relative path from project root for both dev and production
    const { postsData } = await import('../../../exportAllPosts.js')

    const posts = Object.entries(postsData).map(([fileName, post]: [string, any]) => ({
      fileName,
      url: `/posts/${fileName}`,
      ...post
    }))

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error loading posts:', error)
    return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 })
  }
}
