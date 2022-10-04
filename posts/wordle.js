import { Code, H, LazyImg, Lnk, React, jsxToStr } from '/components/post/reExport'
import styled from 'styled-components'
import { RiAddLine as Plus } from 'react-icons/ri'
import { MdRemove as Minus } from 'react-icons/md'

function listOfPossibleWords(args) {
  const { charObjArr, vocabArr, charsNum, noCharsArr, charArr } = {
    // just some default values to show the structure
    charObjArr: [
      { char: 'a', pos: null, notPos: 1 },
      { char: 'b', pos: 2, notPos: null }
    ],
    charArr: ['a', 'b'],
    noCharsArr: ['c', 'd', 'e'],
    vocabArr: ['hi', 'bye'],
    charsNum: 5,
    ...args
  }
  let arr = []
  arr = arrOfStrOfCertainLength(vocabArr, charsNum)
  arr = arrOfStrWithChars(arr, charArr)
  arr = arrOfStrWithoutChars(arr, noCharsArr)
  arr = arrOfStrWithCharsAtPos(arr, charObjArr)
  arr = arrOfStrWithoutCharsAtPos(arr, charObjArr)
  return arr

  // helper functions

  function arrOfStrOfCertainLength(arr, length) {
    return arr.filter(str => str && str.length === length)
  }

  function arrOfStrWithChars(arr, charsArr) {
    return arr.filter(str => {
      const areAllCharsInside = charsArr.every(char => str.includes(char))
      return areAllCharsInside
    })
  }

  function arrOfStrWithoutChars(arr, charsArr) {
    return arr.filter(str => {
      const isCharsInside = charsArr.some(char => str.includes(char))
      return !isCharsInside
    })
  }

  function isCharAtPosition(str, char, pos) {
    return str.split('')[pos] === char
  }

  function arrOfStrWithCharsAtPos(arr, charObjArr) {
    return arr.filter(str => charObjArr.every(o => {
      if (isNaN(o.pos)) return true
      return isCharAtPosition(str, o.char, o.pos)
    }))
  }

  function arrOfStrWithoutCharsAtPos(arr, charObjArr) {
    return arr.filter(str => charObjArr.every(o => {
      if (isNaN(o.notPos)) return true
      return !isCharAtPosition(str, o.char, o.notPos)
    }))
  }
}

function Component() {
  const [excludeLettersInputState, setExcludeLettersInputState] = React.useState(['cde'])
  const [charsNumInputState, setCharsNumInputState] = React.useState(5)
  const [lettersNumState, setLettersNumState] = React.useState(0)
  const [possibleWordsState, setPossibleWordsState] = React.useState([])
  const [loadingState, setLoadingState] = React.useState(false)
  const ref = React.useRef()
  // React.useEffect(() => { search() }, [])

  async function formArgsFromDom() {
    const container = ref.current
    const charObjArr = []

    container.querySelectorAll('.char').forEach(el => { charObjArr.push({ char: el.value }) })
    container.querySelectorAll('.pos').forEach((el, i) => { charObjArr[i].pos = parseInt(el.value) - 1 })
    container.querySelectorAll('.notPos').forEach((el, i) => { charObjArr[i].notPos = parseInt(el.value) - 1 })
    const charArr = Array.from(container.querySelectorAll('.char')).map(el => el.value)
    const charsNum = parseInt(container.querySelector('.charsNum').value)
    const noCharsArr = container.querySelector('.noCharsArr').value.split('')

    let ruWords = []
    const getRuWordsPromise = fetch('/filesToFetch/ruWords.json')
      .then(res => res.json())
      .then(data => { ruWords = data })

    let enWords = []
    const getEnWordsPromise = fetch('/filesToFetch/enWords.json')
      .then(res => res.json())
      .then(data => { enWords = data })

    // just to have 1.5s loading... alert
    const delayPromise = new Promise(resolve => {
      setTimeout(() => {
        resolve('done')
      }, 1500)
    })

    setLoadingState(true)
    return Promise.all([getRuWordsPromise, getEnWordsPromise, delayPromise])
      .then((resultArr) => {
        const lang = container.querySelector('input:checked').value
        const vocabArr = (lang === 'en') ? enWords : ruWords
        return { charObjArr, charsNum, noCharsArr, charArr, vocabArr }
      })
      .finally(() => { setLoadingState(false) })
  }

  async function search() {
    const argsForNextFunction = await formArgsFromDom()
    const possibleWords = listOfPossibleWords(argsForNextFunction)
    setPossibleWordsState(possibleWords)
  }

  return (
    <div ref={ref}>
      <RadioButtons />
      <FlexContainer>
        <LetterPosDiv char="a" pos="" notPos="1" />
        <LetterPosDiv char="b" pos="2" notPos="" />
        {Array(lettersNumState)
          .fill('')
          .map((val, i) => (
            <LetterPosDiv key={i} />
          ))}

        <div style={{ justifyContent: 'center' }}>
          <Plus onClick={() => setLettersNumState(lettersNumState + 1)} />
          <Minus
            onClick={() => setLettersNumState(lettersNumState - 1 < 0 ? 0 : lettersNumState - 1)}
          />
        </div>

        <div className="inputWrapper">
          <input
            className="noCharsArr"
            type="text"
            spellCheck="false"
            required
            value={excludeLettersInputState}
            onChange={e => setExcludeLettersInputState(e.target.value)}
          />
          <span className="placeholder">Letters to exclude</span>
        </div>

        <div className="inputWrapper">
          <input
            className="charsNum"
            type="number"
            value={charsNumInputState}
            spellCheck="false"
            required
            onChange={e => setCharsNumInputState(e.target.value)}
          />
          <span className="placeholder">Number of letters</span>
        </div>

        <button onClick={search}>{loadingState ? 'Loading...' : 'Show'}</button>

        <div id="possibleWordsTag">
          {possibleWordsState.length === 0
            ? 'Possible words'
            : `${possibleWordsState.length} word${possibleWordsState.length === 1 ? '' : 's'
            } found`}
        </div>
        <div id="possibleWordsContainer">
          {possibleWordsState.map(word => (
            <span key={word} className="foundWord">
              {' '}
              {word}{' '}
            </span>
          ))}
        </div>
      </FlexContainer>
    </div>
  )
}

function RadioButtons() {
  const [langState, setLangState] = React.useState('en')
  return (
    <Div>
      <label>
        <input type="radio" name="lang" value='en' defaultChecked onChange={e => setLangState(e.target.value)} />
        <span>en</span>
      </label>
      <label>
        <input type="radio" name="lang" value='ru' onChange={e => setLangState(e.target.value)} />
        <span>ru</span>
      </label>
    </Div>
  )
}

const Div = styled.div`
  label {
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;

    input {
      margin: 2px;
    }

    span {
      position: relative;
      bottom: 1.8px;
    }
  }
`

function LetterPosDiv(props) {
  const [letterInputState, setLetterInputState] = React.useState(props.char)
  const [posInputState, setPosInputState] = React.useState(props.pos)
  const [notPosInputState, setNotPosInputState] = React.useState(props.notPos)

  return (
    <div>
      <div className="inputWrapper">
        <input
          className="char"
          type="text"
          maxLength={1}
          spellCheck="false"
          autoCapitalize='off'
          required
          value={letterInputState}
          onChange={e => setLetterInputState(e.target.value)}
        />
        <span className="placeholder">Letter</span>
      </div>

      <div className="inputWrapper">
        <input
          className="pos"
          type="number"
          spellCheck="false"
          autoCapitalize='off'
          required
          value={posInputState}
          onChange={e => setPosInputState(e.target.value)}
        />
        <span className="placeholder">At</span>
      </div>

      <div className="inputWrapper">
        <input
          className="notPos"
          type="number"
          spellCheck="false"
          autoCapitalize='off'
          required
          value={notPosInputState}
          onChange={e => setNotPosInputState(e.target.value)}
        />
        <span className="placeholder">Not at</span>
      </div>
    </div>
  )
}

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: stretch;
  align-items: center;
  row-gap: 10px;

  & > * {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 350px;
    max-width: 100%;
    column-gap: 10px;
  }

  .inputWrapper {
    position: relative;
    height: 60px;
  }

  input {
    outline: none;
    border: 1px solid #c4c4c4;
    border-radius: 6px;
    appearance: none;
    box-shadow: inset #00000033 0px 0px 3px 0px;
    padding: 20px 10px 10px 10px;
    width: 100%; 
    height: 100%;
    font-size: 20px;
    letter-spacing: 5px;

    &:focus ~ .placeholder,
    &:not(:focus):valid ~ .placeholder {
      top: 2px;
      left: 10px;
      font-size: 13px;
      color: grey;
    }
  }

  .placeholder {
    position: absolute;
    pointer-events: none;
    top: 25px;
    left: 10px;
    transition: 0.3s ease all;
    color: grey;
  }

  button {
    display: inline-block;
    outline: 0;
    cursor: pointer;
    text-align: center;
    border: 1px solid #babfc3;
    padding: 11px 24px;
    min-height: 44px;
    min-width: 44px;
    width: 100px;
    color: #202223;
    background: #ffffff;
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 0px 0px;
    &:hover {
      background: #f6f6f7;
      outline: 1px solid transparent;
    }
  }

  #possibleWordsTag {
    position: relative;
    top: 10px;
    justify-content: center;
    align-items: center;

  }

  #possibleWordsContainer {
    display: block;
    border: 1px solid #d5d5d5;
    border-radius: 4px;
    width: 100%;
    height: 99px;
    padding: 5px;
    word-wrap: break-word;
    overflow: auto;
  }

  .foundWord {
    margin: 0px 0.3em;
    padding: 0.1em 0.6em;
    border-radius: 3px;
    border: 1px solid rgb(204, 204, 204);
    color: rgb(51, 51, 51);
    line-height: 1.4;
    font-family: Arial,Helvetica,sans-serif;
    display: inline-block;
    box-shadow: 0px 1px 0px rgba(0,0,0,0.2), inset 0px 0px 0px 2px #ffffff;
    background-color: rgb(247, 247, 247);
    text-shadow: 0 1px 0 #fff;
    font-size: 12px;
  }

  input[type="number"] {
    letter-spacing: normal;
  }

  svg {
    height: 24px;
    cursor: pointer;

    &:hover {
      transform: scale(1.5);
      transition: transform .3s;
    }
  }

`

const postObj = {
  title: 'wordle',
  date: '2022.05.08',
  tags: ['va', 'JavaScript'],
  imgUrl: 'https://antonarbus.com/imgs/wordle.png',
  desc: 'Helper for Wordle game in JavaScript',
  body: (
    <>
      <p>
        List of possible words for Wordle {' '}
        <Lnk path="https://www.powerlanguage.co.uk/wordle/">EN</Lnk> & <Lnk path="https://wordle.belousov.one/">RU</Lnk> games.
      </p>

      <Component />

      <H>Files structure</H>

      <p>We have huge files with words arrays and we do not want to include them into our project via <code>import</code>,
        because it makes the bundle bigger and will take <i>webpack</i> ages to produce a production build.</p>

      <p>We put our files into <code>public</code> folder instead of <code>src</code> and access data via <Code>{"fetch('url')"}</Code> function.</p>

      <LazyImg src='/imgs/wordleGame/wordsInPublicFolderWordleGame.png' height='331px' width='287px' />

      <H>Logic</H>

      <Code block jsx>{`
      function listOfPossibleWords(args) {
        const { charObjArr, vocabArr, charsNum, noCharsArr, charArr } = {
          // just some default values to show the structure
          charObjArr: [
            { char: 'a', pos: null, notPos: 1 },
            { char: 'b', pos: 2, notPos: null },
          ],
          charArr: ['a', 'b'],
          noCharsArr: ['c', 'd', 'e'],
          vocabArr: ['hi', 'bye'],
          charsNum: 5,
          ...args,
        }
        let arr = []
        arr = arrOfStrOfCertainLength(vocabArr, charsNum)
        arr = arrOfStrWithChars(arr, charArr)
        arr = arrOfStrWithoutChars(arr, noCharsArr)
        arr = arrOfStrWithCharsAtPos(arr, charObjArr)
        arr = arrOfStrWithoutCharsAtPos(arr, charObjArr)
        return arr
      
        // helper functions
      
        function arrOfStrOfCertainLength(arr, length) {
          return arr.filter(str => str && str.length === length)
        }
      
        function arrOfStrWithChars(arr, charsArr) {
          return arr.filter(str => {
            const areAllCharsInside = charsArr.every(char => str.includes(char))
            return areAllCharsInside
          })
        }
      
        function arrOfStrWithoutChars(arr, charsArr) {
          return arr.filter(str => {
            const isCharsInside = charsArr.some(char => str.includes(char))
            return !isCharsInside
          })
        }
      
        function isCharAtPosition(str, char, pos) {
          return str.split('')[pos] === char
        }
      
        function arrOfStrWithCharsAtPos(arr, charObjArr) {
          return arr.filter(str => charObjArr.every(o => {
            if (isNaN(o.pos)) return true
            return isCharAtPosition(str, o.char, o.pos)
          }))
        }
      
        function arrOfStrWithoutCharsAtPos(arr, charObjArr) {
          return arr.filter(str => charObjArr.every(o => {
            if (isNaN(o.notPos)) return true
            return !isCharAtPosition(str, o.char, o.notPos)
          }))
        }
      }
      `}</Code>

      <H>UI</H>

      <Code block jsx>{`
      import styled from 'styled-components'
        import React from 'react'
        import { RiAddLine as Plus } from 'react-icons/ri'
        import { MdRemove as Minus } from 'react-icons/md'
        
        function Component() {
          const [excludeLettersInputState, setExcludeLettersInputState] = React.useState(['cde'])
          const [charsNumInputState, setCharsNumInputState] = React.useState(5)
          const [lettersNumState, setLettersNumState] = React.useState(0)
          const [possibleWordsState, setPossibleWordsState] = React.useState([])
          const [loadingState, setLoadingState] = React.useState(false)
          const ref = React.useRef()
          // React.useEffect(() => { search() }, [])
        
          async function formArgsFromDom() {
            const container = ref.current
            const charObjArr = []
        
            container.querySelectorAll('.char').forEach(el => { charObjArr.push({ char: el.value }) })
            container.querySelectorAll('.pos').forEach((el, i) => { charObjArr[i].pos = parseInt(el.value) - 1 })
            container.querySelectorAll('.notPos').forEach((el, i) => { charObjArr[i].notPos = parseInt(el.value) - 1 })
            const charArr = Array.from(container.querySelectorAll('.char')).map(el => el.value)
            const charsNum = parseInt(container.querySelector('.charsNum').value)
            const noCharsArr = container.querySelector('.noCharsArr').value.split('')
        
            let ruWords = []
            const getRuWordsPromise = fetch('/filesToFetch/ruWords.json')
              .then(res => res.json())
              .then(data => { ruWords = data })
        
            let enWords = []
            const getEnWordsPromise = fetch('/filesToFetch/enWords.json')
              .then(res => res.json())
              .then(data => { enWords = data })
        
            // just to have 1.5s loading... alert
            const delayPromise = new Promise(resolve => {
              setTimeout(() => {
                resolve('done')
              }, 1500)
            })
        
            setLoadingState(true)
            return Promise.all([getRuWordsPromise, getEnWordsPromise, delayPromise])
              .then((resultArr) => {
                const lang = container.querySelector('input:checked').value
                const vocabArr = (lang === 'en') ? enWords : ruWords
                return { charObjArr, charsNum, noCharsArr, charArr, vocabArr }
              })
              .finally(() => { setLoadingState(false) })
          }
        
          async function search() {
            const argsForNextFunction = await formArgsFromDom()
            const possibleWords = listOfPossibleWords(argsForNextFunction)
            setPossibleWordsState(possibleWords)
          }
        
          return (
            <div ref={ref}>
              <RadioButtons />
              <FlexContainer>
                <LetterPosDiv char='a' pos='' notPos='1'/>
                <LetterPosDiv char='b' pos='2' notPos='' />
                {Array(lettersNumState).fill('').map((val, i) => <LetterPosDiv key={i}/>)}
        
                <div style={{ justifyContent: 'center' }}>
                  <Plus onClick={() => setLettersNumState(lettersNumState + 1)} />
                  <Minus onClick={() => setLettersNumState((lettersNumState - 1 < 0) ? 0 : lettersNumState - 1)} />
                </div>
        
                <div className="inputWrapper">
                  <input className='noCharsArr' type="text" spellCheck="false" required value={excludeLettersInputState} onChange={e => setExcludeLettersInputState(e.target.value)}/>
                  <span className="placeholder">Letters to exclude</span>
                </div>
        
                <div className="inputWrapper">
                  <input className="charsNum" type="number" value={charsNumInputState} spellCheck="false" required onChange={e => setCharsNumInputState(e.target.value)}/>
                  <span className="placeholder">Number of letters</span>
                </div>
        
                <button onClick={search}>{loadingState ? 'Loading...' : 'Show'}</button>
        
                <div id="possibleWordsTag">{(possibleWordsState.length === 0) ? 'Possible words' : \`\${possibleWordsState.length} word\${possibleWordsState.length === 1 ? '' : 's'} found\`}</div>
                <div id="possibleWordsContainer">{possibleWordsState.map(word => (<span key={word} className='foundWord'> {word} </span>))}</div>
              </FlexContainer>
            </div>
          )
        }
        
        function RadioButtons() {
          const [langState, setLangState] = React.useState('en')
          return (
            <Div>
              <label>
                <input type="radio" name="lang" value='en' defaultChecked onChange={e => setLangState(e.target.value)} />
                <span>en</span>
              </label>
              <label>
                <input type="radio" name="lang" value='ru' onChange={e => setLangState(e.target.value)} />
                <span>ru</span>
              </label>
            </Div>
          )
        }
        
        const Div = styled.div\`
          label {
            display: inline-block;
            margin-right: 10px;
            cursor: pointer;
        
            input {
              margin: 2px;
            }
        
            span {
              position: relative;
              bottom: 1.8px;
            }
          }
        \`
        
        function LetterPosDiv(props) {
          const [letterInputState, setLetterInputState] = React.useState(props.char)
          const [posInputState, setPosInputState] = React.useState(props.pos)
          const [notPosInputState, setNotPosInputState] = React.useState(props.notPos)
        
          return (
            <div>
              <div className="inputWrapper">
                <input
                  className="char"
                  type="text"
                  maxLength={1}
                  spellCheck="false"
                  autoCapitalize='off'
                  required
                  value={letterInputState}
                  onChange={e => setLetterInputState(e.target.value)}
                />
                <span className="placeholder">Letter</span>
              </div>
        
              <div className="inputWrapper">
                <input
                  className="pos"
                  type="number"
                  spellCheck="false"
                  autoCapitalize='off'
                  required
                  value={posInputState}
                  onChange={e => setPosInputState(e.target.value)}
                />
                <span className="placeholder">At</span>
              </div>
        
              <div className="inputWrapper">
                <input
                  className="notPos"
                  type="number"
                  spellCheck="false"
                  autoCapitalize='off'
                  required
                  value={notPosInputState}
                  onChange={e => setNotPosInputState(e.target.value)}
                />
                <span className="placeholder">Not at</span>
              </div>
            </div>
          )
        }
        
        const FlexContainer = styled.div\`
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content: stretch;
          align-items: center;
          row-gap: 10px;
        
          & > * {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            width: 350px;
            max-width: 100%;
            column-gap: 10px;
          }
        
          .inputWrapper {
            position: relative;
            height: 60px;
          }
        
          input {
            outline: none;
            border: 1px solid #c4c4c4;
            border-radius: 6px;
            appearance: none;
            box-shadow: inset #00000033 0px 0px 3px 0px;
            padding: 20px 10px 10px 10px;
            width: 100%; 
            height: 100%;
            font-size: 20px;
            letter-spacing: 5px;
        
            &:focus ~ .placeholder,
            &:not(:focus):valid ~ .placeholder {
              top: 2px;
              left: 10px;
              font-size: 13px;
              color: grey;
            }
          }
        
          .placeholder {
            position: absolute;
            pointer-events: none;
            top: 25px;
            left: 10px;
            transition: 0.3s ease all;
            color: grey;
          }
        
          button {
            display: inline-block;
            outline: 0;
            cursor: pointer;
            text-align: center;
            border: 1px solid #babfc3;
            padding: 11px 24px;
            min-height: 44px;
            min-width: 44px;
            width: 100px;
            color: #202223;
            background: #ffffff;
            border-radius: 4px;
            font-weight: 500;
            font-size: 14px;
            box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 0px 0px;
            &:hover {
              background: #f6f6f7;
              outline: 1px solid transparent;
            }
          }
        
          #possibleWordsTag {
            position: relative;
            top: 10px;
            justify-content: center;
            align-items: center;
        
          }
        
          #possibleWordsContainer {
            display: block;
            border: 1px solid #d5d5d5;
            border-radius: 4px;
            width: 100%;
            height: 99px;
            padding: 5px;
            word-wrap: break-word;
            overflow: auto;
          }
        
          .foundWord {
            margin: 0px 0.3em;
            padding: 0.1em 0.6em;
            border-radius: 3px;
            border: 1px solid rgb(204, 204, 204);
            color: rgb(51, 51, 51);
            line-height: 1.4;
            font-family: Arial,Helvetica,sans-serif;
            display: inline-block;
            box-shadow: 0px 1px 0px rgba(0,0,0,0.2), inset 0px 0px 0px 2px #ffffff;
            background-color: rgb(247, 247, 247);
            text-shadow: 0 1px 0 #fff;
            font-size: 12px;
          }
        
          input[type="number"] {
            letter-spacing: normal;
          }
        
          svg {
            height: 24px;
            cursor: pointer;
        
            &:hover {
              transform: scale(1.5);
              transition: transform .3s;
            }
          }
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
