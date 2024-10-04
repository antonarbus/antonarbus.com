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
  jsxToStr
} from '/components/post/reExport'

const postObj = {
  title: 'local hostname',
  date: '2024.04.18',
  tags: ['dns', 'hostname'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'xxx',
  body: (
    <>
      <H>hostname</H>

      <ul>
        <li>
          usually you run your dev server at smth like <code>http://localhost:3000/</code>
        </li>
        <li>
          you may want to use own hostname like <code>https://local.webapp.com:3000/</code>
        </li>
        <li>if you do not use a proxy server set host at vite's config</li>
      </ul>

      <Code block jsx>{`       
        export default defineConfig(({ command, mode }) => {       
          return {
            server: {
              host: 'local.webapp.com',
              port: 3000,
            },
          }
        })        
      `}</Code>

      <ul>
        <li>
          and also configure local DNS by adding hostname into this file{' '}
          <Code>code /etc/hosts</Code>
        </li>

        <li>
          or run{' '}
          <Code inline jsx>
            sudo echo "127.0.0.1 local.webapp.com" | sudo tee -a /etc/hosts
          </Code>
        </li>
      </ul>

      <Code block jsx>{`
        127.0.0.1 localhost
        255.255.255.255 broadcasthost
        ::1             localhost
        127.0.0.1 local.webapp.com
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
