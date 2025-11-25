'use client'


import { Code, H, Hs, LazyImg, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'next',
  date: '2022.02.26',
  tags: ['next', 'basics'],
  desc: 'Next.js basics from Codevolution tutorial ',
  body: (
    <>
      <p><Lnk path="https://nextjs.org/">Next</Lnk> is a react framework for sever rendering applications.</p>

      <p>These notes are based on <Lnk path='https://www.youtube.com/playlist?list=PLC3y8-rFHvwgC9mj0qv972IO5DmD-H0ZH'>beginner's tutorial</Lnk>.</p>

      <H>Installation</H>

      <ul>
        <li>Create a <Lnk path="https://nextjs.org/docs#automatic-setup">Next</Lnk> project with <Code bash>npx create-next-app appNAME</Code></li>
        <li>Or <Code bash>npx create-next-app .</Code> to install into existing folder.</li>
      </ul>

      <H>package.json</H>

      <Code block json>{`
      "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "export": "next build && next export",
        "lint": "next lint"
      },
      `}</Code>

      <ul>
        <li>Run dev server with <Code bash>npm run dev</Code> command</li>
        <li>Compiled a production build by <Code bash>npm run build</Code></li>
        <li>Start built production version with <Code bash>npm run start</Code></li>
        <li>With <Code bash>npm run export</Code> we compiled a static pages into <Code>/one</Code> folder, which do not require a node server</li>
      </ul>

      <H>Routing</H>

      <Hs><Code>pages/</Code> folder </Hs>

      <ul>
        <li> <Code>pages/</Code> folder is needed for routing. Separate UI components into some other folder, for ex. <Code>components/</Code> folder. </li>
        <li> Next goes with file system based routing & doesn't require any 3rd party routing lib </li>
        <li> When a file with component is added into the <Code>pages/</Code> folder, it becomes available as a route </li>
        <li>Nested folder pattern is supported</li>
        <li> Default returned component with any function name from <Code>index.js</Code> file within <Code>pages/</Code> folder becomes a domain's root file </li>
        <li> A component from <Code>about.js</Code> file will be accessed by <Code>/about</Code> url </li>
        <li> If we put <Code>about.js</Code> into the <Code>folder/</Code>, then it will be accessed by <Code>folder/about</Code> url </li>
        <li> Rename <Code>about.js</Code> into <Code>index.js</Code> and the component becomes a folder root component with <Code>folder/</Code> path </li>
      </ul>

      <Hs>Dynamic file</Hs>

      <ul>
        <li> We can create a dynamic route using parameter name inside square brackets in file's name <Code>pages/products/[id].js</Code> </li>
        <li> Parameter can be extracted via <Code inline>useRouter().query.param</Code> </li>
        <li>Real file has a higher specificity, than dynamically routed page</li>
      </ul>

      <Code block>{`
      // pages/products/[id].js
      import { useRouter } from "next/router"
      export default function ProductDetails() {
        const router = useRouter()
        const id = router.query.id
        return <h1>Details about product {id}</h1>
      }
      `}</Code>
      <LazyImg width="300px" src="/imgs/next/Details about product 2.png" />

      <p>Following component overwrites component with dynamic route</p>

      <Code block>{`
      // pages/products/1.js
      export default function index() {
        return <h2>Specific product 1</h2>
      }
      `}</Code>
      <LazyImg width="300px" src="/imgs/next/Specific product 1.png" />

      <Hs>Dynamic folder</Hs>

      <Code block>{`
      // pages/products/[folder]/[product].js
      import { useRouter } from "next/router"
      export default function ProductDetails() {
        const router = useRouter()
        const { folder, product } = router.query
        return <h1>Details about {product} from {folder}</h1>
      }
      `}</Code>

      <LazyImg width="300px" src="/imgs/next/Details about someProduct from someFolder.png" />

      <Hs>Catch all pages routes</Hs>

      <ul>
        <li> Can be done via folder with following path structure <Code>{'/folder/[...params]'}</Code> </li>
        <li> Component will be returned for any nested <Code>/folder/A/B/C/...</Code> url starting from <Code>folder</Code> </li>
        <li> <Code inline >useRouter().query.params</Code> contains array of url parameters <Code>{'["A", "B", "C"]'}</Code> </li>
        <li> If we go to <Code>/folder</Code> url, we get 404 page </li>
        <li> To avoid it we may use additional pair of square brackets <Code>{'/folder/[[...params]]'}</Code> </li>
      </ul>

      <LazyImg width="auto" src="/imgs/next/double square brackets.png" />

      <Code block>{`
      import { useRouter } from "next/router"
      import randomNumFromTo from "../../helpers/randomNumFromTo"

      export default function ProductDetails() {
        const router = useRouter()
        const {params} = router.query
        if (params === undefined) return <>not yet</>
        const min = params[0]
        const max = params[1]
        const randomNum = randomNumFromTo(min, max)
        return <>random number between {min}...{max} is <b>{randomNum}</b></>
      }
      `}</Code>

      <LazyImg width="300px" src="/imgs/next/Catch all routes.png" />

      <H>Navigation</H>

      <Hs>Link</Hs>
      <ul>
        <li> Use <Code inline >{"<Link href='/page1'><a>text</a></Link>"}</Code> for clint side routing without a page refresh </li>
        <li> If no anchor tag inside the <Code>Link</Code> tag, then add code <Code>passHref</Code> attribute <Code inline html>{"<Link href='/page1' passHref><div>text</div></Link>"}</Code> </li>
        <li> In case of external page use general anchor <Code inline >{"<a href='google.com'>google</a>"}</Code> tag </li>
        <li> Attribute <Code>replace</Code> removes the browser history stack <Code inline html>{"<Link replace href='/page1'><a>text</a></Link>"}</Code> </li>
      </ul>

      <Code block>{`
      // page1.js
      import Link from "next/link"
      const Page1 = () => <>
        <h2>Page 1</h2>
        <Link href='/page2'><a>Go to Page 2 via Link tag</a></Link>
        <a href='/page2'>Go to Page 2 via a tag</a>
      </>
      export default page1
      `}</Code>

      <Hs>Programmatic navigation</Hs>

      <p>Use <Code js >useRouter().push('url')</Code> or <Code js >useRouter().replace('url')</Code> to programmatically navigate to a url.</p>

      <Code block>{`
      // page1.js
      import { useRouter } from "next/router"

      export default function Page1() {
        const router = useRouter()
        return <>
          <h2>Page 1</h2>
          <button onClick={() => router.push('/page2')}>Go to Page 2</button>
          <button onClick={() => router.replace('/page3')}>Go to Page 3</button>
        </>
      }
      `}</Code>

      <Hs>404</Hs>

      <p>To customize the default 404 page just put <Code>404.js</Code> file into <Code>pages</Code> folder.</p>

      <Code block>{`
      // pages/404.js
      export default function FourZeroFour() {
        return <div>My custom 404</div>
      }
      `}</Code>

      <H>Pre-rendering</H>
      <ul>
        <li>React generates html page on the clint side in browser</li>
        <li>Next does it on a server side and ships ready-made html</li>
        <li>Pre-rendering is good for SEO.</li>
      </ul>

      <H>Static server generation (SSG)</H>
      <ul>
        <li>Page is generated in advance at the build time when we compile an application</li>
        <li>It is done by default by Next</li>
        <li>It is recommended way, because it can be built it ones, cached & pushed to a CDN</li>
        <li>SSG is done when we make production build by <Code bash>npm run build</Code> </li>
        <li>It is done automatically every time we make changes in development mode</li>
        <li>Content is created and goes into <Code>.next</Code> folder by default</li>
        <li>SSG with <Code js >getStaticProps()</Code> can fetch data from external source</li>
        <li>SSG with <Code js >getStaticPaths()</Code> can generate pages dynamically</li>
        <li>With <Code js >getStaticPaths()</Code> & <Code js>fallback: true</Code> the page is not generated at build time but is generated on a user's initial request</li>
        <li>With <i>incremental</i> static re-generation <Code js >getStaticProps()</Code> & <Code js>revalidate: 10</Code> a page can be regenerated after some time</li>
      </ul>

      <Hs>Pre-render page static pages</Hs>
      <ul>
        <li> With <Code js >getStaticProps()</Code> function we can fetch external data and pass it into a component as props at page production generation time </li>
        <li> We can of course also fetch data with <Code js >useEffect()</Code> on component load, but data will not be pre-rendered in such scenario </li>
        <li> Returned object from <Code js >getStaticProps()</Code> function, goes into a component's props in the same file </li>
        <li> Function should return an object with a <Code>props</Code> key, like <Code js >{'return { props: { a: 1, b: 2}}'}</Code> </li>
        <li> Function runs at a build time, meaning ones a production version is built by{' '} <Code>npm run build</Code> and every time the page is updated or changed in dev mode </li>
        <li> I have checked the data fetching with <a href="https://random-data-api.com/api/cannabis/random_cannabis?size=5'">random api</a> and it really generates content based on a data at the production building moment and this data persists </li>
        <li> If data is returned from an api request, it will be retrieved only ones on project production compilation </li>
        <li> <Code js >getStaticProps()</Code> function runs on a server, not inside the browser </li>
        <li> Works only in the <Code>pages</Code> folder, but not in a regular component </li>
        <li> <Code js>console.log</Code> data within a function will be displayed in a terminal, but not in a browser </li>
        <li> It is a <i>node.js</i> code, which has an access to the file system via <i>fs</i> module </li>
        <li>Sensitive information can be used inside, because code is not exposed by a browser</li>
      </ul>

      <Code block>{`
      // posts/index.js
      export default function Index(props) {
        return (
          <>
            <h3>Posts</h3>
            {props.data.map(post => (
              <div key={post.title}>
                Posts: <b>{post.title.slice(0, 5)}</b> with id: <b>{post.id}</b>
              </div>
            ))}
          </>
        )
      }

      export async function getStaticProps() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const result = await response.json()
        return {
          props: {
            data: result.slice(0, 5),
          }
        }
      }
      `}</Code>

      <LazyImg width="200px" src="/imgs/next/pre-render with data fetching.png" />

      <Hs>Pre-render dynamic pages</Hs>

      <ul>
        <li> We may pre-render dynamic pages, for ex. post articles with following folder structure <Code>/posts/[postId].js</Code> </li>
        <li> <Code>postId</Code> may be any number and we need to tell to Next the possible range, otherwise Next needs to generate endless amount of pages </li>
        <li> To do that we use a special function <Code inline >getStaticPaths()</Code> which returns an array of possible <Code>postId</Code> parameters </li>
      </ul>

      <Code block>{`
      // posts/index.js
      import Link from "next/link"

      export default function Index(props) {
        return (
          <>
            <h3>List of posts</h3>
            {props.data.map(post => (
              <div key={post.title}>
                <Link href={\`posts/\${post.id}\`} passHref>
                  <div>
                    <div>ID: {post.id}</div>
                    <div>Title: {post.title.slice(0, 10)}</div><hr />
                  </div>
                </Link>
              </div>
            ))}
          </>
        )
      }

      export async function getStaticProps() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const result = await response.json()
        return {
          props: {
            data: result.slice(0, 5)
          } 
        }
      }
      `}</Code>

      <Code block>{`
      // posts/[postId].js
      export default function Post(props) {
        return (
          <>
            <h3>Individual post</h3>
            <div>Post id: {props.data.id}</div>
            <div>Title: {props.data.title}</div> 
            <div>Body: {props.data.body}</div> 
          </>
        )
      }

      export async function getStaticPaths() {
        return {
          paths: [
            { params: { postId: '1' } },
            { params: { postId: '2' } },
            { params: { postId: '3' } },
            { params: { postId: '4' } },
            { params: { postId: '5' } },
          ],
          fallback: false
        }
      }

      export async function getStaticProps(context) {
        const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${context.params.postId}\`)
        const result = await response.json()
        return {
          props: {
            data: result,
          }, 
        }
      }
      `}</Code>

      <LazyImg width="400px" src="/imgs/next/list of posts.png" />
      <LazyImg width="400px" src="/imgs/next/individual post.png" />

      <p>When <Code>/posts</Code> url is hit in production build, .json files are pre-fetched for all 5 posts</p>

      <LazyImg width="auto" src="/imgs/next/json files pre-fetch.png" />

      <p>There is no network activity anymore when we go to an individual post.</p>

      <Hs><Code js >getStaticPaths()</Code> with dynamic return object </Hs>

      <p>A <Code js >getStaticPaths()</Code> function's output object can be hardcoded as in the example above or dynamically generated.</p>

      <p>Here is dynamic version.</p>

      <Code block>{`
      export async function getStaticPaths() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const result = await response.json()
        const paths = result.map(item => ({ params: { postId: \`\${item.id}\`}}))
        return {
          paths: paths,
          fallback: false
        }
      }
      `}</Code>

      <Hs><Code js >getStaticPaths()</Code> & fallback </Hs>

      <>
        <Code>fallback</Code> key can have 3 possible values:
      </>
      <ul>
        <li> <Code js >fallback: false</Code> </li>
        <li> <Code js >fallback: true</Code> </li>
        <li> <Code js >fallback: 'blocking'</Code> </li>
      </ul>

      <Hs><Code js >fallback: false</Code> </Hs>

      <ul>
        <li> The paths returned from <Code js >getStaticPaths()</Code> will be rendered at build time by <Code js >getStaticProps()</Code> </li>
        <li> Paths not returned by <Code js >getStaticPaths()</Code> will result in a 404 page </li>
        <li>Suitable for small number of paths to pre-render</li>
        <li>Suitable when new pages are not added often</li>
      </ul>

      <Hs><Code js >fallback: true</Code></Hs>

      <ul>
        <li> Paths returned from <Code js >getStaticPaths()</Code> will be also generated at build time </li>
        <li> No 404 page for unavailable paths, but "fallback" page version is rendered on the first request. </li>
        <li> At the same time, Next.js will generate the requested page running <Code js >getStaticProps()</Code> </li>
        <li> Then the page will be swapped from the fallback page to the newly generated one </li>
        <li> Subsequent requests to the same path will serve already generated page, just like other pages pre-rendered at build time. </li>
        <li>Pages are pre-fetched if a Link comes into the viewport.</li>
      </ul>

      <Code block>{`
      // posts/[postId].js
      import { useRouter } from "next/router"

      export default function Post(props) {
        const router = useRouter()
        if (router.isFallback) return <h1>Loading...</h1>

        return (
          <>
            <h3>Individual post</h3>
            <div>Post id: {props.data.id}</div>
            <div>Title: {props.data.title}</div> 
            <div>Body: {props.data.body}</div> 
          </>
        )
      }

      export async function getStaticPaths() {
        return {
          paths: [
            { params: { postId: '1' } },
            { params: { postId: '2' } },
            { params: { postId: '3' } },
          ],
          fallback: true
        }
      }

      export async function getStaticProps(context) {
        const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${context.params.postId}\`)
        const result = await response.json()
        console.log(result)
        return {
          props: {
            data: result,
          }, 
        }
      }
      `}</Code>

      <p>
        In the example above we pre-render 3 pages and when hit another 97 ones, like <Code>posts/4</Code>,
        we get the fallback component 'Loading...', which is swapped ones the post is loaded. Next
        time we hit this page we just get the post page immediately without a fallback.
      </p>

      <Hs><Code js >fallback: 'blocking'</Code></Hs>
      <ul>
        <li>Same as <Code inline >fallback: true</Code>, but without fallback render while page is fetching</li>
        <li>A user just waits till the page is loaded</li>
      </ul>

      <Hs>SSG issues</Hs>
      <ul>
        <li>Production build time can be long for big number of pages</li>
        <li>Even for one minor change on a page we have to re-build the whole app</li>
        <li>Page data is frozen until next page production re-build</li>
        <li>Even if data at end point api is changed we still serve stale data, which was fetched at the production build time</li>
        <li>Incremental static re-generation can help to solve this problem</li>
      </ul>

      <Hs>Incremental static re-generation (ISR)</Hs>

      <ul>
        <li>With ISR can statically re-generate individual pages without needing to rebuild the entire site</li>
        <li>In the <Code js >getStaticProps()</Code> function we can specify a <Code>revalidate</Code> key</li>
        <li>The value for <Code>revalidate</Code> is the number of seconds after which a page re-generation can occur</li>
        <li>A re-generation is initiated only if a user makes a request after the revalidate time</li>
        <li>Revalidate does not mean the page automatically re-generates every 10 or something seconds</li>
        <li>If a re-generation fails then the previously cached HTML will be be served</li>
      </ul>

      <Code block>{`
      export async function getStaticProps() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const result = await response.json()
        console.log(result)
        return {
          props: {
            data: result
          },
          revalidate: 10
        }
      }
      `}</Code>

      <ul>
        <li>Http response header is set ot <Code>Cache-Control: s-maxage=10, stale-while-revalidate</Code></li>
        <li>If we hit the page withing 10 seconds we get pre-rendered page</li>
        <li>The next hit after 10 seconds will trigger a page re-generation</li>
        <li>But previously pre-rendered page will be served still</li>
        <li>And only the next page hit will serve an updated data</li>
      </ul>

      <Hs>Problems of SSG</Hs>

      <ul>
        <li>Data can be stalled</li>
        <li>Even with re-generation we can not guarantee that a clients get's an up-to-data data</li>
        <li>Of course we may fetch data on a client side, but then we lost SEO</li>
        <li>We do not have access to the request and can not generate user specific page</li>
      </ul>

      <H>Server-side rendering (SSR)</H>

      <ul>
        <li>Next.js allows you to pre-render a page not at build time but at request time</li>
        <li>The HTML is generated for every incoming request</li>
        <li>HTML pages are not stored in <Code>pages</Code> folder, but served pre-rendered directly to a client</li>
        <li>The most updated data is served</li>
        <li>SSR is required when you need to fetch personalized data at a request time with SEO in mind</li>
        <li>SSR is slower than SSG, use it when necessary</li>
      </ul>

      <Hs>Render static pages</Hs>
      <ul>
        <li> With <Code js >getServerSideProps()</Code> function we can fetch external data and pass it into a component as props at request time </li>
        <li> Returned object from <Code inline >getServerSideProps()</Code>, goes into a component's props in the same file </li>
        <li> Function should return an object with a <Code>props</Code> key, like <Code js >{'return { props: { a: 1, b: 2}}'}</Code> </li>
        <li> Function can be run only in a page and not in a regular component file </li>
        <li> Function runs at user's request </li>
        <li> Data fetching from <a href="https://random-data-api.com/api/users/random_user?size=5">random api</a> generates new page every new request </li>
        <li> <Code js >getServerSideProps()</Code> function runs on a server, but not inside the browser. It has access to the file system and we can keeps sensitive data there. Code will not be exposed in bundle to a browser </li>
      </ul>

      <Code block>{`
      // users/index.js
      import Link from "next/link"

      export default function Index(props) {
        return (
          <>
            <h3>List of users</h3>
            {props.data.map(user => (
              <Link key={user.first_name} href={\`users/\${user.first_name}\`} passHref>
                  <div>Name: {user.first_name}</div>
              </Link>
            ))}
          </>
        )
      }

      export async function getServerSideProps() {
        const response = await fetch('https://random-data-api.com/api/users/random_user?size=5')
        const result = await response.json()
        console.log(result)
        return {
          props: {
            data: result
          },
        }
      }
      `}</Code>

      <LazyImg width="300px" src="/imgs/next/List of users.png" />

      <Hs>Render dynamic pages</Hs>

      <Code block>{`
      // users/[userId].js
      import { useRouter } from "next/router"

      export default function User(props) {
        return (
          <>
            <h3>User details</h3>
            <div>First name: {props.data.first_name}</div>
            <div>Last name: {props.data.last_name}</div> 
            <div>Phone: {props.data.phone_number}</div> 
          </>
        )
      }

      export async function getServerSideProps(context) {
        const response = await fetch(\`https://random-data-api.com/api/users/random_user?id=\${context.params.userId}\`)
        const result = await response.json()

        return {
          props: {
            data: result,
          }, 
        }
      }
      `}</Code>

      <LazyImg width="300px" src="/imgs/next/user details.png" />

      <Hs>Parameters of <Code js >getServerSideProps(context)</Code></Hs>

      <p>With SSR we have an access to request & response parameters, unlike with SSG.</p>

      <p>Documentation for <Lnk path='https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter'><Code>context</Code> parameters</Lnk> of <Code js >getServerSideProps(context)</Code> function.</p>

      <p>For example we can modify request and read response parameters. Check how we set and read cookies and read url parameters.</p>

      <Code block>{`
      export async function getServerSideProps(context) {
        const response = await fetch(\`https://random-data-api.com/api/users/random_user?id=\${context.params.userId}\`)
        
        // set cookie
        context.res.setHeader('Set-Cookie', ['message=hello'])
        
        // read cookie
        console.log(context.req.headers.cookie) // message=hello
        
        //read url parameters for http://localhost:3000/users/2488?a=1&b=2
        console.log(context.query) // { a: '1', b: '2', userId: '2488' }
        
        const result = await response.json()
        return {
          props: {
            data: result,
          }, 
        }
      }
      `}</Code>

      <H>Client side data fetching</H>

      <Hs><Code js >useEffect()</Code> hook</Hs>

      <ul>
        <li>Some data is not required for pre-rendering and SEO, number of likes for a post for ex.</li>
        <li>It can be done by basic react approach by fetching data inside <Code js >useEffect()</Code> hook.</li>
        <li>Pre-rendered page will not contain fetched data from <Code js >useEffect()</Code></li>
        <li>Here is the <Lnk path='https://antonarbus.com/post/fetch-data-on-component-load-in-react'>example</Lnk> how to do that.</li>
      </ul>

      <p>Version with fetching via <Code inline >useEffect()</Code></p>

      <Code block>{`
      // pages/user.js
      import { useState, useEffect } from 'react'

      export default function User() {
        const [isLoading, setIsLoading] = useState(true)
        const [userState, setUserState] = useState(null)
        useEffect(() => {
          async function fetchUser() {
            const response = await fetch('https://random-data-api.com/api/users/random_user')
            const data = await response.json()
            setUserState(data)
            setIsLoading(false)
          }
          fetchUser()
        }, [])

        if (isLoading) return <h2>Loading...</h2>
        return <h2>Name: {userState.first_name}</h2>
      }
      `}</Code>

      <Hs>Pre-rendering + client side data fetching</Hs>

      <ul>
        <li>Initially 5 names are rendered by <Code>/list-of-users</Code> path</li>
        <li>With input & button we change the number of names to render</li>
        <li>When we change number of names to render we programmatically append <Code>/list-of-users?size=10</Code> query to the path</li>
        <li>We can share <Code>/list-of-users?size=10</Code> and the link will pre-render 10 names</li>
      </ul>

      <Code block>{`
      // pages/list-of-users.js
      import { useRouter } from "next/router"
      import { useState } from "react"

      export default function Index({ users, usersNum }) {
        const [usersState, setUsersState] = useState(users)
        const [usersNumState, setUsersNumState] = useState(usersNum)
        const updateInput = (e) => setUsersNumState(e.target.value)
        const router = useRouter()
        
        async function fetchUsers() {
          const response = await fetch(\`https://random-data-api.com/api/users/random_user?size=\${usersNumState}\`)
          const result = await response.json()
          setUsersState(result)
          router.push(\`list-of-users?size=\${usersNumState}\`, undefined, { shallow: true })
        }

        return (
          <>
            <input type="number" value={usersNumState} onChange={updateInput}/>
            <button onClick={fetchUsers}>Show</button>
            <h3>List of users</h3>
            {usersState.map(user => <div key={user.first_name}>Name: {user.first_name}</div> )}
          </>
        )
      }

      export async function getServerSideProps(context) {
        const usersNum = context.query.size || 5
        const response = await fetch(\`https://random-data-api.com/api/users/random_user?size=\${usersNum}\`)
        const result = await response.json()
        return {
          props: {
            users: result,
            usersNum: usersNum
          },
        }
      }
      `}</Code>

      <p>Initial pre-render of 5 names</p>

      <LazyImg width="auto" src="/imgs/next/pre-render 5 names.png" />

      <p>Change number of names with button and share the link will result in 10 names pre-render</p>

      <LazyImg width="auto" src="/imgs/next/pre-render 10 names.png" />

      <Hs>SWR - react hooks for data fetching</Hs>

      <ul>
        <li><Lnk path='https://swr.vercel.app/'>SWR</Lnk> - stale while revalidate strategy</li>
        <li>SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data</li>
        <li>It's easier to use SWR, than make own fetching with <Code inline >useEffect()</Code> & <Code inline >useState()</Code> hooks</li>
        <li>When the user's laptop wakes up or switch between tabs, the data will be refreshed automatically</li>
        <li>Install SWR by <Code>npm i swr</Code></li>
      </ul>

      <p>Version with SWR, look how cleaner it is.</p>

      <Code block>{`
      // pages/user-swr.js
      import useSWR from 'swr'

      const fetcher = async () => {
        const response = await fetch('https://random-data-api.com/api/users/random_user')
        const data = await response.json()
        return data
      }

      export default function UserSWR() {
        const { data, error } = useSWR('uniqueReqKey', fetcher)
        if (error) return 'An error has occurred.'
        if (!data) return 'Loading...'
        return <h2>Name: {data.first_name}</h2>
      }
      `}</Code>

      <H>API routes</H>

      <ul>
        <li>We can write RESTful endpoints APIs that can be called by the front-end</li>
        <li>API routes use folder structure</li>
        <li>Within the <Code>pages/</Code> folder place the <Code>api/</Code> folder</li>
        <li>Next gives a possibility to write full-stack React + Node applications</li>
        <li>Code inside <Code>api/</Code> folder is never bundled into front-end code</li>
      </ul>

      <Hs>API routes structure</Hs>

      <Code block>{`
      // pages/api/index.js
      export default function handler(req, res) {
        res.status(200).json({ name: 'api home route'})
      }
      `}</Code>

      <LazyImg width="400px" src="/imgs/next/first api.png" />

      <Code block>{`
      // pages/api/dashboard.js
      export default function handler(req, res) {
        res.status(200).json({ name: 'api dashboard route'})
      }
      `}</Code>

      <LazyImg width="400px" src="/imgs/next/dashboard api.png" />

      <Code block>{`
      // pages/api/blog/index.js
      export default function handler(req, res) {
        res.status(200).json({ name: 'api blog route'})
      }
      `}</Code>

      <LazyImg width="400px" src="/imgs/next/blog api.png" />

      <Code block>{`
      // pages/api/blog/summary.js
      export default function handler(req, res) {
        res.status(200).json({ name: 'api blog summary route'})
      }
      `}</Code>

      <LazyImg width="400px" src="/imgs/next/blog summary api.png" />

      <Hs>GET request</Hs>

      <p>Data file</p>

      <Code block>{`
      // /data/comments.js
      export const comments = [
        { id: 1, text: 'This is the first comment' },
        { id: 2, text: 'This is the second comment' },
        { id: 3, text: 'This is the third comment' }
      ]
      `}</Code>

      <p>GET api file</p>

      <Code block>{`
      // /pages/api/comments/index.js
      import { comments } from "../../../data/comments";

      export default function handler(req, res) {
        res.status(200).json(comments)
      }
      `}</Code>

      <p>UI component</p>

      <Code block>{`
      // pages/comments/index.js
      import { useState } from "react"

      export default function Component() {
        const [comments, setComments] = useState([])
        const getComments = async () => { 
          const response = await fetch('api/comments')
          const result = await response.json()
          setComments(result)
        }
        return (
          <>
            <button onClick={getComments}>Get comments</button>
            {
              comments.map(comment => <div key={comment.id}>{comment.text}<hr/></div>)
            }
          </>
        )
      }
      `}</Code>

      <p>Result</p>

      <LazyImg width="400px" src="/imgs/next/comments get api.png" />

      <Hs>POST request</Hs>

      <p>Same example as above, but with input field + submit button to add a new comment.</p>

      <p>GET + POST api file</p>

      <Code block>{`
      // /pages/api/comments/index.js
      import { comments } from "../../../data/comments";

      export default function handler(req, res) {

        if (req.method === 'GET') {
          res.status(200).json(comments)
        }

        if (req.method === 'POST') {
          const comment = req.body.comment
          const newComment = {
            id: Date.now(),
            text: comment
          }
          comments.push(newComment)
          res.status(201).json(newComment)
        }
      }
      `}</Code>

      <p>UI component</p>

      <Code block>{`
      // pages/comments/index.js
      import { useState } from "react"

      export default function Component() {
        const [comments, setComments] = useState([])
        const [comment, setComment] = useState('')
        const updateInputVal = (e) => setComment(e.target.value)

        const getComments = async () => { 
          const response = await fetch('api/comments')
          const result = await response.json()
          setComments(result)
        }

        const submitComment = async () => { 
          const response = await fetch('api/comments', {
            method: 'POST',
            body: JSON.stringify({comment: comment}),
            headers: { 'Content-Type': 'Application/json' }
          })
          const data = await response.json()
        }

        return (
          <>
            <input type="text" value={comment} onChange={updateInputVal} />
            <button onClick={submitComment}>Submit comment</button>
            <button onClick={getComments}>Get comments</button>
            { comments.map(comment => <div key={comment.id}>{comment.text}<hr/></div>) }
          </>
        )
      }
      `}</Code>

      <LazyImg width="400px" src="/imgs/next/post request.png" />

      <Hs>Dynamic route</Hs>

      <p>Needed for DELETE request to specify a comment we want to delete</p>

      <Code block>{`
      // /pages/api/comments/[commentId].js
      import { comments } from "../../../data/comments"

      export default function handler(req, res) {
        if (req.method === 'GET') {
          const commentId = req.query.commentId
          const comment = comments.find(comment => comment.id === parseInt(commentId))
          res.status(200).json(comment)
          return
        }
      }
      `}</Code>

      <LazyImg width="400px" src="/imgs/next/dynamic api.png" />

      <Hs>DELETE request</Hs>

      <p>Add delete button into UI</p>

      <Code block>{`
      // pages/comments/index.js
      import { useState } from "react"

      export default function Component() {
        const [comments, setComments] = useState([])
        const [comment, setComment] = useState('')
        const updateInputVal = (e) => setComment(e.target.value)

        const getComments = async () => { 
          const response = await fetch('api/comments')
          const result = await response.json()
          setComments(result)
        }

        const submitComment = async () => { 
          const response = await fetch('api/comments', {
            method: 'POST',
            body: JSON.stringify({comment: comment}),
            headers: { 'Content-Type': 'Application/json' }
          })
          const data = await response.json()
        }

        const deleteComment = async (commentId) => { 
          const response = await fetch(\`/api/comments/\${commentId}\`, {
            method: 'DELETE'
          })
          const data = await response.json()
          getComments()
        }

        return (
          <>
            <input type="text" value={comment} onChange={updateInputVal} />
            <button onClick={submitComment}>Submit comment</button>
            <button onClick={getComments}>Get comments</button>
            { 
              comments.map(comment => (
                <div key={comment.id}>
                  {comment.text}
                  <button onClick={() => deleteComment(comment.id)}>Delete</button>
                  <hr/>
                </div>
              )) 
            }
          </>
        )
      }
      `}</Code>

      <p>Handle DELETE request in dynamic route api</p>

      <Code block>{`
      // /pages/api/comments/[commentId].js
      import { comments } from "../../../data/comments"

      export default function handler(req, res) {
        const commentId = req.query.commentId
        
        if (req.method === 'GET') {
          const comment = comments.find(comment => comment.id === parseInt(commentId))
          res.status(200).json(comment)
          return
        }

        if (req.method === 'DELETE') {
          const deletedComment = comments.find(comment => comment.id === parseInt(commentId))
          const index = comments.findIndex(comment => comment.id === parseInt(commentId))
          comments.splice(index, 1)
          res.status(200).json(deletedComment)
          return
        }
      }
      `}</Code>

      <LazyImg width="auto" src="/imgs/next/delete comment.png" />

      <Hs>PUT, PATCH request</Hs>

      <p>Has same logic as DELETE request</p>

      <Hs>Catch all API routes</Hs>

      <p>It is similar to catching all pages routes via <Code>[...params]</Code> or <Code>[[...params]]</Code> to include also a root route</p>

      <Code block>{`
      // /pages/api/[...params].js
      export default function handler(req, res) {
        const params = req.query.params
        res.status(200).json(params)
      }
      `}</Code>

      <LazyImg width="300px" src="/imgs/next/catch all api routes.png" />

      <H>Styles</H>

      <Hs>Global styles</Hs>

      <ul>
        <li>Global styles are kept in <Code>styles/globals.css</Code></li>
        <li>And imported into <Code>pages/_app.js</Code></li>
        <li>Styles will be applicable for all pages</li>
        <li>For ex. we can add bootstrap with <Code bash>npm i bootstrap</Code></li>
        <li>And include it within <Code>pages/_app.js</Code> with <Code js>import 'bootstrap/dist/css/bootstrap.min.css'</Code></li>
      </ul>

      <Hs>Component scoped styles</Hs>

      <ul>
        <li>Scoped styles can be stored in <Code>FileName.module.css</Code></li>
        <li>Import styles into a file with <Code js>import styles from '...path/FileName.module.css'</Code></li>
        <li>To apply styles we need to access it via <Code>styles</Code> object</li>
        <li>CSS modules can only target elements using classnames or ids and not using tag names</li>
        <li>Such styles will get unique class names</li>
        <li>No need to worry about styles collisions</li>
      </ul>

      <p>CSS module</p>

      <Code block css>{`
      /* users/styles.module.css */
      .heading h3 {
        color: red;
      }
      `}</Code>

      <p>Component</p>

      <Code block>{`
      // users/index.js
      import Link from "next/link"
      import styles from './styles.module.css'

      export default function Index(props) {
        return (
          <div className={styles.heading}>
            <h3>List of users</h3>
            {props.data.map(user => (
              <Link key={user.first_name} href={\`users/\${user.id}\`} passHref>
                <div>Name: {user.first_name}</div>
              </Link>
            ))}
          </div>
        )
      }

      export async function getServerSideProps() {
        const response = await fetch('https://random-data-api.com/api/users/random_user?size=5')
        const result = await response.json()
        console.log(result)
        return {
          props: {
            data: result
          },
        }
      }
      `}</Code>

      <LazyImg width="auto" src="/imgs/next/css module.png" />

      <Hs>SASS / SCSS</Hs>

      <p>Add SASS with <Code bash>npm i sass</Code></p>
      <p>CSS module for the same component as above</p>

      <Code block css>{`
      /* users/styles.module.scss */
      .heading {
        background: lightblue;
        h3 { color: red; }
        [href] { color: yellow; }
      }
      `}</Code>

      <LazyImg width="auto" src="/imgs/next/scss module.png" />

      <Hs>Inline styles</Hs>

      <p>Inline styles can be used in JSX <Code jsx>{'<div style={{fontSize: "50px"}}>div</div>'}</Code></p>

      <Hs>styled-jsx</Hs>

      <p>Detailed info reat at <Lnk path='https://nextjs.org/blog/styling-next-with-styled-jsx'>https://nextjs.org/blog/styling-next-with-styled-jsx</Lnk></p>

      <Code block>{`
      export default function HelloWorld() {
        return (
          <div>
            Hello world
            <p>scoped!</p>
            
            <style jsx>{\`
              p { color: blue; }
              div { background: red; }
              @media (max-width: 600px) {
                div { background: blue; }
              }
            \`}</style>

            <style global jsx>{\`
              body { background: black; }
            \`}</style>

          </div>
        )
      }
      `}</Code>

      <Hs>SASS in styled-jsx</Hs>

      <ul>
        <li><Code bash>npm install --save-dev @styled-jsx/plugin-sass sass</Code></li>
        <li>Create a <Code>.babelrc.json</Code> file in the project folder</li>
        <li>Restart the next server and reload the page.</li>
      </ul>

      <Code block json>{`
      {
        "presets": [
          [
            "next/babel",
            {
              "styled-jsx": {
                "plugins": ["@styled-jsx/plugin-sass"]
              }
            }
          ]
        ]
      }
      `}</Code>

      <Hs>Styled components</Hs>

      <ul>
        <li>Add styled components <Code bash>npm i styled-components</Code></li>
        <li>Install babel plugin <Code bash>npm i -D babel-plugin-styled-components</Code></li>
        <li>Then create a <Code>.babelrc</Code> file in the root of the project</li>
        <li>Create <Code>/pages/_document.js</Code></li>
        <li>Add following <Lnk path='https://github.com/vercel/next.js/blob/main/examples/with-styled-components/pages/_document.js'>code</Lnk> to inject the server side rendered styles into the {'<head>'}</li>
      </ul>

      <p><Code>.babelrc</Code></p>

      <Code block json>{`
      {
        "presets": [
          "next/babel"
        ],
        "plugins": [
          [
            "styled-components",
            {
              "ssr": true,
              "displayName": true,
              "preprocess": false
            }
          ]
        ]
      }
      `}</Code>

      <p><Code>_document.js</Code></p>

      <Code block>{`
      // /pages/_document.js
      import Document from 'next/document'
      import { ServerStyleSheet } from 'styled-components'

      export default class MyDocument extends Document {
        static async getInitialProps(ctx) {
          const sheet = new ServerStyleSheet()
          const originalRenderPage = ctx.renderPage

          try {
            ctx.renderPage = () =>
              originalRenderPage({
                enhanceApp: (App) => (props) =>
                  sheet.collectStyles(<App {...props} />),
              })

            const initialProps = await Document.getInitialProps(ctx)
            return {
              ...initialProps,
              styles: (
                <>
                  {initialProps.styles}
                  {sheet.getStyleElement()}
                </>
              ),
            }
          } finally {
            sheet.seal()
          }
        }
      }
      `}</Code>

      <p>UI</p>

      <Code block>{`
      // pages/styled-cmpt.js
      import styled from 'styled-components'

      export default function Index() {
        return (
          <Div>
            <h3>h3</h3>
            <div>div</div>
          </Div>
        )
      }

      const Div = styled.div\`
        border: 5px solid green;
        padding: 5px;
        h3 { color: orange; }
        div { color: blue; }
      \`
      `}</Code>

      <LazyImg width="400px" src="/imgs/next/styled components.png" />

      <H>Layout</H>

      <ul>
        <li>It is the website structure, where we have on all pages fixed navbar and footer for ex.</li>
        <li>Layout can be defined in <Code>_app.js</Code> file</li>
      </ul>

      <Hs>Common header & footer</Hs>

      <Code block>{`
      // components/layout/Header.js
      export default function Header() {
        return <div className='my-header'>Header</div>
      }
      `}</Code>

      <Code block>{`
      // components/layout/Footer.js
      export default function Footer() {
        return <div className='my-footer'>Footer</div>
      }
      `}</Code>

      <Code block css>{`
      /* styles/layout.css */
      .my-header { background-color: #264653; color: #f4a261; font-size: 30px; text-align: center; padding: 30px; }
      .my-footer { background-color: #264653; color: #e9c46a; font-size: 30px; text-align: center; padding: 20px; }
      .content { display: flex; justify-content: center; align-items: center; min-height: 100vh; }
      `}</Code>

      <Code block>{`
      // pages/_app.js
      import Footer from '../components/layout/Footer'
      import Header from '../components/layout/Header'
      import '../styles/globals.css'
      import '../styles/layout.css'

      export default function MyApp({ Component, pageProps }) {
        return (
          <>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </>
        )
      }
      `}</Code>

      <LazyImg width="400px" src="/imgs/next/home page with layout.png" />

      <Hs>Exception from layout</Hs>

      <p>For example we do not need the header on <Code>about</Code> page</p>

      <p>We can add specific property <Code>getLayout</Code>into a component function</p>

      <Code block>{`
      // pages/about.js
      import Footer from "../components/layout/Footer"

      export default function About(params) {
        return <div className="content">About text</div>
      }

      About.getLayout = (page) => (
        <>
          {page}
          <Footer />
        </>
      )
      `}</Code>

      <p>In the <Code>_app.js</Code> we can check the availability of <Code>Component.getLayout</Code> property and
      specifically render such components</p>

      <Code block>{`
      // pages/_app.js
      import Footer from '../components/layout/Footer'
      import Header from '../components/layout/Header'
      import '../styles/globals.css'
      import '../styles/layout.css'

      export default function MyApp({ Component, pageProps }) {
        
        if (Component.getLayout) {
          return Component.getLayout(<Component {...pageProps} />)
        }

        return (
          <>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </>
        )
      }
      `}</Code>

      <LazyImg width="400px" src="/imgs/next/about.png" />

      <H>Head component</H>

      <ul>
        <li><Code html >{'<head></head>'}</Code> tag is very minimalistic by default in Next.js </li>
        <li>Data in head tag is very important for SEO</li>
        <li>Next.js provide a special <Code html >{'<Head/>'}</Code> component</li>
        <li>Every page component can have its own <Code html >{'<Head/>'}</Code> and more specific will be merge and replace tag from the parent page</li>
      </ul>

      <Code block>{`
      // pages/_app.js
      import Head from 'next/head'
      import Footer from '../components/layout/Footer'
      import Header from '../components/layout/Header'
      import '../styles/globals.css'
      import '../styles/layout.css'

      export default function MyApp({ Component, pageProps }) {
        
        if (Component.getLayout) {
          return Component.getLayout(<Component {...pageProps} />)
        }

        return (
          <>
            <Head>
              <title>Blog page</title>
              <meta name='description' content='Nice blog channel' />
            </Head>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </>
        )
      }
      `}</Code>

      <p>We can pass dynamic data into the <Code html >{'<Head/>'}</Code> component.</p>

      <Code block>{`
      // /pages/blog/[blogId].js 
      import Head from 'next/head'

      export default function Blog({ title, description }) {
        return (
          <>
            <Head>
              <title>{title}</title>
              <meta name='description' content={description} />
            </Head>
            <h1>
              Some blog text
            </h1>
          </>
        )
      }

      export async function getServerSideProps() {
        return {
          props: {
            title: 'Article Title',
            desc: 'Article description'
          }
        }
      }
      `}</Code>

      <H>Image component</H>

      <ul>
        <li>Images should be placed under <Code>public/</Code> folder</li>
        <li>Path to a file <Code>file.png</Code> inside <Code>public/</Code> is <Code>/file.png</Code></li>
      </ul>

      <Hs>General image</Hs>

      <p>When <Code html >{'<img>'}</Code> is used, files are downloaded at its original big size and increases the load time.</p>

      <Code block>{`
      // pages/imgs.js
      export default function Imgs() {
        return (
          <>
            {['1', '2', '3', '4', '5'].map(path => {
              return (
                <div key={path}>
                  <img src={\`/\${path}.jpeg\`} alt='some desc' width='400' height='auto' />
                </div>
              )
            })}
          </>
        )
      }
      `}</Code>

      <LazyImg width="auto" src="/imgs/next/big size of image.png" />

      <Hs>Image component</Hs>

      <ul>
        <li><Code html >{'<Image>'}</Code> <Lnk path='https://nextjs.org/docs/api-reference/next/image'>component</Lnk> from the Next.js library optimizes an image size</li>
        <li>Images are lazy loaded</li>
        <li>Blurred image can be pre-loaded as a placeholder, which eliminates any shifts when an actual image is downloaded and takes a place over</li>
      </ul>

      <Code block>{`
      // pages/imgs.js
      import Image from 'next/image'

      export default function Imgs() {
        return (
          <>
            {['1', '2', '3', '4', '5'].map(path => {
              return (
                <div key={path}>
                  <Image
                    src={\`/\${path}.jpeg\`}
                    alt="some desc"
                    width="300px" 
                    height="100px" 
                    // layout="fill"
                    objectFit="contain"
                    placeholder="blur"
                    blurDataURL={\`/\${path}.jpeg\`}
                  />
                </div>
              )
            })}
          </>
        )
      }
      `}</Code>

      <H>Path alias</H>

      <p>Add <Code>jsconfig.json</Code> into the root folder</p>

      <Code block json>{`
      {
        "compilerOptions": {
          "baseUrl": ".",
          "paths": {
            "/*": ["./*"],
            "@st/*": ["/styles/*"]
          }
        }
      }
      `}</Code>

      <ul>
        <li>With <Code json>"baseUrl": "."</Code> we can use <code>/</code> to access the root</li>
        <li>With <Code json>"/*": ["./*"]</Code> we can avoid using <code>/</code> to access the root</li>
        <li>With <Code json>"@st/*": ["/styles/*"]</Code> we can use <code>@st/</code> for <code>/styles/</code></li>
      </ul>

      <Code block>{`
      // pages/_app.js
      import Footer from '/components/layout/Footer'
      import Header from 'components/layout/Header'
      import '/styles/globals.css'
      import '@st/layout.css'

      export default function MyApp({ Component, pageProps }) {
        return (
          <>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </>
        )
      }
      `}</Code>

      <H>TypeScript support</H>

      <ul>
        <li>Create <Code>tsconfig.json</Code> file in the root</li>
        <li>Add TS package <Code bash>npm i -D typescript @types/react @types/node</Code></li>
        <li>Restart server by <Code bash>npm run dev</Code></li>
        <li><Code>tsconfig.json</Code> file will be populated automatically</li>
        <li>Also <Code>next-env.d.ts</Code> file is created for some type (no clue)</li>
        <li><Code>jsconfig.json</Code> is not in use anymore and we need to copy its content into <Code>tsconfig.json</Code></li>
        <li>Restart again <Code bash>npm run dev</Code></li>
      </ul>

      <p>Some specific types</p>

      <Code block>{`
      import { GetStaticProps, GetStaticPaths, GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'

      // props

      export const getStaticProps: GetStaticProps = async (context) => {
        // ...
      }
      export const getStaticPaths: GetStaticPaths = async () => {
        // ...
      }
      export const getServerSideProps: GetServerSideProps = async (context) => {
        // ...
      }

      // api

      export default (req: NextApiRequest, res: NextApiResponse) => {
        res.status(200).json({ name: 'John Doe' })
      }
      // or
      type Data = {
        name: string
      }
      export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
        res.status(200).json({ name: 'John Doe' })
      }
      `}</Code>

      <H>Redirects</H>

      <p><Lnk path='https://nextjs.org/docs/api-reference/next.config.js/redirects'>Redirects</Lnk> are useful to wire requests to other page during your page maintenance.</p>

      <p>We need to add re-direct instructions into <Code>next.config.js</Code> file and restart the server.</p>

      <Code block>{`
      const nextConfig = {
        reactStrictMode: true,
        redirects: async () => {
          return [
            {
              source: '/about',
              destination: '/',
              permanent: false
            },
            {
              source: '/old-blog/:id',
              destination: '/new-blog/:id',
              permanent: true
            }
          ]
        }
      }
      module.exports = nextConfig
      `}</Code>

      <p>Now when we hit the <Code>/about</Code> url we are re-directed to the root folder.</p>

      <H>Environment variable</H>

      <ul>
        <li>Environment variables can keep some data, which are not shipped to the browser</li>
        <li>Variables should be placed in <Code>.env.local</Code> file at the root</li>
        <li>File is git ignored automatically</li>
        <li>Values can be accessed from <Code>process.env</Code> object</li>
        <li>By default environment variables can not be exposed to the front-end</li>
        <li>If we want it to be available in the browser, then variable to be pre-fixed with <Code>NEXT_PUBLIC_</Code></li>
      </ul>

      <Code block bash>{`
      # /.env.local
      DB_USER=Anton
      DB_PASSWORD=123
      NEXT_PUBLIC_NOT_A_SECRET=I am not a secret
      `}</Code>

      <Code block>{`
      export default function Home(props) {
        return (
          <>
            <h1> Home page </h1>
            <div>User: <b>{props.user}</b></div>
            <div>Password: <b>{props.password}</b></div>
            <div>Direct access to an environment variable: <b>{process.env.NEXT_PUBLIC_NOT_A_SECRET}</b></div>
          </>
        )
      }

      export async function getServerSideProps() {
        const user = process.env.DB_USER
        const password = process.env.DB_PASSWORD
        return {
          props: {
            user,
            password
          },
        }
      }
      `}</Code>

      <H>Authentication</H>

      <ul>
        <li>Authentication - identity of a user</li>
        <li>Authorization - verifies what access permissions the user has</li>
      </ul>

      <Hs>NextAuth.js</Hs>

      <p><Lnk path='https://next-auth.js.org/'>NextAuth.js</Lnk> is the open source solution for authentication</p>
      <p>Install the package <Code bash>npm i next-auth</Code></p>

      <Hs>GitHub authentication</Hs>

      <p>Create auth keys on GitHub profile</p>

      <LazyImg width="auto" src="/imgs/next/github auth config.png" />

      <p>Put them into environment variables.</p>

      <Code block bash>{`
      # /.env.local
      GITHUB_ID=f86f8a443fbfdc1194e2
      GITHUB_SECRET=8df58a01884796ac82afb7e2d64ec712fde6bdb2
      `}</Code>

      <p>Add dynamic api route <Code></Code></p>

      <Code block>{`
      // pages/api/auth/[...nextauth].js
      import NextAuth from 'next-auth/next'
      import GitHubProvider from 'next-auth/providers/github'

      export default NextAuth({
        providers: [
          GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          })
        ]
      })
      `}</Code>

      <p>Hit <Code>http://localhost:3000/api/auth/signin</Code> url and sign in button will be returned by the <i>next-auth</i> lib</p>

      <LazyImg width="200px" src="/imgs/next/signin with github.png" />

      <p>When we sign in the JWT token will be stored in cookies</p>

      <LazyImg width="auto" src="/imgs/next/auth-github-cookie.png" />

      <p>When hit <Code>http://localhost:3000/api/auth/signout</Code> url the token will be removed.</p>

      <Hs>Sign in & out with buttons</Hs>

      <ul>
        <li>Of course we can not expect users to sign by hitting an url, so we need to make a button or a link</li>
        <li>Just include a link with href and it will work</li>
        <li>Or we can include <Code js >signIn()</Code> & <Code js >signOut()</Code> function from the package</li>
        <li>If we have just one login provider, we may add it as an argument and will not have any page redirection</li>
      </ul>

      <Code block>{`
      // components/Navbar.js
      import Link from 'next/link'
      import { signIn, signOut } from "next-auth/react"

      export default function Navbar() {
        function signInFunc(e) {
          e.preventDefault() 
          signIn('github') 
        }

        function signOutHandler(e) {
          e.preventDefault() 
          signOut() 
        }

        return (
          <nav className='header'>
            <h1 className='logo'><a href='#'>NextAuth</a></h1>
            <ul className={\`main-nav\`}>
              <li><Link href='/'><a>Home</a></Link></li>
              <li><Link href='/dashboard'><a>Dashboard</a></Link></li>
              <li><Link href='/blog'><a>Blog</a></Link></li>
              <li><Link href='/api/auth/signin'><a onClick={signInHandler}>Sign In</a></Link></li>
              <li><Link href='/api/auth/signout'><a onClick={signOutHandler}>Sign Out</a></Link></li>
            </ul>
          </nav>
        )
      }
      `}</Code>

      <Hs>Client-side authentication</Hs>

      <ul>
        <li>We need to hide "sign in" button and show "sign out" if we are signed in</li>
        <li>We can use <Code js >useSession()</Code> hook from the package</li>
        <li>The hook returns an object with <Code>data</Code> object and a <Code>status</Code> flag <Code js >{'const { data, status } = useSession()'}</Code></li>
        <li>As far as we do our authentication check on a client side, we have a flicker between "sign in" & "sign out" buttons due to request time.</li>
        <li>To avoid it we can apply some transition.</li>
      </ul>

      <LazyImg width="400px" src="/imgs/next/useSession object.png" />

      <Code block>{`
      // components/Navbar.js
      import Link from 'next/link'
      import { signIn, signOut, useSession } from "next-auth/react"

      export default function Navbar() {
        const {data, status} = useSession()

        function signInFunc(e) {
          e.preventDefault()
          signIn('github')
        }

        function signOutFunc(e) {
          e.preventDefault()
          signOut()
        }

        return (
          <nav className='header'>
            <h1 className='logo'><a href='#'>NextAuth</a></h1>
            <ul className={\`main-nav \${status === 'loading' ? 'loading' : 'loaded'}\`}>
              <li><Link href='/'><a>Home</a></Link></li>
              <li><Link href='/dashboard'><a>Dashboard</a></Link></li>
              <li><Link href='/blog'><a>Blog</a></Link></li>
              {!data && status === "unauthenticated" && (
                <li><Link href='/api/auth/signin'><a onClick={signInFunc}>Sign In</a></Link></li>
              )}
              {data && status === 'authenticated' && (
                <li><Link href='/api/auth/signout'><a onClick={signOutFunc}>Sign Out</a></Link></li>
              )}
            </ul>
          </nav>
        )
      }
      `}</Code>

      <Code block>{`
      // pages/_app.js
      import Navbar from '../components/Navbar'
      import { SessionProvider } from "next-auth/react"; 
      import '/styles/globals.css'
      import '@st/layout.css'
      import '../components/Navbar.css'

      export default function MyApp({ Component, pageProps: {session, ...pageProps }}) {
        return (
          <>
            <SessionProvider session={session}>
              <Navbar />
              <Component {...pageProps} />
            </SessionProvider>
          </>
        )
      }
      `}</Code>

      <Code block css>{`
      .loading {
        opacity: 0;
        transition: all 0.2s ease-in;
      }

      .loaded {
        opacity: 1;
        transition: all 0.2s ease-in;
      }
      `}</Code>

      <Hs>Secure pages client side</Hs>

      <ul>
        <li>Let view a page only for a logged in user</li>
        <li>If not logged in, then re-direct to a log in page</li>
        <li>We can use <Code>getSession</Code> function from the package</li>
        <li>The function returns an promise with a session object or <Code>null</Code> if no session exists & user is not logged in</li>
      </ul>

      <Code block>{`
      // pages/dashboard.js
      import { useState, useEffect } from 'react'
      import { getSession, signIn } from "next-auth/react"

      export default function Dashboard() {
        const [loading, setLoading] = useState(true)

        useEffect(() => {
          async function securePage() {
            const session = await getSession()
            if (session) setLoading(false)
            if (!session) signIn()
          }
          securePage()
        }, [])

        if (loading) return <h2>Loading...</h2>
        if (!loading) return <h1>Dashboard page</h1>
      }
      `}</Code>

      <Hs>Server-side authentication and page securing</Hs>

      <ul>
        <li>We do same logic, but from <Code js >getServerSideProps()</Code> function</li>
        <li>From any page we return <Code>session</Code> object into <Code>props</Code></li>
        <li><Code>Props</Code> are available at the top component and this <Code>session</Code> objects falls into <Code js >{'<SessionProvider session={pageProps.session}>'}</Code></li>
        <li>Now session object is available in every component from <Code js >useSession()</Code> hook</li>
      </ul>

      <Code block>{`
      // pages/blog.js
      import { getSession, useSession } from 'next-auth/react'

      export default function Blog({ msg }) {
        const {data, status} = useSession()
        console.log(data, status) // just to show that session data is available
        return <h1>Blog page - {msg}</h1>
      }

      export async function getServerSideProps(context) {
        const session = await getSession(context)
        if (!session) {
          return {
            redirect: {
              destination: '/api/auth/signin?callbackUrl=http://localhost:3000/blog',
              permanent: false
            }
          }
        }
        return {
          props: {
            msg: session ? 'List of paid blogs' : 'List of free blogs',
            session
          }
        }
      }
      `}</Code>

      <Code block>{`
      // pages/_app.js
      import Navbar from '../components/Navbar'
      import { SessionProvider } from "next-auth/react"; 
      import '/styles/globals.css'
      import '@st/layout.css'
      import '../components/Navbar.css'

      export default function MyApp({ Component, pageProps}) {
        return (
          <>
            <SessionProvider session={pageProps.session}>
              <Navbar />
              <Component {...pageProps} />
            </SessionProvider>
          </>
        )
      }
      `}</Code>

      <Hs>Secure API route</Hs>

      <Code block>{`
      // pages/api/test-session.js
      import { getSession } from 'next-auth/react'

      export default async function apiRoute(req, res) {
        const session = await getSession({ req })
        if (!session) res.status(401).json({ error: 'Unauthenticated user' })
        if (session) res.status(200).json({ message: 'Success', session })
      }
      `}</Code>

      <LazyImg width="auto" src="/imgs/next/test session.png" />

      <H>Connecting to a MongoDB</H>

      <ul>
        <li>Configure <Lnk path='https://next-auth.js.org/adapters/mongodb'>mongodb adapter</Lnk></li>
        <li>Install mongodb package <Code bash>npm i next-auth @next-auth/mongodb-adapter mongodb</Code></li>
        <li>Create free database <Lnk path='mongodb.com'>mongodb.com</Lnk> with own credentials and make it accessed from everywhere in network configuration</li>
        <li>Add db configuration into <Code>.env.local</Code> file</li>
        <li>Add database URL into auth api in <Code>pages/api/auth/[...nextauth].js</Code> file</li>
      </ul>

      <Code block bash>{`
      # /.env.local
      DB_USER=sherbsherb
      DB_PASSWORD=dummypassword
      MONGODB_URI=mongodb+srv://$DB_USER:$DB_PASSWORD@quotationtool.75fjj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
      `}</Code>

      <Code block>{`
      // lib/mongodb.js
      // This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
      import { MongoClient } from "mongodb"

      const uri = process.env.MONGODB_URI
      const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }

      let client
      let clientPromise

      if (!process.env.MONGODB_URI) {
        throw new Error("Please add your Mongo URI to .env.local")
      }

      if (process.env.NODE_ENV === "development") {
        // In development mode, use a global variable so that the value
        // is preserved across module reloads caused by HMR (Hot Module Replacement).
        if (!global._mongoClientPromise) {
          client = new MongoClient(uri, options)
          global._mongoClientPromise = client.connect()
        }
        clientPromise = global._mongoClientPromise
      } else {
        // In production mode, it's best to not use a global variable.
        client = new MongoClient(uri, options)
        clientPromise = client.connect()
      }

      // Export a module-scoped MongoClient promise. By doing this in a
      // separate module, the client can be shared across functions.
      export default clientPromise
      `}</Code>

      <Code block>{`
      // pages/api/auth/[...nextauth].js
      import NextAuth from 'next-auth/next'
      import GitHubProvider from 'next-auth/providers/github'
      import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
      import clientPromise from "lib/mongodb"

      export default NextAuth({
        providers: [
          GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          })
        ],
        adapter: MongoDBAdapter(clientPromise),
      })
      `}</Code>

      <p>When we log in the database is populated by next-auth</p>

      <LazyImg width="90%" src="/imgs/next/mongodb accounts.png" />
      <LazyImg width="90%" src="/imgs/next/mongodb sessions.png" />
      <LazyImg width="90%" src="/imgs/next/mongodb users.png" />

      <H>Deployment</H>

      <ul>
        <li><Lnk path='https://nextjs.org/docs/deployment'>https://nextjs.org/docs/deployment</Lnk></li>
        <li><Lnk path='https://vercel.com/'>https://vercel.com/</Lnk></li>
        <li><Lnk path='https://medium.com/today-i-solved/how-to-deploy-next-js-on-aws-ec2-with-ssl-https-7980ec6fe8d3'>Post from Medium</Lnk> about manual deployment on self hosted server</li>
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
  imgUrl: postObj.imgUrl || null,
  bodyStr: jsxToStr(postObj.body)
}
