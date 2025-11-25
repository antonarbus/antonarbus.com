'use client'

import { TagInHint } from './TagInHint'
import { useContext } from 'react'
import { PostsContext } from '/contexts/PostsContext'
import { PostInHint } from './PostInHint'

export function Hints(props) {
  const { hints, tabPosHint } = useContext(PostsContext)

  return (
    <>
      {hints.map((hint, index) => {
        // Check if it's a string (tag) or object (post)
        if (typeof hint === 'string') {
          return (
            <TagInHint
              key={`tag-${hint}`}
              tag={hint}
              tabbed={index === tabPosHint}
            />
          )
        }
        // It's a post object
        if (typeof hint === 'object' && hint !== null) {
          return (
            <PostInHint
              key={`hint-${hint.fileName || hint.title || index}`}
              url={hint.url}
              title={hint.title || hint.fileName}
              tabbed={index === tabPosHint}
            />
          )
        }
        return null
      })}
    </>
  )
}
