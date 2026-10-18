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
  title: 'zod',
  date: '2025.10.27',
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

      <H>object vs strictObject vs looseObject</H>

      <ul>
        <li>
          Only the keys declared in the schema are validated, all other keys are copied to the
          output untouched
        </li>
        <li>
          <code>z.object()</code> strips unknown keys, <code>z.strictObject()</code> throws on them
        </li>
        <li>
          Undeclared keys are not validated at all, even a <code>null</code> or a wrong type passes.
          Declare the key and it starts being checked
        </li>
        <li>
          Handy for big API payloads: describe only the fields the UI uses, the rest still travels
          along
        </li>
        <li>
          <code>z.infer</code> knows only the declared keys (plus an index signature{' '}
          <code>[x: string]: unknown</code>), so the extra data is there at runtime but untyped
        </li>
        <li>
          Works per level: a plain <code>z.object()</code> nested inside strips unknown keys of that
          nested object only
        </li>
      </ul>

      <Code block jsx>{`
        const data = { id: 1, name: "Anton", extra: null }

        z.object({ id: z.number() }).parse(data)
        // => { id: 1 }  (name and extra stripped)

        z.strictObject({ id: z.number() }).parse(data)
        // throws ZodError (unknown keys)

        z.looseObject({ id: z.number() }).parse(data)
        // => { id: 1, name: "Anton", extra: null }  (unknown keys kept, not validated)

        z.looseObject({ id: z.number(), extra: z.string() }).parse(data)
        // throws ZodError (extra is declared now, null is not a string)

        // nested plain object strips only inside itself
        z.looseObject({ user: z.object({ id: z.number() }) })
          .parse({ user: { id: 1, secret: "x" }, other: 1 })
        // => { user: { id: 1 }, other: 1 }
      `}</Code>

      <H>z.custom()</H>

      <ul>
        <li>
          <code>z.custom&lt;T&gt;(check)</code> asserts the TypeScript type <code>T</code> and
          validates with the optional <code>check</code> callback
        </li>
        <li>
          Callback returns <code>true</code> for a valid value, <code>false</code> makes parse throw
        </li>
        <li>No callback means no validation, any value passes</li>
        <li>
          Type and callback are independent, zod does not verify that they match, so the type can
          lie
        </li>
        <li>
          Handy for long generated enums: exact union type, but a new value from the backend does
          not break parsing. Code that assumes the union is complete may get <code>undefined</code>{' '}
          though
        </li>
        <li>
          Use <code>z.enum([...])</code> to reject unknown values, <code>z.unknown()</code> also
          skips validation but loses the type
        </li>
        <li>Replace with real schemas when possible to catch corrupted data</li>
      </ul>

      <Code block jsx>{`
        type Status = "NEW" | "PAID"

        // no callback: anything passes
        const a = z.custom<Status>()
        a.parse("NEW")    // => "NEW"
        a.parse("BANANA") // => "BANANA" (typed as Status, but it is not)
        a.parse(42)       // => 42

        // with callback: only what the callback checks is validated
        const b = z.custom<Status>(value => typeof value === "string")
        b.parse("BANANA") // => "BANANA" (a string, passes)
        b.parse(42)       // throws ZodError

        type T = z.infer<typeof b> // => "NEW" | "PAID"
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
