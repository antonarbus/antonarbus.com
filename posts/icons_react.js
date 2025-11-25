'use client'


import { Code, H, LazyImg, Lnk, React, jsxToStr } from '/components/post/reExport'
import { FaRedhat, FaRedhat as HatIcon } from 'react-icons/fa'

// #region
const icon = React.createElement(HatIcon)
const styles = { verticalAlign: 'middle', fill: 'red', fontSize: '100px', width: '100px', height: 'auto', margin: '3px', color: 'blue', opacity: '.5', strokeWidth: '10px' }

function Component() {
  return (
    <>
      <FaRedhat />
      <HatIcon />
      {icon}
      <HatIcon style={styles}/>
      <span className='rotate'>
        <FaRedhat />

        <style jsx>{`
            .rotate :global(svg) {
              color: blue;
              animation-name: spin;
              animation-duration: 4s;
              animation-iteration-count: infinite;
            }
            @keyframes spin { 
              100% { transform:rotate(360deg); } 
            }
          `}</style>
      </span>
    </>
  )
}
// #endregion

const postObj = {
  title: 'icons in react',
  date: '2021.10.28',
  tags: ['react'],
  desc: 'React icons package',
  body: (
    <>
      <H>Install package</H>

      <ul>
        <li><Lnk path={'https://www.npmjs.com/package/react-icons'}> React-icons </Lnk> package can be installed with <Code bash>npm i react-icons</Code> from terminal</li>
        <li> Whole set of icons can be checked <Lnk path={'https://react-icons.github.io/react-icons'}>here</Lnk></li>
      </ul>

      <H>Usage</H>

      <ul>
        <li> We can use icons as JSX components <Code html>{'<Icon />'}</Code> or assign them to variables <Code js>{'const iconVar = React.createElement(Icon)'}</Code></li>
        <li> Styles can be applied on svg <Code html>{'<Icon style={styles}/>'}</Code></li>
      </ul>

      <Code block>{`
      import { FaRedhat } from 'react-icons/fa'
      import { FaRedhat as HatIcon } from 'react-icons/fa'

      const icon = React.createElement(HatIcon)
      const styles = { verticalAlign: 'middle', fill: 'red', fontSize: '100px', width: '100px', height: 'auto', margin: '3px', color: 'blue', opacity: '.5', strokeWidth: '10px' }

      function Component() {
        return (
          <>
            <FaRedhat /> 
            <HatIcon /> 
            {icon} 
            <HatIcon style={styles}/>
            <span className='rotate'>
              <FaRedhat /> 
              
              <style jsx>{\`
                .rotate :global(svg) {
                  color: blue;
                  animation-name: spin;
                  animation-duration: 4s;
                  animation-iteration-count: infinite;
                }
                @keyframes spin { 
                  100% { transform:rotate(360deg); } 
                }
              \`}</style>
            </span>
          </>
        )
      }
      `}</Code>

      <Component />

      <H>Search for icons</H>

      <ul>
        <li>All available icons are presented <Lnk path='https://react-icons.github.io/react-icons/icons?name=fa'>here</Lnk></li>
        <li>To import an icon you need to know exact package name <Code js>{"import { FaRedhat } from 'react-icons/fa'"}</Code> - <i>/fa</i> in this example</li>
        <li>When you search for an icons via search input, it is not obvious what the package icon comes from</li>
        <li>Better to go manually through packages on the left side and manually look for an icon</li>
      </ul>

      <LazyImg src='/imgs/react-icons.png'/>

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
