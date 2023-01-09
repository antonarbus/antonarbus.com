import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'container queries',
  date: '2023.01.09',
  tags: ['css'],
  imgUrl: 'https://antonarbus.com/imgs/css.png',
  desc: 'container queries',
  body: (
    <>
      <H>Basics</H>

      <ul>
        <li><Lnk path='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries'>Container queries</Lnk> is the same as media queries, but not based on the view port, but any element</li>
        <li>This is the game changer for the responsive design</li>
      </ul>

      <H>Example from my task</H>

      <p>Here text is disappearing when container becomes less than 130px.</p>

      <Code block jsx>{`
      export const LogoComponent = ({ text }) => (
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            flexGrow: 1,
            flexShrink: 0,
            containerType: 'inline-size',
            containerName: 'logo',
            '@container logo (max-width: 130px)': {
              '& span': {
                display: 'none'
              }
            }
          }}
        >
          <img src={HeerosLogo} height='38' alt='Heeros logo' />
          <span>{text}</span>
        </Box>
      )
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
