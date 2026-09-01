'use client'

import { H, Lnk, React, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'js frameworks',
  date: '2026.09.01',
  tags: ['JavaScript', 'node'],
  desc: 'Overview of Node.js / JS frameworks',
  body: (
    <>
      <H>UI libraries & frameworks</H>

      <ul>
        <li>
          <Lnk path="https://react.dev/">React</Lnk> — UI library by Meta. Component model, virtual
          DOM, hooks. Not a framework — no router, no data fetching built in. Most popular choice.
        </li>
        <li>
          <Lnk path="https://preactjs.com/">Preact</Lnk> — 3 KB drop-in alternative to React with
          the same API. When bundle size matters.
        </li>
        <li>
          <Lnk path="https://vuejs.org/">Vue</Lnk> — progressive UI framework. Gentler learning
          curve than React, Options or Composition API, single-file components.
        </li>
        <li>
          <Lnk path="https://svelte.dev/">Svelte</Lnk> — compiles components to vanilla JS at build
          time, no virtual DOM or runtime. Very small output, reactive by default.
        </li>
        <li>
          <Lnk path="https://www.solidjs.com/">Solid</Lnk> — React-like JSX but with fine-grained
          reactivity and no virtual DOM. Fastest UI framework in benchmarks.
        </li>
        <li>
          <Lnk path="https://qwik.dev/">Qwik</Lnk> — resumability instead of hydration. Loads
          near-zero JS on page load, lazy-executes everything. Built for content-heavy apps that
          need instant startup.
        </li>
        <li>
          <Lnk path="https://angular.dev/">Angular</Lnk> — full frontend framework by Google.
          Opinionated, batteries-included on the UI side: router, forms, HTTP, DI all built in.
          TypeScript-first from day one.
        </li>
      </ul>

      <H>Node.js server — minimal / unopinionated</H>

      <ul>
        <li>
          <Lnk path="https://expressjs.com/">Express</Lnk> — the classic. Tiny core, no opinions,
          you wire everything yourself (router, auth, ORM, validation). Huge ecosystem.
        </li>
        <li>
          <Lnk path="https://koajs.com/">Koa</Lnk> — from the Express team, rebuilt around
          async/await and middleware composition. Even more minimal than Express, no bundled router.
        </li>
        <li>
          <Lnk path="https://fastify.dev/">Fastify</Lnk> — Express-like but significantly faster.
          Built-in JSON schema validation, TypeScript-first, plugin system.
        </li>
        <li>
          <Lnk path="https://hono.dev/">Hono</Lnk> — ultra-lightweight, runs on any JS runtime
          (Node, Deno, Bun, Cloudflare Workers, edge). Great for APIs and edge functions.
        </li>
        <li>
          <Lnk path="https://hapi.dev/">Hapi</Lnk> — configuration-driven, enterprise-focused.
          Everything via config objects rather than middleware chains.
        </li>
      </ul>

      <H>Node.js server — opinionated / batteries-included</H>

      <ul>
        <li>
          <Lnk path="https://nestjs.com/">NestJS</Lnk> — Angular-inspired architecture: decorators,
          dependency injection, modules. Runs on Express or Fastify under the hood. Great for large
          teams but heavy boilerplate.
        </li>
        <li>
          <Lnk path="https://adonisjs.com/">AdonisJS</Lnk> — <strong>batteries-included</strong>,
          Laravel/Rails for Node.js. Authentication, ORM (Lucid), validation, mail, queues, cache,
          testing — all official, all working together out of the box. Nothing to assemble.
          TypeScript-first. Best pick when you want all decisions already made for you.
        </li>
      </ul>

      <H>Full-stack meta-frameworks</H>

      <ul>
        <li>
          <Lnk path="https://nextjs.org/">Next.js</Lnk> — React. SSR, SSG, RSC, API routes. The
          default choice for React full-stack apps.
        </li>
        <li>
          <Lnk path="https://remix.run/">Remix</Lnk> — React. Built on web standards (fetch, form,
          Response). Loader/action model, great for data-heavy apps.
        </li>
        <li>
          <Lnk path="https://tanstack.com/start/latest">TanStack Start</Lnk> — React. Built on
          TanStack Router; full-stack with type-safe server functions, SSR, and streaming.
          Router-first — routing and data fetching are the same thing.
        </li>
        <li>
          <Lnk path="https://nuxt.com/">Nuxt</Lnk> — Vue. SSR/SSG, file-based routing, auto-imports.
          The Next.js of the Vue world.
        </li>
        <li>
          <Lnk path="https://kit.svelte.dev/">SvelteKit</Lnk> — Svelte. File-based routing, adapters
          for any platform, very small bundle output.
        </li>
        <li>
          <Lnk path="https://redwoodjs.com/">RedwoodJS</Lnk> — React + GraphQL. Opinionated
          full-stack with cells, services, Prisma ORM. Rails-like for React.
        </li>
      </ul>

      <H>Content / islands architecture</H>

      <ul>
        <li>
          <Lnk path="https://astro.build/">Astro</Lnk> — islands architecture. Ships zero JS by
          default; only hydrates interactive components ("islands"). Use any UI framework per
          component. Best for content-heavy sites: blogs, docs, marketing.
        </li>
        <li>
          <Lnk path="https://www.11ty.dev/">Eleventy (11ty)</Lnk> — static site generator, no
          client-side JS at all. Extremely fast builds, zero opinions on templating language.
        </li>
        <li>
          <Lnk path="https://www.gatsbyjs.com/">Gatsby</Lnk> — React-based SSG. GraphQL data layer,
          huge plugin ecosystem. Popular for content sites but slower builds than Astro/11ty.
        </li>
      </ul>
    </>
  )
}

export default postObj

export const post = {
  title: postObj.title,
  date: postObj.date,
  tags: postObj.tags,
  desc: postObj.desc,
  imgUrl: null,
  bodyStr: jsxToStr(postObj.body)
}
