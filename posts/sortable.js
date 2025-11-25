'use client'


import { Code, H, Lnk, useState, jsxToStr } from '/components/post/reExport'

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
import { arrayMoveImmutable } from 'array-move'
import { MdDragIndicator } from 'react-icons/md'

const DragHandle = sortableHandle(() => (
  <span className='icon-container'>
    <MdDragIndicator />
    <style jsx>{`
      .icon-container {
        display: inline-flex;
        align-items: center;
        cursor: move;
      }
    `}</style>
  </span>
))

const SortableBlock = sortableElement(({ value, styles }) => (
  <div className='line'>
    <DragHandle />{value}

    <style jsx>{`
      .line {
        display: flex;
        align-items: center;
        margin: 5px;
        padding: 5px;
        border: 1px dotted grey;
        white-space: nowrap;
        ${styles}
      }
    `}</style>
  </div>
))

const SortableContainer = sortableContainer(({ children }) => <div>{children}</div>)

function SortContainer({ styles, axis }) {
  const arrInit = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
  const [state, setState] = useState(arrInit)
  const onSortEnd = ({ oldIndex, newIndex }) => setState(arrayMoveImmutable(state, oldIndex, newIndex))

  return (
    <SortableContainer
      onSortEnd={onSortEnd}
      axis={axis}
      useDragHandle
    >
      {state.map((value, index) => (
        <SortableBlock key={`item-${value}`} index={index} value={value} styles={styles} />
      ))}
    </SortableContainer>
  )
}

const postObj = {
  title: 'sortable',
  date: '2022.05.01',
  tags: ['react', 'hoc'],
  desc: 'sort rows and columns',
  body: (
    <>
      <ul>
        <li><Lnk path='https://github.com/clauderic/react-sortable-hoc'>react-sortable-hoc</Lnk></li>
        <li><Code bash>npm i react-sortable-hoc</Code></li>
        <li><Code bash>npm i array-move</Code> nice helper to move item in array from one place to another - <Lnk path='https://www.npmjs.com/package/array-move'>array-move</Lnk></li>
      </ul>

      <H>Sort lines</H>

      <SortContainer styles='display: flex;' axis='y' />

      <H>Sort columns</H>

      <SortContainer styles='display: inline-flex;' axis='x' />

      <Code block jsx>{`
      import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
      import { arrayMoveImmutable } from 'array-move'
      import { MdDragIndicator } from "react-icons/md"

      const DragHandle = sortableHandle(() => (
        <span className='icon-container'>
          <MdDragIndicator />
          <style jsx>{\`
            .icon-container {
              display: inline-flex;
              align-items: center;
              cursor: move;
            }
          \`}</style>
        </span>
      ))

      const SortableBlock = sortableElement(({value, css}) => (
        <div className='line'>
          <DragHandle />{value}

          <style jsx>{\`
            .line {
              display: flex;
              align-items: center;
              margin: 5px;
              padding: 5px;
              border: 1px dotted grey;
              white-space: nowrap;
              \${css}
            }
          \`}</style>
        </div>
      ))

      const SortableContainer = sortableContainer(({children}) => <div>{children}</div>)

      function SortContainer({ css, axis }) {
        const arrInit = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
        const [state, setState] = useState(arrInit)
        const onSortEnd = ({oldIndex, newIndex}) => setState(arrayMoveImmutable(state, oldIndex, newIndex))

        return (
          <SortableContainer onSortEnd={onSortEnd} axis={axis} useDragHandle>
            {state.map((value, index) => (
              <SortableBlock key={\`item-\${value}\`} index={index} value={value} styles={css} />
            ))}
          </SortableContainer>
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
