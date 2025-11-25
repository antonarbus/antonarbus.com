'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'

const styles = {
  container: {
    position: 'relative',
    height: '300px'
  },
  box: {
    position: 'absolute',
    border: '1px solid grey',
    width: '100px',
    height: '100px'
  }
}

function OldWay() {
  return (
    <div css={styles.container}>
      <div css={styles.box}>div 1</div>
      <div
        css={{
          ...styles.box,
          transform: 'translate(170px, 100px) rotate(5deg) scale(2)',
          transformOrigin: 'center'
        }}
      >
        div 2
      </div>
    </div>
  )
}

function NewerWay() {
  return (
    <div css={styles.container}>
      <div css={styles.box}>div 1</div>
      <div
        css={{
          ...styles.box,
          translate: '170px 100px',
          rotate: '5deg',
          scale: '2',
          transformOrigin: 'center'
        }}
      >
        div 2
      </div>
    </div>
  )
}

const postObj = {
  title: 'transform is dead',
  date: '2022.10.11',
  tags: ['css'],
  imgUrl: 'https://antonarbus.com/imgs/css.png',
  desc: 'transform is dead, now can use scale translate rotate directly',
  body: (
    <>
      <p>
        <code>Transform</code> css property is dead. Now can use <code>scale</code>,{' '}
        <code>translate</code>, <code>rotate</code> directly.
      </p>

      <H>Transform</H>

      <p>The common way to use it will be...</p>

      <Code block jsx>{`
      const styles = {
      container: {
        position: 'relative',
        height: '300px'
      },
      box: {
        position: 'absolute',
        border: '1px solid grey',
        width: '100px',
        height: '100px'
      }
    }

    function OldWay() {
      return (
        <div css={styles.container}>
          <div css={styles.box}>div 1</div>
          <div
            css={{
              ...styles.box,
              transform: 'translate(170px, 100px) rotate(5deg) scale(2)',
              transformOrigin: 'center'
            }}
          >
            div 2
          </div>
        </div>
      )
    }
      `}</Code>

      <OldWay />

      <H>Scale, rotate, translate</H>

      <p>Newer way to do...</p>

      <Code block jsx>{`
      function NewerWay() {
        return (
          <div css={styles.container}>
            <div css={styles.box}>div 1</div>
            <div
              css={{
                ...styles.box,
                translate: '170px 100px',
                rotate: '5deg',
                scale: '2',
                transformOrigin: 'center'
              }}
            >
              div 2
            </div>
          </div>
        )
      }
      `}</Code>

      <NewerWay />
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
