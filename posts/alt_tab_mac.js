import { Code, H, jsxToStr, Lnk } from '/components/post/reExport'

const postObj = {
  title: 'Alt+Tab in mac',
  date: '2025.07.12',
  tags: ['mac'],
  imgUrl: 'https://antonarbus.com/imgs/mac.jpg',
  desc: 'switch apps with alt+tab in mac',
  body: (
    <>
      <H>Alt+Tab to jump between apps</H>

      <ul>
        <li>
          Install <Lnk path="https://alt-tab-macos.netlify.app/">Alt+Tab</Lnk>, it is the as default
          mac app, but may show different windows of the same app
        </li>
      </ul>

      <H>If do not switch virtual desktop</H>

      <Code block bash>{`
        defaults write com.apple.dock workspaces-auto-swoosh -bool YES
        killall Dock
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
