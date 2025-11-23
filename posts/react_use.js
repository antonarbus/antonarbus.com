import { Suspense, use } from 'react'
import { Code, Lnk, useState, useEffect, jsxToStr, H } from '/components/post/reExport'
import axios from 'axios'
import { ErrorBoundary } from 'react-error-boundary'

// Fetch function for traditional approach
async function fetchUser() {
  const { data } = await axios('https://jsonplaceholder.typicode.com/users/1')
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return data
}

// Traditional approach with useState and useEffect
function UserOldWay() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser().then(setUser)
  }, [])

  if (!user) return <p>Loading...</p>

  return <div>{user.name}</div>
}

// Create promise outside component to avoid recreating on every render
const userPromise = fetchUser()

// New approach with use() hook
function UserNewWay() {
  const user = use(userPromise)
  return <div>{user.name}</div>
}

// Wrapper component for new approach with Suspense
function UserNewWayWrapper() {
  return (
    <ErrorBoundary fallback={<p style={{ color: 'red' }}>⚠️ Something went wrong</p>}>
      <Suspense fallback={<p>Loading...</p>}>
        <UserNewWay />
      </Suspense>
    </ErrorBoundary>
  )
}

const postObj = {
  title: 'react use() hook',
  date: '2025.11.23',
  tags: ['react', 'hook'],
  desc: 'Comparison of traditional data fetching with useState/useEffect vs new use() hook',
  body: (
    <>
      <p>
        React introduces the <Code>use()</Code> hook as a modern approach to handle asynchronous
        data fetching, replacing the traditional pattern of combining <Code>useState</Code> and{' '}
        <Code>useEffect</Code>.
      </p>

      <H>Traditional approach</H>

      <p>
        The traditional way requires managing state manually with <Code>useState</Code> and
        triggering the fetch with <Code>useEffect</Code>. You also need to handle loading states
        explicitly.
      </p>

      <Code block jsx>{`
async function fetchUser() {
  const { data } = await axios('https://jsonplaceholder.typicode.com/users/1')
  await new Promise(resolve => setTimeout(resolve, 1000))
  return data
}

function User() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser().then(setUser)
  }, [])

  if (!user) return <p>Loading...</p>

  return <div>{user.name}</div>
}
      `}</Code>

      <UserOldWay />

      <H>Approach with use() hook</H>

      <p>
        The new <Code>use()</Code> hook simplifies data fetching by unwrapping promises directly.
        Loading and error states are handled declaratively with <Code>Suspense</Code> and{' '}
        <Code>ErrorBoundary</Code>.
      </p>

      <Code block jsx>{`
import { Suspense, use } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

function User() {
  const user = use(fetchUser())
  return <div>{user.name}</div>
}

// Wrap with Suspense and ErrorBoundary
function App() {
  return (
    <ErrorBoundary fallback={<p>⚠️ Something went wrong</p>}>
      <Suspense fallback={<p>Loading...</p>}>
        <User />
      </Suspense>
    </ErrorBoundary>
  )
}
      `}</Code>

      <UserNewWayWrapper />

      <H>Key differences</H>

      <ul>
        <li>
          <strong>Less boilerplate:</strong> No need for <Code>useState</Code> and{' '}
          <Code>useEffect</Code>
        </li>
        <li>
          <strong>Declarative loading:</strong> <Code>Suspense</Code> handles loading states
        </li>
        <li>
          <strong>Better error handling:</strong> <Code>ErrorBoundary</Code> catches errors
        </li>
        <li>
          <strong>Cleaner code:</strong> Component focuses on rendering, not state management
        </li>
      </ul>

      <p>
        The <Code>use()</Code> hook represents a shift towards more declarative and composable
        patterns in React applications.
      </p>
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
