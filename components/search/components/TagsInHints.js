'use client'

import { TagInHint } from './TagInHint'
import { useContext } from 'react'
import { PostsContext } from '/contexts/PostsContext'

export function TagsInHints(props) {
  const { tagsInHintsState } = useContext(PostsContext)

  return (
    <>
      {tagsInHintsState.map(tag => <TagInHint key={tag} tag={tag} />)}
    </>
  )
}
