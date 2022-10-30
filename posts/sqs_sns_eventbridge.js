import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'SQS vs SNS vs EventBridge',
  date: '2022.10.30',
  tags: ['aws'],
  imgUrl: 'https://antonarbus.com/imgs/aws.png',
  desc: 'SQS vs SNS vs EventBridge',
  body: (
    <>
      <H>SQS</H>

      <ul>
        <li><b>S</b>imple <b>Q</b>ueue <b>S</b>ervice</li>
        <li>First queue aws service from 2006</li>
        <li>You create the queue and publish JSON messages into it</li>
        <li>Messages sit in the queue and can be processed at a later time</li>
        <li>Applications which want to retrieve messages have to poll the queue</li>
        <li>With SQS if you have 3 message subscribers only one first will be notified, others won't get the message</li>
        <li>This problem can be fixed by using 3 separate queues, but it leads to another problems and have scalability issues</li>
        <li>Usually SQS is used for one-to-one system, one system publish messages, one system process them</li>
      </ul>

      <H>SNS</H>

      <ul>
        <li><b>S</b>imple <b>N</b>otification <b>S</b>ervice</li>
        <li>Also an old service from AWS</li>
        <li>Messages are published to a <i>topic</i> and this topic delivers identical message to a different subscribers of that topic</li>
        <li>Messages are also JSON messages</li>
        <li>There are publishers and subscribers (aka PubSub) of messages</li>
        <li>Contrary to SQS, in SNS we publish messages to a topic and can have multiple subscribers to that topic</li>
        <li>Message is deleted after it is delivered to all subscribers</li>
        <li>SNS usually do not interact with subscribers directly, because a subscriber may have a problem and message will be undelivered and have to stay in SNS</li>
        <li>Instead SNS sends messages to a dedicated SQS queue owned by subscribers</li>
      </ul>

      <H>EventBridge</H>

      <ul>
        <li>The newest guy from AWS</li>
        <li>Similar to SNS with some improvements</li>
        <li>Messages are published into the <i>message bus</i> and have different recipients, kind of topic in SNS.</li>
        <li><i>Events</i>, like 'pending', 'shipped', 'delivered'. Can be constructed by application or AWS services itself or other 3rd services, like shopify.</li>
        <li><i>Rules</i> match incoming events and sends them to corresponding <i>targets</i> for processing</li>
        <li><i>Targets</i> are destination end-points, like subscribers.</li>
        <li>Message filtering is available</li>
        <li>Specific rule may have 5 targets, which is very low and may not fit your needs</li>
        <li>But it is very convenient due to AWS and 3rd applications integrations</li>
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
