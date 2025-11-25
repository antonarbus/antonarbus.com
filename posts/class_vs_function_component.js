'use client'


import { Code, H, React, useState, jsxToStr } from '/components/post/reExport'

// #region

const btnCss = { padding: '5px 20px', margin: '10px 10px 0px 0px', cursor: 'pointer' }

class ClassComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      likes: 0
    }
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  increment() {
    this.setState({ likes: this.state.likes + 1 })
  }

  decrement() {
    this.setState({ likes: this.state.likes - 1 })
  }

  render() {
    return (
      <div>
        <div>Likes <b>{this.state.likes}</b></div>
        <button onClick={this.increment} style={btnCss}> +1 </button>
        <button onClick={this.decrement} style={btnCss}> -1 </button>
      </div>
    )
  }
}

function FunctionComponent() {
  const [likes, setLikes] = useState(0)
  const increment = () => setLikes(likes + 1)
  const decrement = () => setLikes(likes - 1)

  return (
    <div>
      <div>Likes <b>{likes}</b></div>
      <button onClick={increment} style={btnCss}> +1 </button>
      <button onClick={decrement} style={btnCss}> -1 </button>
    </div>
  )
}

// #endregion

const postObj = {
  title: 'class vs function component',
  date: '2021.09.26',
  tags: ['react', 'basics'],
  desc: 'Class vs Function component in React',
  body: (
    <>
      <H>Class component</H>

      <Code block>{`
      import React, { useState } from 'react';

      class ClassComponent extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            likes: 0,
          };
          this.increment = this.increment.bind(this);
          this.decrement = this.decrement.bind(this);
        }

        increment() {
          this.setState({ likes: this.state.likes + 1 });
        }

        decrement() {
          this.setState({ likes: this.state.likes - 1 });
        }

        render() {
          return (
            <div>
              <>Likes <b>{this.state.likes}</b></>
              <button onClick={this.increment} style={btnCss}> +1 </button>
              <button onClick={this.decrement} style={btnCss}> -1 </button>
            </div>
          )
        }
      }

      <ClassComponent />
      `}</Code>

      <ClassComponent />

      <H>Function component</H>

      <p>Function component is a modern way to write a component in react.</p>

      <Code block>{`
      import React, { useState } from 'react';

      function FunctionComponent() {
        const [likes, setLikes] = useState(0);
        const increment = () => setLikes(likes + 1);
        const decrement = () => setLikes(likes - 1);

        return (
          <div>
            <div>Likes <b>{likes}</b></div>
            <button onClick={increment} style={btnCss}> +1 </button>
            <button onClick={decrement} style={btnCss}> -1 </button>
          </div>
        )
      }

      <FunctionComponent />
      `}</Code>

      <FunctionComponent />

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
