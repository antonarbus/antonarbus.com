import { Code, H, Hs, LazyImg, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'react testing library',
  date: '2022.06.28',
  tags: ['test', 'react'],
  imgUrl: 'https://antonarbus.com/imgs/react-testing-library.png',
  desc: 'react testing library',
  body: (
    <>
      <p>Notes are based on <Lnk path='https://www.youtube.com/playlist?list=PL4cUxeGkcC9gm4_-5UsNmLqMosM-dzuvQ'>this</Lnk> tutorial.</p>

      <p>
        <Lnk path="https://testing-library.com/">Testing Library</Lnk> is built on to of <Lnk path='https://jestjs.io/'>Jest</Lnk> and
        gives api to test react UI.
      </p>

      <H>Install</H>

      <ul>
        <li>
          <Code bash>npm i -D @testing-library/react</Code>
        </li>
      </ul>

      <H>Component</H>

      <Code block jsx>{`
      import React from 'react'
      import "./Header.css"

      export default function Header({ title }) {
        return (
          <>
            <h1 title="Header" className="header">{title}</h1>
            <h3 data-testid="header-1" className="header">Hello</h3>
          </>
        )
      }
      `}</Code>

      <H>Queries</H>

      <Code block jsx>{`
      import { render, screen } from '@testing-library/react'
      import App from './App'

      test('renders learn react link', () => {
        render(<App />)
        const linkElement = screen.getByText(/learn react/i)
        expect(linkElement).toBeInTheDocument()
      })
      `}</Code>

      <LazyImg noShadow path="/imgs/testing-library/about queries.png" />

      <Hs>getBy...</Hs>

      <p>
        <Code>getByRole</Code>, <Code>getByLabelText</Code>, <Code>getByPlaceholderText</Code>
        <Code>getByText</Code>, <Code>getByDisplayValue</Code>, <Code>getByAltText</Code>
        <Code>getByTitle</Code>, <Code>getByTestId</Code>
      </p>

      <Hs>queryBy...</Hs>

      <p>
        <Code>queryByRole</Code>, <Code>queryByLabelText</Code>, <Code>queryByPlaceholderText</Code>
        , <Code>queryByText</Code>, <Code>queryByDisplayValue</Code>, <Code>queryByAltText</Code>
        <Code>queryByTitle</Code>, <Code>queryByTestId</Code>
      </p>

      <Hs>findBy...</Hs>

      <p>
        <Code>findByRole</Code>, <Code>findByLabelText</Code>, <Code>findByPlaceholderText</Code>
        <Code>findByText</Code>, <Code>findByDisplayValue</Code>, <Code>findByAltText</Code>
        <Code>findByTitle</Code>, <Code>findByTestId</Code>
      </p>

      <Hs>..AllBy...</Hs>

      <p>
        All above methods have <i>all</i> companions like{' '}
        <Code>
          get<i>All</i>By
        </Code>{' '}
        which return results in array.
      </p>

      <H>Queries priorities</H>

      <p>
        <Code>getByRole</Code> {'-->'} <Code>getByLabelText</Code> {'-->'}{' '}
        <Code>getByPlaceholderText</Code> {'-->'} <Code>getByText</Code> {'-->'}{' '}
        <Code>getByDisplayValue</Code> {'-->'} <Code>getByAltText</Code> {'-->'}{' '}
        <Code>getByTitle</Code> {'-->'} <Code>getByTestId</Code>
      </p>

      <p>
        Use <Code>getByRole</Code> query as much as possible.
      </p>

      <H>Query examples</H>

      <Hs>getByRole</Hs>

      <p>
        HTML element roles can be checked{' '}
        <Lnk path="https://www.w3.org/TR/html-aria/#docconformance">here</Lnk>.
      </p>

      <Code block jsx>{`
      it('should render same text passed into title prop', () => {
        render(
          <Header title="todo" />
        )
        const h1Element = screen.getByRole("heading") // works if we have only one heading
        expect(h1Element).toBeInTheDocument()
      })
      `}</Code>

      <p>Specify text inside element.</p>

      <Code block jsx>{`
      it('should render same text passed into title prop', () => {
        render(
          <Header title="todo" />
        )
        const h1Element = screen.getByRole("heading", { name: /todo/i })
        expect(h1Element).toBeInTheDocument()
      })
      `}</Code>

      <Hs>getByTitle</Hs>

      <Code block jsx>{`
      it('should render same text passed into title prop', () => {
        render(
          <Header title="todo" />
        )
        const h1Element = screen.getByTitle("Header")
        expect(h1Element).toBeInTheDocument()
      })
      `}</Code>

      <Hs>getByTestId</Hs>

      <p>Not preferable query...</p>

      <Code block jsx>{`
      it('should render same text passed into title prop', () => {
        render(
          <Header title="todo" />
        )
        const h2Element = screen.getByTestId("header-1")
        expect(h2Element).toBeInTheDocument()
      })
      `}</Code>

      <Hs>findByText</Hs>

      <p>Asynchronous query...</p>

      <Code block jsx>{`
      it('should render same text passed into title prop', async () => {
        render(
          <Header title="todo" />
        )
        const h1Element = await screen.findByText(/todo/i)
        expect(h1Element).toBeInTheDocument()
      })
      `}</Code>

      <Hs>queryByText</Hs>

      <p>
        Matcher <code>.not</code> works with <code>queryByText</code>, because it doesn't fail when
        there is no match, opposite to <code>getByText</code>
      </p>

      <Code block jsx>{`
      it('should render same text passed into title prop', () => {
        render(
          <Header title="todo" />
        )
        const h1Element = screen.queryByText(/dogs/i)
        expect(h1Element).not.toBeInTheDocument
      })
      `}</Code>

      <Hs>getAllByText</Hs>

      <p>Can specify number of expected elements...</p>

      <Code block jsx>{`
      it('should render same text passed into title prop', () => {
          render(
            <Header title="todo" />
          )
          const h1Elements = screen.getAllByText(/todo/i)
          expect(h1Elements.length).toBe(1)
      })
      `}</Code>

      <H>Render wrapped element</H>

      <p>
        Sometimes our components are wrapped inside library components and we need to bring it also
        to out tests.
      </p>

      <p>
        In example below we use Link from the <i>react-router-dom</i>
      </p>

      <Code block jsx>{`
      import React from 'react'
      import "./TodoFooter.css"
      import { Link } from "react-router-dom"

      function TodoFooter({ numberOfIncompleteTasks }) {
        return (
          <div className="todo-footer">
              <p>{numberOfIncompleteTasks} {numberOfIncompleteTasks === 1 ? "task" : "tasks"} left</p>
              <Link to="/followers">Followers</Link>
          </div>
        )
      }

      export default TodoFooter
      `}</Code>

      <p>To test it we also need to bring it into the test.</p>

      <Code block jsx>{`
      import { render, screen } from '@testing-library/react';
      import TodoFooter from "../TodoFooter"
      import { BrowserRouter } from "react-router-dom"

      const MockTodoFooter = ({ numberOfIncompleteTasks }) => {
        return (
          <BrowserRouter>
            <TodoFooter numberOfIncompleteTasks={numberOfIncompleteTasks} />
          </BrowserRouter>
        )
      }

      describe("TodoFooter", () => {
        it('should render the correct amount of incomplete tasks', () => {
          render(
            <MockTodoFooter numberOfIncompleteTasks={5} />
          )
          const pElement = screen.getByText(/5 tasks left/i)
          expect(pElement).toBeInTheDocument()
        })
      })
      `}</Code>

      <H>Debug</H>

      <p>Show html of the screen in console.</p>

      <Code block jsx>{`
        screen.debug()
      `}</Code>

      <H>Assertions</H>

      <p>All assertion methods.</p>

      <p>
        <code>toHaveBeenCalledTimes</code>, <code>toHaveBeenCalledWith</code>,{' '}
        <code>toHaveBeenLastCalledWith</code>, <code>toHaveBeenNthCalledWith</code>,{' '}
        <code>toHaveClass</code>, <code>toHaveDisplayValue</code>, <code>toHaveErrorMessage</code>,{' '}
        <code>toHaveFocus</code>, <code>toHaveFormValues</code>, <code>toHaveLastReturnedWith</code>
        , <code>toHaveLength</code>, <code>toHaveNthReturnedWith</code>, <code>toHaveProperty</code>
        , <code>toHaveReturned</code>, <code>toHaveReturnedTimes</code>,{' '}
        <code>toHaveReturnedWith</code>, <code>toHaveStyle</code>, <code>toHaveTextContent</code>,{' '}
        <code>toHaveValue</code>, <code>toMatch</code>, <code>toMatchInlineSnapshot</code>,{' '}
        <code>toMatchObject</code>, <code>toMatchSnapshot</code>, <code>toReturn</code>,{' '}
        <code>toReturnTimes</code>, <code>toReturnWith</code>, <code>toStrictEqual</code>,{' '}
        <code>toThrow</code>, <code>toThrowError</code>,{' '}
        <code>toThrowErrorMatchingInlineSnapshot</code>, <code>toThrowErrorMatchingSnapshot</code>,{' '}
        <code>lastCalledWith</code>, <code>lastReturnedWith</code>, <code>not</code>,{' '}
        <code>nthCalledWith</code>, <code>nthReturnedWith</code>, <code>rejects</code>,{' '}
        <code>resolves</code>, <code>toBe</code>, <code>toBeCalled</code>,{' '}
        <code>toBeCalledTimes</code>, <code>toBeCalledWith</code>, <code>toBeChecked</code>,{' '}
        <code>toBeCloseTo</code>, <code>toBeDefined</code>, <code>toBeDisabled</code>,{' '}
        <code>toBeEmptyDOMElement</code>, <code>toBeEnabled</code>, <code>toBeFalsy</code>,{' '}
        <code>toBeGreaterThan</code>, <code>toBeGreaterThanOrEqual</code>,{' '}
        <code>toBeInTheDocument</code>, <code>toBeInstanceof</code>, <code>toBeInvalid</code>,{' '}
        <code>toBeLessThan</code>, <code>toBeLessThanOrEqual</code>, <code>toBeNaN</code>,{' '}
        <code>toBeNull</code>, <code>toBePartiallyChecked</code>, <code>toBeRequired</code>,{' '}
        <code>toBeTruthy</code>, <code>toBeUndefined</code>, <code>toBeValid</code>,{' '}
        <code>toBeVisible</code>, <code>toContain</code>, <code>toContainElement</code>,{' '}
        <code>toContainEqual</code>, <code>toContainHTML</code>, <code>toEqual</code>,{' '}
        <code>toHaveAccessibleDescription</code>, <code>toHaveAccessibleName</code>,{' '}
        <code>toHaveAttribute</code>, <code>toHaveBeenCalled</code>,{' '}
        <code>toHaveBeenCalledTimes</code>, <code>toHaveBeenCalledWith</code>,{' '}
        <code>toHaveBeenLastCalledWith</code>
      </p>

      <code>toBeInTheDocument</code>

      <Code block jsx>{`
      describe("Header", () => {
        it.only('should render same text passed into title prop', () => {
          render(<Header title="todo" />)
          const h1Element = screen.getByText(/todo/i)
          expect(h1Element).toBeInTheDocument()
        })
      })
      `}</Code>

      <code>toHaveTextContent</code>

      <Code block jsx>{`
      it('should render correct text content', () => {
        render(<MockTodoFooter numberOfIncompleteTasks={1} />)
        const pElement = screen.getByText(/1 task left/i)
        expect(pElement).toHaveTextContent('1 task left')
      })
      `}</Code>

      <code>not</code>

      <Code block jsx>{`
      it('should render correct text content', () => {
        render(<MockTodoFooter numberOfIncompleteTasks={1} />)
        const pElement = screen.getByText(/1 task left/i)
        expect(pElement).not.toHaveTextContent('2 task left')
      })
      `}</Code>

      <code>toBeVisible</code>

      <Code block jsx>{`
      it('"task" should be visible when the number of incomplete tasks is one', () => {
        render(
          <MockTodoFooter numberOfIncompleteTasks={1} />
        )
        const pElement = screen.getByText(/1 task left/i)
        expect(pElement).toBeVisible()
      })
      `}</Code>

      <code>toContainHTML</code>

      <Code block jsx>{`
      it('should contain p tag with correct text', () => {
        render(<MockTodoFooter numberOfIncompleteTasks={1} />)
        const pElement = screen.getByText(/1 task left/i)
        expect(pElement).toContainHTML('p')
      })
      `}</Code>

      <code>toBeFalsy</code>

      <Code block jsx>{`
      it('should render correct text content', () => {
        render(<MockTodoFooter numberOfIncompleteTasks={1} />)
        const pElement = screen.getByText(/1 task left/i)
        expect(pElement).not.toBeFalsy()
      })
      `}</Code>

      <code>toBe</code>

      <p>Here we assert attribute value or text content.</p>

      <Code block jsx>{`
      it('should render correct text content', () => {
        render(<MockTodoFooter numberOfIncompleteTasks={1} />)
        const pElement = screen.getByText(/1 task left/i)
        expect(pElement.textContent).toBe('1 task left')
      })
      `}</Code>

      <H>Fire event</H>

      <p>
        <code>compositionEnd</code>, <code>compositionStart</code>, <code>compositionUpdate</code>,{' '}
        <code>keyDown</code>, <code>keyPress</code>, <code>keyUp</code> <code>focus</code>,{' '}
        <code>blur</code>, <code>focusIn</code>, <code>focusOut</code>, <code>submit</code>,{' '}
        <code>reset</code> <code>dragExit</code>,<code>dragLeave</code>, <code>dragOver</code>,{' '}
        <code>dragStart</code>, <code>drop</code>,<code>mouseDown</code>, <code>mouseEnter</code>,{' '}
        <code>mouseLeave</code>,<code>mouseMove</code>, <code>mouseOut</code>,{' '}
        <code>mouseOver</code>, <code>mouseUp</code> <code>select</code>, <code>touchCancel</code>,{' '}
        <code>touchEnd</code>, <code>touchMove</code>, <code>touchStart</code>, <code>resize</code>,{' '}
        <code>scroll</code> <code>wheel</code>, <code>abort</code>, <code>canPlay</code>,{' '}
        <code>canPlayThrough</code>, <code>durationChange</code>, <code>emptied</code>,{' '}
        <code>encrypted</code>, <code>ended</code>, <code>loadedData</code>,{' '}
        <code>loadedMetadata</code>, <code>loadStart</code>, <code>pause</code>, <code>play</code>,{' '}
        <code>playing</code>, <code>progress</code>, <code>rateChange</code>, <code>seeked</code>,{' '}
        <code>seeking</code>, <code>stalled</code>, <code>suspend</code>, <code>timeUpdate</code>,{' '}
        <code>volumeChange</code>, <code>waiting</code>, <code>load</code>, <code>error</code>,{' '}
        <code>animationStart</code>, <code>animationEnd</code>, <code>animationIteration</code>,{' '}
        <code>transitionCancel</code>, <code>transitionEnd</code>, <code>transitionRun</code>,{' '}
        <code>transitionStart</code>, <code>pointerOver</code>, <code>pointerEnter</code>,{' '}
        <code>pointerDown</code>, <code>pointerMove</code>, <code>pointerUp</code>,{' '}
        <code>pointerCancel</code>, <code>pointerOut</code>, <code>pointerLeave</code>,{' '}
        <code>gotPointerCapture</code>, <code>lostPointerCapture</code> <code>popState</code>{' '}
      </p>

      <Hs>Test if input renders</Hs>

      <Code block jsx>{`
      const mockedSetTodo = jest.fn()
      it('should render input element', () => {
        render(<AddInput todos={[]} setTodos={mockedSetTodo} />)
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i)
        expect(inputElement).toBeInTheDocument()
      })
      `}</Code>

      <Hs>Test if input value updates</Hs>

      <Code block jsx>{`
      it('should be able to type into input', () => {
        render(<AddInput todos={[]} setTodos={mockedSetTodo} />)
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i)
        fireEvent.click(inputElement)
        fireEvent.change(inputElement, { target: { value: 'Go Grocery Shopping' } })
        expect(inputElement.value).toBe('Go Grocery Shopping')
      })
      `}</Code>

      <Hs>Test if button click triggers a function</Hs>

      <Code block jsx>{`
      it('should be able to type into input', () => {
        render(<AddInput todos={[]} setTodos={mockedSetTodo} />)
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i)
        fireEvent.click(inputElement)
        fireEvent.change(inputElement, { target: { value: 'Go Grocery Shopping' } })
        const buttonElement = screen.getByRole('button', { name: /Add/i })
        fireEvent.click(buttonElement)
        expect(mockedSetTodo).toBeCalled()
      })
      `}</Code>

      <H>Integration test</H>

      <p>Test of 2 components interact between each other.</p>

      <Code block jsx>{`
      const MockTodo = () => {
        return ( <BrowserRouter> <Todo/> </BrowserRouter> )
      }

      const addTask = (tasks) => {
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i)
        const buttonElement = screen.getByRole("button", { name: /Add/i} )
        tasks.forEach((task) => {
          fireEvent.change(inputElement, { target: { value: task } })
          fireEvent.click(buttonElement)
        })
      }

      it('should add multiple input items into the list', () => {
        render( <MockTodo /> )
        addTask(["Go Grocery Shopping", "Go Grocery Shopping", "Go Grocery Shopping"])
        const divElements = screen.queryAllByText(/Go Grocery Shopping/i)
        expect(divElements.length).toBe(3)
      })

      it('task should mark task as completed when clicked', () => {
        render( <MockTodo /> )
        addTask(["Go Grocery Shopping"])
        const divElement = screen.getByText(/Go Grocery Shopping/i)
        fireEvent.click(divElement)
        expect(divElement).toHaveClass("todo-item-active")
      })
      `}</Code>

      <H>Asynchronous test</H>

      <p>
        Component gets data in <code>useEffect</code> asynchronously.
      </p>

      <Code block jsx>{`
      import React, { useEffect, useState } from 'react'
      import './FollowersList.css'
      import axios from 'axios'
      import { Link } from 'react-router-dom'

      export default function FollowersList() {
        const [followers, setFollowers] = useState([])

        useEffect(() => {
          const fetchFollowers = async () => {
            const { data } = await axios.get('https://randomuser.me/api/?results=5')
            setFollowers(data.results)
          }

          fetchFollowers()
        }, [])

        return (
          <div className="followerslist-container">
            <div>
              {followers.map((follower, index) => (
                <div className="follower-item" data-testid={\`follower-item-\${index}\`}>
                  <img src={follower.picture.large} />
                  <div className="followers-details">
                    <div className="follower-item-name">
                      <h4>{follower.name.first}</h4> <h4>{follower.name.last}</h4>
                    </div>
                    <p>{follower.login.username}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="todo-footer">
              <Link to="/">Go Back</Link>
            </div>
          </div>
        )
      }
      `}</Code>

      <p>
        To test the existence of first follower item we need to use async method{' '}
        <code>findByTestId()</code>.
      </p>

      <Code block jsx>{`
      import { render, screen, fireEvent } from '@testing-library/react'
      import { BrowserRouter } from 'react-router-dom'
      import FollowersList from '../FollowersList'

      const MockFollowersList = () => {
        return (
          <BrowserRouter>
            <FollowersList />
          </BrowserRouter>
        )
      }

      describe('FollowersList', () => {
        it('should render follower item', async () => {
          render(<MockFollowersList />)
          const followerDivElement = await screen.findByTestId('follower-item-0')
          expect(followerDivElement).toBeInTheDocument()
        })
      })
      `}</Code>

      <H>Mock request</H>

      <p>
        It is not good idea to make tests with real http requests, because it may cost money, slow
        and dependent on 3rd party API. In unit tests we test our functions and ui components in
        isolation.
      </p>

      <p>Let's mock API response from axios call from previous example.</p>

      <p>Add later ...</p>

      <H>Before & After</H>

      <Code block jsx>{`
      describe('FollowersList', () => {
        beforeEach(() => console.log('RUNS BEFORE EACH TEST'))
        beforeAll(() => console.log('RUNS ONCE BEFORE ALL TESTS'))
        afterEach(() => console.log('RUNS AFTER EACH TEST'))
        afterAll(() => console.log('RUNS ONCE AFTER ALL TESTS'))

        it('should run test', () => console.log('test'))
        it('should run test', () => console.log('test'))
        it('should run test', () => console.log('test'))
      })
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
