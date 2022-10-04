import { Code, H, jsxToStr } from '/components/post/reExport'

function BoxShadow() {
  return (
    <div>
      <span className='no-shadow'>no shadow</span>
      <span className='shadow'>box-shadow</span>

      <style jsx>{`
        span {
          background: grey;
          color: white;
          padding: 2px 5px;
          margin: 4px;
          border-radius: 4px;
          font-size: 20px;
        }
        .no-shadow {
          box-shadow: none;
        }
        .shadow {
          box-shadow: rgba(128, 128, 128, 0.7) 0px 0px 10px;
        }
      `}</style>
    </div>
  )
}

const postObj = {
  title: 'shadow',
  date: '2022.04.19',
  tags: ['css'],
  desc: 'shadow style',
  body: (
    <>
      <H>box-shadow</H>

      <BoxShadow />

      <Code block css>{`
      span {
        background: grey;
        color: white;
        padding: 2px 5px;
        margin: 4px;
        border-radius: 4px;
        font-size: 20px;
      }
      .no-shadow {
        box-shadow: none;
      }
      .shadow {
        box-shadow: rgba(128, 128, 128, 0.7) 0px 0px 10px;
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
