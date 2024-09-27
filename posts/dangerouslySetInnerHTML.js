import {
  Code,
  H,
  Hs,
  LazyImg,
  Lnk,
  React,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  jsxToStr,
  ComponentFromHtmlString
} from '/components/post/reExport'

const postObj = {
  title: 'dangerouslySetInnerHTML',
  date: '2024.09.27',
  tags: ['react'],
  imgUrl: 'https://antonarbus.com/imgs/react.png',
  desc: 'dangerouslySetInnerHTML',
  body: (
    <>
      <H>dangerouslySetInnerHTML</H>

      <Code block jsx>{`
        import root from 'react-shadow'

        const ComponentFromHtmlString = ({ htmlString }) => {
          const [html, setHtml] = useState(htmlString ?? '<div>hello</div>')

          return (
            <root.div>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                style={{
                  padding: '5px',
                  width: '100%',
                  fieldSizing: 'content'
                }}
              />
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </root.div>
          )
        }

        <ComponentFromHtmlString
          htmlString={\`
            <html>
              <head>
                <style>
                  .parent {
                    display: flex;
                    gap: 5px;
                  }
                  .contents {
                    display: contents;
                  }
                  .child {
                    border: 1px solid grey;
                    padding: 10px;
                  }
                </style>
              </head>
              <body>      
                <div class='parent'>
                  <div class='child'>1</div>
                  <div class='child'>2</div>
                  <div class='child'>3</div>
                  <div>
                    <div class='child'>4</div>
                    <div class='child'>5</div>
                    <div class='child'>6</div>
                  </div>
                  <div class='contents'>
                    <div class='child'>7</div>
                    <div class='child'>8</div>
                    <div class='child'>9</div>
                  </div>
                </div>
              </body>
            </html>
          \`}
        />
      `}</Code>

      <ComponentFromHtmlString
        htmlString={`
          <html>
            <head>
              <style>
                .parent {
                  display: flex;
                  gap: 5px;
                }
                .contents {
                  display: contents;
                }
                .child {
                  border: 1px solid grey;
                  padding: 10px;
                }
              </style>
            </head>
            <body>      
              <div class='parent'>
                <div class='child'>1</div>
                <div class='child'>2</div>
                <div class='child'>3</div>
                <div>
                  <div class='child'>4</div>
                  <div class='child'>5</div>
                  <div class='child'>6</div>
                </div>
                <div class='contents'>
                  <div class='child'>7</div>
                  <div class='child'>8</div>
                  <div class='child'>9</div>
                </div>
              </div>
            </body>
          </html>
        `}
      />
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
