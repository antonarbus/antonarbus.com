'use client'


import { Code, useState, jsxToStr } from '/components/post/reExport'
import styled from 'styled-components'
import shortid from 'shortid'

function ToDoApp() {
  function getToDoList() {
    if (!localStorage.getItem('toDoArr')) {
      localStorage.setItem(
        'toDoArr',
        JSON.stringify([
          {
            toDoText: 'wipe the dust',
            id: shortid()
          },
          {
            toDoText: 'walk the dog out',
            id: shortid()
          },
          {
            toDoText: 'call parents',
            id: shortid()
          }
        ])
      )
    }

    return JSON.parse(localStorage.getItem('toDoArr'))
  }

  const [toDoListState, setToDoListState] = useState(getToDoList)

  return (
    <StyledContainer>
      <AddItemForm
        toDoListState={toDoListState}
        setToDoListState={setToDoListState}
        getToDoList={getToDoList}
      />
      <ToDoList
        toDoListState={toDoListState}
        setToDoListState={setToDoListState}
        getToDoList={getToDoList}
      />
    </StyledContainer>
  )
}

function AddItemForm({ toDoListState, setToDoListState, getToDoList }) {
  const [inputState, setInputState] = useState('')

  function addNewItem(e) {
    e.preventDefault()
    if (!inputState) return
    const newList = [
      {
        toDoText: inputState,
        id: shortid()
      },
      ...toDoListState
    ]
    localStorage.setItem('toDoArr', JSON.stringify(newList))
    setToDoListState(getToDoList())
    setInputState('')
  }

  return (
    <form>
      <input
        type="text"
        placeholder="what to do?"
        value={inputState}
        onChange={e => setInputState(e.target.value)}
      />
      <button onClick={addNewItem}>Add</button>
    </form>
  )
}

function ToDoList({ setToDoListState, toDoListState, getToDoList }) {
  return (
    <div className="toDoList">
      {toDoListState.map(toDoItem => (
        <ToDoItem
          toDoText={toDoItem.toDoText}
          key={toDoItem.id}
          id={toDoItem.id}
          toDoListState={toDoListState}
          setToDoListState={setToDoListState}
          getToDoList={getToDoList}
        ></ToDoItem>
      ))}
      {toDoListState.length === 0 ? 'Nothing to do' : ''}
    </div>
  )
}

function ToDoItem({ toDoText, id, toDoListState, setToDoListState, getToDoList }) {
  function removeItem() {
    const newList = toDoListState.filter(o => o.id !== id)
    localStorage.setItem('toDoArr', JSON.stringify(newList))
    setToDoListState(getToDoList())
  }

  return (
    <div className="toDoItem">
      <div className="toDoText">{toDoText}</div>
      <button className="delBtn" onClick={removeItem}>
        Remove
      </button>
    </div>
  )
}

const StyledContainer = styled.div`
  width: 90%;
  border: 1px solid grey;
  background-color: #fff;
  border-radius: 4px;
  margin: 0px auto;
  padding: 5px;

  form {
    margin: 10px;
    text-align: center;

    input {
      padding: 3px;
    }

    button {
      margin-left: 10px;
      width: 50px;
      padding: 3px;
      cursor: pointer;
    }
  }

  .toDoItem {
    margin: 5px 0px;
    padding: 5px;
    border-bottom: 1px dotted grey;

    display: flex;
    justify-content: space-between;
  }

  .delBtn {
    cursor: pointer;
  }
`

const postObj = {
  title: 'todo app',
  date: '2021.09.26',
  tags: ['react'],
  imgUrl: 'https://antonarbus.com/imgs/todo.png',
  desc: 'todo app in react',
  body: (
    <>
      <ToDoApp />

      <Code block jsx>{`
      import styled from 'styled-components'
      import shortid from 'shortid'

      function ToDoApp() {
        function getToDoList() {
          if (!localStorage.getItem('toDoArr')) {
            localStorage.setItem(
              'toDoArr',
              JSON.stringify([
                {
                  toDoText: 'wipe the dust',
                  id: shortid(),
                },
                {
                  toDoText: 'walk the dog out',
                  id: shortid(),
                },
                {
                  toDoText: 'call parents',
                  id: shortid(),
                },
              ])
            )
          }

          return JSON.parse(localStorage.getItem('toDoArr'))
        }

        const [toDoListState, setToDoListState] = useState(getToDoList)

        return (
          <StyledContainer>
            <AddItemForm
              toDoListState={toDoListState}
              setToDoListState={setToDoListState}
              getToDoList={getToDoList}
            />
            <ToDoList
              toDoListState={toDoListState}
              setToDoListState={setToDoListState}
              getToDoList={getToDoList}
            />
          </StyledContainer>
        )
      }

      function AddItemForm({ toDoListState, setToDoListState, getToDoList }) {
        const [inputState, setInputState] = useState('')

        function addNewItem(e) {
          e.preventDefault()
          if (!inputState) return
          const newList = [
            {
              toDoText: inputState,
              id: shortid(),
            },
            ...toDoListState,
          ]
          localStorage.setItem('toDoArr', JSON.stringify(newList))
          setToDoListState(getToDoList())
          setInputState('')
        }

        return (
          <form>
            <input
              type="text"
              placeholder="what to do?"
              value={inputState}
              onChange={e => setInputState(e.target.value)}
            />
            <button onClick={addNewItem}>Add</button>
          </form>
        )
      }

      function ToDoList({ setToDoListState, toDoListState, getToDoList }) {
        return (
          <div className="toDoList">
            {toDoListState.map(toDoItem => (
              <ToDoItem
                toDoText={toDoItem.toDoText}
                key={toDoItem.id}
                id={toDoItem.id}
                toDoListState={toDoListState}
                setToDoListState={setToDoListState}
                getToDoList={getToDoList}
              ></ToDoItem>
            ))}
            {toDoListState.length === 0 ? 'Nothing to do' : ''}
          </div>
        )
      }

      function ToDoItem({ toDoText, id, toDoListState, setToDoListState, getToDoList, }) {
        function removeItem() {
          const newList = toDoListState.filter(o => o.id !== id)
          localStorage.setItem('toDoArr', JSON.stringify(newList))
          setToDoListState(getToDoList())
        }

        return (
          <div className="toDoItem">
            <div className="toDoText">{toDoText}</div>
            <button className="delBtn" onClick={removeItem}>
              Remove
            </button>
          </div>
        )
      }

      const StyledContainer = styled.div\`
        width: 90%;
        border: 1px solid grey;
        background-color: #fff;
        border-radius: 4px;
        margin: 0px auto;
        padding: 5px;

        form {
          margin: 10px;
          text-align: center;

          input {
            padding: 3px;
          }

          button {
            margin-left: 10px;
            width: 50px;
            padding: 3px;
            cursor: pointer;
          }
        }

        .toDoItem {
          margin: 5px 0px;
          padding: 5px;
          border-bottom: 1px dotted grey;

          display: flex;
          justify-content: space-between;
        }

        .delBtn {
          cursor: pointer;
        }
      \`
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
