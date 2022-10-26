import { Code, H, LazyImg, jsxToStr, Lnk } from '/components/post/reExport'

const postObj = {
  title: 'mutation observer',
  date: '2022.10.04',
  tags: ['JavaScript', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/mutationObserver.png',
  desc: 'Mutation observer for dev tools',
  body: (
    <>
      <H>Syntax</H>

      <p><Lnk path='https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver'>MutationObserver</Lnk> - built-in object that observes a DOM and fires a callback when it changes</p>

      <Code block jsx>{`
      const observer = new MutationObserver(callback)

      observer.observe(node, [options]) // Configures the MutationObserver for receiving notifications through its callback when DOM changes matching the given options occur
      node // A DOM Node to watch for changes
      options = {
        childList: true, // changes in the direct children of node
        subtree: true, // in all descendants of node
        attributes: true, // attributes of node
        attributeFilter: [arr], // an array of attribute names, to observe only selected ones
        characterData: true, // whether to observe node.data (text content)
        attributeOldValue: true, // pass both the old and the new value of attribute to callback 
        characterDataOldValue: true, // pass both the old and the new value of node.data to callback
      }
      `}</Code>

      <ul>
        <li>after any changes, the callback is executed</li>
        <li>changes are passed in the first argument as a list of MutationRecord objects</li>
        <li>observer itself goes to the second argument</li>
      </ul>

      <Code block jsx>{`
      callback = function(changes, observer) {
        changes.type // mutation type: 
        // 1) "attributes" - attribute modified
        // 2) "characterData" - data modified, used for text nodes,
        // 3) "childList" - child elements added/removed
        changes.type // where the change occurred "attributes" / "characterData" / "childList"
        changes.addedNodes // nodes that were added
        changes.removedNodes // nodes that were removed
        changes.previousSibling // the previous sibling to added/removed nodes
        changes.nextSibling // the previous sibling to added/removed nodes
        changes.attributeName // the name of the changed attribute
        changes.attributeNamespace // the namespace (for XML) of the changed attribute
        changes.oldValue // the previous value, only for attribute or text changes, if the corresponding option is set 'attributeOldValue'/'characterDataOldValue'
      }
      `}</Code>

      <H>Additional methods</H>

      <Code block jsx>{`
      observer.takeRecords() // gets a list of unprocessed mutation records by a callback
      observer.disconnect() // stops the observation until observe() is called again
      // they usually go together
      `}</Code>

      <H>Example: observe all changes in body</H>

      <Code block jsx>{`
      let observer = new MutationObserver(mutationRecords => console.log(mutationRecords))
      observer.observe(document.body, {
        childList: true, // observe direct children
        subtree: true, // and lower descendants too
        characterDataOldValue: true // pass old data to callback
      })
      `}</Code>

      <H>Example: highlight code snippet</H>

      <p>Code highlight can be down with <Lnk path='https://prismjs.com/'>Prism</Lnk></p>

      <Code block jsx>{`
      let observer = new MutationObserver(mutations => {
        for(let mutation of mutations) {
          // examine new nodes, is there anything to highlight?
          for(let node of mutation.addedNodes) {
            // we track only elements, skip other nodes (e.g. text nodes)
            if (!(node instanceof HTMLElement)) continue
            // check the inserted element for being a code snippet
            if (node.matches('pre[class*="language-"]')) {
              Prism.highlightElement(node)
            }
            // or maybe there's a code snippet somewhere in its subtree?
            for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
              Prism.highlightElement(elem)
            }
          }
        }
      })
      
      let demoElem = document.getElementById('highlight-demo')
      observer.observe(demoElem, {childList: true, subtree: true})
      `}</Code>

      <H>Observe all changes in body</H>

      <H>Mutation observer for dev tools</H>

      <p>Can be useful if we can not investigate dynamically added or removed component in dev tools.</p>

      <p>Select in dev tools with mouse click desired element we want to check changes in and paste following code into console.</p>

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
