import { Code, H, Hs, LazyImg, useState, useRef, jsxToStr } from '/components/post/reExport'

function Form() {
  return (
    <form action="/api/action_for_inputs_post" method="POST" autoComplete="off" name="myForm" >

    <fieldset>
      <legend>Radios</legend>
      <input type="radio" id="html" name="fav_language" defaultValue="HTML" defaultChecked />
      <label htmlFor="html">HTML</label><br />
      <input type="radio" id="css" name="fav_language" defaultValue="CSS" />
      <label htmlFor="css">CSS</label><br />
      <input type="radio" id="javascript" name="fav_language" defaultValue="JavaScript" />
      <label htmlFor="javascript">JavaScript</label>
    </fieldset>

    <fieldset>
      <legend>Checkboxes</legend>
      <input type="checkbox" id="vehicle1" name="vehicles" defaultValue="Bike" defaultChecked />
      <label htmlFor="vehicle1"> I have a bike</label><br />
      <input type="checkbox" id="vehicle2" name="vehicles" defaultValue="Car" defaultChecked />
      <label htmlFor="vehicle2"> I have a car</label><br />
      <input type="checkbox" id="vehicle3" name="vehicles" defaultValue="Boat" />
      <label htmlFor="vehicle3"> I have a boat</label>
    </fieldset>

    <button>Submit</button>

    <style jsx global>{`
      * { box-sizing: border-box; }
      fieldset { margin-bottom: 20px; padding: 10px; }
      legend { font-weight: 600; }
      label { margin: 5px; }
    `}</style>

  </form>
  )
}

function FileUpload() {
  return (
    <form action="/api/action_for_file_upload" method="POST" autoComplete="off" name="myForm" encType="multipart/form-data">

    <fieldset>
      <legend>Checkboxes</legend>
      <input type="checkbox" id="vehicle1" name="vehicles" defaultValue="Bike" defaultChecked />
      <label htmlFor="vehicle1"> I have a bike</label><br />
      <input type="checkbox" id="vehicle2" name="vehicles" defaultValue="Car" defaultChecked />
      <label htmlFor="vehicle2"> I have a car</label><br />
      <input type="checkbox" id="vehicle3" name="vehicles" defaultValue="Boat" />
      <label htmlFor="vehicle3"> I have a boat</label>
    </fieldset>

    <fieldset>
      <legend>File</legend>
      <label htmlFor="my-file">Select a file:</label>
      <input type="file" id="myfile1" name="my-file" multiple />
      <input type="file" id="myfile2" name="my-file" multiple />
      <input type="file" id="myfile3" name="my-file" multiple />
    </fieldset>

    <button>Submit</button>

    <style jsx global>{`
      * { box-sizing: border-box; }
      fieldset { margin-bottom: 20px; padding: 10px; }
      legend { font-weight: 600; }
      label { margin: 5px; }
    `}</style>

  </form>
  )
}

function FileUploadWithoutSaving() {
  return (
    <form action="/api/action_for_consuming_data" method="POST" autoComplete="off" name="myForm" encType="multipart/form-data">

    <fieldset>
      <legend>File</legend>
      <label htmlFor="my-file">Select a file:</label>
      <input type="file" id="myfile1" name="my-file"/>
    </fieldset>

    <button>Submit</button>

    <style jsx global>{`
      * { box-sizing: border-box; }
      fieldset { margin-bottom: 20px; padding: 10px; }
      legend { font-weight: 600; }
      label { margin: 5px; }
    `}</style>

  </form>
  )
}

function JsonFromFetch() {
  const [response, setResponse] = useState('not yet')

  async function sendJsonWithFetch () {
    const url = '/api/action_to_get_json_from_fetch_request'
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { name: 'John', email: 'john@example.com' } })
    }
    const response = await fetch(url, options)
    const result = await response.json()
    setResponse(JSON.stringify(result))
  }

  return (
    <div>
      <button onClick={sendJsonWithFetch}>Send JSON</button>
      <div>Response: {response}</div>
    </div>
  )
}

function TextFromFetch() {
  const [response, setResponse] = useState('not yet')

  async function sendTextWithFetch () {
    const url = '/api/action_to_get_text_from_fetch_request'
    const options = {
      method: 'POST',
      body: 'pure text'
    }
    const response = await fetch(url, options)
    const result = await response.text()
    setResponse(result)
  }

  return (
    <div>
      <button onClick={sendTextWithFetch}>Send Text</button>
      <div>Response: {response}</div>
    </div>
  )
}

function FormDataWithFileFromFetch() {
  const [response, setResponse] = useState('not yet')
  const input1 = useRef()
  const input2 = useRef()

  async function sendFormDataWithFetch (e) {
    e.preventDefault()
    const url = '/api/action_to_get_formData_from_fetch_request'
    const formData = new FormData()
    formData.append('name', 'John')
    formData.append('age', 35)
    formData.append('file1', input1.current.files[0])
    formData.append('file2', input2.current.files[0])
    const options = { method: 'POST', body: formData }
    const response = await fetch(url, options)
    const result = await response.json()
    setResponse(JSON.stringify(result))
  }

  return (
    <>
      <form action="#" method="POST" autoComplete="off" name="myForm" encType="multipart/form-data">
        <fieldset>
          <legend>File</legend>
          <label htmlFor="my-file">Select a file:</label>
          <input ref={input1} type="file" id="myfile1" name="my-file" multiple />
          <input ref={input2} type="file" id="myfile2" name="my-file" multiple />
        </fieldset>

        <button onClick={sendFormDataWithFetch}>Submit</button>

        <style jsx global>{`
          * { box-sizing: border-box; }
          fieldset { margin-bottom: 20px; padding: 10px; }
          legend { font-weight: 600; }
          label { margin: 5px; }
        `}</style>
      </form>

      <div>Response: {response}</div>
    </>
  )
}

const postObj = {
  title: 'post request',
  date: '2022.04.08',
  tags: ['html', 'next'],
  desc: 'How to send a post request on a front end  from a form and fetch and process in in NextJS & NodeJS',
  body: (
    <>
      <p>How to submit a POST request from a form and handle it in API route by NextJS and Express in NodeJS.</p>

      <H>Text inputs from form</H>

      <Hs>Front</Hs>

      <Code block html>{`
        <form action="/api/action_for_inputs_post" method="POST" autoComplete="off" name="myForm" >
          <fieldset>
            <legend>Radios</legend>
            <input type="radio" id="html" name="fav_language" defaultValue="HTML" defaultChecked />
            <label htmlFor="html">HTML</label><br />
            <input type="radio" id="css" name="fav_language" defaultValue="CSS" />
            <label htmlFor="css">CSS</label><br />
            <input type="radio" id="javascript" name="fav_language" defaultValue="JavaScript" />
            <label htmlFor="javascript">JavaScript</label>
          </fieldset>

          <fieldset>
            <legend>Checkboxes</legend>
            <input type="checkbox" id="vehicle1" name="vehicles" defaultValue="Bike" defaultChecked />
            <label htmlFor="vehicle1"> I have a bike</label><br />
            <input type="checkbox" id="vehicle2" name="vehicles" defaultValue="Car" defaultChecked />
            <label htmlFor="vehicle2"> I have a car</label><br />
            <input type="checkbox" id="vehicle3" name="vehicles" defaultValue="Boat" />
            <label htmlFor="vehicle3"> I have a boat</label>
          </fieldset>

          <button>Submit</button>

          <style jsx global>{\`
            * { box-sizing: border-box; }
            fieldset { margin-bottom: 20px; padding: 10px; }
            legend { font-weight: 600; }
            label { margin: 5px; }
          \`}</style>
        </form>
      `}</Code>

      <Hs>Route in Next</Hs>

      <Code block js>{`
      // pages\\api\\action_for_inputs_post.js
      export default function handler(req, res) {
        res.status(200).json(req.body)
      }
      `}</Code>

      <Hs>Route in Node</Hs>

      <Code block>{`
      app.use('/action', express.urlencoded( {extended: true} ))
      app.post('/action', (req, res) => res.status(200).json(req.body))
      `}</Code>

      <Hs>Output</Hs>

      <LazyImg path='/imgs/next/req_body_from_form_submission_in_next.png'/>

      <Form />

      <H>File upload & save from form</H>

      <Hs>Front</Hs>

      <Code block html>{`
      function FileUpload(props) {
        return (
          <form action="/api/action_for_file_upload" method="POST" autoComplete="off" name="myForm" encType="multipart/form-data">

          <fieldset>
            <legend>Checkboxes</legend>
            <input type="checkbox" id="vehicle1" name="vehicles" defaultValue="Bike" defaultChecked />
            <label htmlFor="vehicle1"> I have a bike</label><br />
            <input type="checkbox" id="vehicle2" name="vehicles" defaultValue="Car" defaultChecked />
            <label htmlFor="vehicle2"> I have a car</label><br />
            <input type="checkbox" id="vehicle3" name="vehicles" defaultValue="Boat" />
            <label htmlFor="vehicle3"> I have a boat</label>
          </fieldset>

          <fieldset>
            <legend>File</legend>
            <label htmlFor="my-file">Select a file:</label>
            <input type="file" id="myfile1" name="my-file" multiple />
            <input type="file" id="myfile2" name="my-file" multiple />
            <input type="file" id="myfile3" name="my-file" multiple />
          </fieldset>
          
          <button>Submit</button>

          <style jsx global>{\`
            * { box-sizing: border-box; }
            fieldset { margin-bottom: 20px; padding: 10px; }
            legend { font-weight: 600; }
            label { margin: 5px; }
          \`}</style>

        </form>
        )
      }
      `}</Code>

      <Hs>Route in Next</Hs>

      <Code block>{`
      // pages/api/action_for_file_upload.js
      import multer from "multer"

      export const config = {
        api: {
          bodyParser: false,
        },
      }

      let storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'upload')
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname)
        },
      })

      let upload = multer({ storage: storage })

      export default async function handler (req, res)  {
        upload.array("my-file")(req, {}, err => {
          req.files.forEach(function addMegaBytesProp(el) {
            return el.sizeInMb = (el.size / 1024 / 1024)?.toFixed(6) + " Mb"
          })
          res.json({ "req.body": req.body, "req.files": req.files })
        })
      }
      `}</Code>

      <Hs>Route in Node</Hs>

      <Code block>{`
      // security
      app.use(function(req, res, next) {
        res.header("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;")
        next()
      })

      // multer
      // npm i multer
      const multer  = require('multer') 
      const storage = multer.diskStorage({
        destination: function (req, file, cb) { 
          cb(null, 'uploads/') 
        },
        filename: function (req, file, cb) { 
          cb(null, file.originalname ) 
        }
      })
      const upload = multer({ storage: storage })

      app.use('/action', express.urlencoded({ extended: true })) 

      app.post('/action', 
        upload.array('my-file'), // for <input name="my-file">
        (req, res) => {
          req.files.forEach(function addMegaBytesProp(el) {
            return el.sizeInMb = (el.size / 1024 / 1024)?.toFixed(6) + " Mb"
          })
          res.json({'req.body': req.body, 'req.file': req?.file, 'req.files': req?.files}) 
        }
      )
      `}</Code>

      <Hs>Output</Hs>

      <LazyImg path='/imgs/next/req_files_from_form_submission_in_next.png' maxWidth="500px"/>

      <FileUpload />

      <H>File upload & read without saving</H>

      <Hs>Front</Hs>

      <Code block html>{`
      function FileUploadWithoutSaving() {
        return (
          <form action="/api/action_for_consuming_data" method="POST" autoComplete="off" name="myForm" encType="multipart/form-data">

          <fieldset>
            <legend>File</legend>
            <label htmlFor="my-file">Select a file:</label>
            <input type="file" id="myfile1" name="my-file"/>
          </fieldset>
          
          <button>Submit</button>

          <style jsx global>{\`
            * { box-sizing: border-box; }
            fieldset { margin-bottom: 20px; padding: 10px; }
            legend { font-weight: 600; }
            label { margin: 5px; }
          \`}</style>

        </form>\
        )
      }
      `}</Code>

      <Hs>Route in Next</Hs>

      <Code block>{`
      // 
      // pages\\api\\action_for_consuming_data.js
        import multer from "multer"

        export const config = {
          api: {
            bodyParser: false,
          },
        }

        const storage = multer.memoryStorage()
        let upload = multer({ storage })

        export default async function handler (req, res)  {
          upload.array("my-file")(req, {}, err => {
            res.json({ 
              'req.body': req.body, 
              'req.files': req.files, 
              'fileContent': req.files[0].buffer.toString() })
          })
        }
      `}</Code>

      <Hs>Route in Node</Hs>

      <Code block>{`
      // multer
        const multer  = require('multer') 
        const storage = multer.memoryStorage()
        const upload = multer({ storage })


        app.use('/action', express.urlencoded({ extended: true }))

        app.post('/action', 
          upload.array('my-file'), // for <input name="my-file">
          (req, res) => {
            res.json({ 
              'req.body': req.body, 
              'req.files': req.files, 
              'fileContent': req.files[0].buffer.toString() 
            })
          }
        )
      `}</Code>

      <Hs>Output</Hs>

      <LazyImg path='/imgs/next/req_buffer_action_for_consuming_data.png'/>

      <FileUploadWithoutSaving />

      <H>JSON from fetch</H>

      <Hs>Front</Hs>

      <Code block>{`
      function JsonFromFetch() {
        const [response, setResponse] = useState('not yet')

        async function sendJsonWithFetch () {
          const url = '/api/action_to_get_json_from_fetch_request'
          const options = { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ user: { name: "John", email: "john@example.com" } }) 
          }
          let response = await fetch(url, options)
          let result = await response.json()
          setResponse(JSON.stringify(result))
        }

        return (
          <div>
            <button onClick={sendJsonWithFetch}>Send JSON</button>
            <div>Response: {response}</div>
          </div>
        )
      }
      `}</Code>

      <Hs>Route in Next</Hs>

      <Code block>{`
      // pages\\api\\action_to_get_json_from_fetch_request.js
      export default async function handler (req, res)  {
        res.json(req.body)
      }
      `}</Code>

      <Hs>Route in Node</Hs>

      <Code block>{`
      app.use('/action', express.json())
      app.post('/action', (req, res) => res.json(req.body))
      `}</Code>

      <JsonFromFetch />

      <H>Text from fetch</H>

      <Hs>Front</Hs>

      <Code block>{`
      function TextFromFetch() {
        const [response, setResponse] = useState('not yet')

        async function sendTextWithFetch () {
          const url = '/api/action_to_get_text_from_fetch_request'
          const options = { 
            method: 'POST', 
            body: 'pure text'
          }
          let response = await fetch(url, options)
          let result = await response.text()
          setResponse(result)
        }

        return (
          <div>
            <button onClick={sendTextWithFetch}>Send Text</button>
            <div>Response: {response}</div>
          </div>
        )
      }
      `}</Code>

      <Hs>Route in Next</Hs>

      <Code block>{`
      // pages\\api\\action_to_get_text_from_fetch_request.js
      export default async function handler (req, res)  {
        res.send(req.body)
      }
      `}</Code>

      <Hs>Route in Node</Hs>

      <Code block>{`
      app.use('/action', express.text())
      app.post('/action', (req, res) => res.send(req.body))
      `}</Code>

      <TextFromFetch />

      <H>formData with data & file from fetch</H>

      <Hs>Front</Hs>

      <Code block>{`
      function FormDataWithFileFromFetch() {
        const [response, setResponse] = useState('not yet')
        const input1 = useRef()
        const input2 = useRef()
        

        async function sendFormDataWithFetch (e) {
          e.preventDefault()
          const url = '/api/action_to_get_formData_from_fetch_request'
          const formData = new FormData()
          formData.append('name', 'John')
          formData.append('age', 35)
          formData.append('file1', input1.current.files[0])
          formData.append('file2', input2.current.files[0])
          const options = { method: 'POST', body: formData }
          let response = await fetch(url, options)
          let result = await response.json()
          setResponse(JSON.stringify(result))
        }

        return (
          <>
            <form action="#" method="POST" autoComplete="off" name="myForm" encType="multipart/form-data">
              <fieldset>
                <legend>File</legend>
                <label htmlFor="my-file">Select a file:</label>
                <input ref={input1} type="file" id="myfile1" name="my-file" multiple />
                <input ref={input2} type="file" id="myfile2" name="my-file" multiple />
              </fieldset>

              <button onClick={sendFormDataWithFetch}>Submit</button>

              <style jsx global>{\`
                * { box-sizing: border-box; }
                fieldset { margin-bottom: 20px; padding: 10px; }
                legend { font-weight: 600; }
                label { margin: 5px; }
              \`}</style>
            </form>

            <div>Response: {response}</div>
          </>
        )
      }
      `}</Code>

      <Hs>Route in Next</Hs>

      <Code block>{`
      // pages\\api\\action_to_get_text_from_fetch_request.js
      import nextConnect from "next-connect"
      import multer from "multer"

      export const config = {
        api: { bodyParser: false }
      }

      let storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'upload'),
        filename: (req, file, cb) => cb(null, file.originalname),
      })

      const apiRoute = nextConnect()

      apiRoute.use(multer({ storage }).any())

      apiRoute.post((req, res) => {
        console.log(req.body) 
        console.log(req.files)
        res.status(200).json({'req.body': req.body, 'req.files': req.files})
      })

      export default apiRoute
      `}</Code>

      <Hs>Route in Node</Hs>

      <Code block>{`
      const multer = require('multer')
      const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads'),
        filename: (req, file, cb) => cb(null, file.originalname),
      })
      const upload = multer({ storage })

      app.post('/action', upload.array('file'), (req, res) => {
        res.send('body :' + JSON.stringify(req.body) + '\n\n\n' + 'files :' + JSON.stringify(req.files))
      })
      `}</Code>

      <FormDataWithFileFromFetch />

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
