'use client'


import { Code, H, React, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'js vs jsx',
  date: '2021.09.23',
  tags: ['react', 'basics'],
  desc: 'JS vs JSX in React',
  body: (
    <>
      <p>In React we generate html by javascript. We can use <Code inline>React.createElement()</Code> function from the React library to add an HTML element or we can use JSX syntax.</p>

      <H>Native JS </H>

      <Code block>{`
      import React from 'react';

      React.createElement('div', {},
        React.createElement(
          'button', 
          {
            disabled: false,
            onClick: () => { alert('clicked') } 
          }, 
          'Click me'
        )
      )
      `}</Code>

      {
        React.createElement('div', {},
          React.createElement(
            'button',
            {
              disabled: false,
              onClick: () => { alert('clicked') }
            },
            'Click me'
          )
        )
      }

      <H>JSX </H>

      <Code block>{`
      import React from 'react';

      <div>
        <button 
          disabled={false} 
          onClick={() => alert('clicked')}
        >
          Click me
        </button>
      </div>
      `}</Code>

      <div>
        <button
          disabled={false}
          onClick={() => alert('clicked')}
        >
          Click me
        </button>
      </div>
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
