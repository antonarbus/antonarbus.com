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
  title: 'ellipsis',
  date: '2025.07.09',
  tags: ['css'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'ellipsis',
  body: (
    <>
      <H>Ellipsis at block parent</H>

      <ul>
        <li>container should have width constraint</li>
        <li>block element usually have default 100% width constraint</li>
        <li>
          child should have hidden overflow, with no wrap text and ellipsis for 3 dots at the end of
          the text
        </li>
      </ul>

      <ComponentFromHtmlString
        htmlString={`
          </html>
            <head>
              <style>
                .parent {
                  padding: 5px;
                  border: 1px solid grey;
                }
                .child {
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              </style>
            </head>
            <body>
              <div class="parent">
                <div class="child">
                  long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text 
                </div>
              </div>
            </body>
          </html>
        `}
      />

      <H>Ellipsis at auto-grow flex parent</H>

      <ul>
        <li>It is possible that your container has flex layout with growing width</li>
        <li>Then set width constraint manually</li>
      </ul>

      <ComponentFromHtmlString
        htmlString={`
          </html>
            <head>
              <style>
                .parent {
                  display: flex;
                  padding: 5px;
                  border: 1px solid grey;
                }
                .flex-child {
                  flex-grow: 1;
                  max-width: 100%;
                }
                .child {
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              </style>
            </head>
            <body>
              <div class="parent">
                <div class="flex-child">
                  <div class="child">
                    long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text long long text 
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
