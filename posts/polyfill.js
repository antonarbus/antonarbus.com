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
  title: 'polyfill',
  date: '2026.01.23',
  tags: ['tools'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'polyfill',
  body: (
    <>
      <H>polyfill</H>

      <ul>
        <li>Old browsers may not support modern browser api</li>
        <li>
          You need to register globally a function with same name but supported implementation
        </li>
        <li>Execute registration at the very start or at least before new api is used</li>
      </ul>

      <Code block jsx>{`
        // polyfills.ts

        /**
         * Polyfills for older browsers
         * Must be imported at the top of the app entry point
         */

        // Empty export to make this a valid ES module for TypeScript
        export {}

        // Promise.withResolvers() - ES2024
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers
        if (typeof Promise.withResolvers === 'undefined') {
          Promise.withResolvers = function <T>() {
            let resolve!: (value: T | PromiseLike<T>) => void
            let reject!: (reason?: unknown) => void

            // eslint-disable-next-line promise/param-names
            const promise = new Promise<T>((res, rej) => {
              resolve = res
              reject = rej
            })

            return { promise, resolve, reject }
          }
        }

        // structuredClone() - Baseline 2022
        // https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
        if (typeof structuredClone === 'undefined') {
          ;(globalThis as Record<string, unknown>).structuredClone = <T>(obj: T): T => {
            return JSON.parse(JSON.stringify(obj)) as T
          }
        }
      `}</Code>

      <Code block jsx>{`
        // polyfills.test.ts

        import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

        describe('Promise.withResolvers polyfill implementation', () => {
          const PromiseWithResolversOriginal = Promise.withResolvers

          beforeEach(async () => {
            vi.resetModules()
            // @ts-expect-error - intentionally deleting to test polyfill
            delete Promise.withResolvers
          })

          afterEach(() => {
            Promise.withResolvers = PromiseWithResolversOriginal
          })

          it('returns an object with promise, resolve, and reject', async () => {
            await import('./polyfills')

            const deferred = Promise.withResolvers()

            expect(deferred).toHaveProperty('promise')
            expect(deferred).toHaveProperty('resolve')
            expect(deferred).toHaveProperty('reject')
            expect(deferred.promise).toBeInstanceOf(Promise)
            expect(typeof deferred.resolve).toEqual('function')
            expect(typeof deferred.reject).toEqual('function')
          })

          it('resolves the promise when resolve is called', async () => {
            await import('./polyfills')

            const deferred = Promise.withResolvers()
            deferred.resolve('test value')

            await expect(deferred.promise).resolves.toEqual('test value')
          })

          it('rejects the promise when reject is called', async () => {
            await import('./polyfills')

            const deferred = Promise.withResolvers()
            deferred.reject(new Error('test error'))

            await expect(deferred.promise).rejects.toThrow('test error')
          })

          it('works with different types', async () => {
            await import('./polyfills')

            const numberDeferred = Promise.withResolvers()
            const objectDeferred = Promise.withResolvers()

            numberDeferred.resolve(42)
            objectDeferred.resolve({ id: 1 })

            await expect(numberDeferred.promise).resolves.toEqual(42)
            await expect(objectDeferred.promise).resolves.toEqual({ id: 1 })
          })

          it('each call returns independent deferred objects', async () => {
            await import('./polyfills')

            const deferred1 = Promise.withResolvers()
            const deferred2 = Promise.withResolvers()

            deferred1.resolve('first')
            deferred2.resolve('second')

            await expect(deferred1.promise).resolves.toEqual('first')
            await expect(deferred2.promise).resolves.toEqual('second')
          })

          it('does not override existing Promise.withResolvers', async () => {
            const mockWithResolvers = vi.fn()
            Promise.withResolvers = mockWithResolvers

            await import('./polyfills')

            expect(Promise.withResolvers).toBe(mockWithResolvers)
          })
        })

        describe('structuredClone polyfill implementation', () => {
          const structuredCloneOriginal = globalThis.structuredClone

          beforeEach(() => {
            vi.resetModules()
            // @ts-expect-error - intentionally deleting to test polyfill
            delete globalThis.structuredClone
          })

          afterEach(() => {
            globalThis.structuredClone = structuredCloneOriginal
          })

          it('clones primitive values', async () => {
            await import('./polyfills')

            expect(structuredClone('string')).toEqual('string')
            expect(structuredClone(123)).toEqual(123)
            expect(structuredClone(true)).toEqual(true)
            expect(structuredClone(null)).toEqual(null)

            expect(structuredClone({ a: 1, b: { c: 2 } })).toEqual({
              a: 1,
              b: { c: 2 },
            })
          })

          it('modifications to clone do not affect original', async () => {
            await import('./polyfills')

            const original = { nested: { value: 1 } }
            const cloned = structuredClone(original)

            cloned.nested.value = 999

            expect(original.nested.value).toEqual(1)
            expect(cloned.nested.value).toEqual(999)
          })

          it('does not override existing structuredClone', async () => {
            const mockStructuredClone = vi.fn()
            globalThis.structuredClone = mockStructuredClone

            await import('./polyfills')

            expect(globalThis.structuredClone).toBe(mockStructuredClone)
          })
        })
      `}</Code>

      <Code block jsx>{`
        // index.tsx

        import 'shared/polyfills'
        import ReactDOM from 'react-dom/client'
        import { App } from 'app/App'

        const rootElement = document.getElementById('root') as Element
        const root = ReactDOM.createRoot(rootElement)
        root.render(<App />)
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
