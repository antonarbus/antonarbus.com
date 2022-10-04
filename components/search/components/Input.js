import { useContext, useEffect } from 'react'
import { PostsContext } from '/pages/posts/index'

export function Input() {
  const {
    setInputValState,
    inputValState,
    tags,
    // setTagsInHintsState,
    posts,
    // setPostsInHintsState,
    itemsInInput,
    setItemsInInput,
    setShowHintsState,
    inputRef,
    btnCancelRef,
    searchBtnRef,
    setTabPosPost,
    setTabPosHint,
    isHintsContainer,
    setHints,
    tabPosPost,
    tabPosHint
  } = useContext(PostsContext)

  function tagsAndPostsForHints(e) {
    const inputVal = e.target.value

    const foundTags = tags.filter(tag => tag.toLowerCase().trim().includes(inputVal.toLowerCase().trim()))
    const foundPosts = posts.filter(post => post.title.toLowerCase().trim().includes(inputVal.toLowerCase().trim()))
    if (foundTags.length === 0 && foundPosts.length === 0) {
      setShowHintsState(false)
      isHintsContainer.current = false
      return
    }

    // setTagsInHintsState(foundTags)
    // setPostsInHintsState(foundPosts)
    setHints([...foundTags, ...foundPosts])

    if (inputVal.trim()) {
      setShowHintsState(true)
      isHintsContainer.current = true
    }
    if (!inputVal.trim()) {
      setShowHintsState(false)
      isHintsContainer.current = false
    }
  }

  function wordsForInput(e) {
    const inputVal = e.target.value
    if (!inputVal.endsWith(' ')) return
    const text = inputVal.trim().replaceAll('+', ' ')
    if (!text) return
    const isItemAlreadyIncluded = itemsInInput.some(item => item.text === true && item.val === text)
    if (isItemAlreadyIncluded) return
    const newItem = { val: text, tag: false, text: true }
    setItemsInInput([...itemsInInput, newItem])
    setInputValState('')
    setShowHintsState(false)
    isHintsContainer.current = false
    setTimeout(() => { searchBtnRef.current.click() })
  }

  function onChangeHandler(e) {
    const inputVal = e.target.value
    setInputValState(inputVal)
    tagsAndPostsForHints(e)
    wordsForInput(e)
  }

  function onKeyDownHandler(e) {
    const inputVal = e.target.value

    if (e.code === 'Backspace') {
      if (inputVal.length !== 0) return
      itemsInInput.pop()
      setItemsInInput([...itemsInInput])
      setTimeout(() => { searchBtnRef.current.click() })
      return
    }
    if (e.code === 'Escape') {
      btnCancelRef.current.click()
      setTabPosPost(-1)
      setTabPosHint(-1)
      return
    }
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && tabPosPost === -1 && tabPosHint === -1) {
      searchBtnRef.current.click()
    }
  }

  useEffect(() => {
    function keyDownHandler(e) {
      if (e.code !== 'Tab' && e.code !== 'Enter' && e.code !== 'NumpadEnter') {
        setTabPosPost(-1)
        setTabPosHint(-1)
        inputRef.current.focus()
      }
    }
    document.addEventListener('keydown', keyDownHandler)
    return () => { document.removeEventListener('keydown', keyDownHandler) }
  }, [])

  return (
    <>
      <input
        ref={inputRef}
        placeholder="Search"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        value={inputValState}
        onKeyDown={onKeyDownHandler}
        onChange={onChangeHandler}
      />

      <style jsx>{`
        input {
          font-size: 20px;
          border: 0px solid grey;
          background: transparent;
          outline-style: none;
          width: 100%;
          padding: 5px;
          height: 100%;
          margin-left: 2px;
          min-width: 100px;
        }
        input::placeholder {
          font-family: 'system-ui', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans',
            'Droid Sans', 'Helvetica Neue', sans-sans;
          font-weight: 100;
        }
      `}</style>
    </>
  )
}
