'use client'

import { useState, useEffect, useRef } from 'react'
import { OnePost } from '/components/post/OnePost'
import PageWithComponentInTheMiddle from '/components/post/PageWithComponentInTheMiddle'
import SpinnerPage from '/components/post/SpinnerPage'

interface PostPageClientProps {
  postExists: boolean
  fileName: string
  ext: string
  bodyStr?: string
  title?: string
  desc?: string
  imgUrl?: string
  date?: string
  tags?: string[]
  [key: string]: any
}

export default function PostPageClient(props: PostPageClientProps) {
  const [isLoading, setIsLoading] = useState(true)
  const postObj = useRef<any>({})

  async function loadPost(fileName: string, ext: string) {
    const module = await import(`/posts/${fileName}.${ext}`)
    postObj.current = module.default
    setIsLoading(false)
  }

  useEffect(() => {
    if (props.postExists) {
      loadPost(props.fileName, props.ext)
    } else {
      setIsLoading(false)
    }
  }, [props.fileName, props.ext, props.postExists])

  return (
    <>
      {!props.postExists && <PageWithComponentInTheMiddle text="post doesn't exist" />}
      {isLoading && <SpinnerPage />}
      {/* Render serialized content for SEO - hidden when interactive version loads */}
      {isLoading && props.postExists && (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          {props.title && <h1>{props.title}</h1>}
          {props.date && <div style={{ color: '#666', marginBottom: '10px' }}>{props.date}</div>}
          {props.desc && <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>{props.desc}</p>}
          {props.tags && props.tags.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              {props.tags.map((tag, i) => (
                <span key={i} style={{ marginRight: '10px', color: '#888' }}>#{tag}</span>
              ))}
            </div>
          )}
          <div style={{ color: '#dfdfdf', whiteSpace: 'pre-wrap' }}>{props.bodyStr}</div>
        </div>
      )}
      {!isLoading && props.postExists && <OnePost post={{ ...props, ...postObj.current }} />}
    </>
  )
}
