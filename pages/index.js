import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import SpinnerPage from '/components/post/SpinnerPage'

export default function Index() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => { setIsLoading(false) }, 500)
  }, [])

  return <>
    <Head>
      <title key="title">Anton Arbus</title>
      <meta key="description" name="description" content="Blog" />
      <meta key="keywords" name="keywords" content="HTML, CSS, JS, React, JavaScript" />
    </Head>

    {isLoading && <SpinnerPage />}
    <div className="container">
      <div>Anton Arbus</div>
      <Link href="/posts" prefetch={false} legacyBehavior><a className="button">Posts</a></Link>

      <style jsx>{`
        .container {
          display: flex;
          padding-top: 10vh;
          flex-direction: column;
          align-items: center;
          height: 100vh;
          color: grey;
          font-size: 2rem;
        }
        .button {
          cursor: pointer;
          color: rgba(0, 0, 0, 0.65);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 0.25rem;
          box-shadow: rgba(0, 0, 0, 0.1) 0 1px 1px 0;
          font-family: system-ui;
          font-size: 16px;
          font-weight: 600;
          padding: 8px 30px;
          margin: 10px;
          text-decoration: none;
          transition: all 200ms;
          user-select: none;
        }
        .button:hover,
        .button:focus {
          box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
        }
        .button:active {
          background: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  </>;
}
