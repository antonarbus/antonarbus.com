import type { Metadata } from 'next'
import PostPageClient from './PostPageClient'
import fs from 'fs'

interface PostPageProps {
  params: Promise<{ post: string }>
}

// Generate static pages at build time
export const dynamic = 'force-static'

// Generate all post pages at build time
export async function generateStaticParams() {
  const files = fs.readdirSync('./posts/')
  const posts = files
    .filter(fileName =>
      (fileName.includes('.js') || fileName.includes('.ts') || fileName.includes('.jsx') || fileName.includes('.tsx')) &&
      fileName !== '_xxx.js' &&
      fileName !== 'index.js' &&
      !fileName.includes('.test.js')
    )
    .map(fileName => ({
      post: fileName.replace('.jsx', '').replace('.tsx', '').replace('.js', '').replace('.ts', '')
    }))

  return posts
}

// Generate basic metadata without importing post modules
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { post: fileName } = await params

  return {
    title: fileName,
    description: 'Blog post',
    openGraph: {
      title: fileName,
      type: 'website',
      url: `https://antonarbus.com/posts/${fileName}`,
      images: ['https://antonarbus.com/favicon.png?v999'],
    },
  }
}

// Server Component - just check if file exists and pass to client
export default async function PostPage({ params }: PostPageProps) {
  const { post: fileName } = await params

  let ext = null
  if (fs.existsSync(`posts/${fileName}.js`)) ext = 'js'
  if (!ext && fs.existsSync(`posts/${fileName}.jsx`)) ext = 'jsx'
  if (!ext && fs.existsSync(`posts/${fileName}.ts`)) ext = 'ts'
  if (!ext && fs.existsSync(`posts/${fileName}.tsx`)) ext = 'tsx'
  const postExists = !!ext

  // Pass minimal data to client - client will load the full post
  return <PostPageClient fileName={fileName} ext={ext || ''} postExists={postExists} />
}
