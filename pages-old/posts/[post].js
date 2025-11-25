import { useState, useEffect, useRef } from 'react'
import { OnePost } from '/components/post/OnePost'
import PageWithComponentInTheMiddle from '/components/post/PageWithComponentInTheMiddle'
import SpinnerPage from '/components/post/SpinnerPage'
import Head from 'next/head'

export default function Post(props) {
  const [isLoading, setIsLoading] = useState(true)
  const postObj = useRef({})

  async function loadPost(fileName, ext) {
    const module = await import(`/posts/${fileName}.${ext}`)
    postObj.current = module.default
    setTimeout(() => { setIsLoading(false) }, 350)
  }

  useEffect(() => {
    loadPost(props.fileName, props.ext)
  }, [])

  return (
    <>
      <Head>
        <title key="title">{props.title}</title>
        <meta key="description" name="description" content={props.desc} />
        <meta key="og-title" property="og:title" content={props.title} />
        <meta key="og-type" property="og:type" content="website" />
        <meta key="og-url" property="og:url" content={`https://antonarbus.com/posts/${props.fileName}`} />
        <meta key="og-image" property="og:image" content={props.imgUrl || 'https://antonarbus.com/favicon.png?v999'} />
        <meta key="og-description" property="og:description" content={props.desc} />
      </Head>

      {!props.postExists && <PageWithComponentInTheMiddle text="post doesn't exist" />}
      {isLoading && <SpinnerPage />}
      {isLoading && props.postExists && <div style={{ color: '#dfdfdf' }}>{props.bodyStr}</div>}
      {!isLoading && props.postExists && <OnePost post={{ ...props, ...postObj.current }} />}
    </>
  )
}

export async function getStaticPaths() {
  const module = await import('/exportAllPosts.js')
  const fileNames = Object.keys(module)
  const posts = Object.values(module)
  const postNames = posts.map((post, index) => fileNames[index])
  // console.log('postNames')
  // console.log(postNames)
  const paths = postNames.map(postName => ({
    params: { post: postName }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ req, res, params }) {
  const fs = require('fs')
  const fileName = params.post

  let ext = null
  if (!ext && fs.existsSync(`posts/${fileName}.js`)) ext = 'js'
  if (!ext && fs.existsSync(`posts/${fileName}.jsx`)) ext = 'jsx'
  if (!ext && fs.existsSync(`posts/${fileName}.ts`)) ext = 'ts'
  if (!ext && fs.existsSync(`posts/${fileName}.tsx`)) ext = 'tsx'
  const postExists = !!ext

  const path = `posts/${fileName}.${ext}`

  let module
  let post = { path, postExists, fileName, ext }

  if (postExists) {
    module = await import(`/posts/${fileName}.${ext}`)
    post = { ...post, ...module.post }
  }

  return {
    props: {
      ...post
    }
  }
}
