'use client'

import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'
import { Spinner } from '../helpers/Spinner'

const postObj = {
  title: 'spinner',
  date: '2022.04.20',
  tags: ['react'],
  desc: 'spinner component',
  body: (
    <>
      <H>SVG spinner component</H>

      <p>
        Taken from{' '}
        <Lnk path="https://codepen.io/supah/pen/BjYLdW">https://codepen.io/supah/pen/BjYLdW</Lnk>
      </p>

      <Code block jsx>{`
      // functions\\Spinner.js
      function Spinner({ color, width, height }) {
        return (
          <svg className="spinner" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>

            <style jsx>{\`
            .spinner {
              animation: rotate 2s linear infinite;
              width: \${width ? width : 'auto'};
              height: \${height ? height : 'auto'};
            }
            .spinner .path {
              stroke: \${color ? color : 'lightgrey'};
              stroke-linecap: round;
              animation: dash 1.5s ease-in-out infinite;
            }
            @keyframes rotate {
              100% {
                transform: rotate(360deg);
              }
            }
            @keyframes dash {
              0% {
                stroke-dasharray: 1, 150;
                stroke-dashoffset: 0;
              }
              50% {
                stroke-dasharray: 90, 150;
                stroke-dashoffset: -35;
              }
              100% {
                stroke-dasharray: 90, 150;
                stroke-dashoffset: -124;
              }
            }
            \`}</style>
          </svg>
        )
      }
      `}</Code>

      <H>With props and default</H>

      <Code block jsx>{`
      <Spinner width='30px' color='red'/>  
      <Spinner/>
      `}</Code>

      <Spinner width="30px" color="red" />
      <Spinner />
    </>
  )
}

export default postObj

export const post = {
  title: postObj.title,
  date: postObj.date,
  tags: postObj.tags,
  desc: postObj.desc,
  imgUrl: postObj.imgUrl || null,
  bodyStr: jsxToStr(postObj.body)
}
