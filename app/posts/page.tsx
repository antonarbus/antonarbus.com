import type { Metadata } from 'next'
import PostsPageClient from './PostsPageClient'

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Posts about web dev',
  openGraph: {
    title: 'Posts',
    description: 'Posts about web dev',
    url: 'https://antonarbus.com/posts',
    type: 'website',
    images: ['/favicon.png?v999'],
  },
}

export default function PostsPage() {
  // Client component will load the posts via fetch
  return <PostsPageClient />
}
