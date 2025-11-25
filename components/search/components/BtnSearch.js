'use client'

import { useContext } from 'react'
import { PostsContext } from '/contexts/PostsContext'

export function BtnSearch() {
  const {
    setInputValState,
    inputValState,
    itemsInInput,
    setItemsInInput,
    setFoundPostsState,
    searchBtnRef,
    posts
  } = useContext(PostsContext)

  function search() {
    let newItemsInInput = [...itemsInInput];

    // addTextIntoInputItem
    (() => {
      const text = inputValState.trim()
      if (!text) return
      // add input value text into the
      const isItemAlreadyIncluded = itemsInInput.some(item => item.text === true && item.val === text)
      if (isItemAlreadyIncluded) return
      const newItem = { val: text, tag: false, text: true }
      newItemsInInput = [...itemsInInput, newItem]
      setItemsInInput(newItemsInInput)
      setInputValState('')
    })()

    // filter posts and show on screen
    const tagsToSearch = newItemsInInput.filter(item => item.tag).map(item => item.val)
    const textsToSearch = newItemsInInput.filter(item => item.text).map(item => item.val)
    const foundPosts = posts
      .filter(post => {
        if (!post.tags || !Array.isArray(post.tags)) return tagsToSearch.length === 0
        return tagsToSearch.every(tagToSearch => post.tags.includes(tagToSearch))
      })
      .filter(post => {
        if (!post.bodyStr) return tagsToSearch.length > 0 // If searching by tags only, include posts without bodyStr
        return textsToSearch.every(textToSearch => post.bodyStr.toLowerCase().includes(textToSearch.toLowerCase()))
      })
    setFoundPostsState(foundPosts)
  }

  return (
    <button onClick={search} ref={searchBtnRef}>
      Search

      <style jsx>{`
        button {
          font-size: 20px;
          border-radius: 4px;
          border-width: 1px;
          outline-style: none;
          border-style: solid;
          border-color: #c0c0c0;
          width: auto;
          height: 40px;
          padding: 0px 10px;
          margin-left: 10px;
          cursor: pointer;
          background-color: transparent;
          background-image: linear-gradient(to right bottom,rgb(255 255 255 / 85%),rgb(255 255 255 / 95%));
        }
        button:hover,
        button:focus {
          border-color: grey;
          transition: border-color 200ms ease;
        }
      `}</style>
    </button>
  )
}
