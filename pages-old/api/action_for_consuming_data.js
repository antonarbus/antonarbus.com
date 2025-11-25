// pages\api\action_for_consuming_data.js
import multer from 'multer'

export const config = {
  api: {
    bodyParser: false
  }
}

const storage = multer.memoryStorage()
const upload = multer({ storage })

export default async function handler(req, res) {
  upload.array('my-file')(req, {}, err => {
    console.log(err)
    res.json({
      'req.body': req.body,
      'req.files': req.files,
      fileContent: req.files[0].buffer.toString()
    })
  })
}
