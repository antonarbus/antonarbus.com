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
  title: 'zod',
  date: '2025.09.26',
  tags: ['JavaScript', 'tools'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'Zod',
  body: (
    <>
      <H>Array filtering</H>

      <ul>
        <li>May filter out items in array which does not match zod schema</li>
      </ul>

      <LazyImg path="/imgs/zod-for-item-filtering.png" />

      <H>JSON.parse validation</H>

      <ul>
        <li>
          After <code>JSON.parse()</code> validation with zod we get truly typed data
        </li>
      </ul>

      <Code block jsx>{`
        const sortModelSchema = z.array(
          z.object({
            colId: z.string(),
            sort: z.enum(['asc', 'desc']),
          }),
        )

        const {
          success: parseSortModelSuccess,
          error: parseSortModelError,
          data: parsedSortModel,
        } = sortModelSchema.safeParse(JSON.parse(sortModel))

        if (parseSortModelSuccess === false) {
          throw new Error('Invalid sortModel format', parseSortModelError)
        }

        const sort = parsedSortModel.reduce<Record<string, 1 | -1>>(
          (accumulator, item) => {
            if (item.sort === 'asc') {
              accumulator[item.colId] = 1
            }

            if (item.sort === 'desc') {
              accumulator[item.colId] = -1
            }

            return accumulator
          },
          {},
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
