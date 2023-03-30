import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'lambda',
  date: '2022.04.14',
  tags: ['aws'],
  desc: 'aws serverless lambda function',
  body: (
    <>
      <H>About</H>

      <ul>
        <li><Lnk path='https://aws.amazon.com/lambda/'>AWS Lambda</Lnk> is a containerized self-managed server which runs a function.</li>
        <li>Invoiced for compute time only, not for idle time</li>
        <li>Scaled & shrunk automatically</li>
        <li>Code which is run on AWS Lambda is called a <i>lambda function</i></li>
      </ul>

      <H>Create function</H>

      <ul>
        <li>Follow getting-started <Lnk path='https://aws.amazon.com/getting-started/hands-on/run-serverless-code/'> guide</Lnk> to create a hello world function</li>
        <li>Log in into <Lnk path='https://aws.amazon.com/'>AWS</Lnk> </li>
        <li>Go to <Lnk path="https://console.aws.amazon.com/lambda/home">lambda functions</Lnk></li>
        <li>Create own function from scratch or use blueprint template</li>
      </ul>

      <p>Function name is <code>hello-world-blueprint-func</code></p>

      <Code block js>{`
      console.log('Loading function');

      exports.handler = async (event, context) => {
          //console.log('Received event:', JSON.stringify(event, null, 2));
          console.log('value1 =', event.key1);
          console.log('value2 =', event.key2);
          console.log('value3 =', event.key3);
          return event.key1;  // Echo back the first key value
          // throw new Error('Something went wrong');
      };
      `}</Code>

      <H>Invoke</H>

      <p>Lambda invokes the function when an event occurs.</p>

      <p>Create a test in console with the name <code>test-hello-world</code></p>

      <Code block js>{`
      {
        "key1": "value1",
        "key2": "value2",
        "key3": "value3"
      }
      `}</Code>

      <Hs>Result</Hs>

      <Code>"value1"</Code>

      <p>Additional info is displayed.</p>

      <Code block none>{`
      Test Event Name
      test-hello-world

      Response
      "value1"

      Function Logs
      START RequestId: 878679b1-87aa-4013-87a9-bf2ecdfa1a1c Version: $LATEST
      2022-04-14T11:24:06.298Z  undefined INFO  Loading function
      2022-04-14T11:24:06.304Z  878679b1-87aa-4013-87a9-bf2ecdfa1a1c  INFO  value1 = value1
      2022-04-14T11:24:06.304Z  878679b1-87aa-4013-87a9-bf2ecdfa1a1c  INFO  value2 = value2
      2022-04-14T11:24:06.318Z  878679b1-87aa-4013-87a9-bf2ecdfa1a1c  INFO  value3 = value3
      END RequestId: 878679b1-87aa-4013-87a9-bf2ecdfa1a1c
      REPORT RequestId: 878679b1-87aa-4013-87a9-bf2ecdfa1a1c  Duration: 17.14 ms  Billed Duration: 18 ms  Memory Size: 128 MB Max Memory Used: 55 MB  Init Duration: 188.00 ms

      Request ID
      878679b1-87aa-4013-87a9-bf2ecdfa1a1c
      `}</Code>

      <p>Invoke test multiple times and you can see logs & statistics in chart view.</p>

      <H>Terminology</H>

      <ul>
        <li><b>Function</b> - a resource that you can run your code in Lambda. A function has code to process the <i>events</i> that is passed</li>
        <li><b>Trigger</b> - something that invoke the function, AWS services or <i>event source mapping</i></li>
        <li><b>Event</b> - JSON document, which is converted into an object and passed into your function</li>
        <li><b>Execution environment</b> - runtime environment for your Lambda function</li>
        <li><b>Runtime</b> - language-specific environment that runs in an execution environment</li>
        <li><b>Instruction set architecture</b> - arm64 or x86_64 processor</li>
        <li><b>Deployment package</b> - the way you deploy your code, via .zip or container</li>
        <li><b>Layer</b> - .zip file archive that can contain additional content, libraries, a custom runtime, data, or configuration files. Content is executed into the <code>/opt</code> folder.</li>
        <li><b>Concurrency</b> - number of requests that your function is serving at any given time</li>
        <li><b>Function URLs</b> - you can assign a dedicated HTTP endpoint to your Lambda function and it will be invoked through a web browser, curl, Postman, or any HTTP client.</li>
      </ul>

      <H>Hints</H>

      <ul>
        <li>Always return smth from the lambda function, otherwise it may be unstable acc. to Jari</li>
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
