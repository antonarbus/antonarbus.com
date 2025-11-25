'use client'

import { useContext } from 'react'
import { LinkBox } from './LinkBox'
import { PostsContext } from '/contexts/PostsContext'

export function PostLinks(props) {
  const { foundPostsState, tabPosPost, postsOrdered, setPostsOrdered } = useContext(PostsContext)

  return (
    <>
      <div className="center">
        <div className='posts-info'>
          {foundPostsState.length ? foundPostsState.length : 'Not found '}
          {foundPostsState.length ? ' posts' : ''}
          {foundPostsState.length ? <span> ordered by <span className='clickable' onClick={() => { setPostsOrdered(!postsOrdered) }}>{postsOrdered ? 'date' : 'name'}</span></span> : ''}
        </div>
        <div className="container">
          {[...foundPostsState]
            .sort((a, b) => {
              if (postsOrdered) {
                const dateA = a.date || ''
                const dateB = b.date || ''
                return dateB.localeCompare(dateA)
              } else {
                const titleA = a.title || a.fileName || ''
                const titleB = b.title || b.fileName || ''
                return titleA.localeCompare(titleB)
              }
            })
            .map((post, index) => (
            <LinkBox
              key={post.fileName || post.title || index}
              tabbed={(index === tabPosPost)}
            >
              <a href={post.url}>{post.title || post.fileName}</a>
            </LinkBox>
            ))}
        </div>
      </div>

      <style jsx>{`
        .center {
          position: absolute;
          left: 0;
          right: 0;
          top: 82px;
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .posts-info {
          display: block;
          margin: 25px 0px;
          font-size: 18px;
          text-align: center;
          font-weight: 400;
        }
        .clickable {
          color: gray;
          cursor: pointer;
        }
        a {
          color: #0083bf;
          text-decoration: none;
          display: inline-block;
          position: relative;
          overflow: hidden;
          vertical-align: bottom;
        }
        a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 17px;
          background-color: #0083bf;
          transform: translateX(-100%) translateY(1em);
        }
        a:hover::after,
        a:focus::after {
          transform: translateX(0%) translateY(1em);
          transition: transform 300ms;
        }
      `}</style>
    </>
  )
}
