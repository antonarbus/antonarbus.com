import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'root folder',
  date: '2024.02.30',
  tags: ['node'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'get project root folder',
  body: (
    <>
      <H>get project root folder</H>

      <ul>
        <li>to find the root folder inside the project we just need to look for the <code>package.json</code> file</li>
      </ul>

      <Code block jsx>{`
        const { existsSync } = require('node:fs')
        const { join } = require('node:path')

        const getAppRootDir = () => {
          const currentDir = __dirname
          let appRootDir = currentDir

          while (!existsSync(join(appRootDir, 'package.json'))) {
            appRootDir = join(appRootDir, '..')
          }

          return appRootDir
        }

        module.exports = { getAppRootDir }
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
