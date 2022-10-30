import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'sns',
  date: '2022.11.01',
  tags: ['aws'],
  imgUrl: 'https://antonarbus.com/imgs/aws.png',
  desc: 'sns',
  body: (
    <>
      <H>What is it?</H>

      <ul>
        <li><b>S</b>imple <b>N</b>otification <b>S</b>ervice</li>
        <li>Message publishing and processing service (PubSub)</li>
        <li>Old service from AWS</li>
        <li>Messages are published to a <i>topic</i> and this topic delivers identical message to a different subscribers of that topic</li>
        <li>Allows fanout to millions of consumers (Email, HTTP Endpoint, SQS, Texting)</li>
        <li>Messages are JSON objects</li>
        <li>Contrary to SQS, in SNS we publish messages to a topic and can have multiple subscribers to that topic, not just one</li>
        <li>Message is deleted after it is delivered to all subscribers</li>
        <li>SNS usually do not interact with subscribers directly, because a subscriber may have a problem and message will be undelivered and have to stay in SNS</li>
        <li>Instead SNS sends messages to a dedicated SQS queue owned by subscribers (common approach)</li>
        <li>Fully managed and durable with automatic scaling</li>
        <li>As a subscribers we can have an application (AWS Lambda, NodeJs app, SQS queue) or a person (for ex. phone)</li>
      </ul>

      <H>Configuration</H>

      <ul>
        <li>Go to <Lnk path='https://aws.amazon.com/sns/'>AWS SNS</Lnk> and login</li>
        <li></li>
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
  imgUrl: postObj.imgUrl || null,
  bodyStr: jsxToStr(postObj.body)
}
