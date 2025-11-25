'use client'


import { Code, Lnk, React, H, jsxToStr } from '/components/post/reExport'
import { Suspense } from 'react'
import BasicComponent from '/components/helper_for_posts/BasicComponent'

function ComponentWithNativeLazyLoad() {
  const [state, setState] = React.useState(false)
  const HeavyComponent = React.lazy(() => import('/components/helper_for_posts/HeavyComponent.js'))
  return (
    <div style={{ border: '1px dotted grey', padding: '5px' }}>
      <button onClick={() => setState(!state)}>Toggle lazy components</button>
      <BasicComponent />
      {
        state
          ? (
            <Suspense fallback={<div style={{ color: 'red' }}>Loading...</div>}>
              <HeavyComponent num='1' />
              <HeavyComponent num='2' />
              <HeavyComponent num='3' />
            </Suspense>
            )
          : null
      }
    </div>
  )
}

const postObj = {
  title: 'lazy loading in React',
  date: '2022.01.24',
  tags: ['react'],
  desc: 'Lazy load in React',
  body: (
    <>
      <H>React.lazy() </H>

      <p>We can load a component <Lnk path='https://reactjs.org/docs/code-splitting.html#reactlazy'>dynamically</Lnk> with native React high order component and do not include it in a bundle.</p>

      <ComponentWithNativeLazyLoad />

      <ul>
        <li>Import a component like <Code js>{'const HeavyComponent = React.lazy(() => import("./HeavyComponent"))'}</Code> </li>
        <li>Integrate it into the code within <Code html>{'<Suspense> </Suspense>'}</Code> component from React. </li>
        <li><i>Lazy</i> component should be exported as <i>default</i>. </li>
        <li>Path of an imported lazy component can not be dynamic (bad news). </li>
        <li>On a button click a lazy component is loaded and additional <i>chunk</i> file is being downloaded, which is visible in the network tab of dev tools. </li>
        <li>Bring some synchronous code before a render with <Code js>React.useLayoutEffect()</Code> hook, to imitate that file is big. </li>
      </ul>

      <Code block>{`
      import { Suspense } from 'react';
      import BasicComponent from '/components/helper_for_posts/BasicComponent';

      function ComponentWithNativeLazyLoad() {
        const [state, setState] = React.useState(false)
        const HeavyComponent = React.lazy(() => import('/components/helper_for_posts/HeavyComponent.js'))
        return (
          <>
            <button onClick={() => setState(!state)}>Toggle lazy components</button>
            <BasicComponent />
            {
              state
                ? (
                  <Suspense fallback={<div style={{ color: 'red' }}>Loading...</div>}>
                    <HeavyComponent num='1' />
                    <HeavyComponent num='2' />
                    <HeavyComponent num='3' />
                  </Suspense>
                  )
                : null
            }
          </>
        )
      }
      `}</Code>

      <Code block>{`
      // components/helper_for_posts/BasicComponent.js
      import React from 'react'
      import syncWait from '/functions/syncWait'

      export default function BasicComponent() {
        return (
          <div>
            Hello, I am not lazy.
          </div>
        )
      }
      `}</Code>

      <Code block>{`
      // components/helper_for_posts/HeavyComponent.js
      import React from 'react'
      import syncWait from '/functions/syncWait'

      export default function HeavyComponent(props) {
        // do something for 1s before rendering
        React.useLayoutEffect(syncWait, [])

        return (
          <div style={{ color: 'blue' }}>
            Hello, I am lazy and heavy {props.num}.
          </div>
        )
      }
      `}</Code>

      <Code block>{`
      // functions/syncWait.js
      export default function syncWait(ms = 1000) {
        const end = Date.now() + ms
        while (Date.now() < end) continue
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
