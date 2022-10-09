import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'
import { css } from '@emotion/react'

function Component() {
  return (
    <div
      css={css`
        * {
          border: 2px solid grey;
          padding: 20px;
        }
        .inner {
          background-color: white;
        }
        .outer:has(.inner) {
          background-color: red;
        }
      `}
    >
      <div className='outer'>
        Outer element
        <div className='inner'>
          Inner element
        </div>
      </div>
    </div>
  )
}

const postObj = {
  title: 'has selector',
  date: '2022.10.09',
  tags: ['css'],
  imgUrl: 'https://antonarbus.com/imgs/css.png',
  desc: 'css :has parent selector in css',
  body: (
    <>
      <H>:has selector</H>

      <p>Selector selects all elements with class <code>.outer</code> which contains an element with the class <code>.inner</code> and applies red background.</p>

      <Code block jsx>{`
      function Component() {
        return (
          <div
            css={css\`
              * {
                border: 2px solid grey;
                padding: 20px;
              }
              .inner {
                background-color: white;
              }
              .outer:has(.inner) {
                background-color: red;
              }
            \`}
          >
            <div
              className='outer'
              // css={{ border: '1px solid grey', padding: '20px' }}
            >
              Outer element
              <div
                className='inner'
                // css={{ border: '1px solid grey', padding: '20px' }}
              >
                Inner element
              </div>
            </div>
          </div>
        )
      }
      `}</Code>

      <Component />

      <H>Pass multiple selectors</H>

      <Code block css>{`
      .heading:has(> .subtitle strong#accent) { }
      `}</Code>

      <p>Selects any <code>.heading</code> element that has a direct child with the class <code>.subtitle</code> which contains a <code>strong</code> element in it with the id <code>accent</code>.</p>

      <H>Another example</H>

      <Code block css>{`
      .heading:has(.subtitle) p { }
      `}</Code>

      <p>Selects any <code>p</code> tag that is inside a <code>.heading</code> element as long as that <code>.heading</code> element contains a <code>.subtitle</code> element</p>

      <H>Multiple has selectors</H>

      <Code block css>{`
      .heading:has(.subtitle, p) { }
      `}</Code>

      <p>Select a <code>.heading</code> that has either an element with the class of <code>.subtitle</code> inside it or a <code>p</code> element inside it </p>

      <Code block css>{`
      .heading:has(.subtitle):has(p) { }
      `}</Code>

      <p>Only select a <code>.heading</code> that has both a <code>.subtitle</code> and <code>p</code> element inside it</p>
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
