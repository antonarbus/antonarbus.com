'use client'


import { H, LazyImg, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'rest vs soap',
  date: '2022.05.05',
  tags: ['programming'],
  imgUrl: 'https://antonarbus.com/imgs/soap_vs_rest.png',
  desc: 'rest vs soap web services',
  body: (
    <>
      <H>Web service</H>

      <p>Web service allows data exchange in different formats (XML, JSON, text) between Client and Server over the web HTTP protocol.</p>

      <p>Basic web services are REST and SOAP.</p>

      <H>REST</H>

      <p><b>RE</b>presentational <b>S</b>tate <b>T</b>ransfer is a way / style of implementing a web service of data exchange with following principles:</p>

      <ul>
        <li>access data by URL</li>
        <li>based HTTP communication methods GET/POST/PUT/DELETE for actions</li>
        <li>data can be represented as application/xml, application/json, text/html, etc...</li>
        <li>request should be stateless, not depending on previous requests, meaning that no information is stored on a server</li>
        <li>information can be cached on a clint side via Cache-Control & Last-Modified in HTTP Response Headers</li>
      </ul>

      <H>SOAP</H>

      <b>S</b>imple <b>O</b>bject <b>A</b>ccess <b>P</b>rotocol uses XML data messages format over HTTP (Post) communication protocol.

      <p>SOAP is a way of implementing a web service & complies to SOAP Web Services Specifications.</p>
      <ul>
        <li>Request to be sent in XML format</li>
        <li>XML format has a defined structure: SOAP MESSAGE</li>
        <li>SOAP MESSAGE consists from Envelope with Header + Body</li>
      </ul>

      <H>SOAP vs REST request </H>

      <LazyImg src='/imgs/soapVsRest/soapVsRest.png' />
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
