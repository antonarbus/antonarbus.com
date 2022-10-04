import { React, jsxToStr } from '/components/post/reExport'
import Button from '@mui/material/Button'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

const msg = `Hello John,

Please find the enclosed invoice and pay it right now, otherwise my boys come to you for a serious conversation, do not play with me.

Anton Arbus
Developer
`

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose
        ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
          )
        : null}
    </DialogTitle>
  )
}

// BootstrapDialogTitle.propTypes = {
//   children: PropTypes.node,
//   onClose: PropTypes.func.isRequired
// }

function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open mail
      </Button>
      <Dialog
        onClose={handleClose}
        // aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle onClose={handleClose} sx={{ fontSize: '14px' }}>
          <div><span style={{ fontWeight: '600' }}>Date</span>: {'invoice.email.headers.Date'}</div>
          <div><span style={{ fontWeight: '600' }}>From</span>: {'invoice.email.headers.From'}</div>
          <div><span style={{ fontWeight: '600' }}>Subject</span>: {'invoice.email.headers.Subject'}</div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {msg}
          </Typography>
        </DialogContent>
        <DialogContent>
          links
        </DialogContent>
      </Dialog>
    </div>
  )
}

const postObj = {
  title: 'material ui',
  date: '2022.05.30',
  tags: ['react'],
  imgUrl: 'https://antonarbus.com/imgs/mu.png',
  desc: 'material ui',
  body: (
    <>
      <CustomizedDialogs />
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
