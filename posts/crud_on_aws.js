'use client'


import { Code, H, Hs, LazyImg, Lnk, useEffect, useState, useRef, jsxToStr } from '/components/post/reExport'
import axios from 'axios'
import shortid from 'shortid'
import { FaInfoCircle as Info, FaTrashAlt as Bin } from 'react-icons/fa'
import { Spinner } from '/functions/Spinner'

// #region toDoApp
function ToDoApp() {
  const [toDosState, setToDosState] = useState([])
  const [loadingState, setLoadingState] = useState(true)
  const [updatingState, setUpdatingState] = useState(false)

  async function getAllToDos() {
    const res = await axios.get('https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/items')
    const toDos = res.data.items
    setToDosState(toDos)
    setLoadingState(false)
  }

  useEffect(() => {
    getAllToDos()
  }, [])

  return (
    <div className='toDoContainer'>
      {loadingState && <div className='center'><Spinner width='30px'/></div> }
      {toDosState.length === 0 && !loadingState && <div className='center'>Empty</div> }
      {toDosState.map((toDo, index) => (
        <div className='toDoLine' key={toDo.id}>
          <div className='left'>
            <Counter num={index + 1}/>
            <ToDoTxt toDoTxt={toDo.toDoName} toDoId={toDo.id} updatingState={updatingState} setUpdatingState={setUpdatingState}/>
          </div>
          <div className='right'>
            <InfoBtn toDoId={toDo.id} />
            <DelBtn toDoId={toDo.id} toDosState={toDosState} setToDosState={setToDosState}/>
          </div>
        </div>
      ))}
      {!loadingState && <ToDoInput toDosState={toDosState} setToDosState={setToDosState} getAllToDos={getAllToDos}/>}
      {updatingState && <span className='center'><Spinner height='30px' /></span> }

      <style jsx>{`
        .toDoContainer {
          position: relative;
          border: 1px dotted lightblue;
          border-radius: 8px;
          margin: 10px;
          padding: 20px;
          min-height: 100px;
        }
        .center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .toDoLine {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: nowrap;
          border-bottom: 1px dotted lightgray;
        }
        .left {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          flex-shrink: 1;

        }
        .right {
          display: flex;
          flex-wrap: nowrap;
          row-gap: 5px; 
          column-gap: 5px; 
          justify-content: flex-end;
        }
      `}</style>
    </div>
  )
}

function Counter({ num }) {
  return (
    <span className='counter'>
      {num}

      <style jsx>{`
        .counter {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          background: grey;
          border-radius: 50%;
          width: 15px;
          height: 15px;
          margin-right: 10px;
          color: whitesmoke;
          font-size: 10px;
        }
      `}</style>
    </span>
  )
}

function ToDoTxt({ toDoTxt, toDoId, setUpdatingState }) {
  const [showDetailsState, setShowDetailsState] = useState(false)
  const [detailsState, setDetailsState] = useState(null)
  const text = useRef(null)

  function saveInitText(e) {
    text.current = e.target.innerText
  }

  function didTextChange(e) {
    const textBefore = text.current
    const textNow = e.target.innerText
    if (textBefore !== textNow) updateItem(e)
  }

  async function updateItem(e) {
    setUpdatingState(true)
    const requestBody = {
      id: toDoId,
      updateKey: 'toDoName',
      updateValue: e.target.innerText
    }

    const res = await axios({
      method: 'patch',
      url: 'https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/item',
      data: requestBody
    })
    const isSuccess = res.data.Message === 'SUCCESS'
    if (!isSuccess) alert('smth wrong')

    setUpdatingState(false)
  }

  return (
    <span
      className='toDoTxt'
      contentEditable
      onFocus={saveInitText}
      onBlur={didTextChange}
    >
      {toDoTxt}
      {showDetailsState && detailsState && <span className='details'>{detailsState}</span>}

      <style jsx>{`
        .toDoTxt {
          color: grey;
          outline: 0px solid transparent;
        }
      `}</style>
    </span>
  )
}

function InfoBtn({ toDoId }) {
  const [loadingState, setLoadingState] = useState(false)

  async function showInfo() {
    setLoadingState(true)
    const queryParams = {
      id: toDoId
    }

    const res = await axios({
      method: 'get',
      url: 'https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/item',
      params: queryParams
    })
    const isSuccess = res.status === 200
    if (!isSuccess) alert('smth wrong')
    if (isSuccess) alert(JSON.stringify(res.data))
    setLoadingState(false)
  }

  return (
    <button onClick={showInfo}>
      {loadingState ? <Spinner height='16px' /> : <Info />}

      <style jsx>{`
        button {
          all: unset;
          cursor: pointer;
          color: grey;
          display: flex;
          align-items: center;
        }
        button:hover {
          color: black;
        }
      `}</style>
    </button>
  )
}

function DelBtn({ toDoId, toDosState, setToDosState }) {
  const [deletingState, setDeletingState] = useState(false)

  async function remove() {
    setDeletingState(true)

    const requestBody = {
      id: toDoId
    }

    const res = await axios({
      method: 'delete',
      url: 'https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/item',
      data: requestBody
    })

    const isSuccess = res.data.Message === 'SUCCESS'

    if (isSuccess) {
      const updatedToDos = toDosState.filter(item => item.id !== toDoId)
      setToDosState(updatedToDos)
    }
    if (!isSuccess) alert('smth wrong')
    setDeletingState(false)
  }

  return (
    <button onClick={remove}>
      {deletingState ? <Spinner height='16px' /> : <Bin />}

      <style jsx>{`
        button {
          all: unset;
          cursor: pointer;
          color: grey;
          display: flex;
          align-items: center;
        }
        button:hover {
          color: black;
        }
      `}</style>
    </button>
  )
}

function ToDoInput({ getAllToDos }) {
  const [addingState, setAddingState] = useState(false)
  const inputRef = useRef()

  async function addToList(e) {
    e.preventDefault()
    setAddingState(true)
    const requestBody = {
      id: shortid(),
      toDoName: inputRef.current.value,
      toDoStatus: 'new'
    }

    const res = await axios({
      method: 'post',
      url: 'https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/item',
      data: requestBody
    })

    const isSuccess = res.data.Message === 'SUCCESS'
    if (isSuccess) getAllToDos()
    if (!isSuccess) alert('smth wrong')
    setAddingState(false)
    inputRef.current.value = ''
    inputRef.current.focus()
  }

  return (
    <form onSubmit={addToList}>
      <input type="text" ref={inputRef} placeholder='to do...'/>
      <button>{addingState ? 'Adding...' : 'Add'}</button>

      <style jsx>{`
        form {
          margin: 10px;
          text-align: center;
        }
        form > * {
          margin: 5px;
        }
        input {
          padding: 0px 3px;
          max-width: 100%;
        }
        button {
          cursor: pointer;
          padding: 0px 5px;
          min-width: 70px;
          max-width: 100%;
        }
      `}</style>
    </form>
  )
}
// #endregion

const postObj = {
  title: 'crud on aws',
  date: '2022.04.14',
  tags: ['aws'],
  desc: 'aws lambda function',
  body: (
    <>
      <p>Based on <Lnk path='https://www.youtube.com/watch?v=Ut5CkSz6NR0'>tutorial</Lnk>.</p>

      <H>ToDo app</H>

      <p>We will do the api points with AWS services for simple to-do app.</p>

      <ToDoApp />

      <Code block jsx>{`
      import axios from 'axios'
      import shortid from 'shortid'
      import { FaInfoCircle as Info } from 'react-icons/fa'
      import { FaTrashAlt as Bin } from 'react-icons/fa'
      import { Spinner } from '/functions/Spinner'

      function ToDoApp() {
        const [toDosState, setToDosState] = useState([])
        const [loadingState, setLoadingState] = useState(true)
        const [updatingState, setUpdatingState] = useState(false)

        async function getAllToDos() {
          const res = await axios.get('https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/items')
          const toDos = res.data.items
          setToDosState(toDos)
          setLoadingState(false)
        }
        
        useEffect(() => {
          getAllToDos()
        }, [])

        return (
          <div className='toDoContainer'>
            {loadingState && <div className='center'><Spinner width='30px'/></div> }
            {toDosState.length === 0 && !loadingState && <div className='center'>Empty</div> }
            {toDosState.map((toDo, index) => (
              <div className='toDoLine' key={toDo.id}>
                <div className='left'>
                  <Counter num={index + 1}/>
                  <ToDoTxt toDoTxt={toDo.toDoName} toDoId={toDo.id} updatingState={updatingState} setUpdatingState={setUpdatingState}/>
                </div>
                <div className='right'>
                  <InfoBtn toDoId={toDo.id} />
                  <DelBtn toDoId={toDo.id} toDosState={toDosState} setToDosState={setToDosState}/>
                </div>
              </div>
            ))}
            {!loadingState && <ToDoInput toDosState={toDosState} setToDosState={setToDosState} getAllToDos={getAllToDos}/>}
            {updatingState && <span className='center'><Spinner height='30px' /></span> }
            
            <style jsx>{\`
              .toDoContainer {
                position: relative;
                border: 1px dotted lightblue;
                border-radius: 8px;
                margin: 10px;
                padding: 20px;
                min-height: 100px;
              }
              .center {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
              .toDoLine {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: nowrap;
                border-bottom: 1px dotted lightgray;
              }
              .left {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                flex-shrink: 1;

              }
              .right {
                display: flex;
                flex-wrap: nowrap;
                row-gap: 5px; 
                column-gap: 5px; 
                justify-content: flex-end;
              }
            \`}</style>
          </div>
        )
      }

      function Counter({num}) {
        return (
          <span className='counter'>
            {num}

            <style jsx>{\`
              .counter {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                flex-shrink: 0;
                background: grey;
                border-radius: 50%;
                width: 15px;
                height: 15px;
                margin-right: 10px;
                color: whitesmoke;
                font-size: 10px;
              }
            \`}</style>
          </span>
        )
      }

      function ToDoTxt({toDoTxt, toDoId, setUpdatingState}) {
        const [showDetailsState, setShowDetailsState] = useState(false)
        const [detailsState, setDetailsState] = useState(null)
        const text = useRef(null)

        function saveInitText(e) {
          text.current = e.target.innerText
        }

        function didTextChange(e) {
          const textBefore = text.current
          const textNow = e.target.innerText
          if(textBefore !== textNow) updateItem(e)
        }

        async function updateItem(e) {
          setUpdatingState(true)
          const requestBody = {
            id: toDoId,
            updateKey: 'toDoName',
            updateValue: e.target.innerText,
          }

          const res = await axios({
            method: 'patch',
            url: 'https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/item',
            data: requestBody
          })
          const isSuccess = res.data.Message === "SUCCESS"
          if (!isSuccess) alert('smth wrong')

          setUpdatingState(false)
        }

        return (
          <span 
            className='toDoTxt' 
            contentEditable
            onFocus={saveInitText}
            onBlur={didTextChange}
          >
            {toDoTxt}
            {showDetailsState && detailsState && <span className='details'>{detailsState}</span>}

            <style jsx>{\`
              .toDoTxt {
                color: grey;
                outline: 0px solid transparent;
              }
            \`}</style>
          </span>
        )
      }

      function InfoBtn({ toDoId }) {
        const [loadingState, setLoadingState] = useState(false)

        async function showInfo() {
          setLoadingState(true)
          const queryParams = {
            id: toDoId,
          }

          const res = await axios({
            method: 'get',
            url: 'https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/item',
            params: queryParams
          })
          const isSuccess = res.status === 200
          if (!isSuccess) alert('smth wrong')
          if (isSuccess) alert(JSON.stringify(res.data))
          setLoadingState(false)
        }

        return (
          <button onClick={showInfo}>
            {loadingState ? <Spinner height='16px' /> : <Info />}

            <style jsx>{\`
              button {
                all: unset;
                cursor: pointer;
                color: grey;
                display: flex;
                align-items: center;
              }
              button:hover {
                color: black;
              }
            \`}</style>
          </button>
        )
      }

      function DelBtn({ toDoId, toDosState, setToDosState }) {
        const [deletingState, setDeletingState] = useState(false)

        async function remove() {
          setDeletingState(true)

          const requestBody = {
            id: toDoId
          }

          const res = await axios({
            method: 'delete',
            url: 'https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/item',
            data: requestBody
          })

          const isSuccess = res.data.Message === "SUCCESS"
          
          if (isSuccess) {
            const updatedToDos = toDosState.filter(item => item.id !== toDoId)
            setToDosState(updatedToDos)
          } 
          if (!isSuccess) alert('smth wrong')
          setDeletingState(false)
        }

        return (
          <button onClick={remove}>
            {deletingState ? <Spinner height='16px' /> : <Bin />}

            <style jsx>{\`
              button {
                all: unset;
                cursor: pointer;
                color: grey;
                display: flex;
                align-items: center;
              }
              button:hover {
                color: black;
              }
            \`}</style>
          </button>
        )
      }

      function ToDoInput({ getAllToDos }) {
        const [addingState, setAddingState] = useState(false)
        const inputRef = useRef()

        async function addToList(e) {
          e.preventDefault()
          setAddingState(true)
          const requestBody = {
            id: shortid(),
            toDoName: inputRef.current.value,
            toDoStatus: 'new'
          }

          const res = await axios({
            method: 'post',
            url: 'https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/item',
            data: requestBody
          })

          const isSuccess = res.data.Message === "SUCCESS"
          if (isSuccess) getAllToDos()
          if (!isSuccess) alert('smth wrong')
          setAddingState(false)
          inputRef.current.value = ''
          inputRef.current.focus()
        }
        
        return (
          <form onSubmit={addToList}>
            <input type="text" ref={inputRef} placeholder='to do...'/> 
            <button>{addingState ? 'Adding...' : 'Add'}</button>

            <style jsx>{\`
              form {
                margin: 10px;
                text-align: center;
              }
              form > * {
                margin: 5px;
              }
              input {
                padding: 0px 3px;
                max-width: 100%;
              }
              button {
                cursor: pointer;
                padding: 0px 5px;
                min-width: 70px;
                max-width: 100%;
              }
            \`}</style>
          </form>
        )
      }
      // #endregion
      `}</Code>

      <H>About</H>

      <Hs>CRUD</Hs>

      <ul>
        <li><b>CRUD</b> - <b>C</b>reate, <b>R</b>ead, <b>U</b>pdate, <b>D</b>elete API functionality.</li>
      </ul>

      <Hs>Overview</Hs>

      <LazyImg noShadow path='/imgs/aws/aws crud api overview.png' />

      <Hs>Lambda function</Hs>

      <ul>
        <li>AWS <Lnk path='https://aws.amazon.com/lambda/'>Lambda</Lnk> is a containerized self-managed server which runs a function.</li>
        <li>Invoiced for compute time only, not for idle time</li>
        <li>Scaled & shrunk automatically</li>
      </ul>

      <Hs>Dynamo DB</Hs>

      <ul>
        <li>It is a no-sql <Lnk path='https://aws.amazon.com/dynamodb/'>database</Lnk> from AWS</li>
      </ul>

      <Hs>API Gateway</Hs>

      <ul>
        <li>It is a <Lnk path='https://aws.amazon.com/api-gateway/'>service</Lnk> from AWS that allows to create APIs points for RESTful and WebSocket APIs</li>
      </ul>

      <Hs>IAM</Hs>

      <ul>
        <li><b>IAM</b> - <b>I</b>dentity and <b>A</b>ccess <b>M</b>anagement <Lnk path='https://aws.amazon.com/iam/'>service</Lnk></li>
        <li>Allows to specify who can access which services on AWS and under which conditions</li>
      </ul>

      <H>DynamoDB</H>

      <ul>
        <li>Search for <i>DynamoDB</i> service</li>
        <li>Note down your region from at the top right corner - <Code>eu-north-1</Code></li>
        <li>Push <i>Create table</i> button</li>
        <li>Table name - <Code>toDoTable</Code>, partition key - <i>id</i></li>
      </ul>

      <H>Lambda function</H>

      <ul>
        <li>Search for <i>Lambda</i> service</li>
        <li>Hit <i>Create function</i> button</li>
        <li>Function name - <i>toDoApi</i>, runtime - <i>Node.js</i>, execution role - <i>New role from AWS policy templates</i>, role name - <i>toDoRoles</i></li>
      </ul>

      <H>IAM</H>

      <ul>
        <li>In our lambda function under <i>Configuration</i> - <i>Permissions</i> - <i>Execution role</i> click on <i>toDoRoles</i> name</li>
        <li>We re-directed into <i>IAM</i> to our role</li>
        <li>Click <i>Add permissions</i> - <i>Attach policies</i></li>
        <li>Add <i>CloudWatchFullAccess</i>, <i>AmazonDynamoDBFullAccess</i></li>
      </ul>

      <H>API Gateway</H>

      <ul>
        <li>Search for <i>API Gateway</i> service</li>
        <li>Create <i>New</i> <i>REST API</i> with name <i>toDoApiGateway</i></li>
        <li>In <i>Actions</i> create a <i>Resource</i> with name <i>health</i>, <i>items</i>, <i>item</i> with CORS enabled</li>
        <li>Select resource and <i>Create method</i> via <i>Actions</i> with adding our lambda function name and region</li>
        <LazyImg path='/imgs/aws/getMethod.png'/>
        <li>Add different resources with <i>GET</i>, <i>POST</i>, <i>DELETE</i>, <i>PATCH</i> methods connected to our <i>toDoApi</i> lambda function</li>
        <LazyImg path='/imgs/aws/all api methods.png'/>
        <li>Then <i>Deploy API</i> from <i>Actions</i> dropdown with stage name <i>prod</i></li>
        <li>In return we get API end point url to use our API <Code>https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod</Code></li>
      </ul>

      <H>Lambda event and response formats</H>

      <Lnk path='https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html'>https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html</Lnk>

      <Hs>Event</Hs>

      <p>Amazon API Gateway invokes your function with an event that contains a JSON representation of the HTTP request.</p>

      <Code block json>{`
      {
        "resource": "/",
        "path": "/",
        "httpMethod": "GET",
        "requestContext": {
            "resourcePath": "/",
            "httpMethod": "GET",
            "path": "/Prod/",
            ...
        },
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "Host": "70ixmpl4fl.execute-api.us-east-2.amazonaws.com",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
            "X-Amzn-Trace-Id": "Root=1-5e66d96f-7491f09xmpl79d18acf3d050",
            ...
        },
        "multiValueHeaders": {
            "accept": [
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
            ],
            "accept-encoding": [
                "gzip, deflate, br"
            ],
            ...
        },
        "queryStringParameters": null,
        "multiValueQueryStringParameters": null,
        "pathParameters": null,
        "stageVariables": null,
        "body": null,
        "isBase64Encoded": false
      }
      `}</Code>

      <Hs>Response</Hs>

      <Code block json>{`
      {
        "statusCode": 200,
        "headers": {
          "Content-Type": "application/json"
        },
        "isBase64Encoded": false,
        "multiValueHeaders": { 
          "X-Custom-Header": ["My value", "My other value"],
        },
        "body": "{\\n  \\"TotalCodeSize\\": 104330022,\\n  \\"FunctionCount\\": 26\\n}"
      }
      `}</Code>

      <H>Lambda function code</H>

      <Code block js>{`
      const AWS = require('aws-sdk')
      const region = 'eu-north-1'
      AWS.config.update({ region })
      const dynamodb = new AWS.DynamoDB.DocumentClient()
      const TableName = 'toDoTable'

      function buildResponse(statusCode, body) {
        return {
          statusCode,
          headers: { 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(body) // api gateway expects the json string
        }
      }

      async function getItems() {     
        const params = { TableName }
        const items = await scanDynamoRecords(params, []);
        const body = { items }
        return buildResponse(200, body);
      }

      async function scanDynamoRecords(scanParams, itemArray) {
        try {
          const dynamoData = await dynamodb.scan(scanParams).promise();
          itemArray = itemArray.concat(dynamoData.Items);
          if (dynamoData.LastEvaluatedKey) {
            scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
            return await scanDynamoRecords(scanParams, itemArray);
          }
          return itemArray;
        } catch(err) {
          return buildResponse(404, {function: 'scanDynamoRecords', err})
        }
      }

      async function getItem(id) {
        const params = { TableName, Key: {id} }

        try {
          const response =  await dynamodb.get(params).promise()
          return buildResponse(200, response.Item)
        }
        catch(err) {
          return buildResponse(404, {function: 'getItem', err})
        }
      }

      async function saveItem(requestBody) {
        const params = {
          TableName,
          Item: requestBody
        }

        return await dynamodb.put(params).promise().then(() => {
          const body = {
            Operation: 'SAVE',
            Message: 'SUCCESS',
            Item: requestBody
          }
          return buildResponse(200, body);
        }, (err) => {
          return buildResponse(404, {function: 'saveItem', err})
        })
      }

      async function modifyItem(id, updateKey, updateValue) {
        const params = {
          TableName,
          Key: {
            'id': id
          },
          UpdateExpression: \`set \${updateKey} = :value\`,
          ExpressionAttributeValues: {
            ':value': updateValue
          },
          ReturnValues: 'UPDATED_NEW'
        }

        return await dynamodb.update(params).promise().then((response) => {
          const body = {
            Operation: 'UPDATE',
            Message: 'SUCCESS',
            UpdatedAttributes: response
          }
          return buildResponse(200, body);
        }, (err) => {
          return buildResponse(404, {function: 'modifyItem', err})
        })
      }

      async function deleteItem(id) {
        const params = {
          TableName,
          Key: {
            'id': id
          },
          ReturnValues: 'ALL_OLD'
        }
        return await dynamodb.delete(params).promise().then((response) => {
          const body = {
            Operation: 'DELETE',
            Message: 'SUCCESS',
            Item: response
          }
          return buildResponse(200, body);
        }, (err) => {
          return buildResponse(404, {function: 'deleteItem', err})
        })
      }

      exports.handler = async function (event) {
        console.log('Request event: ', event)

        if (event.httpMethod === 'GET' && event.path === '/health') {
          const response = buildResponse(200, 'healthy')
          return response
        }

        if (event.httpMethod === 'GET' && event.path === '/items') { 
          const response = await getItems()
          return response
        }

        if (event.httpMethod === 'GET' && event.path === '/item') { 
          const response = await getItem(event.queryStringParameters.id)
          return response
        }

        if (event.httpMethod === 'POST' && event.path === '/item') { 
          const response = await saveItem(JSON.parse(event.body))
          return response
        }

        if (event.httpMethod === 'PATCH' && event.path === '/item') {
          const requestBody = JSON.parse(event.body)
          const response = await modifyItem(requestBody.id, requestBody.updateKey, requestBody.updateValue)
          return response
        }

        if (event.httpMethod === 'DELETE' && event.path === '/item') {
          const response = await deleteItem(JSON.parse(event.body).id)
          return response
        }

        // rest of all
        const response = buildResponse(404, '404 Not Found')
        return response
      }

      `}</Code>

      <H>Check with Postman</H>

      <Hs>health</Hs>

      <p><Code>GET</Code> request to <Lnk path='https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/health'>https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/health</Lnk></p>

      <LazyImg path='/imgs/aws/postman health get.png'/>

      <Hs>item post</Hs>

      <p><Code>POST</Code> request to <Code>https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/item</Code></p>

      <LazyImg path='/imgs/aws/postman item post.png'/>

      <Hs>item get</Hs>

      <p><Code>GET</Code> request to <Lnk path='https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/item?id=10003'>https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/item?id=10003</Lnk></p>

      <LazyImg path='/imgs/aws/postman item get.png'/>

      <Hs>item patch</Hs>

      <p><Code>PATCH</Code> request to <Code>https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/item</Code></p>

      <LazyImg path='/imgs/aws/postman item patch.png'/>

      <Hs>item delete</Hs>

      <p><Code>DELETE</Code> request to <Code>https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/item</Code></p>

      <LazyImg path='/imgs/aws/postman item delete.png'/>

      <Hs>items get</Hs>

      <p><Code>GET</Code> request to <Lnk path='https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/items'>https://zitdmv25la.execute-api.us-east-1.amazonaws.com/prod/items</Lnk></p>

      <LazyImg path='/imgs/aws/postman items get.png'/>
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
