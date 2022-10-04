import { TagInHint } from './TagInHint'
import { useContext } from 'react'
import { PostsContext } from '/pages/posts/index'
import { PostInHint } from './PostInHint'

export function Hints(props) {
  const { hints, tabPosHint } = useContext(PostsContext)

  return (
    <>
      {hints.map((hint, index) => {
        if (!hint.title) {
          return (
            <TagInHint
              key={`tag-${hint}`}
              tag={hint}
              tabbed={index === tabPosHint}
            />
          )
        }
        if (hint.title) {
          return (
            <PostInHint
              key={`hint-${hint.title}`}
              url={hint.url}
              title={hint.title}
              tabbed={index === tabPosHint}
            />
          )
        }
        return false
      })}
    </>
  )
}
