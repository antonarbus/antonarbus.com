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
import { parseAsInteger, useQueryState } from 'nuqs'
import { NuqsAdapter } from 'nuqs/adapters/react'

const Component = () => {
  const [hello, setHello] = useQueryState('hello', { defaultValue: '' })
  const [count, setCount] = useQueryState('count', parseAsInteger.withDefault(0))

  return (
    <div style={{ border: '1px solid grey', padding: '10px' }}>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>{' '}
      <input
        value={hello}
        placeholder="Enter your name"
        onChange={(e) => setHello(e.target.value || null)}
      />
      <p>Hello, {hello || 'anonymous visitor'}!</p>
      <i>Check dynamically changing url and refresh the page to test values persistence</i>
    </div>
  )
}

const App = () => (
  <NuqsAdapter>
    <Component />
  </NuqsAdapter>
)

const postObj = {
  title: 'nuqs',
  date: '2025.01.07',
  tags: ['tools', 'react'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'search params state manager',
  body: (
    <>
      <H>nuqs</H>
      <ul>
        <li>
          <Lnk path="https://www.npmjs.com/package/nuqs">https://www.npmjs.com/package/nuqs</Lnk>
        </li>
        <li>Search params state manager for React</li>
      </ul>

      <App />

      <Code block jsx>{`
        import { parseAsInteger, useQueryState } from 'nuqs'
        import { NuqsAdapter } from 'nuqs/adapters/react'

        const Component = () => {
          const [hello, setHello] = useQueryState('hello', { defaultValue: '' })
          const [count, setCount] = useQueryState('count', parseAsInteger.withDefault(0))

          return (
            <div style={{ border: '1px solid grey', padding: '10px' }}>
              <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>{' '}
              <input
                value={hello}
                placeholder="Enter your name"
                onChange={(e) => setHello(e.target.value || null)}
              />
              <p>Hello, {hello || 'anonymous visitor'}!</p>
              <i>Check dynamically changing url and refresh the page to test values persistence</i>
            </div>
          )
        }

        const App = () => (
          <NuqsAdapter>
            <Component />
          </NuqsAdapter>
        )
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
