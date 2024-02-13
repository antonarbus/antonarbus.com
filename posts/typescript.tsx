import { Code, H, Hs, LazyImg, Lnk, React, jsxToStr } from '/components/post/reExport'
import { ExportedTypes } from '/types/types'
import { UserContext, UserContextProvider } from '/types/UserContext'

// #region main types
function myFunc (
  arg1: string,
  arg2: number,
  arg3: boolean,
  arg4: 1 | 2 | string | number | boolean | bigint | null | symbol | undefined | any, // OR
  arg5: {
    val1: string
    val2: number
  }, // object
  arg6: string[], // array of strings
  arg7: {
    first: string
    last: string
  }[], // arr of objects
  arg8: 'loading' | 'success' | 'error', // union of specific strings
  arg9: () => void, // function returning undefined
  arg10?: string // optional
): void {
  // console.log(arguments)
}
const someFunc = () => console.log('hi')
myFunc(
  'str1',
  666,
  true,
  1,
  { val1: 'hi', val2: 5 },
  ['a', 'b'],
  [{ first: 'John', last: 'Dow' }, { first: 'Jane', last: 'Blake' }],
  'error',
  someFunc,
  'optional string'
)
// #endregion

// #region interface
interface propsTypes1 {
  name: string
  lastName?: string
  likesNum: string | number
}
function Msg1 (props: propsTypes1): JSX.Element {
  return (
    <div>
      Hello {props.name}
      {props.lastName && ` ${props.lastName}`}, you have received{' '}
      {props.likesNum} likes.
    </div>
  )
}
// #endregion

// #region type
type propTypes2 = {
  name: string
  company?: string
  likesNum: string | number
  isLogged: boolean
  spouseName: {
    name: string
    lastName: string
  }
  cars: string[]
}
function Msg2 (props: propTypes2): JSX.Element {
  return (
    <>
      Hello {props.name} {props.company && `from ${props.company}`}
      {props.isLogged && `, you have received ${props.likesNum} likes.`} We wish
      you and {props.spouseName.name} {props.spouseName.lastName} a good day.
      Your following cars have unpaid fine tickets:{' '}
      {props.cars.map((car, i) => {
        const ending = i !== props.cars.length - 1 ? ' & ' : ''
        return car + ending
      })}
    </>
  )
}
// #endregion

// #region prop.children as string
function ComponentWithChildren (props: { children: string }) {
  return <h2> {props.children} </h2>
}
// #endregion

// #region prop.children as React component
function ComponentWithReactComponentAsChild (props: { children: React.ReactNode }) {
  return <h2> {props.children} </h2>
}
// #endregion

// #region onClick event handler without return or event object
function Button1 (props: { handleClick: () => void }) {
  return (
    <button onClick={props.handleClick}> Click </button>
  )
}
// #endregion

// #region onClick event handler with event object
function Button2 (props: { handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <button onClick={props.handleClick}> Click </button>
  )
}
// #endregion

// #region onClick event handler with event object & additional param
function Button3 (props: { handleClick: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void }) {
  return (
    <button onClick={e => props.handleClick(e, 1)}>Click</button>
  )
}
// #endregion

// #region onChange event handler passed in prop
type InputProps = {
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
function Input (props: InputProps) {
  return <input type="text" value={props.value} onChange={props.handleChange} />
}
// #endregion

// #region onChange event handler defined in a component
type InputProps1 = {
  value: string
}
function Input1 (props: InputProps1) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => console.log(e)
  return <input type="text" value={props.value} onChange={handleChange} />
}
// #endregion

// #region styles as props
type ContainerProps = {
  styles: React.CSSProperties
}
function SomeCmpt (props: ContainerProps) {
  return (
    <div style={props.styles}> Some text </div>
  )
}
// #endregion

// #region props destructuring
type SomeProps = {
  styles: React.CSSProperties
}
function Cmpt ({ styles }: SomeProps) {
  return (
    <div style={styles}> Some text </div>
  )
}
// #endregion

// #region exporting types
function Cmpt2 ({ styles }: ExportedTypes) {
  return (
    <div style={styles}> Some text </div>
  )
}
// #endregion

// #region re-use types
type Name = {
  first: string
  last: string
}
type PersonProp = {
  name: Name
}
function Person (props: PersonProp) {
  return <h2>{props.name.first} {props.name.last}</h2>
}
// #endregion

// #region array of other type
type Nameee = {
  first: string
  last: string
}
type PersonsListProps = {
  names: Nameee[]
}
function PersonList (props: PersonsListProps) {
  return (
    <div>
      {props.names.map(name => {
        return (
          <Hs key={name.first}>
            {name.first} {name.last}
          </Hs>
        )
      })}
    </div>
  )
}
const namesArr = [
  { first: 'John', last: 'Dow' },
  { first: 'Jane', last: 'Blake' },
  { first: 'Kate', last: 'Stew' }
]
// #endregion

// #region uesState
type AuthType = {
  name: string
  mail: string
}
function User () {
  const [userState, setUserState] = React.useState<null | AuthType>(null)
  const handleLogin = () => setUserState({ name: 'John', mail: 'john@mail.com' })
  const handleLogout = () => setUserState(null)
  return <div>
    <button onClick={handleLogin}>Login</button>
    <button onClick={handleLogout}>Logout</button>
    <div>User name is {userState?.name}</div>
    <div>User name is {userState?.mail}</div>
  </div>
}
// #endregion

// #region uesState with type assertion
type AuthType2 = {
  name: string
  mail: string
}
function User2 () {
  const [userState, setUserState] = React.useState<AuthType>({} as AuthType2)
  const handleLogin = () => setUserState({ name: 'John', mail: 'john@mail.com' })
  return <div>
    <button onClick={handleLogin}>Login</button>
    <div>User name is {userState.name}</div>
    <div>User name is {userState.mail}</div>
  </div>
}
// #endregion

// #region useReducer
type CounterStateType = {
  count: number
}
type UpdateActionType = {
  type: 'increment' | 'decrement' | 'reset'
  payload?: number
}
const initialState = { count: 0 }
function reducer (state: CounterStateType, action: UpdateActionType) {
  switch (action.type) {
    case 'increment': return { count: state.count + (action.payload || 0) }
    case 'decrement': return { count: state.count - (action.payload || 0) }
    case 'reset': return initialState
    default: return state
  }
}
const Counter = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment', payload: 10 })}> Increment 10 </button>
      <button onClick={() => dispatch({ type: 'decrement', payload: 10 })}> Decrement 10 </button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  )
}
// #endregion

// #region useReducer better approach
type CounterState2 = {
  count: number
}
type UpdateAction2 = {
  type: 'increment' | 'decrement'
  payload: number
}
type ResetAction2 = {
  type: 'reset'
}
type CounterAction2 = UpdateAction2 | ResetAction2
const initialState2 = { count: 0 }

function reducer2 (state: CounterState2, action: CounterAction2) {
  switch (action.type) {
    case 'increment': return { count: state.count + action.payload }
    case 'decrement': return { count: state.count - action.payload }
    case 'reset': return initialState2
    default: return state
  }
}

const Counter2 = () => {
  const [state, dispatch] = React.useReducer(reducer2, initialState2)
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment', payload: 10 })}> Increment 10 </button>
      <button onClick={() => dispatch({ type: 'decrement', payload: 10 })}> Decrement 10 </button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  )
}
// #endregion

// #region useContext
export const Userrr = () => {
  const userContext = React.useContext(UserContext)
  const handleLogin = () => userContext.setUser({ name: 'Mike', email: 'mike@mail.com' })
  const handleLogout = () => userContext.setUser(null)
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <div>User name is {userContext.user?.name}</div>
      <div>User email is {userContext.user?.email}</div>
    </div>
  )
}
// #endregion

// #region useRef as DOM element
const DomRef = () => {
  const inputRef = React.useRef<HTMLInputElement>(null!)
  React.useEffect(() => inputRef.current.focus(), [])
  return <input type='text' ref={inputRef} />
}
// #endregion

// #region useRef as mutable object
const Timer = () => {
  const [timer, setTimer] = React.useState(0)
  const interValRef = React.useRef<number | null>(null)
  const stopTimer = () => {
    if (!interValRef.current) return
    window.clearInterval(interValRef.current)
  }
  React.useEffect(() => {
    interValRef.current = window.setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000)
    return () => stopTimer()
  }, [])

  return (
    <div>
      HookTimer - {timer} -
      <button onClick={() => stopTimer()}>Stop Timer</button>
    </div>
  )
}
// #endregion

// #region component in props
type ProfileProps = { name: string }
type PrivateProps = {
  isLoggedIn: boolean
  Component: React.ComponentType<ProfileProps>
}
const Profile = ({ name }: ProfileProps) => <div>Name is {name}</div>
const Private = ({ isLoggedIn, Component }: PrivateProps) => {
  if (isLoggedIn) return <Component name='John' />
  return <div>Login to continue</div>
}
// #endregion

// #region generic type
type ListProps<T> = {
  items: T[]
  onClick: (value: T) => void
}

const List = <T extends number> ({ items, onClick }: ListProps<T>) => {
  return (
    <div>
      <Hs>List of items</Hs>
      {items.map(item => {
        return (
          <div onClick={() => onClick(item)} key={item}>{item}</div>
        )
      })}
    </div>
  )
}
// #endregion

// #region never type
type RandomNumberType = {
  value: number
}
type PositiveNumber = RandomNumberType & {
  isPositive: boolean
  isNegative?: never
  isZero?: never
}
type NegativeNumber = RandomNumberType & {
  isNegative: boolean
  isPositive?: never
  isZero?: never
}
type Zero = RandomNumberType & {
  isZero: boolean
  isPositive?: never
  isNegative?: never
}
type RandomNumberProps = PositiveNumber | NegativeNumber | Zero

const RandomNumber = ({
  value,
  isPositive,
  isNegative,
  isZero
}: RandomNumberProps) => {
  return (
    <div>
      {value} {isPositive && 'positive'} {isNegative && 'negative'}{' '}
      {isZero && 'zero'}
    </div>
  )
}
// #endregion

// #region types in template literals
/*
 * Position prop can be one of
 * "left-center" | "left-top" | "left-bottom" | "center" | "center-top" |
 * "center-bottom" | "right-center" | "right-top" | "right-bottom"
*/

type HorizontalPosition = 'left' | 'center' | 'right'
type VerticalPosition = 'top' | 'center' | 'bottom'
type ToastProps = {
  position: `${HorizontalPosition}-${VerticalPosition}`
}

const Toast = ({ position }: ToastProps) => <div>Position - {position}</div>
// #endregion

// #region html element
type ButtonProps = {
  variant: 'primary' | 'secondary'
} & React.ComponentProps<'button'>
const CustomButton = ({ variant, children, ...rest }: ButtonProps) => {
  return (
    <button className={`class-with-${variant}`} {...rest}>
      {children}
    </button>
  )
}
<CustomButton variant={'primary'} onClick={() => alert('clicked')}>Button text</CustomButton>

type InputPropsType = React.ComponentProps<'input'>
const Inpt = (props: InputPropsType) => <input {...props} />
// #endregion

// #region omit
type InpPropsType = Omit<React.ComponentProps<'input'>, 'onChange'>
const Inpt2 = (props: InpPropsType) => <input {...props} />
// #endregion

// #region Take types of other components
const Inpt3 = (props: React.ComponentProps<typeof Inpt2>) => <input {...props} />
// #endregion

// #region Polymorphic Components
type TextOwnProps<E extends React.ElementType> = {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary'
  children: React.ReactNode
  as?: E
}
type TextProps<E extends React.ElementType> = TextOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TextOwnProps<E>>

const Text = <E extends React.ElementType = 'div'> ({
  size,
  color,
  children,
  as
}: TextProps<E>) => {
  const Component = as || 'div'
  return (
    <Component className={`class-with-${size}-${color}`}>{children}</Component>
  )
}
// #endregion

const postObj = {
  title: 'typescript',
  date: '2022.02.07',
  tags: ['typescript'],
  imgUrl: 'https://antonarbus.com/imgs/ts.png',
  desc: 'typescript',
  body: (
    <>
      <p>Here are notes of <Lnk path='https://www.youtube.com/playlist?list=PLC3y8-rFHvwi1AXijGTKM0BKtHzVC-LSK'>begginners tutorial</Lnk>.</p>

      <H>Why?</H>

      <ul>
        <li><Lnk path="https://www.typescriptlang.org/">TypeScript</Lnk> is a way to describe a shape of an object</li>
        <li>It provides an additional layer of documentation</li>
        <li>Gives autocompletion in text editor</li>
        <li>Makes maintenance of large code easier</li>
        <li>Static types checking shows potential bugs</li>
        <li>It is initial investment which pays off on a long run</li>
        <li>
          If we hover over a variable we can see{' '}
          <Lnk path="https://www.typescriptlang.org/docs/handbook/type-inference.html"> type inference </Lnk>
        </li>
        <LazyImg src="/imgs/ts/typeInference.png"></LazyImg>
        <li>TS notifies about missing arguments</li>
        <LazyImg src="/imgs/ts/missingProperty.png"></LazyImg>
      </ul>

      <H>Create typescript</H>

      <p>
        Import typescript into existing project with{' '}
        <Code bash>
          npm install --save-dev typescript @types/node @types/react @types/react-dom @types/jest
        </Code>
      </p>

      <Hs>OR</Hs>

      <p>
        Create a new react project with typescript with{' '}
        <Code bash>npx create-react-app my-app --template typescript</Code>
      </p>

      <p>
        TypeScript files should have <code>.tsx</code> extension.
      </p>

      <H>Basic types</H>

      <Code block jsx>{`
      function myFunc(
        arg1: string,
        arg2: number,
        arg3: boolean,
        arg4: 1 | 2 | string | number | boolean | bigint | null | symbol | undefined | any, // OR
        arg5: {
          val1: string
          val2: number
        }, // object
        arg6: string[], // array of strings
        arg7: {
          first: string
          last: string
        }[], // arr of objects
        arg8: 'loading' | 'success' | 'error', // union of specific strings
        arg9: () => void, // function returning undefined
        arg10?: string, // optional
      ): void {
        console.log(arguments)
      }
      const someFunc = () => console.log('hi')
      myFunc(
        'str1',
        666,
        true,
        1,
        { val1: 'hi', val2: 5 },
        ['a', 'b'],
        [{ first: 'John', last: 'Dow' }, { first: 'Jane', last: 'Blake' }],
        'error',
        someFunc,
        'optional string',
      )
      `}</Code>

      <H>Array of objects</H>

      <Code block jsx>{`
        type MenuType = {
          id: string
          name: string
          link?: any
          func?: () => void,
        }

        type Props = {
          navStructure: MenuType[],
          id: string,
        }
      `}</Code>

      <H>Object of objects</H>

      <Code block jsx>{`
        type ObjectOfObjectsType = {
          [key: string]: {
            name: string
            age: number
          }
        }
      `}</Code>

      <H>Record</H>

      <Code block jsx>{`
        const obj: Record<string, number> = {
          'key 1': 1,
          'key 2': 2
          'key 3': 3
        }
      `}</Code>

      <H>Rest of props</H>

      <Code block jsx>{`
        type Props = {
          children?: React.ReactNode
          httpStatus?: 'loading' | 'error' | 'success' | ''
          [x:string]: any // all other ...props
        }
      `}</Code>

      <H>Function returning <code>undefined</code></H>

      <Code block jsx>{`
        type Props = {
          children?: React.ReactNode
          color?: string
          onSlideIn?: (value: string) => void
          onSlideOut?: () => void
          otherFunc: (() => void) | null
        }
      `}</Code>

      <H>Comments for types</H>

      <LazyImg src="/imgs/ts/commentsInTs.png" />

      <H>{'Interface & Type'}</H>

      <p>
        To set types separately we can use <i>interface</i> or <i>type</i> which are basically
        same things
      </p>

      <Hs>Interface</Hs>,

      <Code block jsx>{`
        interface propsTypes1 {
          name: string;
          lastName?: string;
          likesNum: string | number;
        }
        function Msg1(props: propsTypes1): JSX.Element {
          return (
            <div>
              Hello {props.name}
              {props.lastName && ' ' + props.lastName}, you have received{' '}
              {props.likesNum} likes.
            </div>
          );
        }
        <Msg1 name="John" likesNum={5} />
      `}</Code>

      <Msg1 name="John" likesNum={5} />

      <Hs>Type</Hs>

      <p>
        Types can be assigned also via <i>type</i>, which is preferable.
      </p>

      <Code block jsx>{`
      type propTypes2 = {
        name: string
        company?: string
        likesNum: string | number
        isLogged: boolean
        spouseName: {
          name: string
          lastName: string
        }
        cars: string[]
      }
      function Msg2(props: propTypes2): JSX.Element {
        return (
          <>
            Hello {props.name} {props.company && \`from \${props.company}\`}
            {props.isLogged && \`, you have received \${props.likesNum} likes.\`} We wish
            you and {props.spouseName.name} {props.spouseName.lastName} a good day.
            Your following cars have unpaid fine tickets:{' '}
            {props.cars.map((car, i) => {
              const ending = i !== props.cars.length - 1 ? ' & ' : ''
              return car + ending
            })}
          </>
        )
      }
      <Msg2
        isLogged={true}
        name="John"
        likesNum={'five'}
        spouseName={{ name: 'Jane', lastName: 'Dow' }}
        cars={['bmw', 'vw', 'audi']}
      />
      `}</Code>

      <Msg2
        isLogged={true}
        name="John"
        likesNum={'five'}
        spouseName={{ name: 'Jane', lastName: 'Dow' }}
        cars={['bmw', 'vw', 'audi']}
      />

      <H>Children in a component</H>

      <Code block jsx>{`
      function ComponentWithChildren(props: {children: string}) {
        return <h2> {props.children} </h2>
      }
      <ComponentWithChildren>hi</ComponentWithChildren>
      `}</Code>

      <ComponentWithChildren>hi</ComponentWithChildren>

      <H>React node</H>

      <p>To pass react component as an argument</p>

      <Code block jsx>{`
        function ComponentWithReactComponentAsChild(props: {children: React.ReactNode}) {
          return <h2> {props.children} </h2>
        }
        <ComponentWithReactComponentAsChild>
          <ComponentWithChildren>hi</ComponentWithChildren>
        </ComponentWithReactComponentAsChild>
      `}</Code>

      <ComponentWithReactComponentAsChild>
        <ComponentWithChildren>hi</ComponentWithChildren>
      </ComponentWithReactComponentAsChild>

      <H>Click event</H>

      <Hs>onClick event handler without return & without event object</Hs>

      <Code block jsx>{`
      function Button(props: { handleClick: () => void }) {
        return (
          <button onClick={props.handleClick}> Click </button>
        )
      }
      <Button handleClick={() => { console.log('Button clicked') }} />
      `}</Code>

      <Button1 handleClick={() => { console.log('Button clicked') }} />

      <Hs>onClick event handler with event object</Hs>

      <Code block jsx>{`
      function Button2(props: { handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
        return (
          <button onClick={props.handleClick}> Click </button>
        )
      }
      <Button2 handleClick={(e) => { console.log('Button clicked', e) }} />
      `}</Code>

      <Button2 handleClick={(e) => { console.log('Button clicked', e) }} />

      <Hs>onClick event handler with additional parameter</Hs>

      <p>A bit strange example</p>

      <Code block jsx>{`
      // type for event with id parameter
      function Button3(props: { handleClick: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void }) {
        return (
          <button onClick={e => props.handleClick(e, 1)}>Click</button>
        )
      }
      <Button3 handleClick={(e, id) => { console.log('Button clicked', e, id) }} />
      `}</Code>

      <Button3 handleClick={(e, id) => { console.log('Button clicked', e, id) }} />

      <Hs>onChange event handler as a prop</Hs>

      <Code block jsx>{`
      type InputProps = {
        value: string
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
      }
      function Input(props: InputProps) {
        return <input type="text" value={props.value} onChange={props.handleChange} />
      }
      <Input value='' handleChange={(e) => console.log(e)}/>
      `}</Code>

      <Input value='' handleChange={(e) => console.log(e)} />

      <Hs>onChange event handler defined within component</Hs>

      <Code block jsx>{`
      type InputProps1 = {
        value: string
      }
      function Input1(props: InputProps1) {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => console.log(e)
        return <input type="text" value={props.value} onChange={handleChange} />
      }
      <Input1 value=''/>
      `}</Code>

      <Input1 value='' />

      <H>Styles as props</H>

      <Code block jsx>{`
      type ContainerProps = {
        styles: React.CSSProperties
      }
      function SomeCmpt(props: ContainerProps) {
        return (
          <div style={props.styles}> Some text </div>
        )
      }
      <SomeCmpt styles={{ border: '1px solid black', padding: '1rem' }} />
      `}</Code>

      <SomeCmpt styles={{ border: '1px solid black', padding: '1rem' }} />

      <Hs>Specific css prop</Hs>

      <Code block jsx>{`
        const [visibility, setVisibility] = useState<CSSProperties['visibility']>('visible')
      `}</Code>

      <H>Props destructuring</H>

      <Code block jsx>{`
      type SomeProps = {
        styles: React.CSSProperties
      }
      function Cmpt({ styles }: SomeProps) {
        return (
          <div style={styles}> Some text </div>
        )
      }
      <Cmpt styles={{ border: '1px solid black', padding: '1rem' }} />
      `}</Code>

      <Cmpt styles={{ border: '1px solid black', padding: '1rem' }} />

      <H>Exporting types</H>

      <Code block jsx>{`
      // types.ts
      export type ExportedTypes = {
        styles: React.CSSProperties
      }
      `}</Code>

      <Code block jsx>{`
      // main.tsx
      import { ExportedTypes } from './types'
      function Cmpt2({ styles }: ExportedTypes) {
        return (
          <div style={styles}> Some text </div>
        )
      }
      <Cmpt2 styles={{ border: '1px solid black', padding: '1rem' }} />
      `}</Code>

      <Cmpt2 styles={{ border: '1px solid black', padding: '1rem' }} />

      <H>Re-use types</H>

      <Code block jsx>{`
      type Name = {
        first: string
        last: string
      }
      type PersonProp = {
        name: Name
      }
      function Person(props: PersonProp) {
        return <h2>{props.name.first} {props.name.last}</h2>
      }
      <Person name={{ first: 'John', last: 'Dow' }} />
      `}</Code>

      <Person name={{ first: 'John', last: 'Dow' }} />

      <H>Array of other types</H>

      <Code block jsx>{`
      type Nameee = {
        first: string
        last: string
      }
      type PersonsListProps = {
        names: Nameee[]
      }
      function PersonList(props: PersonsListProps) {
        return (
          <div>
            {props.names.map(name => {
              return (
                <Hs key={name.first}>
                  {name.first} {name.last}
                </Hs>
              )
            })}
          </div>
        )
      }
      const namesArr = [
        { first: 'John', last: 'Dow' },
        { first: 'Jane', last: 'Blake' },
        { first: 'John', last: 'Dow' },
      ];
      <PersonList names={namesArr} />
      `}</Code>

      <PersonList names={namesArr} />

      <H>useState</H>

      <p>
        TypeScript automatically defines a type for <Code>useState(initVal)</Code>{' '}
        variable based on initial value provided
      </p>

      <p>
        But if the type is unknown beforehand, more complex, or may change in future then we may
        specify it in angled brackets.
      </p>

      <Code block jsx>{`
      type AuthType = {
        name: string
        mail: string
      }
      function User() {
        const [userState, setUserState] = React.useState<null | AuthType>(null)
        const handleLogin = () => setUserState({ name: 'John', mail: 'john@mail.com' })
        const handleLogout = () => setUserState(null)
        return <div>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleLogout}>Logout</button>
          <div>User name is {userState?.name}</div>
          <div>User name is {userState?.mail}</div>
        </div>
      }
      <User />
      `}</Code>

      <User />

      <p>
        Note that VSCode automatically put optional chaining because we provided the type as{' '}
        <code>null</code>
      </p>

      <H>useState type assertion</H>

      <p>
        If we are sure that state value will be set to not a <code>null</code> we may
        define initial state as an empty object with a certain type
      </p>

      <p>
        For example we set a value as soon as a component mounts with{' '}
        <code>useEffect</code> hook
      </p>

      <Code block jsx>{`
      type AuthType2 = {
        name: string
        mail: string
      }
      function User2() {
        const [userState, setUserState] = React.useState<AuthType>({} as AuthType2)
        const handleLogin = () => setUserState({ name: 'John', mail: 'john@mail.com' })
        return <div>
          <button onClick={handleLogin}>Login</button>
          <div>User name is {userState.name}</div>
          <div>User name is {userState.mail}</div>
        </div>
      }
      <User2 />
      `}</Code>

      <User2 />

      <p>Note that no optional chaining anymore.</p>

      <H>useReducer</H>

      <Code block jsx>{`
      type CounterStateType = {
        count: number
      }
      type UpdateActionType = {
        type: 'increment' | 'decrement' | 'reset'
        payload?: number
      }
      const initialState = { count: 0 }
      function reducer(state: CounterStateType, action: UpdateActionType) {
        switch (action.type) {
          case 'increment': return { count: state.count + (action.payload || 0) }
          case 'decrement': return { count: state.count - (action.payload || 0) }
          case 'reset': return initialState
          default: return state
        }
      }
      const Counter = () => {
        const [state, dispatch] = React.useReducer(reducer, initialState)
        return (
          <>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'increment', payload: 10 })}> Increment 10 </button>
            <button onClick={() => dispatch({ type: 'decrement', payload: 10 })}> Decrement 10 </button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
          </>
        )
      }
      <Counter />
      `}</Code>

      <Counter />

      <H>useReducer (better approach)</H>

      <Code block jsx>{`
      type CounterState2 = {
        count: number
      }
      type UpdateAction2 = {
        type: 'increment' | 'decrement'
        payload: number
      }
      type ResetAction2 = {
        type: 'reset'
      }
      type CounterAction2 = UpdateAction2 | ResetAction2
      const initialState2 = { count: 0 }

      function reducer2(state: CounterState2, action: CounterAction2) {
        switch (action.type) {
          case 'increment': return { count: state.count + action.payload }
          case 'decrement': return { count: state.count - action.payload }
          case 'reset': return initialState2
          default: return state
        }
      }

      const Counter2 = () => {
        const [state, dispatch] = React.useReducer(reducer2, initialState2)
        return (
          <>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'increment', payload: 10 })}> Increment 10 </button>
            <button onClick={() => dispatch({ type: 'decrement', payload: 10 })}> Decrement 10 </button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
          </>
        )
      }
      <Counter2 />
      `}</Code>

      <Counter2 />

      <H>useContext</H>

      <Code block jsx>{`
        // UserContext.tsx
        import React from 'react'

        type AuthUser = {
          name: string
          email: string
        }
        type UserContextType = {
          user: AuthUser | null
          setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
        }
        type UserContextProviderProps = {
          children: React.ReactNode
        }

        export const UserContext = React.createContext({} as UserContextType)

        export const UserContextProvider = ({ children }: UserContextProviderProps) => {
          const [user, setUser] = React.useState<AuthUser | null>(null)
          return (
            <UserContext.Provider value={{ user, setUser }}>
              {children}
            </UserContext.Provider>
          )
        }
      `}</Code>

      <Code block jsx>{`
        // main.tsx
        import React from 'react'
        import { UserContext, UserContextProvider } from './UserContext'

        export const Userrr = () => {
          const userContext = React.useContext(UserContext)
          const handleLogin = () => userContext.setUser({ name: 'John', email: 'john@mail.com' })
          const handleLogout = () => userContext.setUser(null)
          return (
            <div>
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleLogout}>Logout</button>
              <div>User name is {userContext.user?.name}</div>
              <div>User email is {userContext.user?.email}</div>
            </div>
          )
        }
        <UserContextProvider>
          <Userrr />
        </UserContextProvider>
      `}</Code>

      <UserContextProvider>
        <Userrr />
      </UserContextProvider>

      <H>useRef as DOM element</H>

      <Code block jsx>{`
      const DomRef = () => {
        const inputRef = React.useRef<HTMLInputElement>(null!)
        React.useEffect(() => inputRef.current.focus(), [])
        return <input type='text' ref={inputRef} />
      }
      <DomRef />
      `}</Code>

      <DomRef />

      <p>
        Note that we put an exclamation mark after null type <code>null!</code> to tell TS
        that we are sure that variable will not be <code>null</code> and thus we avoid optional
        chaining <code>inputRef.current?.focus()</code>
      </p>

      <H>useRef as mutable container</H>

      <Code block jsx>{`
      type Props = {
        children?: React.ReactNode
        cssProps?: React.CSSProperties
        reference?: React.MutableRefObject<HTMLDivElement>
        ref2?: React.MutableRefObject<HTMLDivElement>
        title?: string | React.ReactNode
        logo?: React.ReactNode
      }
      `}</Code>

      <Code block jsx>{`
      const Timer = () => {
        const [timer, setTimer] = React.useState(0)
        const interValRef = React.useRef<number | null>(null)
        const stopTimer = () => {
          if (!interValRef.current) return
          window.clearInterval(interValRef.current)
        }
        React.useEffect(() => {
          interValRef.current = window.setInterval(() => {
            setTimer(timer => timer + 1)
          }, 1000)
          return () => stopTimer()
        }, [])

        return (
          <div>
            HookTimer - {timer} -
            <button onClick={() => stopTimer()}>Stop Timer</button>
          </div>
        )
      }
      <Timer />
      `}</Code>

      <Timer />

      <H>Component in props</H>

      <Code block jsx>{`
      type ProfileProps = { name: string }
      type PrivateProps = {
        isLoggedIn: boolean
        Component: React.ComponentType<ProfileProps>
      }
      const Profile = ({ name }: ProfileProps) => <div>Name is {name}</div>
      const Private = ({ isLoggedIn, Component }: PrivateProps) => {
        if (isLoggedIn) return <Component name='John' />
        return <div>Login to continue</div>
      }
      <Private isLoggedIn={true} Component={Profile} />
      `}</Code>

      <Private isLoggedIn={true} Component={Profile} />

      <H>Generic type</H>

      <i>Not clear what is it about, take a closer look later.</i>

      <Code block jsx>{`
      type ListProps<T> = {
        items: T[]
        onClick: (value: T) => void
      }

      const List = <T extends number>({ items, onClick }: ListProps<T>) => {
        return (
          <div>
            <Hs>List of items</Hs>
            {items.map(item => {
              return (
                <div onClick={() => onClick(item)} > {item} </div>
              )
            })}
          </div>
        )
      }
      <List items={[1, 2, 3]} onClick={item => console.log(item)} />
      `}</Code>

      <List items={[1, 2, 3]} onClick={item => console.log(item)} />

      <H>Never type</H>

      <p>If one type is applicable we can disallow other types with <i>never</i> type.</p>
      <Code block jsx>{`
      type RandomNumberType = {
        value: number
      }
      type PositiveNumber = RandomNumberType & {
        isPositive: boolean
        isNegative?: never
        isZero?: never
      }
      type NegativeNumber = RandomNumberType & {
        isNegative: boolean
        isPositive?: never
        isZero?: never
      }
      type Zero = RandomNumberType & {
        isZero: boolean
        isPositive?: never
        isNegative?: never
      }
      type RandomNumberProps = PositiveNumber | NegativeNumber | Zero

      const RandomNumber = ({
        value,
        isPositive,
        isNegative,
        isZero
      }: RandomNumberProps) => {
        return (
          <div>
            {value} {isPositive && 'positive'} {isNegative && 'negative'}{' '}
            {isZero && 'zero'}
          </div>
        )
      }
      <RandomNumber value={5} isPositive />
      `}</Code>

      <RandomNumber value={5} isPositive />

      <H>Combine types with string template literals</H>
      <Code block jsx>{`
      /*
      * Position prop can be one of
      * "left-center" | "left-top" | "left-bottom" | "center" | "center-top" |
      * "center-bottom" | "right-center" | "right-top" | "right-bottom"
      */

      type HorizontalPosition = 'left' | 'center' | 'right'
      type VerticalPosition = 'top' | 'center' | 'bottom'
      type ToastProps = {
        position: \`\${HorizontalPosition}-\${VerticalPosition}\`
      }

      const Toast = ({ position }: ToastProps) => <div>Position - {position}</div>;
      <Toast position='left-top'></Toast>
      `}</Code>

      <Toast position='left-top'></Toast>

      <H>Html element</H>
      <Code block jsx>{`
      type ButtonProps = {
        variant: 'primary' | 'secondary'
      } & React.ComponentProps<'button'>
      const CustomButton = ({ variant, children, ...rest }: ButtonProps) => {
        return (
          <button className={\`class-with-\${variant}\`} {...rest}>
            {children}
          </button>
        )
      }
      <CustomButton variant={'primary'} onClick={() => alert('clicked')}>Button text</CustomButton>

      type InputPropsType = React.ComponentProps<'input'>
      const Inpt = (props: InputPropsType) => <input {...props} />;
      <Inpt onChange={() => alert('typed')}/>
      `}</Code>

      <Inpt onChange={() => alert('typed')} />

      <H>Omit</H>

      <p>With <i>Omit</i> we may exclude some property from type</p>

      <p>Bellow we excluded <code>onChange</code> type form <code>input</code> element.</p>

      <Code block jsx>{`
      type InpPropsType = Omit<React.ComponentProps<'input'>, 'onChange'>
      const Inpt2 = (props: InpPropsType) => <input {...props} />;
      <Inpt2 />
      `}</Code>

      <Inpt2 />

      <H>Take types of other components</H>

      <p>Let's take props type from the previous component.</p>

      <Code block jsx>{`
      const Inpt3 = (props: React.ComponentProps<typeof Inpt2>) => <input {...props} />;
      <Inpt3 />
      `}</Code>

      <Inpt3 />

      <H>Polymorphic components</H>

      <p>Polymorphic component renders different html tags depends on input props.</p>

      <i>Not clear because generic type is used, take a closer look later.</i>

      <Code block jsx>{`
      type TextOwnProps<E extends React.ElementType> = {
        size?: 'sm' | 'md' | 'lg'
        color?: 'primary' | 'secondary'
        children: React.ReactNode
        as?: E
      }
      type TextProps<E extends React.ElementType> = TextOwnProps<E> &
        Omit<React.ComponentProps<E>, keyof TextOwnProps<E>>

      const Text = <E extends React.ElementType = 'div'>({
        size,
        color,
        children,
        as
      }: TextProps<E>) => {
        const Component = as || 'div'
        return (
          <Component className={\`class-with-\${size}-\${color}\`}>{children}</Component>
        )
      }
      <>
        <Text size='lg' as='h1'>Heading</Text>
        <Text size='md' as='p'>Paragraph</Text>
        <Text size='sm' color='secondary' as='label' htmlFor='someId'>Label</Text>
      </>
      `}</Code>

      <>
        <Text size='lg' as='h1'>Heading</Text>
        <Text size='md' as='p'>Paragraph</Text>
        <Text size='sm' color='secondary' as='label' htmlFor='someId'>Label</Text>
      </>

      <H>Redux</H>

      <Hs>Payload in reducer</Hs>

      <Code block jsx>{`
        incrementByAmount: (state, action: PayloadAction<number>) => {
          state.value += action.payload
        }
      `}</Code>

      <Hs>Thunk</Hs>

      <Code block jsx>{`
        export const incrementIfOdd =(amount: number): AppThunk => (dispatch, getState) => {
          const currentValue = selectCount(getState())
          if (currentValue % 2 === 1) {
            dispatch(incrementByAmount(amount))
          }
        }
      `}</Code>

      <Hs>Redux config types</Hs>

      <Code block jsx>{`
        export type RootState = ReturnType<typeof store.getState>
        export type AppDispatch = typeof store.dispatch
        export type AppThunk<ReturnType = void> = ThunkAction< ReturnType, RootState, unknown, Action<string> >

        // hooks to let types work
        export const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector
        export const useDispatchTyped = () => useDispatch<AppDispatch>()
      `}</Code>

      <H>{'Spread object - Partial<Type>'}</H>

      <ul>
        <li>works to update some prop inside an object</li>
      </ul>

      <Code block jsx>{`
        interface Todo {
          title: string;
          description: string;
        }

        function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
          return { ...todo, ...fieldsToUpdate };
        }

        const todo1 = {
          title: "organize desk",
          description: "clear clutter",
        };

        const todo2 = updateTodo(todo1, {
          description: "throw out trash",
        });
      `}</Code>

      <H>Any string with suggestions</H>

      <ul>
        <li>if we want to accept any string, but also want some suggests to be shown</li>
        <li>can do following trick, taken from <Lnk path='https://stackoverflow.com/a/74467583/7239778'>here</Lnk></li>
      </ul>

      <Code block jsx>{`
        type Props = {
          lang: 'en' | 'fi' | 'nl' | 'sv' | Record<never, never> & string
        }
      `}</Code>

      <H>as const</H>

      <ul>
        <li><Code>as const</Code> makes type as narrow as possible</li>
      </ul>

      <Code block jsx>{`
        // without "as const"
        const employee = {
          name: 'Jane',
          age: 30
        }
        
        type EmployeeKey = keyof typeof employee // "name" | "age"
        type EmployeeValue = (typeof employee)[keyof typeof employee] // string | number
        type EmployeeName = typeof employee['name'] // string

        // with "as const"
        const employee = {
          name: 'Jane',
          age: 30
        } as const
        
        type EmployeeKey = keyof typeof employee // "name" | "age"
        type EmployeeValue = (typeof employee)[keyof typeof employee] // "Jane" | 30
        type EmployeeName = typeof employee['name'] // "Jane"
      `}</Code>

      <H>Object keys & values</H>

      <Code block jsx>{`
        const person = { 
          age: 30,
          name: 'Jane',
          job: 'doctor',
        } as const
        
        type Keys = keyof typeof person // "age" | "name" | "job"
        type Values = (typeof person)[keyof typeof person] // 30 | "Jane" | "doctor"
      `}</Code>

      <H>Array values as enums</H>

      <Code block jsx>{`
        const person = ['Jane', 'Mat', 'Olivia'] as const

        type ArrayValue = (typeof person)[number] // "Jane" | "Mat" | "Olivia"
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
