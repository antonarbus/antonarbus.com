import { Code, H, LazyImg, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'mutation observer',
  date: '2022.10.04',
  tags: ['JavaScript', 'development'],
  imgUrl: 'https://antonarbus.com/imgs/mutationObserver.png',
  desc: 'Mutation observer for dev tools',
  body: (
    <>
      <H>Mutation observer for dev tools</H>

      <p>Can be useful if we can not investigate dynamically added or removed component in dev tools.</p>

      <p>Select desired element inside we want to check changes and paste following code into console.</p>

      <LazyImg path='/imgs/mutation_observer_example.png' />

      <Code block jsx>{`
        const observedNode = $0
        const callback = (mutationList, observer) => {
          for (const mutation of mutationList) {
            if (mutation.type === 'childList') {
              console.log('A child node has been added or removed.')
              return console.log(mutation)
            }
            if (mutation.type === 'attributes') {
              console.log(\`The \${mutation.attributeName} attribute was modified.\`)
              return console.log(mutation)
            }
          }
        }

        const observer = new MutationObserver(callback)
        const config = { attributes: true, childList: true, subtree: true }
        observer.observe(observedNode, config)
        // observer.disconnect()
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
