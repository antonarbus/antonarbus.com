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

      <H>Configuration with aws ui</H>

      <ul>
        <li>Login and go to <Lnk path='https://aws.amazon.com/sqs/'>SQS</Lnk></li>
        <li>In the top left corder click a <Lnk path='https://eu-west-1.console.aws.amazon.com/sqs/v2/home?region=eu-west-1#/create-queue'>create queue</Lnk> button</li>
        <li>Choose type and create a name for the queue. Can not be modified later.</li>
        <li>Set <b>visibility timeout</b> - ones a consumer takes the msg from the queue, other consumers do not see this msg during timeout (30s), msg becomes invisible for them. If it will not be processed during the timeout, it will become visible back.</li>
        <li>Set <b>message retention period</b> - time during which a msg stays in the queue (4d)</li>
        <li>Set <b>delivery delay</b> - msg can be put in a queue, but may not be visible for some duration (usually not used)</li>
        <li>Set <b>maximum message size</b> - self explanatory</li>
        <li>Set <b>receive message wait time</b> - configuration for long-polling. In case a msg is not available, connection will be opened and wait for 0...20s to give away a new msg. In case wait time is not set a consumer may ask repeatedly for a msg over and over again. Good for cost reduction. Set to 10s.</li>
        <li>Enable (or not) <b>d</b>ead-<b>l</b>etter <b>q</b>ueue - if msg was failed to be processed, it will be sent to the 2nd queue. 1st time a msg is failed to be processed, it is returned into the queue after visibility timeout elapsed. Then it may happen 2nd, 3rd... times. After several attempts a msg can be put into a DLQ. If our main queue is called "demo", then convention for DLQ is "demo-dlq". DLQ can be processed at a later times, we can set logs, alarms, emails for failures. </li>
        <li>You can specify the number of msg process fails after it goes to dlq at <b>maximum receives</b> box.</li>
        <li>Every queue has a unique id <b>ARN</b> and it can be referenced in Lambda consumer.</li>
        <li>Important queue tabs are available for the queue: SNS subscriptions, lambda triggers, dead-letter queue, monitoring, tagging etc...</li>
        <li>After queue is created they can be found <Lnk path='https://eu-west-1.console.aws.amazon.com/sqs/v2/home?region=eu-west-1#/queues'>here</Lnk></li>
        <li>Inside the queue we can test it with <i>Send and receive messages</i> <Lnk path='https://eu-west-1.console.aws.amazon.com/sqs/v2/home?region=eu-west-1#/queues/https%3A%2F%2Fsqs.eu-west-1.amazonaws.com%2F360117275238%2Fdemo/send-receive'>button</Lnk></li>
        <li>Provide a body in json format, push <i>Send message</i> button.</li>
        <li>Bellow we can retrieve a message by <i>Poll for messages</i></li>
      </ul>

      <H>Lambda as a queue consumer</H>

      <ul>
        <li>Go to <Lnk path='https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions'>AWS lambdas</Lnk> and click on <i>Create function</i></li>
        <li>Use a blueprint and search for the <i>sqs</i> <Lnk path='https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/create/function/configure/blueprint?blueprint=sqs-poller'>template</Lnk></li>

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
