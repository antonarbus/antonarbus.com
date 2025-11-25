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
  [key: string]: any
}

export default function PostPageClient(props: PostPageClientProps) {
  const [isLoading, setIsLoading] = useState(true)
  const postObj = useRef<any>({})

  async function loadPost(fileName: string, ext: string) {
    const module = await import(`/posts/${fileName}.${ext}`)
    postObj.current = module.default
    setTimeout(() => { setIsLoading(false) }, 350)
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
      {isLoading && props.postExists && <div style={{ color: '#dfdfdf' }}>{props.bodyStr}</div>}
      {!isLoading && props.postExists && <OnePost post={{ ...props, ...postObj.current }} />}
    </>
  )
}
