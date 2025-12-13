import type { Metadata } from 'next'
import PostPageClient from './PostPageClient'
import fs from 'fs'
import { postsData } from '/exportAllPosts'

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

// Generate metadata from serialized post data
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { post: fileName } = await params
  const postData = postsData[fileName]

  return {
    title: postData?.title || fileName,
    description: postData?.desc || 'Blog post',
    openGraph: {
      title: postData?.title || fileName,
      type: 'website',
      url: `https://antonarbus.com/posts/${fileName}`,
      images: [postData?.imgUrl || 'https://antonarbus.com/favicon.png?v999'],
    },
  }
}

// Server Component - pass serialized post data to client
export default async function PostPage({ params }: PostPageProps) {
  const { post: fileName } = await params

  let ext = null
  if (fs.existsSync(`posts/${fileName}.js`)) ext = 'js'
  if (!ext && fs.existsSync(`posts/${fileName}.jsx`)) ext = 'jsx'
  if (!ext && fs.existsSync(`posts/${fileName}.ts`)) ext = 'ts'
  if (!ext && fs.existsSync(`posts/${fileName}.tsx`)) ext = 'tsx'
  const postExists = !!ext

  // Get serialized post data for SEO
  const postData = postsData[fileName] || {}

  // Pass serialized data to client - this will be in the HTML for crawlers
  return (
    <PostPageClient
      fileName={fileName}
      ext={ext || ''}
      postExists={postExists}
      title={postData.title}
      desc={postData.desc}
      date={postData.date}
      tags={postData.tags}
      imgUrl={postData.imgUrl}
      bodyStr={postData.bodyStr}
    />
  )
}
