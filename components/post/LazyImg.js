'use client'

// components/post/LazyImg.js
import LazyLoad from 'react-lazyload'
import { Spinner } from '/functions/Spinner'

export function LazyImg(props) {
  return (
    <LazyLoad
      placeholder={<Spinner width='20px'/>}
      offset={100}
      once
      scrollContainer={props.scrollContainer}
    >
      <img
        src={props.src || props.path || props.link}
        height={props.height || 'auto'}
        width={props.width || 'auto'}
      />

      <style jsx>{`
        img {
          box-shadow: ${props.noShadow ? '' : '#898989a3 0px 0px 7px 0px'};
          margin: 0 auto;
          border-radius: 4px;
          margin-top: 10px;
          margin-bottom: 10px;
          display: block;
          max-width: ${props.maxWidth || '100%'};
        }
        @media screen and (max-width: 480px) {
          img {
            max-width: 100%;
          }
        }
      `}</style>
    </LazyLoad>
  )
}
