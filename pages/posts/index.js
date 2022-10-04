import Head from 'next/head'
import Search from '/components/search/Search'
import { PostLinks } from '/components/posts/PostLinks'
import { createContext, useState, useRef, useEffect } from 'react'
import Router from 'next/router'
import SpinnerPage from '/components/post/SpinnerPage'

export const PostsContext = createContext()

export default function Index(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [foundPostsState, setFoundPostsState] = useState(props.posts)
  const [inputValState, setInputValState] = useState('')
  const [showHintsState, setShowHintsState] = useState(false)
  const [hints, setHints] = useState([...props.tags, ...props.posts])
  const [postsOrdered, setPostsOrdered] = useState(false)

  const [itemsInInput, setItemsInInput] = useState([])
  const [tabPosPost, setTabPosPost] = useState(-1)
  const [tabPosHint, setTabPosHint] = useState(-1)
  const hintsRef = useRef()
  const inputRef = useRef()
  const btnCancelRef = useRef()
  const searchBtnRef = useRef()
  const isHintsContainer = useRef(false)

  const postsContextVal = {
    posts: props.posts,
    tags: props.tags,
    titles: props.titles,
    inputValState,
    setInputValState,
    foundPostsState,
    setFoundPostsState,
    showHintsState,
    setShowHintsState,
    itemsInInput,
    setItemsInInput,
    tabPosPost,
    setTabPosPost,
    tabPosHint,
    setTabPosHint,
    hintsRef,
    inputRef,
    btnCancelRef,
    searchBtnRef,
    isHintsContainer,
    hints,
    setHints,
    postsOrdered,
    setPostsOrdered
  }

  // tab to jump on next post
  useEffect(() => {
    function keyDownHandler(e) {
      if (e.code === 'Tab') {
        e.preventDefault()

        if (isHintsContainer.current) {
          setTabPosHint(prevVal => {
            const isLastHint = prevVal === hints.length - 1
            if (isLastHint) return 0 // jump to the beginning
            return prevVal + 1
          })
        }

        if (!isHintsContainer.current) {
          setTabPosPost(prevVal => {
            const isLastPost = prevVal === foundPostsState.length - 1
            if (isLastPost) return 0 // jump to the beginning
            return prevVal + 1
          })
        }
      }

      if ((e.code === 'Enter' || e.code === 'NumpadEnter') && tabPosPost !== -1 && !isHintsContainer.current) {
        e.preventDefault()
        Router.push(foundPostsState[tabPosPost].url)
        setTabPosPost(-1)
      }

      if ((e.code === 'Enter' || e.code === 'NumpadEnter') && tabPosHint !== -1 && isHintsContainer.current) {
        e.preventDefault()
        Array.from(hintsRef.current.children)[tabPosHint].click()
        setTabPosHint(-1)
      }
    }

    document.addEventListener('keydown', keyDownHandler)
    return () => { document.removeEventListener('keydown', keyDownHandler) }
  }, [tabPosPost, hints, tabPosPost, tabPosHint])

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      <Head>
        <title key="title">Posts</title>
        <meta key="description" name='description' content='Posts about web dev' />
        <meta key="og-title" property="og:title" content="Posts" />
        <meta key="og-description" property="og:description" content="Posts about web dev" />
        <meta key="og-url" property="og:url" content="https://antonarbus.com/posts" />
        <meta key="og-type" property="og:type" content="website" />
        <meta key="og-image" property="og:image" content="https://antonarbus.com/favicon.png?v999" />
      </Head>
      {isLoading && <SpinnerPage />}
      <PostsContext.Provider value={postsContextVal}>
        <Search />
        <PostLinks />
      </PostsContext.Provider>
    </>
  )
}

// export async function getStaticProps() {
export async function getStaticProps({ req, res }) {
  const module = await import('/exportAllPosts.js')
  const fileNames = Object.keys(module)
  const posts = Object.values(module)
  posts.forEach((post, index) => {
    post.fileName = fileNames[index]
    post.url = `/posts/${fileNames[index]}`
    delete post.bodyStr // coz it is huge
  })

  let tags = posts.map(post => post.tags).flat(Infinity)
  tags = [...new Set(tags)].sort((a, b) => a.localeCompare(b))
  const titles = posts.map(post => post.title).sort((a, b) => a.localeCompare(b))

  // pass it into the component as props
  return {
    props: {
      posts,
      tags,
      titles
    }
  }
}
