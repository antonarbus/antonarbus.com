// pages\api\action_to_get_text_from_fetch_request.js
import nextConnect from 'next-connect'
import multer from 'multer'

export const config = {
  api: { bodyParser: false }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'upload'),
  filename: (req, file, cb) => cb(null, file.originalname)
})

const apiRoute = nextConnect()

apiRoute.use(multer({ storage }).any())

apiRoute.post((req, res) => {
  // console.log(req.body)
  // console.log(req.files)
  res.status(200).json({ 'req.body': req.body, 'req.files': req.files })
})

export default apiRoute
