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
  title: 'Smart spinner',
  date: '2025.05.29',
  tags: ['JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'Avoid spinner for fast fetch',
  body: (
    <>
      <H>Smart spinner</H>

      <ul>
        <li>If action is less than 200 ms spinner may look as unnecessary flicker</li>
        <li>Spinner should not be shown immediately</li>
        <li>Once shown, keep it visible for a minimum duration 500 ms</li>
      </ul>

      <Code block jsx>{`
        import { asyncDelay } from '@shared/utils/delay'

        const MIN_SPINNER_TIME = 400
        const SPINNER_DELAY = 200

        const sayHelloAfterDelay = async (): Promise<'Hello'> => {
          await asyncDelay(300)

          return 'Hello'
        }

        const checkWetherToShowSpinnerOrNot = async (): Promise<'show spinner'> => {
          await asyncDelay(SPINNER_DELAY)

          return 'show spinner'
        }

        const onClick = async (): Promise<void> => {
          const res = await Promise.race([
            checkWetherToShowSpinnerOrNot(),
            sayHelloAfterDelay(),
          ])

          if (res !== 'show spinner') {
            console.log('✅ Fast response, no spinner')
            console.log(res)

            return
          }

          if (res === 'show spinner') {
            console.log('⏳ Show spinner')

            const spinnerStart = Date.now()
            const finalRes = await sayHelloAfterDelay()
            const spinnerTime = Date.now() - spinnerStart
            const remaining = MIN_SPINNER_TIME - spinnerTime

            if (remaining > 0) {
              console.log('⏳ Extend spinner a bit')
              await asyncDelay(remaining) // ensure spinner is visible for min time
            }

            console.log('✅ Done:', finalRes)
          }
        }

        export const TestPage = (): React.JSX.Element => {
          return (
            <button
              onClick={onClick}
              type='button'
            >
              Click me
            </button>
          )
        }
      `}</Code>
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
