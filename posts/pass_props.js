import { Code, H, jsxToStr } from '/components/post/reExport'

// #region 1
const Component1 = (props) => (
  <div>
    {props.a}, {props.b} dear {props.c}!
  </div>
)
// #endregion

// #region 2
const Component2 = ({ a, b, c }) => (
  <div>
    {a}, {b} dear {c}!
  </div>
)
// #endregion

// #region 3
const Component3 = ({ a, b, c }) => (
  <div>
    {a}, {b} dear {c}!
  </div>
)
const userProps = { a: 'hello', b: 'my', c: 'friend' }
// #endregion

// #region 4
const Component4 = (props) => {
  const { a, b, c } = props
  return (
    <div>
      {a}, {b} dear {c}!
    </div>
  )
}
// #endregion

// #region 5
function Component5(props1) {
  return <Child {...props1} d={3} />
}
function Child(props2) {
  return <>{`${props2.a}, ${props2.b} ${props2.c} ${props2.d} times`}</>
}
// #endregion

const postObj = {
  title: 'pass props',
  date: '2021.09.29',
  tags: ['react', 'basics'],
  desc: 'Different ways to pass props',
  body: (
    <>
      <p>
        We can pass variables into a component from outside and take them from the{' '}
        <Code>props</Code> object.
      </p>

      <H>
        Take variables from <Code>props</Code> object
      </H>

      <Code block>{`
      const Component1 = (props) => <div>{props.a}, {props.b} dear {props.c}!</div>
      <Component1 a='hello' b='my' c='friend'/>
      `}</Code>

      <Component1 a="hello" b="my" c="friend" />

      <H>
        Destructure <Code>props</Code> object in component
      </H>

      <Code block>{`
      const Component2 = ({ a, b, c }) => <div>{a}, {b} dear {c}!</div>
      <Component2 a='hello' b='my' c='friend'/>
      `}</Code>

      <Component2 a="hello" b="my" c="friend" />

      <H>Pass variables in object</H>

      <Code block>{`
      const Component3 = ({ a, b, c }) => <div>{a}, {b} dear {c}!</div>
      const userProps = { a: 'hello', b: 'my', c: 'friend' }
      <Component3 {...userProps}/>
      `}</Code>

      <Component3 {...userProps} />

      <H>Destructure props inside component</H>

      <p>That is my favorite way.</p>

      <Code block>{`
      const Component4 = (props) => {
        const { a, b, c } = props
        return <div>{a}, {b} dear {c}!</div>
      }
      <Component4 a='hello' b='my' c='friend'/>
      `}</Code>

      <Component4 a="hello" b="my" c="friend" />

      <H>Pass all props</H>

      <p>
        Sometimes we need to pass tons of props from a component to a component. That can create a
        mess.
      </p>
      <p>
        We can pass all of them at ones using spread operator <Code>...</Code> at receiving
        component.
      </p>
      <p>
        The drawback is that we can not choose specific props we are forwarding, only the whole
        scope.
      </p>

      <Code block>{`
      function Component5(props1) {
        return <Child {...props1} d={3} />;
      }
      function Child(props2) {
        return <>{\`\${props2.a}, \${props2.b} \${props2.c} \${props2.d} times\`}</>
      }
      <Component5 a="hello" b="my" c="friend" />
      `}</Code>

      <Component5 a="hello" b="my" c="friend" />

      <H>Pass rest of the props</H>

      <Code block jsx>{`
      const RoundedButton = ({ datatestid, shadow, content, children, ...restProps }) => {
        return (
          <Button
            variant='contained'
            data-testid={datatestid}
            {...restProps}
          >
            {content}
            {children}
          </Button>
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
