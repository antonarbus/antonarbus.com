import { Code, H, Lnk, jsxToStr, ComponentFromHtmlString } from '/components/post/reExport'

const postObj = {
  title: 'media queries',
  date: '2023.01.09',
  tags: ['css'],
  imgUrl: 'https://antonarbus.com/imgs/css.png',
  desc: 'media queries',
  body: (
    <>
      <H>Container queries</H>

      <ul>
        <li>
          <Lnk path="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries">
            Container queries
          </Lnk>{' '}
          is the same as media queries, but not based on the view port, but any element
        </li>
        <li>
          <code>@container</code> styles will be applied to elements based on the size of the
          nearest parent with <code>container-type</code>
        </li>
      </ul>

      <ComponentFromHtmlString
        htmlString={`
          <html>
            <head>
              <style>
                .parent {
                  container-type: inline-size;
                  border: 1px solid grey;
                }
                .parent h2 {
                  font-size: 10px;
                }
                @container (width > 700px) {
                  .parent h2 {
                    font-size: 20px;
                  }
                }
              </style>
            </head>
            <body>
              <div class="parent">
                <h2>i am fat when parent width > 700px</h2>
              </div>
            </body>
          </html>
        `}
      />

      <H>Named container queries</H>

      <ul>
        <li>
          To target specific parent container when containers are nested we may use{' '}
          <code>container-name</code>
        </li>
      </ul>

      <ComponentFromHtmlString
        htmlString={`
          <html>
            <head>
              <style>
                div {
                  border: 1px solid grey;
                  margin: 5px;
                  padding: 5px;
                }
                .parent-1 {
                  container-type: inline-size;
                  container-name: container1;
                }
                .parent-2 {
                  container-type: inline-size;
                  container-name: container2;
                  
                }
                .child {
                  color: green;
                }
                @container container1 (width < 700px) {
                  .child {
                    color: red;
                  }
                }
                @container container2 (width < 500px) {
                  .child {
                    color: blue;
                  }
                }
              </style>
            </head>
            <body>
              <div class='parent-1'>
                parent-1
                <div class='parent-2'>
                  parent-2
                  <div class='child'>
                    resize paper to see how I can change color
                  </div>
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
