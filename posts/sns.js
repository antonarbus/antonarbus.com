'use client'


import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'sns',
  date: '2022.11.01',
  tags: ['aws'],
  imgUrl: 'https://antonarbus.com/imgs/aws.png',
  desc: 'sns',
  body: (
    <>
      <p>Notes from <Lnk path='https://www.youtube.com/watch?v=fhimXdoAF2Q'>video series</Lnk>.</p>

      <H>What is it?</H>

      <ul>
        <li><b>S</b>imple <b>N</b>otification <b>S</b>ervice</li>
        <li>Message publishing and processing service (Pub/Sub)</li>
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

      <H>Create topic</H>

      <ul>
        <li>Go to <Lnk path='https://aws.amazon.com/sns/'>AWS SNS</Lnk> and login</li>
        <li>Click on <Lnk path='https://us-east-1.console.aws.amazon.com/sns/v3/home?region=us-east-1#/create-topic'>create topic</Lnk></li>
        <li>Give a name to a topic, for ex. 'TopicDemo'</li>
        <li>Define who can publish and subscribe to the topic by setting the <i>access policy</i>. You can allow only yourself or specific aws accounts or everyone to publish messages into the topic.</li>
        <li>Btw, your account number is shown under your user name in the right top corner when you click on it</li>
        <li>With <i>delivery retry policy</i> we can set the number of retries if message delivery fails</li>
        <li><i>Delivery status logging</i> allows to see logs in CloudWatch if message has been delivered. This may affect on price. Added <i>AWS Lambda</i> & <i>Amazon SQS</i> protocols. Also created default IAM roles. <span css={{ color: 'grey' }}>arn:aws:iam::360117275238:role/SNSSuccessFeedback + arn:aws:iam::360117275238:role/SNSFailureFeedback</span></li>
        <li>At <Lnk path='https://us-east-1.console.aws.amazon.com/sns/v3/home?region=us-east-1#/topics'>Topics</Lnk> menu we now can see our Topic with <span css={{ color: 'grey' }}>arn:aws:sns:us-east-1:360117275238:TopicDemo</span></li>
      </ul>

      <H>Set subscription</H>

      <ul>
        <li>You can <Lnk path='https://us-east-1.console.aws.amazon.com/sns/v3/home?region=us-east-1#/create-subscription'>Create subscription</Lnk> from the menu</li>
        <li>But easier to go to your Topic and create subscription from inside</li>
        <li>Topic ARN is already pre-populated</li>
        <li>Choose endpoint you want to subscribe, for ex. AWS Lambda</li>
        <li>By default all topic subscribers get the message, until <i>subscription filter policy</i> is enabled. Message will be accepted only if it contains attributes that match specified in the filter policy. Need to assign attributes also at message publishing. Great way to reduce expenses.</li>
        <li>At <b>d</b>ead-<b>l</b>etter <b>q</b>ueue we can configure a queue where undelivered messages are dropped. If we do not enable DLQ, SNS will retry to deliver a message for 48h and then message is gone.</li>
      </ul>

      <H>Send a topic</H>

      <ul>
        <li>Can send a topic right from the console with <i>Publish message</i> button or programmatically knowing its ARN and using AWS SNS SDK</li>
        <li>Do it from <Lnk path='https://us-east-1.console.aws.amazon.com/sns/v3/home?region=us-east-1#/publish/topic/arn:aws:sns:us-east-1:360117275238:TopicDemo'>console</Lnk></li>
        <li>Put the JSON message</li>
        <li>Can also ass message attributes for filtering purposes</li>
      </ul>

      <H>Connect SNS to Lambda</H>

      <ul>
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
