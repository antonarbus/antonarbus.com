import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'tanstack router',
  date: '2024.03.xx',
  tags: ['tanstack', 'rooter'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'xxx',
  body: (
    <>
      <H>Install</H>

      <ul>
        <li><Code>npm install @tanstack/react-router</Code></li>
        <li><Code>npm install --save-dev @tanstack/router-vite-plugin</Code></li>
        <li><Code>npm install --save-dev @tanstack/router-devtools</Code></li>
      </ul>

      <H>Example</H>

      <Code block jsx>{`
        // vite.config.ts

        import { defineConfig } from 'vite'
        import react from '@vitejs/plugin-react'
        import { TanStackRouterVite } from '@tanstack/router-vite-plugin'


        // https://vitejs.dev/config/
        export default defineConfig({
          plugins: [
            react(),
            TanStackRouterVite()
          ],
        })
      `}</Code>

      <Code block jsx>{`
        // main.tsx

        import React, { StrictMode } from 'react'
        import ReactDOM from 'react-dom/client'
        import { Outlet, RouterProvider, Link, createRouter, createRoute, createRootRoute, useParams, } from '@tanstack/react-router'
        import { TanStackRouterDevtools } from '@tanstack/router-devtools'

        const rootRoute = createRootRoute({
          component: () => (
            <>
              <div className="p-2 flex gap-2">
                <Link to="/" className="[&.active]:font-bold">
                  Home
                </Link>{' '}
                <Link to="/about" className="[&.active]:font-bold">
                  About
                </Link>{' '}
                <Link to="/products" className="[&.active]:font-bold">
                  Products
                </Link>
              </div>
              <hr />
              <Outlet />
              <TanStackRouterDevtools />
            </>
          ),
        })

        const indexRoute = createRoute({
          getParentRoute: () => rootRoute,
          path: '/',
          component: function Index() {
            return (
              <div className="p-2">
                <h3>Welcome Home!</h3>
              </div>
            )
          },
        })

        const aboutRoute = createRoute({
          getParentRoute: () => rootRoute,
          path: '/about',
          component: function About() {
            return <div className="p-2">Hello from About!</div>
          },
        })

        const productsRoute = createRoute({
          getParentRoute: () => rootRoute,
          path: '/products',
          component: function Product() {
            return (
              <>
                <div className="p-2">Hello from Product!</div>
                <Outlet />
              </>)
          },
        })

        export const productRoute = createRoute({
          getParentRoute: () => productsRoute,
          path: '$productId',
          component: function PostComponent() {
            // const { productId } = productRoute.useParams()
            const { productId } = useParams({ from: '/products/$productId'})
            console.log('🚀 ~ productId:', productId)
            return <div>Product id: {productId}</div>
          },
        })

        // const { productId } = productRoute.useParams()

        const routeTree = rootRoute.addChildren([
          indexRoute,
          aboutRoute,
          productsRoute.addChildren([
            productRoute
          ]),
        ])

        const router = createRouter({ routeTree })

        declare module '@tanstack/react-router' {
          interface Register {
            router: typeof router
          }
        }

        const rootElement = document.getElementById('app')!
        if (!rootElement.innerHTML) {
          const root = ReactDOM.createRoot(rootElement)
          root.render(
            <StrictMode>
              <RouterProvider router={router} />
            </StrictMode>,
          )
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
