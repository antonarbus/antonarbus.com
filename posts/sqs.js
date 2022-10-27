import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'sqs',
  date: '2022.10.28',
  tags: ['aws'],
  imgUrl: 'https://antonarbus.com/imgs/aws.png',
  desc: 'amazon SQS',
  body: (
    <>
      <p>Notes from this <Lnk path='https://www.youtube.com/watch?v=CyYZ3adwboc'>video</Lnk>.</p>

      <H>What is it?</H>

      <ul>
        <li><Lnk path='https://aws.amazon.com/sqs/'>SQS</Lnk> - <b>S</b>imple <b>Q</b>ueue <b>S</b>ervice, one of the first AWS services from 2006</li>
        <li>It is async message based communication, opposed to API calls</li>
        <li>Scalable, available, managed and cheap</li>
      </ul>

      <H>Core concepts</H>

      <ul>
        <li>Queue of json messages</li>
        <li>Message is 256kb kb at max</li>
        <li>Publisher/producer puts a message in queue (enque)</li>
        <li>Processor/consumer get a message from queue (deque)</li>
        <li>Queue has a name</li>
        <li>Consumer periodically polls the queue</li>
        <li>So it is 2 way communication, opposed to an api calls</li>
        <li>As soon as consumer get a message it is not visible in the queue</li>
        <li>In case the message is processed it is completely deleted from the queue</li>
        <li>Many threads/processes can poll a queue at once (it is done behind the scene and makes it scalable)</li>
        <li>Only a single thread/process can process a msg at ones</li>
        <li>Long polling is preferable, instead of multiple short ones</li>
        <li>Cross account publishing / processing is possible</li>
        <li><b>D</b>ead <b>L</b>etter <b>Q</b>ueues (DLQ) help to store failed msgs for later processing (may cut msg to DLQ after some retries)</li>
      </ul>

      <H>Flow</H>

      <ul>
        <li>Message is published into the queue</li>
        <li>Consumer sets a lock on it and <i>visibility timeout</i> countdown starts</li>
        <li>No one see this message anymore during this timeout</li>
        <li>If message successfully processed, it is deleted from the queue</li>
        <li>Consumer may fail to process the message (for ex. he needs to call a db and do smth)</li>
        <li>Ones the timeout is expired, the message is put back into the queue to be retried later</li>
      </ul>

      <H>SQS vs API</H>

      <ul>
        <li>Consumer can choose the rate of processing (5 msg/sec for ex)</li>
        <li>Make two services separate from each other</li>
        <li>Guaranteed eventual processing (good for non-realtime apps)</li>
        <li>Services decouple (if consumer failed during bad deployment, publisher still sends msgs, which are not lost and can be processed later)</li>
        <li>SQS itself never goes down, it is very reliable service</li>
      </ul>

      <H>Standard vs FIFO queues</H>

      <Hs>Standard queue</Hs>

      <ul>
        <li>Order of msgs processing is not guarantied (best effort ordering)</li>
        <li>At least ones msg delivery - small chance that the same msg can be processed several times</li>
        <li>Unlimited publish and consume rate</li>
      </ul>

      <Hs>FIFO</Hs>

      <ul>
        <li><b>F</b>irs <b>I</b>n <b>F</b>irst <b>O</b>ut ordering - order of msgs processing is guarantied</li>
        <li>Exactly once processing</li>
        <li>300 transactions per second max or 3000 with batching</li>
        <li>approx. 25% more expensive</li>
        <li>Can group messages and process them separately</li>
      </ul>

      <H>Common patterns</H>

      <ul>
        <li>Fanout - utilize <Lnk path='https://aws.amazon.com/sns/'>AWS SNS</Lnk> notification service. Publisher does not put msg directly into the queue, but into SNS. SNS then distribute the msg to different linked queues. So you can send one msg to different consumers.</li>
        <li>Serverless processing with backpressure control. Use SQS queue with <Lnk path='https://aws.amazon.com/lambda/'>AWS Lambda</Lnk> processor (very useful).</li>
        <li>Job buffering. For ex. make kind of cron job with <Lnk path='https://aws.amazon.com/cloudwatch/'>AWS Cloudwatch</Lnk>, which publish msgs into a queue. Processor can be <Lnk path='https://aws.amazon.com/ec2/'>AWS EC2</Lnk> for big tasks or <Lnk path='https://aws.amazon.com/lambda/'>AWS Lambda</Lnk> for smaller ones.</li>
      </ul>

      <H>Configuration</H>

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
