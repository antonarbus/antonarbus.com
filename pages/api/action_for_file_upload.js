// pages/api/action_for_file_upload.js
import multer from 'multer'

export const config = {
  api: {
    bodyParser: false
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

export default async function handler(req, res) {
  upload.array('my-file')(req, {}, err => {
    console.log(err)
    req.files.forEach(function addMegaBytesProp(el) {
      el.sizeInMb = (el.size / 1024 / 1024)?.toFixed(6) + ' Mb'
    })
    res.json({ 'req.body': req.body, 'req.files': req.files })
  })
}
