import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'reset styles',
  date: '2021.11.03',
  tags: ['css'],
  desc: 'Reset CSS property',
  body: (
    <>
      <H>original</H>
      <Code block css>{`
      .outer {
        background: grey;
        padding: 10px;
      }
      .inner {
        background: beige;
        padding: 10px;
        border: 1px solid red;
      }
      `}</Code>

      <div className='outer'>
        <div className='inner'></div>

        <style jsx>{`
          .outer {
            background: grey;
            padding: 10px;
          }
          .inner {
            background: beige;
            padding: 10px;
            border: 1px solid red;
          }
        `}</style>
      </div>

      <H>inherit</H>
      <Code block css>{`
      .outer {
        background: grey;
        padding: 10px;
      }
      .inner {
        background: inherit;
        padding: 10px;
        border: 1px solid red;
      }
      `}</Code>
      <div className='outer'>
        <div className='inner'>
        </div>

        <style jsx>{`
          .outer {
            background: grey;
            padding: 10px;
          }
          .inner {
            background: inherit;
            padding: 10px;
            border: 1px solid red;
          }
        `}</style>
      </div>

      <H>original</H>
      <div>We have <i>inline</i> styles & local <i>body</i> styles for an anchor tag.</div>
      <Code block css>{`
        a {
          color: red;
          font-size: 30px
        }
      `}</Code>

      <a href="https://google.com" target="_blank" rel="noreferrer">
        Google
        <style jsx>{`
          a {
            color: red;
            font-size: 30px
          }
        `}</style>
      </a>

      <H>color: revert</H>
      <p>Set color property to the user agent stylesheet.</p>
      <Code block css>{`
          a {
            color: green;
            font-size: 30px;
            color: revert;
          }
      `}</Code>
      <a href="https://google.com" target="_blank" rel="noreferrer" >
        Google
        <style jsx>{`
          a {
            color: green;
            font-size: 30px;
            color: revert;
          }
        `}</style>
      </a>

      <H>all: revert</H>
      <p>Set all CSS properties to the user agent stylesheet.</p>
      <Code block css>{`
            color: green;
            font-size: 30px;
            all: revert;
      `}</Code>
      <a href="https://google.com" target="_blank" rel="noreferrer" >
        Google

        <style jsx>{`
          a {
            color: green;
            font-size: 30px;
            all: revert;
          }
        `}</style>
      </a>

      <H>color: initial</H>
      <p>Sets property back to the spec default.</p>
      <Code block css>{`
      color: green;
      font-size: 30px;
      all: initial;
      `}</Code>
      <a href="https://google.com" target="_blank" rel="noreferrer" >
        Google

        <style jsx>{`
          a {
            color: green;
            font-size: 30px;
            all: initial;
          }
        `}</style>
      </a>

      <H>color: unset</H>
      <p>Inherit from parent if possible or sets property back to the spec default.</p>
      <Code block css>{`
            color: green;
            font-size: 30px;
            all: unset;
      `}</Code>
      <a href="https://google.com" target="_blank" rel="noreferrer" >
        Google

        <style jsx>{`
          a {
            color: green;
            font-size: 30px;
            all: unset;
          }
        `}</style>
      </a>
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
