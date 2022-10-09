import { Code, H, Hs, Lnk, React, useState, jsxToStr } from '/components/post/reExport'
import styled, { keyframes, ThemeProvider, useTheme } from 'styled-components'

// #region BASIC
const Basic = () => <Div1>I am div</Div1>
const Div1 = styled.div`
  font-size: 20px;
  color: tomato;
`
// #endregion

// #region Styles in object
const StylesInObject = () => <DivXXX>I am div</DivXXX>
const DivXXX = styled.div({
  fontSize: '20px',
  color: 'tomato'
})
// #endregion

// #region SCSS support
const ScssSupport = () => (
  <Div2>
    <span>we</span>
    <span>are</span>
    <span>spans</span>
  </Div2>
)
const Div2 = styled.div`
  background: yellow;
  span {
    background: black;
    color: white;
    margin: 5px;
  }
`
// #endregion

// #region Pass CSS property
const PassCssProperty = () => <Div3 fontWeight={800}>I am div</Div3>
const Div3 = styled.div`
  font-size: 20px;
  color: tomato;
  font-weight: ${props => props.fontWeight};
`
// #endregion

// #region Pass whole CSS string
const PassWholeCssString = () => (
  <DivADFAG styles={'font-size: 20px;color: tomato;font-weight: 800;'}>I am div</DivADFAG>
)
const DivADFAG = styled.div`
  ${props => props.styles}
`
// #endregion

// #region Pass part of CSS as string
const PassPartOfCssAsString = props => <Div6 styles={props.styles}>I am div</Div6>
const Div6 = styled.div`
  font-size: 20px;
  ${props => props.styles};
`
// #endregion

// #region Pass prop without prop explicitly name
const DoNotSpecifyProp = () => <Div5>I am div</Div5>
const Div5 = styled.div`
  font-size: 20px;
  color: ${props => props.color || 'tomato'};
`
// #endregion

// #region Extend existing styled component
const ExtendExistingStyledComponent = () => <Div7>I am div</Div7>
const Div7 = styled(Div1)`
  border: 1px dotted tomato;
  border-radius: 10px;
`
// #endregion

// #region PropsInAttributes
const PropsInAttributes = () => <MyImg src="/imgs/va/img99.jpg" width="50%" />
const propsFn = (props) => ({
  src: props.src || props.path,
  alt: 'some text',
  width: props.width || '100%',
  height: 'auto'
})
const MyImg = styled.img.attrs(propsFn)`
  border: 4px solid tomato;
  @media screen and (max-width: 800px) {
    min-width: 100%;
  }
`
// #endregion

// #region Conditional styles
const ConditionalStyles = () => {
  const [toggleState, setToggleState] = React.useState(true)
  const changeColor = () => setToggleState(!toggleState)
  return (
    <>
      <Div9 toggleState={toggleState}>I am div</Div9>
      <button onClick={changeColor}>Change color</button>
    </>
  )
}
const Div9 = styled.div`
  background: ${props => (props.toggleState ? 'tomato' : 'yellow')};
`
// #endregion

// #region Animation general
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`
const DivRotate = styled.div`
  display: inline-block;
  margin: 5px;
  padding: 5px;
  background: tomato;
  animation: ${rotate} 2s linear infinite;
`
// #endregion

// #region Keyframes name to start animation
const shakeAnimation = keyframes`
  0% { transform: translateX(0) }
  10% { transform: translateX(5px) }
  30% { transform: translateX(0) }
  50% { transform: translateX(5px) }
  70% { transform: translateX(0) }
  90% { transform: translateX(5px) }
  100% { transform: translateX(0) }
`
const DivShake = styled(DivRotate)`
  animation: ${props => props.animateNow ? shakeAnimation : ''} .3s ease-in-out;
  cursor: pointer;
`
function KeyFramesNameToStartAnimation() {
  const [animationState, setAnimationState] = useState(false)
  const startAnimation = () => setAnimationState(true)
  const endAnimation = () => setAnimationState(false)
  return <>
    <DivShake
      onClick={startAnimation}
      onAnimationEnd={endAnimation}
      animateNow={animationState}
    >
      Click me to shake
    </DivShake>
  </>
}
// #endregion

// #region Class to start animation
const popAnimation = keyframes`
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
`
const DivPop = styled(DivShake)`
  animation: 'none';
  &.animationClass {
    animation: ${popAnimation} 0.5s ease;
  }
`
function ClassNameToStartAnimation() {
  const [animationState, setAnimationState] = useState(false)
  const startAnimation = () => setAnimationState(true)
  const endAnimation = () => setAnimationState(false)
  return (
    <>
      <DivPop
        className={animationState ? 'animationClass' : ''}
        onClick={startAnimation}
        onAnimationEnd={endAnimation}
      >
        Click me to pop out
      </DivPop>
    </>
  )
}
// #endregion

// #region Style existing component
function ExistingComponent({ className }) {
  return (
    <div className={className}>
      I am div
    </div>
  )
}
const StyledExistingComponent = styled(ExistingComponent)`
  color: red;
  font-weight: bold;
`
// #endregion

// #region Theming with wrapper
const theme = {
  redish: '#ff7979'
}
const Button = styled.button`
  color: ${props => props.theme.redish};
`
function ComponentUsesThemeWrapper() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button>Themed</Button>
      </ThemeProvider>
    </div>
  )
}
// #endregion

// #region Theme outside styled components
const theme2 = {
  grey: 'grey',
  white: 'white'
}
function ThemeOutsideStyledComponent() {
  const theme = useTheme()
  return (
    <div style={{ background: theme.grey, color: theme.white }}>
      I am div
    </div>
  )
}
// #endregion

const postObj = {
  title: 'styled components',
  date: '2021.10.11',
  tags: ['react', 'tool'],
  desc: 'Styled components in React',
  body: (
    <>
      <p>
        With <Lnk url="https://styled-components.com/">styled components</Lnk> we can attach css/sass to a react component via JS.
      </p>

      <ul>
        <li>Styled can take props and make conditional styling via JS.</li>
        <li> Styles are <i>scoped</i> </li>
        <li>Everything is located in one file</li>
      </ul>

      <H>Installation</H>

      <ul>
        <li> Firstly we need to install library via npm <Code bash>npm install --save styled-components</Code> </li>
        <li> Then add it to our file <Code js>import styled from 'styled-components'</Code> </li>
      </ul>

      <H>Basic usage</H>

      <Code block jsx>{`
        import React from 'react'
        import styled from 'styled-components'
        
        const Basic = () => <Div1>I am div</Div1>
        const Div1 = styled.div\`
          font-size: 20px;
          color: tomato;
        \`
        
        <Basic />
      `}</Code>

      <Basic />

      <H>Styles in object</H>

      <Code block jsx>{`
      const StylesInObject = () => <DivXXX>I am div</DivXXX>
      const DivXXX = styled.div({
        fontSize: '20px',
        color: 'tomato'
      })

      <StylesInObject />
      `}</Code>

      <StylesInObject />

      <H>Supports SCSS</H>

      <Code block jsx>{`
        const ScssSupport = () => <Div2><span>we</span><span>are</span><span>spans</span></Div2>
        const Div2 = styled.div\`
          background: yellow;
          span {
            background: black;
            color: white;
            margin: 5px;
          }
        \`

        <ScssSupport />
      `}</Code>

      <ScssSupport />

      <H>Pass CSS prop to styled </H>

      <p> We can pass a string as CSS via props to <i>styled </i> </p>

      <Code block jsx>{`
        const PassCssProperty = () => <Div3 fontWeight={800}>I am div</Div3>
        const Div3 = styled.div\`
          font-size: 20px;
          color: tomato;
          font-weight: \${props => props.fontWeight};
        \`

        <PassCssProperty />
      `}</Code>

      <PassCssProperty />

      <H>Pass whole CSS as string </H>

      <p>We can pass whole CSS string to styled component. Same result as above.</p>

      <Code block jsx>{`
      const PassWholeCssString = () => (
        <DivADFAG styles={'font-size: 20px;color: tomato;font-weight: 800;'}>I am div</DivADFAG>
      )
      const DivADFAG = styled.div\`
        \${props => props.CSS}
      \`

      <PassWholeCssString />
      `}</Code>

      <PassWholeCssString />

      <H>Pass part of CSS as string</H>

      <p>For example we may add additional CSS rules to existing ones.</p>

      <Code block jsx>{`
        const PassPartOfCssAsString = (props) => <Div6 styles={props.css}>I am div</Div6>
        const Div6 = styled.div\`
          font-size: 20px;
          \${props => props.css};
        \`

        <PassPartOfCssAsString styles='color: brown; border: 1px solid grey;' />
      `}</Code>

      <PassPartOfCssAsString styles="color: brown; border: 1px solid grey;" />

      <H>Pass all props</H>

      <p>
        All component's props falls into a styled component by default.
      </p>

      <Code block jsx>{`
      const DoNotSpecifyProp = () => <Div5>I am div</Div5>
      const Div5 = styled.div\`
        font-size: 20px;
        color: \${props => props.color || 'tomato'};
      \`

      <DoNotSpecifyProp color="orange" />
      `}</Code>

      <DoNotSpecifyProp color="orange" />

      <H>Extend existing styled component</H>

      <Code block jsx>{`
        const ExtendExistingStyledComponent = () => <Div7>I am div</Div7>
        const Div7 = styled(Div1)\`
          border: 1px dotted tomato;
          border-radius: 10px;
        \`

        <ExtendExistingStyledComponent />
      `}</Code>

      <ExtendExistingStyledComponent />

      <H>Pass props to the element's attributes</H>

      <Code block jsx>{`
        const PropsInAttributes = () => <MyImg src='/imgs/va/img99.jpg' width='50%' />
        const MyImg = styled.img.attrs(props => ({
          src: props.src || props.path,
          alt: 'some text',
          width: props.width || '100%',
          height: 'auto',
        }))\`
          border: 4px solid tomato;
          @media screen and (max-width: 800px) {
            min-width: 100%;
          }
        \`

        <PropsInAttributes />
      `}</Code>

      <PropsInAttributes />

      <H>Conditional style</H>

      <Code block jsx>{`
        const ConditionalStyles = () => {
          const [toggleState, setToggleState] = React.useState(true)
          const changeColor = () => setToggleState(!toggleState)
          return (
            <>
              <Div9 toggleState={toggleState}>I am div</Div9>
              <button onClick={changeColor}>Change color</button>
            </>
          )
        }
        const Div9 = styled.div\`
          background: \${props => props.toggleState ? 'tomato' : 'yellow'};
        \`

        <ConditionalStyles />
      `}</Code>

      <ConditionalStyles />

      <H>Animation</H>

      <p>Animation in <Lnk path='https://styled-components.com/docs/basics'>styled components</Lnk> needs a special helper <code>keyframes</code> from the library.</p>

      <Hs>Keyframes basic usage</Hs>

      <p>We just use keyframes variable inside our styled component's string literals.</p>

      <Code block>{`
        import styled, { keyframes } from 'styled-components'
  
        const rotate = keyframes\`
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        \`;
  
        const DivRotate = styled.div\`
          display: inline-block;
          margin: 5px;
          padding: 5px;
          background: tomato;
          animation: \${rotate} 2s linear infinite;
        \`;
  
        <DivRotate>Hello</DivRotate>
      `}</Code>

      <DivRotate>Hello</DivRotate>

      <Hs>Start animation by adding keyframes name</Hs>

      <p>We pass the state into styled component and toggle animation name on its change.</p>

      <p>When animation ends animation name may be removed with <i>onAnimationEnd</i> event.</p>

      <Code block>{`
        import React, { useState } from 'react';
        import styled, { keyframes } from 'styled-components';
  
        const shakeAnimation = keyframes\`
          0% { transform: translateX(0) }
          10% { transform: translateX(5px) }
          30% { transform: translateX(0) }
          50% { transform: translateX(5px) }
          70% { transform: translateX(0) }
          90% { transform: translateX(5px) }
          100% { transform: translateX(0) }
        \`
        const DivShake = styled(DivRotate)\`
          animation: \${props => props.animateNow ? shakeAnimation : ''} .3s ease-in-out;
          cursor: pointer;
        \`
        function Basic() {
          const [animationState, setAnimationState] = useState(false)
          const startAnimation = () => setAnimationState(true)
          const endAnimation = () => setAnimationState(false)
          return <>
            <DivShake
              onClick={startAnimation}
              animateNow={animationState}
              onAnimationEnd={endAnimation}
            >
              Click me to shake
            </DivShake>
          </>
        }

        <KeyFramesNameToStartAnimation />
      `}</Code>

      <KeyFramesNameToStartAnimation />

      <Hs>Start animation by adding class name</Hs>

      <Code block>{`
        const popAnimation = keyframes\`
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        \`
        const DivPop = styled(DivShake)\`
          animation: 'none';
          &.animationClass {
            animation: \${popAnimation} 0.5s ease;
          }
        \`
        function ScssSupport() {
          const [animationState, setAnimationState] = useState(false)
          const startAnimation = () => setAnimationState(true)
          const endAnimation = () => setAnimationState(false)
          return <>
            <DivPop
              className={animationState ? 'animationClass' : ''}
              onClick={startAnimation}
              onAnimationEnd={endAnimation}
            >
              Click me to pop out
            </DivPop>
          </>

          <ClassNameToStartAnimation />
        }
      `}</Code>

      <ClassNameToStartAnimation />

      <H>Style existing component</H>

      <p>Any existing component can be styled as long as it has <code>className</code> prop.</p>

      <Code block jsx>{`
      function ExistingComponent({ className }) {
        return (
          <div className={className}>
            I am div
          </div>
        )
      }
      const StyledExistingComponent = styled(ExistingComponent)\`
        color: red;
        font-weight: bold;
      \`

      <StyledExistingComponent />
      `}</Code>

      <StyledExistingComponent />

      <H>Theming with wrapper</H>

      <Code block jsx>{`
      import styled, { ThemeProvider } from 'styled-components'
      const theme = {
        redish: '#ff7979'
      }
      const Button = styled.button\`
        color: \${props => props.theme.redish};
      \`
      function ComponentUsesThemeWrapper(props) {
        return (
          <div>
            <ThemeProvider theme={theme}>
              <Button>Themed</Button>
            </ThemeProvider>
          </div>
        )
      }

      <ComponentUsesThemeWrapper />
      `}</Code>

      <ComponentUsesThemeWrapper />

      <H>Theme values outside styled components</H>

      <Code block jsx>{`
      const theme2 = {
        grey: 'grey',
        white: 'white'
      }
      function ThemeOutsideStyledComponent() {
        const theme = useTheme()
        return (
          <div style={{ background: theme.grey, color: theme.white }}>
            I am div
          </div>
        )
      }

      <ThemeProvider theme={theme2}>
        <ThemeOutsideStyledComponent />
      </ThemeProvider>
      `}</Code>

      <ThemeProvider theme={theme2}>
        <ThemeOutsideStyledComponent />
      </ThemeProvider>

      <H>In NextJs</H>

      In NextJs styled components requires additional <Lnk path='https://antonarbus.com/posts/next#styledcomponents'>configuration.</Lnk>
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
