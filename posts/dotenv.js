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
  title: 'dotenv',
  date: '2024.10.08',
  tags: ['node'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'dotenv',
  body: (
    <>
      <H>dotenv</H>

      <ul>
        <li>let's assume we have different .env files and need to access it in the root</li>
      </ul>

      <Code block jsx>{`
      import dotenv from 'dotenv'
      import { dirname, join } from 'path'
      import { fileURLToPath } from 'url'

      const thisFilePath = fileURLToPath(import.meta.url)
      const thisDirName = dirname(thisFilePath)
      const filePathToFrontendEnv = join(thisDirName, 'frontend', '.env')
      const filePathToBackendEnv = join(thisDirName, 'backend', '.env')
      dotenv.config({ path: [filePathToFrontendEnv, filePathToBackendEnv] })

      console.log('🚀 ~ process.env.BACKEND_BASE_URL:', process.env.BACKEND_BASE_URL)
      console.log('🚀 ~ process.env.FRONTEND_BASE_URL:', process.env.FRONTEND_BASE_URL)
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
