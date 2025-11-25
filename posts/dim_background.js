'use client'


import { Code, jsxToStr } from '/components/post/reExport'

const divStyle = `
  background-image: url('/imgs/headphones.jpg');
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  color: black;
  margin: 10px;
  border: 2px solid grey;
  height: 200px;
`

const postObj = {
  title: 'dim background',
  date: '2021.11.19',
  tags: ['css'],
  desc: 'Put some dimming on top of an image with CSS',
  body: (
    <>
      <p>Several background images separated by comma can be applied.</p>
      <p>There is a CSS trick how we can dim an image putting a bit transparent gradient without gradient in front.</p>

      <div>
        <style jsx>{`
          div {
            ${divStyle}
          }
        `}</style>
      </div>

      <Code block css>
        background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)),
        url('/imgs/headphones.jpg')
      </Code>

      <div>
        <style jsx>{`
          div {
            ${divStyle}
            background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/imgs/headphones.jpg');
          }
        `}</style>
      </div>

      <Code block>{`
      const Div1 = styled.div\`
        background-image: url('/imgs/headphones.jpg');
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        color: black;
        margin: 10px;
        border: 2px solid grey;
        height: 200px;
      \`

      const Div2 = styled(Div1)\`
        background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/imgs/headphones.jpg');
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
