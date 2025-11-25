'use client'


import { Code, jsxToStr } from '/components/post/reExport'
import bytesToSize from '/functions/bytesToSize'

function Component() {
  let variable = ''
  let i = 0
  for (i; i < 1000000; i++) {
    variable += 'string '
  }
  const sizeBytes = new Blob([JSON.stringify(variable)]).size

  return (
    <>
      Size of variable <b>{variable.slice(0, 30) + '...'}</b> (x{i} times) is <b>{sizeBytes} bytes</b>, which is <b>{bytesToSize(sizeBytes)}</b>
    </>
  )
}

const postObj = {
  title: 'bytes converter',
  date: '2022.05.07',
  tags: ['JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/bytes.jpg',
  desc: 'function to convert bytes into KB, MB, GB, TB',
  body: (
    <>
      <p>Usually we get data in bytes which is not convenient. Here is the function to convert it.</p>

      <Code block jsx>{`
      // /functions/bytesToSize
      function bytesToSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return 'n/a'
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
        if (i === 0) return \`\${bytes} \${sizes[i]})\`
        return \`\${(bytes / (1024 ** i)).toFixed(1)} \${sizes[i]}\`
      }
      `}</Code>

      <Code block jsx>{`
      function Component() {
        let variable = ''
        let i = 0
        for (i; i < 1000000; i++) {
          variable += 'string '
        }
        const sizeBytes = new Blob([JSON.stringify(variable)]).size

        return (
          <>
            Size of variable <b>{variable.slice(0, 30) + '...'}</b> (x{i} times) is <b>{sizeBytes} bytes</b>, which is <b>{bytesToSize(sizeBytes)}</b>
          </>
        )
      }
      `}</Code>

      <Component />
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
