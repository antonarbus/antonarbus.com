'use client'


import {
  Code,
  H,
  Hs,
  LazyImg,
  Lnk,
  React,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  jsxToStr,
  ComponentFromHtmlString
} from '/components/post/reExport'

const postObj = {
  title: 'grid',
  date: '2025.01.26',
  tags: ['css'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'display: grid',
  body: (
    <>
      <H>display: grid</H>

      <p>Add content...</p>

      <H>Responsive columns layout</H>

      <ComponentFromHtmlString
        htmlString={`
              <html>
                <head>
                  <style>
                    .parent {
                      display: grid;
                      grid-template-columns: repeat(auto-fit, 200px);
                      gap: 20px;
                      justify-content: center;
                      width: 100%;
                    }
    
                    .child {
                      width: 100%;
                      height: 200px;
                      border: 1px solid grey;
                    }
                  </style>
                </head>
                <body>
                  <div class="parent">
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                  </div>
                </body>
              </html>
            `}
      />
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
