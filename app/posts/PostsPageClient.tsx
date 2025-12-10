'use client'

import Search from '/components/search/Search'
import { PostLinks } from '/components/posts/PostLinks'
import { PostsContext } from '/contexts/PostsContext'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SpinnerPage from '/components/post/SpinnerPage'

export default function PostsPageClient() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState<any[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [titles, setTitles] = useState<string[]>([])
  const [foundPostsState, setFoundPostsState] = useState<any[]>([])
  const [inputValState, setInputValState] = useState('')
  const [showHintsState, setShowHintsState] = useState(false)
  const [hints, setHints] = useState<any[]>([])
  const [postsOrdered, setPostsOrdered] = useState(false)

  const [itemsInInput, setItemsInInput] = useState([])
  const [tabPosPost, setTabPosPost] = useState(-1)
  const [tabPosHint, setTabPosHint] = useState(-1)
  const hintsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const btnCancelRef = useRef<HTMLButtonElement>(null)
  const searchBtnRef = useRef<HTMLButtonElement>(null)
  const isHintsContainer = useRef(false)

  const postsContextVal = {
    posts,
    tags,
    titles,
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
    function keyDownHandler(e: KeyboardEvent) {
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
        router.push(foundPostsState[tabPosPost].url)
        setTabPosPost(-1)
      }

      if ((e.code === 'Enter' || e.code === 'NumpadEnter') && tabPosHint !== -1 && isHintsContainer.current) {
        e.preventDefault()
        if (hintsRef.current) {
          Array.from(hintsRef.current.children)[tabPosHint]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        }
        setTabPosHint(-1)
      }
    }

    document.addEventListener('keydown', keyDownHandler)
    return () => { document.removeEventListener('keydown', keyDownHandler) }
  }, [tabPosPost, hints, tabPosHint, foundPostsState, router])

  // Load posts data on client side from static JSON file
  useEffect(() => {
    async function loadPosts() {
      const response = await fetch('/posts.json')
      const postsData = await response.json()

      setPosts(postsData)
      setFoundPostsState(postsData)

      let tagsData = postsData
        .map((post: any) => post.tags || [])
        .flat(Infinity)
        .filter((tag: any) => tag && typeof tag === 'string') as string[]
      tagsData = [...new Set(tagsData)].sort((a, b) => a.localeCompare(b))
      setTags(tagsData)

      const titlesData = postsData
        .map((post: any) => post.title || post.fileName)
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b))
      setTitles(titlesData)

      setHints([...tagsData, ...postsData])
      setIsLoading(false)
    }

    loadPosts()
  }, [])

  return (
    <>
      {isLoading && <SpinnerPage />}
      {!isLoading && (
        <PostsContext.Provider value={postsContextVal}>
          <Search />
          <PostLinks />
        </PostsContext.Provider>
      )}
    </>
  )
}
