import { Code, H, React, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'exclude folder from spotlight search',
  date: '2025.07.13',
  tags: ['mac'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'exclude folder from spotlight search',
  body: (
    <>
      <H>Exclude node_modules from spotlight</H>

      <ul>
        <li>
          Drop an empty file called <code>.metadata_never_index</code> inside each{' '}
          <code>node_modules</code> directory
        </li>
        <li>Spotlight skips any folder that contains that file</li>
      </ul>

      <Code block bash>{`
        # Run once
        find ~/Git -type d -name node_modules -prune -exec touch "{}"/.metadata_never_index \\;

        # Then rebuild Spotlight's index so the change is picked up
        sudo mdutil -E /
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
