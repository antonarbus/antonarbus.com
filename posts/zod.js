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

      <H>Simple schema</H>

      <ul>
        <li>Here we validate data against the input data according to the schema</li>
      </ul>

      <Code block jsx>{`
        import { z } from 'zod'

        const schema = z.object({
          key: z.string(),
        })

        type InputValues = z.input<typeof schema>  // { key: string }
        type OutputValues = z.infer<typeof schema> // { key: string }
      `}</Code>

      <H>Schema with different input and output</H>

      <ul>
        <li>Data is validated against the schema inside the pipe()</li>
        <li>The output of the first schema becomes the input to the piped schema</li>
      </ul>

      <Code block jsx>{`
        const schema = z.object({
          key: z.string().pipe(z.number()),
        })

        type InputValues = z.input<typeof schema>  // { key: string }
        type OutputValues = z.infer<typeof schema> // { key: number }
      `}</Code>

      <H>Transform</H>

      <ul>
        <li>
          <code>transform()</code> converts the parsed data AFTER validation into another form
          <code>Validate if value is a number and then convert it into boolean</code>
        </li>
      </ul>

      <Code block jsx>{`
        const schema = z.object({
          key: z.string()
            .pipe(z.number()).transform(val => Boolean(val)),
        })

        type InputValues = z.input<typeof schema>  // { key: string }
        type OutputValues = z.infer<typeof schema> // { key: boolean }
      `}</Code>

      <H>Preprocess</H>

      <ul>
        <li>
          <code>preprocess()</code> transforms the raw input data BEFORE validation
        </li>
        <li>Raw input could be anything</li>
        <li>
          Can be used for converting types before validation, sanitizing input, setting defaults
        </li>
        <li>Use when Input type is truly unknown/mixed</li>
        <li>Use when need to handle invalid input gracefully before validation</li>
        <li>"I don't care about input type, just make it work"</li>
        <li>Try to avoid if can</li>
      </ul>

      <Code block jsx>{`
        const schema = z.object({
          key: z.preprocess(
            (val) => String(val), // Convert anything to string first
            z.string().min(3),    // Then validate it's a string with min length 3
          ),
        })

        type InputValues = z.input<typeof schema>  // { key?: unknown }
        type OutputValues = z.infer<typeof schema> // { key: string }
      `}</Code>

      <H>Transform for pre-process</H>

      <ul>
        <li>Use when Input type is known and valid</li>
        <li>You want type safety on the input</li>
      </ul>

      <Code block jsx>{`
        const schema = z.object({
            key: z.string()                    // Input type: string
              .transform((val) => val.trim())  // Preprocess (trim)
              .pipe(z.string().min(3))         // Validate trimmed result
              .transform((val) => val.length)  // Transforms to number
          })

        type InputValues = z.input<typeof schema>  // { key: string }
        type OutputValues = z.infer<typeof schema> // { key: number }
      `}</Code>

      <H>Default</H>

      <ul>
        <li>Commonly used for optional fields</li>
        <li>Only applies when the value is undefined</li>
        <li>Doesn't transform existing values</li>
        <li>Makes the input type optional</li>
        <li>May pass a function which will generate default</li>
      </ul>

      <Code block jsx>{`
        const schema = z.object({
          key: z.string().default('tuna')
        })

        type InputValues = z.input<typeof schema> // { key?: string | undefined }
        type OutputValues = z.infer<typeof schema> // { key: number }
      `}</Code>

      <Code block jsx>{`
        const randomDefault = z.number().default(Math.random);

        randomDefault.parse(undefined);    // => 0.4413456736055323
        randomDefault.parse(undefined);    // => 0.1871840107401901
        randomDefault.parse(undefined);    // => 0.7223408162401552
      `}</Code>

      <H>Prefault</H>

      <ul>
        <li>Setting a default value will short-circuit the parsing process</li>
        <li>If the input is undefined, the default value is eagerly returned without validation</li>
        <li>Prefault value will is parsed</li>
      </ul>

      <Code block jsx>{`
        const schema = z.string().transform(val => val.length).default(0);
        schema.parse(undefined); // => 0

        z.string().transform(val => val.length).prefault("tuna");
        schema.parse(undefined); // => 4
      `}</Code>

      <Code block jsx>{`
        const a = z.string().trim().toUpperCase().prefault("  tuna  ");
        a.parse(undefined); // => "TUNA"
        
        const b = z.string().trim().toUpperCase().default("  tuna  ");
        b.parse(undefined); // => "  tuna  "
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
