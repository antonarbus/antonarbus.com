import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

function setCookie(cName, cVal, expDays) {
  const d = new Date()
  d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000))
  const expires = 'expires=' + d.toUTCString()
  document.cookie = cName + '=' + cVal + ';' + expires + ';path=/'
}

function removeCookie(cName) {
  setCookie(cName, 'cookie is removed', -1)
}

function cookieVal(cName) {
  const name = cName + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

function isCookie(cName) {
  const cVal = cookieVal(cName)
  if (cVal !== '') return true
  return false
}

function Component(props) {
  return (
    <>
      <button onClick={() => {
        setCookie('myCookie', 'myVal', 5)
      }}>setCookie('myCookie', 'myVal', 5)</button> <br />

      <button onClick={() => {
        alert(JSON.stringify(isCookie('myCookie')))
      }}>alert(JSON.stringify(isCookie('myCookie')))</button> <br />

      <button onClick={() => {
        alert(JSON.stringify(cookieVal('myCookie')))
      }}>alert(JSON.stringify(cookieVal('myCookie')))</button> <br />

      <button onClick={() => {
        removeCookie('myCookie')
      }}>removeCookie('myCookie')</button>
    </>
  )
}

const postObj = {
  title: 'cookies',
  date: '2022.04.23',
  tags: ['JavaScript'],
  desc: 'cookies',
  body: (
    <>
      <H>In browser</H>

      <Hs>Set</Hs>

      <Code block js>{`
      function setCookie(cName, cVal, expDays) {
        const d = new Date();
        d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cName + "=" + cVal + ";" + expires + ";path=/";
      }
      `}</Code>

      <Hs>Get cookie</Hs>

      <Code block js>{`
      function cookieVal(cName) {
        let name = cName + '=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return '';
      }
      `}</Code>

      <Hs>Does cookie exist</Hs>

      <Code block js>{`
      function isCookie(cName) {
        const cVal = cookieVal(cName)
        if (cVal != '') return true
        return false
      }
      `}</Code>

      <Hs>Delete cookie</Hs>

      <Code block js>{`
      function removeCookie(cName) {
        setCookie(cName, 'cookie is removed', -1);
      }
      `}</Code>

      <Component />
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
