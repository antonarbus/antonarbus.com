import { Code, H, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'dmitry vinokurov',
  date: '2023.15.12',
  tags: ['terminal'],
  desc: 'Dmitry Vinokurov',
  private: false,
  body: (
    <>
      <H>Download files</H>

      <ul>
        <li><Code bash>scp -r sherb@35.217.12.143:/var/www/html/dmitryvinokurov.com ./</Code> download remote folder to local</li>
        <li>
        Download remote files to local current folder
          <Code block bash>{`
            scp -r sherb@35.217.12.143:/var/www/html/dmitryvinokurov.com/about.html ./ &&
            scp -r sherb@35.217.12.143:/var/www/html/dmitryvinokurov.com/audio.html ./ &&
            scp -r sherb@35.217.12.143:/var/www/html/dmitryvinokurov.com/contact.html ./ &&
            scp -r sherb@35.217.12.143:/var/www/html/dmitryvinokurov.com/cv.html ./ &&
            scp -r sherb@35.217.12.143:/var/www/html/dmitryvinokurov.com/index.html ./ &&
            scp -r sherb@35.217.12.143:/var/www/html/dmitryvinokurov.com/photographs.html ./ &&
            scp -r sherb@35.217.12.143:/var/www/html/dmitryvinokurov.com/videos.html ./ &&
            scp -r sherb@35.217.12.143:/var/www/html/dmitryvinokurov.com/style.css ./
          `}</Code>
        </li>
      </ul>

      <H>Upload files</H>

      <ul>
        <li>
          Upload files to remote DV's folder
          <Code block bash>{`
            scp -r about.html audio.html contact.html cv.html index.html photographs.html videos.html style.css sherb@35.217.12.143:/var/www/html/dmitryvinokurov.com/
          `}</Code>
        </li>
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
  private: postObj.private,
  imgUrl: postObj.imgUrl || null,
  bodyStr: jsxToStr(postObj.body)
}
