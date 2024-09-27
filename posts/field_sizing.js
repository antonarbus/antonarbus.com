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
  title: 'field-sizing',
  date: '2024.09.28',
  tags: ['css'],
  imgUrl: 'https://antonarbus.com/imgs/css.png',
  desc: 'field-sizing',
  body: (
    <>
      <H>field-sizing: content;</H>
      <ul>
        <li>Allows the element to adjust its size to fit its contents</li>
      </ul>
      <ComponentFromHtmlString
        htmlString={`
          </html>
            <head>
              <style>
                input,
                textarea {
                  field-sizing: content;
                  min-width: 50px;
                }

                label {
                  width: 150px;
                  margin-right: 20px;
                  text-align: right;
                }
              </style>
            </head>
            <body>
              <div>
                <label for="name">Enter name:</label>
                <input type="text" id="name" maxlength="50" />
              </div>
              <div>
                <label for="email">Enter email:</label>
                <input type="email" id="email" maxlength="50" placeholder="e.g. a@b.com" />
              </div>
              <div>
                <label for="comment">Enter comment:</label>
                <textarea id="comment">This is a comment.</textarea>
              </div>
            </body>
          </html>
        `}
      />

      <ComponentFromHtmlString
        htmlString={`
          </html>
            <head>
              <style>
                .field-sizing select {
                  field-sizing: content;
                }
              </style>
            </head>
            <body>
              <div class="field-sizing">
                <h2>With <code>field-sizing: content</code></h2>
                <select>
                  <option>Bananas</option>
                  <option>Strawberries</option>
                  <option selected>Apples</option>
                  <option>Raspberries</option>
                  <option>Pomegranate</option>
                </select>
                <select multiple>
                  <option>Bananas</option>
                  <option>Strawberries</option>
                  <option>Apples</option>
                  <option>Raspberries</option>
                  <option>Pomegranate</option>
                </select>
              </div>
              <div>
                <h2>Without <code>field-sizing: content</code></h2>
                <select>
                  <option>Bananas</option>
                  <option>Strawberries</option>
                  <option selected>Apples</option>
                  <option>Raspberries</option>
                  <option>Pomegranate</option>
                </select>
                <select multiple>
                  <option>Bananas</option>
                  <option>Strawberries</option>
                  <option>Apples</option>
                  <option>Raspberries</option>
                  <option>Pomegranate</option>
                </select>
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
