'use client'


import { Code, H, Hs, Lnk, useState, useRef, jsxToStr } from '/components/post/reExport'
import useInput from '/functions/useInput'

function ControlledInput() {
  const [inpVal, setInpVal] = useState('initial text')

  return (
    <>
      <h1>{inpVal}</h1>
      <input
        type="text"
        value={inpVal}
        onChange={e => setInpVal(e.target.value)}
      />
    </>
  )
}

function UncontrolledInput() {
  const [inpVal, setInpVal] = useState('initial text')
  const inpRef = useRef('initial text')

  return (
    <>
      <h1>{inpVal}</h1>
      <input
        ref={inpRef}
        type="text"
        value={inpVal}
        onChange={() => setInpVal(inpRef.current.value)}
      />
    </>
  )
}

function FormWithInputWithoutCustomHook() {
  const [nameState, setNameState] = useState('')

  const submitHandler = e => {
    e.preventDefault()
    alert(`hello ${nameState}`)
    setNameState('')
  }

  return (
    <form onSubmit={submitHandler}>
      <input placeholder="Name" value={nameState} onChange={e => setNameState(e.target.value)} />
      <button>Submit</button>
    </form>
  )
}

function FormWithInputWithCustomHook() {
  const [nameState, bindName, resetName] = useInput()

  const submitHandler = e => {
    e.preventDefault()
    alert(`hello ${nameState}`)
    resetName()
  }

  return (
    <form onSubmit={submitHandler}>
      <input placeholder="Name" {...bindName} />
      <button>Submit</button>
    </form>
  )
}

const postObj = {
  title: 'input in react',
  date: '2021.10.23',
  tags: ['react', 'hook', 'custom'],
  desc: 'Controlled & uncontrolled input component and custom hook for an input',
  body: (
    <>
      <H>Uncontrolled component</H>

      <ul>
        <li> Uncontrolled component data is handled by the DOM. </li>
        <li> We need to use <Code inline >useRef()</Code> <Lnk link='https://reactjs.org/docs/hooks-reference.html#useref'>hook</Lnk> to get form values from the DOM. </li>
        <li><Code inline>inpRef.current</Code> refers to the DOM element.</li>
      </ul>

      <Code block>{`
      import React, { useRef, useState } from 'react';

      function UncontrolledInput() {
        const [inpVal, setInpVal] = useState('initial text');
        const inpRef = useRef('initial text')

        return (
          <>
            <h1>{inpVal}</h1>
            <input
              ref={inpRef}
              type="text"
              value={inpVal}
              onChange={() => setInpVal(inpRef.current.value)}
            />
          </>
        );
      }

      <UncontrolledInput />
      `}</Code>

      <UncontrolledInput />

      <H>Controlled component</H>

      <ul>
        <li>Controlled component data is handled by a React component via <Code inline >useState()</Code> <Lnk link={'https://reactjs.org/docs/hooks-reference.html#usestate'}>hook</Lnk>. </li>
        <li>Event handler takes care of a state update.</li>
      </ul>

      <Code block>{`
      import React, { useRef, useState } from 'react';

      function ControlledInput() {
        const [inpVal, setInpVal] = useState('initial text');

        return (
          <>
            <h1>{inpVal}</h1>
            <input
              type="text"
              value={inpVal}
              onChange={e => setInpVal(e.target.value)}
            />
          </>
        );
      }

      <ControlledInput />
      `}</Code>

      <ControlledInput />

      <H>Custom hook for input</H>

      <Hs>Form with input</Hs>

      <p>With controlled component input values are always driven by the React state and we always need to create such logic for every input.</p>

      <ul>
        <li>We control input value via react state with <i>onChange</i> event</li>
        <li>On form submit we prevent the default action and do our logic</li>
        <li>After submission we reset input fields with initial empty string</li>
      </ul>

      <Code block>{`
      function FormWithInputWithoutCustomHook() {
        const [nameState, setNameState] = useState('')

        const submitHandler = e => {
          e.preventDefault()
          alert(\`hello \${nameState}\`)
          setNameState('')
        }

        return (
          <form onSubmit={submitHandler}>
            <input placeholder="Name" value={nameState} onChange={e => setNameState(e.target.value)} />
            <button>Submit</button>
          </form>
        )
      }
      <FormWithInputWithoutCustomHook />
      `}</Code>

      <FormWithInputWithoutCustomHook />

      <Hs>Custom hook for input</Hs>

      <ul>
        <li>Let's make a custom hook for an input control</li>
        <li>We extract the logic into a separate file <code>useInput.js</code> and export back the input <code>value</code> & <code>onChange</code> attributes in the object + reset function</li>
      </ul>

      <Code block>{`
      // functions\\ useInput.js
      import { useState } from 'react'

      export default function useInput(initVal = '') {
        const [val, setVal] = useState(initVal)
        const reset = () => setVal(initVal)
        const bind = {
          value: val,
          onChange: e => setVal(e.target.value)
        }
        return [val, bind, reset]
      }
      `}</Code>

      <Hs>Input with custom hook</Hs>

      <ul>
        <li>In the main file we bring and destruct values from the custom hook</li>
        <li>Note how we bring <code>value</code> and <code>onChange</code> attributes by spreading the object into the input field</li>
      </ul>

      <Code block>{`
      import useInput from '/functions/useInput'

      function FormWithInputWithCustomHook() {
        const [nameState, bindName, resetName] = useInput()

        const submitHandler = e => {
          e.preventDefault()
          alert(\`hello \${nameState}\`)
          resetName()
        }

        return (
          <form onSubmit={submitHandler}>
            <input placeholder="Name" {...bindName} />
            <button>Submit</button>
          </form>
        )
      }
      <FormWithInputWithCustomHook />
      `}</Code>

      <FormWithInputWithCustomHook />

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
