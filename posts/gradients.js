'use client'


import { Code, LazyImg, jsxToStr, H } from '/components/post/reExport'

const style = { height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px' }

function Cmpt(props) {
  return (
    <div style={style}>
      {props.styles}
      <style jsx>{`
        div {
          ${props.styles}
        }
      `}</style>
    </div>
  )
}

const MacBook = () => (
  <div css={style}>
    <h1
      css={{
        fontSize: '70px',
        padding: '20px',
        background: 'linear-gradient(to right, rgb(67, 124, 205), rgb(69, 214, 202))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
    >
      MacBook
    </h1>
  </div>
)

const postObj = {
  title: 'gradients',
  date: '2021.11.18',
  tags: ['css'],
  desc: 'Gradients in CSS',
  body: (
    <>
      <H>Linear gradient</H>

      <ul>
        <p>We will speak only about linear gradient here, but there are more:</p>
        <li>Linear gradient (goes down/up/left/right/diagonally)</li>
        <li>Radial gradient (defined by their center)</li>
        <li>Conic gradient (rotated around a center point)</li>
      </ul>

      <p>Gradient is an image, not a color.</p>

      <p>We can assign it to <Code css>background-image: linear-gradient(red, green)</Code>.</p>

      <p>CSS is smart enough to understand if you declare gradient to a shorthand <Code css>background: linear-gradient(red, green)</Code>.</p>

      <H>From top to bottom</H>

      <p>By default the gradient line goes from the top to the bottom. Prev. example looks like.</p>

      <Code block css>{`
      background: linear-gradient(red, green)
      `}</Code>

      <Cmpt styles='background: linear-gradient(red, green)'></Cmpt>

      <H>From top to right</H>

      <p>We can specify the direction of the gradient line.</p>

      <Code block css>{`
      background: linear-gradient(to top right, red, green)
      `}</Code>

      <Cmpt styles='background: linear-gradient(to top right, red, green)'></Cmpt>

      <H>Angle direction</H>

      <p>Or use an angle.</p>

      <LazyImg path="/imgs/linearGradient.png" />

      <p>Line goes through the center of the box. The colors of the gradient are determined by several points. Start & end points are defined by the intersection the line with a perpendiculars from the box corners. Start & end points are symmetrical from center.</p>

      <Code block css>{`
      background: linear-gradient(0deg, red, green)
      `}</Code>

      <p>Or use an angle. Note that as far as the div shape is not square, the line doesn't go diagonally.</p>

      <Cmpt styles='background: linear-gradient(0deg, red, green)' />

      <p>Or use an angle. Note that as far as the div shape is not square, the line doesn't go diagonally.</p>

      <Code block css>{`
      background: linear-gradient(45deg, red, green)
      `}</Code>

      <Cmpt styles='background: linear-gradient(45deg, red, green)' />

      <H>Multiple colors</H>

      <p>We can have multiple comma separated colors.</p>

      <Code block css>{`
      background: linear-gradient(red, white, green)
      `}</Code>

      <Cmpt styles='background: linear-gradient(red, white, green)' />

      <H>Color start point</H>

      <p>You can set a start point for a color.</p>

      <Code block css>{`
      background: linear-gradient(to right, red 0%, white 10%, green 50%);
      `}</Code>

      <Cmpt styles='background: linear-gradient(to right, red 0%, white 10%, green 50%)' />

      <H>Fixed background</H>

      <p>Background image can span across the whole container or can be fixed. Check the difference.</p>

      <Cmpt styles='height: 600px !important; background: linear-gradient(red, green);' />
      <br />
      <Cmpt styles='height: 600px !important; background: linear-gradient(red, green); background-attachment: fixed;' />

      <H>Text gradient</H>

      <Code block jsx>{`
      const MacBook = () => (
        <div css={style}>
          <h1
            css={{
              fontSize: '70px',
              padding: '20px',
              background: 'linear-gradient(to right, rgb(67, 124, 205), rgb(69, 214, 202))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            MacBook
          </h1>
        </div>
      )
      `}</Code>

      <MacBook />

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
