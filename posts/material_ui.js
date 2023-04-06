import { React, jsxToStr, H, Code, Lnk } from '/components/post/reExport'
import Button from '@mui/material/Button'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

const postObj = {
  title: 'material ui',
  date: '2022.05.30',
  tags: ['react', 'mui'],
  imgUrl: 'https://antonarbus.com/imgs/mu.png',
  desc: 'material ui',
  body: (
    <>
      <H>Component prop</H>

      <ul>
        <li>We can use <Code html>{'<Box />'}</Code> element as a div element</li>
        <li>It does not have any styles</li>
        <li>We can apply styles via <code>sx</code> prop</li>
        <li>If we want to change the element tag we need to pass it in <code>component</code> prop</li>
        <li><Code html>{'<Box component="footer" />'}</Code> will be a footer element</li>
      </ul>

      <H>Custom css props</H>

      <ul>
        <li><Lnk path='https://mui.com/system/properties/'>https://mui.com/system/properties/</Lnk></li>
        <li>Can set some css properties as a component props or inside <code>sx</code> prop</li>
      </ul>

      <Code block jsx>{`
      <Button sx={{ mb: 3 }}>
      // or
      <Box mb={3}>
      // or
      <Box marginBottom={3}>
      `}</Code>

      <Code block css>{`
      .my-class {
        margin-bottom: Xpx;
      }
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
