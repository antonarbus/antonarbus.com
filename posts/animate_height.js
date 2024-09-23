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
  title: 'height animation',
  date: '2024.09.23',
  tags: ['animation', 'css'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'height animation',
  body: (
    <>
      <H>height animation with css</H>

      <ul>may not be supported yet</ul>

      <Lnk path="https://www.tiktok.com/@wesbos/video/7391970597799988485">
        https://www.tiktok.com/@wesbos/video/7391970597799988485
      </Lnk>

      <Code block jsx>{`
        <div>
          hello
          hello
          hello
          hello
          hello
        </div>

        div {
          width: 50px;
          height: 50px;
          background: tomato;
          transition: height 0.5s;
        }

        div:hover {
          height: calc-size(auto);
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
