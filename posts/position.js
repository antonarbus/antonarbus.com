import { Code, H, useState, jsxToStr } from '/components/post/reExport'

function Component() {
  const [styleState, setStyleState] = useState('position: static;')
  const updateStyles = () => setStyleState(e.target.value)

  return (
    <div className='container'>
      Styles for <span style={{ color: 'red' }}>red</span> element
      <RadioButtons setStyleState={setStyleState} />
      <textarea value={styleState} onChange={updateStyles}/>
      <div className='wrapper'>
        {Array(14).fill('').map((el, i) => <div className='box' key={i + 1}>{i + 1}</div>)}
        <div className='box boxSpecial'>14</div>
        {Array(100).fill('').map((el, i) => <div className='box' key={i + 1 + 14}>{i + 1 + 14}</div>)}
      </div>

      <style jsx>{`
        .container {
          text-align: center;
        }
        textarea {
          padding: 5px;
          width: 300px;
          height: 100px;
        }
        .wrapper {
          position: relative;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 400px;
          height: 280px;
          border: 1px solid grey;
          overflow: auto;
          margin: auto;
        }
        .box {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 30px;
          margin: 5px;
          background: rgb(35 35 35 / 50%);
        }
        .boxSpecial {
          background: rgb(255 0 0 / 50%);
          border: 1px solid green;
          ${styleState}
        }
      `}</style>
    </div>
  )
}

function RadioButtons({ setStyleState }) {
  return (
    <div className='wrapper'>
      <label>
        <input type="radio" name="position" value='static' defaultChecked onChange={() => setStyleState('position: static;')} />
        <span>static</span>
      </label>
      <label>
        <input type="radio" name="position" value='relative' onChange={() => setStyleState('position: relative; \ntop: 20px; \nleft: 20px;')} />
        <span>relative</span>
      </label>
      <label>
        <input type="radio" name="position" value='absolute' onChange={() => setStyleState('position: absolute; \ntop: 20px; \nleft: 20px; \n/* container has relative position */')} />
        <span>absolute</span>
      </label>
      <label>
        <input type="radio" name="position" value='fixed' onChange={() => setStyleState('position: fixed; \ntop: 20px; \nleft: 20px;')} />
        <span>fixed</span>
      </label>
      <label>
        <input type="radio" name="position" value='sticky' onChange={() => setStyleState('position: sticky; \ntop: 0; \n/* scroll down to stick */')} />
        <span>sticky</span>
      </label>

      <style jsx>{`
        .wrapper label {
          display: inline-block;
          margin-right: 10px;
          cursor: pointer;
        }
        .wrapper input {
          margin: 2px;
        }
        .wrapper span {
          position: relative;
          bottom: 1.8px;
        }
      `}</style>
    </div>
  )
}

const postObj = {
  title: 'position',
  date: '2022.02.13',
  tags: ['css', 'basics'],
  desc: 'Position property in CSS',
  body: (
    <>
      <p>Position property allows to move element from its native place.</p>

      <Component />

      <H><Code css>position: static</Code></H>

      <p>Default value with normal CSS flow</p>

      <H><Code css>position: relative</Code></H>

      <ul>
        <li>Moves element from its native place with <Code>left/right/top/bottom</Code> properties</li>
        <li>Can not use both <Code>left</Code> & <Code>right</Code>; <Code>top</Code> & <Code>bottom</Code></li>
        <li>Negative coordinates are allowed</li>
      </ul>

      <H><Code css>position: absolute</Code></H>

      <ul>
        <li>Absolutely positioned element is removed from the flow and its place is taken by other elements</li>
        <li><Code>top/bottom/left/right</Code> count from nearest positioned parent (not static)</li>
        <li>If no positioned parent found, then element is positioned from the document</li>
        <li>Width fits the content</li>
        <li>Element becomes <Code css>display: block</Code>, which overlays other blocks</li>
        <li><Code>left/right</Code>, <Code>top/bottom</Code> can be set together and element will be stretched</li>
      </ul>

      <H><Code css>position: fixed</Code></H>

      <ul>
        <li>Same as <Code css>position: absolute</Code>, but relative to window</li>
        <li>When window is scrolled, element stays in place</li>
        <li>Modal window can be achieved with
        <Code block css>{`
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        `}</Code></li>
      </ul>

      <H><Code css>position: sticky</Code></H>

      <p>The top, right, bottom, and left properties determine the final location of positioned elements.</p>

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
