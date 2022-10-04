import { Lnk, Code, useState, jsxToStr, H } from '/components/post/reExport'
import { forwardRef } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

const Transition = forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const ConfirmationDialog = ({
  renderState,
  renderStateSetter,
  title,
  content,
  hideLeftButton,
  leftButtonContent,
  leftButtonHandler,
  rightButtonContent,
  rightButtonHandler
}) => (
  <Dialog
    open={renderState}
    TransitionComponent={Transition}
    keepMounted
    onClose={() => renderStateSetter(false)}
    sx={{ zIndex: 1200 }}
    data-testid='confirmation-dialog'
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      {!hideLeftButton && <Button onClick={leftButtonHandler}>{leftButtonContent}</Button>}
      <Button
        onClick={rightButtonHandler}
        sx={{ marginLeft: 'auto !important' }}
      >
        {rightButtonContent}
      </Button>
    </DialogActions>
  </Dialog>
)

const Component = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>
      <ConfirmationDialog
        renderState={isOpen}
        renderStateSetter={setIsOpen}
        title='Confirmation dialog'
        content='Are you sure?'
        leftButtonContent='No'
        leftButtonHandler={
          () => {
            alert('No button clicked')
            setIsOpen(false)
          }
        }
        rightButtonContent='Yes'
        rightButtonHandler={() => alert('Yes button clicked')}
      />
    </>
  )
}

const postObj = {
  title: 'confirmation modal',
  date: '2022.08.12',
  tags: ['mui', 'react'],
  imgUrl: 'https://antonarbus.com/imgs/mui.png',
  desc: 'Confirmation modal dialog with MUI',
  body: (
    <>
      <H>Confirmation modal dialog with Material UI</H>

      <p>Confirmation modal dialog with <Lnk path='https://mui.com/material-ui/react-dialog/'>Material UI</Lnk>.</p>
      <Component />

      <Code block jsx>{`
      import { Lnk, useState, jsxToStr } from '/components/post/reExport';
      import { forwardRef } from 'react'
      import Button from '@mui/material/Button'
      import Dialog from '@mui/material/Dialog'
      import DialogActions from '@mui/material/DialogActions'
      import DialogContent from '@mui/material/DialogContent'
      import DialogContentText from '@mui/material/DialogContentText'
      import DialogTitle from '@mui/material/DialogTitle'
      import Slide from '@mui/material/Slide'

      const Transition = forwardRef(function Transition (props, ref) {
        return <Slide direction='up' ref={ref} {...props} />
      })

      const ConfirmationDialog = ({
        renderState,
        renderStateSetter,
        title,
        content,
        hideLeftButton,
        leftButtonContent,
        leftButtonHandler,
        rightButtonContent,
        rightButtonHandler
      }) => (
        <Dialog
          open={renderState}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => renderStateSetter(false)}
          sx={{ zIndex: 1200 }}
          data-testid='confirmation-dialog'
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {!hideLeftButton && <Button onClick={leftButtonHandler}>{leftButtonContent}</Button>}
            <Button
              onClick={rightButtonHandler}
              sx={{ marginLeft: 'auto !important' }}
            >
              {rightButtonContent}
            </Button>
          </DialogActions>
        </Dialog>
      )

      const Component = () => {
        const [isOpen, setIsOpen] = useState(false)
        return (
          <>
            <button onClick={() => setIsOpen(true)}>Open dialog</button>
            <ConfirmationDialog
              renderState={isOpen}
              renderStateSetter={setIsOpen}
              title='Confirmation dialog'
              content='Are you sure?'
              leftButtonContent='No'
              leftButtonHandler={
                () => {
                  alert('No button clicked')
                  setIsOpen(false)
                }
              }
              rightButtonContent='Yes'
              rightButtonHandler={() => alert('Yes button clicked')}
            />
          </>
        )
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
