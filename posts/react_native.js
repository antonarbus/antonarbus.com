import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'react native',
  date: '2022.10.28',
  tags: ['react', 'native'],
  imgUrl: 'https://antonarbus.com/imgs/react.png',
  desc: 'react native basics',
  body: (
    <>
      <H>Installation</H>

      <ul>
        <li>Follow official <Lnk path='https://reactnative.dev/docs/environment-setup'>instructions</Lnk></li>
        <li>Install <Lnk path='https://brew.sh/'>Homebrew</Lnk></li>
        <li><Code>brew install node</Code></li>
        <li><Code>brew install watchman</Code></li>
        <li><Code>{'\\curl -sSL https://get.rvm.io | bash -s stable'}</Code> install ruby version manager</li>
        <li>reboot terminal</li>
        <li><Code>rvm install 2.7.5</Code> install specific ruby version, same as <Lnk path='https://github.com/facebook/react-native/blob/main/template/_ruby-version'>here</Lnk></li>
        <li><Lnk path='https://apps.apple.com/us/app/xcode/id497799835?mt=12'>xcode</Lnk> to be installed</li>
        <li>Choose latest version in Xcode - File - Settings - Location - Command line tools</li>
        <li>Instal an iOS Simulator in Xcode</li>
        <li><Code>npm uninstall -g react-native-cli @react-native-community/cli</Code> uninstall perv versions</li>
        <li><Code>npx react-native init AwesomeProject</Code></li>
      </ul>
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
