// components/helper_for_posts/LazyComponent.js
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
