import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'sort object by keys',
  date: '2022.11.06',
  tags: ['function', 'JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'sort object by keys',
  body: (
    <>
      <H>Soft object by keys</H>

      <Hs>Clear method</Hs>

      <Code block jsx>{`
      const sortObjectByKeys = (object) => Object.keys(object)
        .sort()
        .reduce(
          (obj, key) => {
            obj[key] = object[key]
            return obj
          },
          {}
        )
      `}</Code>

      <Hs>Unclear but elegant method</Hs>

      <Code block jsx>{`
      const sortObjectByKeys = (object, asc = true) => Object.fromEntries(
        Object.entries(object).sort(([k1], [k2]) => k1 < k2 ^ !asc ? -1 : 1)
      )
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
