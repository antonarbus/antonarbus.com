import { Code, H, Hs, LazyImg, Lnk, jsxToStr } from '/components/post/reExport'
import football from '/pics/football.jpg'
import Image from 'next/image'

const ImportImage = () => <img src={football.src} />
const ReferenceImageDirectly = () => <img src='/imgs/va/bulldogs.jpg' />
function LazyImagesInHtml() {
  return (
    <div className='container'>
      <h1>Images without lazy load</h1>
      {Array(50)
        .fill('')
        .map((el, i) => (
          <img
            src={`/imgs/va/img${i + 1}.jpg`}
            key={`lazyImg${i + 1}`}
            loading="lazy"
            alt="…"
            height="200"
          />
        ))}

      <style jsx>{`
        .container {
          height: 300px;
          overflow: scroll;
          border: 1px dotted grey;
        }
        img {
          display: block;
        }
      `}</style>
    </div>
  )
}
function LazyImagesInNext() {
  return (
    <div className='container'>
      {Array(50)
        .fill('')
        .map((el, i) => (
          <Image
            src={`/imgs/va/img${i + 101}.jpg`}
            key={`lazyImg${i + 101}`}
            alt="some desc"
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
          />
        ))}
        <style jsx>{`
          .container {
            height: 300px;
            overflow: scroll;
            border: 1px dotted grey;
            position: 'relative';
          }
        `}</style>
    </div>
  )
}
function LazyImagesInReact() {
  return (
    <div className='container'>
      {Array(50)
        .fill('')
        .map((el, i) => (
          <LazyImg
            src={`/imgs/va/img${i + 51}.jpg`}
            key={`lazyImg${i + 51}`}
          />
        ))}
        <style jsx>{`
          .container {
            height: 300px;
            overflow: scroll;
            border: 1px dotted grey;
          }
          img {
            display: block;
          }
        `}</style>
    </div>
  )
}

const postObj = {
  title: 'image',
  date: '2022.01.25',
  tags: ['react', 'html'],
  desc: 'images in html and react & lazy images',
  body: (
    <>
      <H>Image via import in React</H>

      <ul>
        <li>In React an image can be imported as a module</li>
        <li>Webpack will place an image under <code>build</code> root folder into <code>/build/static/media/</code> and add some hash to a file name</li>
        <li>Imported variable will be resolved to a path in html <code>src</code> attribute in react</li>
        <li><ImportImage /></li>
      </ul>

      <Code block>{`
      import football from '/pics/football.jpg'
      const ImportImage = () => <img src={football.src} />
      `}</Code>

      <H>Image via import in Next</H>

      <p>Imported image variable <code>variable.src</code> will be resolved to path in <code>src</code> attribute in Next</p>

      <H>Image from public folder</H>

      <ul>
        <li>We can manually place an image under <code>public</code> folder, for ex. <code>/public/imgs/va/bulldogs.jpg</code></li>
        <li>And then reference it via image <code>src</code> property value, like <code>{'<img src="/imgs/va/bulldogs.jpg" />'}</code></li>
        <li>When a production version is built the content of <code>public</code> folder goes into <code>build</code> folder and references will not break</li>
        <li><ReferenceImageDirectly /></li>
      </ul>

      <Code block>{`
      const ReferenceImageDirectly = () => <img src='/imgs/va/bulldogs.jpg' />
      `}</Code>

      <H>Lazy image</H>

      <p>Ones page is hit all images are loaded, which is not efficient. We load images dynamically on scroll.</p>

      <Hs>Lazy images in html</Hs>

      <ul>
        <li>Add <Code>loading="lazy"</Code> attribute to <code>img</code> tag</li>
        <li><Code html>{'<img src="/path" loading="lazy" alt="…"  height="200"/>'}</Code></li>
        <li>In dev tools we can see that images are loaded on scroll when we approach them one by one</li>
        <li>We can not control this browser behavior</li>
      </ul>

      <Code block>{`
      function LazyImagesInHtml() {
        return (
          <div className='container'>
            <h1>Images without lazy load</h1>
            {Array(170)
              .fill('')
              .map((el, i) => (
                <img
                  src={\`/imgs/va/img\${i + 1}.jpg\`}
                  key={\`lazyImg\${i + 1}\`}
                  loading="lazy"
                  alt="…"  
                  height="200"
                />
              ))}
        
            <style jsx>{\`
              .container {
                height: 300px;
                overflow: scroll;
                border: 1px dotted grey;
              }
              img {
                display: block;
              }
            \`}</style>
          </div>
        )
      }
      `}</Code>

      <LazyImagesInHtml />

      <Hs>Lazy images in Next </Hs>

      <Code block>{`
      import Image from 'next/image'
      function LazyImagesInNext() {
        return (
          <div className='container'>
            {Array(50)
              .fill('')
              .map((el, i) => (
                <Image
                  src={\`/imgs/va/img\${i + 101}.jpg\`}
                  key={\`lazyImg\${i + 101}\`}
                  alt="some desc"
                  width="100%" 
                  height="100%" 
                  layout="responsive" 
                  objectFit="contain"
                />
              ))}
              <style jsx>{\`
                .container {
                  height: 300px;
                  overflow: scroll;
                  border: 1px dotted grey;
                  position: 'relative';
                }
              \`}</style>
          </div>
        )
      }
      `}</Code>

      <LazyImagesInNext />

      <Hs>Lazy images in React </Hs>

      <ul>
        <li>We can use <Lnk path="https://www.npmjs.com/package/react-lazyload">react-lazyload</Lnk> package</li>
        <li>With this package we have a control on offset scroll distance to an image when it starts being downloaded</li>
        <li>Note. Did not manage to make it work in a scrollable container.</li>
      </ul>

      <Code block>{`
      // components/post/LazyImg.js
      import LazyLoad from 'react-lazyload'

      export function LazyImg(props) {
        return (
          <LazyLoad
            placeholder={<div>Loading...</div>}
            offset={100}
            once
            scrollContainer={props.scrollContainer}
          >
            <img
              src={props.src || props.path || props.link}
              height={props.height || 'auto'}
              width={props.width || 'auto'}
            />

            <style jsx>{\`
              img {
                box-shadow: \${props.noShadow ? '' : '#898989a3 0px 0px 7px 0px'};
                margin: 0 auto;
                border-radius: 4px;
                margin-top: 10px;
                margin-bottom: 10px;
                display: block;
                max-width: \${props.maxWidth || "100%"};
              }
              @media screen and (max-width: 480px) {
                img {
                  max-width: 100%;
                }
              }
            \`}</style>
          </LazyLoad>
        )
      }
      `}</Code>

      <Code block>{`
      // components/post/LazyImg.js
      import LazyLoad from 'react-lazyload'
      function LazyImagesInReact() {
        return (
          <>
            {Array(170)
              .fill('')
              .map((el, i) => (
                <LazyImg
                  src={\`/imgs/va/img\${i + 1}.jpg\`}
                  key={\`lazyImg\${i + 1}\`}
                />
              ))}
          </>
        )
      }
      `}</Code>

      <LazyImagesInReact />
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
