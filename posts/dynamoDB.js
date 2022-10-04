import { Code, H, Hs, LazyImg, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'dynamoDB',
  date: '2022.04.19',
  tags: ['aws'],
  desc: 'aws dynamoDB database',
  body: (
    <>
      <H>Materials</H>

      <Lnk path='https://docs.aws.amazon.com/dynamodb/index.html'>https://docs.aws.amazon.com/dynamodb/</Lnk>

      <H>Components</H>

      <ul>
        <li><i>Attribute</i> - data element</li>
        <li><i>Items</i> - collection of attributes</li>
        <li><i>Table</i> - collection of items</li>
        <LazyImg path='/imgs/aws/dynamoDB components.gif' width='400px' />
        <li>Each item can have its own distinct attributes</li>
        <li>Usually attributes have only one value</li>
        <li>Nested attribute (address) are allowed, up to 32 levels deep</li>
      </ul>

      <H>Primary key</H>

      <ul>
        <li>Primary key is mandatory identifier for an item in the table</li>
        <li><i>Primary key</i> can be a simple one attribute - <i>partition key</i></li>
        <li><i>Composed primary key</i> can be a <i>partition key</i> + <i>sort key</i>. Partition keys can be the same in such case.</li>
        <li>Primary key attribute can be only string, number or binary</li>
      </ul>

      <H>Secondary indexes</H>

      <ul>
        <li>Secondary indexes can be created to query table in addition to queries against the primary key</li>
        <li>Not necessary if values of primary keys are enough for querying</li>
        <li>There are <b>global</b> & <b>local</b> secondary indexes, but put Local ones apart, did not get why to use them</li>
        <li>20 global secondary indexes are allowed</li>
        <li>We do not necessarily need indexes, because we can use Scan + FilterExpression, but it is heavy, long and pricy. Better to add an index</li>
        <li>We can apply global secondary index after table creation</li>
        <li>Internally every secondary index creates a cloned table keeping it in sync to the original, which leads to double cost on every read & write</li>
      </ul>

      <H>Local DynamoDB setup</H>

      <ul>
        <li>Install Java <Lnk path='https://www.java.com/en/download/'>runtime</Lnk></li>
        <li>Download <Lnk path='https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#DynamoDBLocal.DownloadingAndRunning.title'>local</Lnk> DynamoDb</li>
        <li>Put into some folder and open it with terminal</li>
        <li>Run <Code bash>java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 8000</Code></li>
      </ul>

      <p>Output</p>
      <Code block none>{`
        Initializing DynamoDB Local with the following configuration:
        Port: 8000
        InMemory: false
        DbPath: null
        SharedDb: true
        shouldDelayTransientStatuses: false
        CorsParams: *
      `}</Code>

      <ul>
        <li>End-point for database is <Code>http://localhost:8000</Code></li>
        <li>Instal <Lnk path='https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html'>AWS CLI</Lnk></li>
        <li>Configure CLI with <Code bash>aws configure</Code> after installation</li>
        <li>Keys to be taken from <Lnk path='https://aws.amazon.com/'>AWS web site</Lnk> from <i>Account name</i> - <i>Security credentials</i> - <i>Access keys</i></li>
        <Code block none>{`
          AWS Access Key ID [None]: AKIAIOSFODNN7(example)
          AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY(example)
          Default region name [None]: eu-north-1
          Default output format [None]: json
        `}</Code>
        <li>Check available tables with <Code bash>aws dynamodb list-tables --endpoint-url http://localhost:8000</Code></li>
      </ul>

      <p>Output</p>

      <Code block json>{`
      {
        "TableNames": []
      }
      `}</Code>

      <H>JavaScript SDK</H>

      <p>Install <Lnk path='https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html'>DynamoDB Client - AWS SDK for JavaScript v3</Lnk> and <Lnk path='https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_lib_dynamodb.html'>@aws-sdk/lib-dynamodb</Lnk> from <Lnk path='https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html'>AWS SDK for JavaScript v3</Lnk>.</p>

      <H>Package.json</H>

      <Code block json>{`
      {
        "scripts": {
          "start": "nodemon app.js"
        },
        "dependencies": {
          "@aws-sdk/client-dynamodb": "^3.72.0",
          "@aws-sdk/lib-dynamodb": "^3.74.0",
          "aws-sdk": "^2.1117.0",
          "express": "^4.17.3"
        },
        "type": "module"
      }
      `}</Code>

      <H>DynamoDBClient</H>

      <Code block js>{`
      // ddbClient.js
      import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
      const region = 'eu-north-1'
      const endpoint = 'http://localhost:8000'
      export const ddbClient = new DynamoDBClient({ region, endpoint })
      `}</Code>

      <H>DynamoDBDocumentClient</H>

      <Code block js>{`
      // ddbDocumentClient.js
      import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"
      import { ddbClient } from "./ddbClient.js"

      const marshallOptions = {
        convertEmptyValues: false, //  Whether to automatically convert empty strings, blobs, and sets to \`null\`, false, by default.
        removeUndefinedValues: false, // Whether to remove undefined values while marshalling, false, by default.
        convertClassInstanceToMap: false, // Whether to convert typeof object to map attribute, false, by default.
      }

      const unMarshallOptions = {
        wrapNumbers: false, // Whether to return numbers as a string instead of converting them to native JavaScript numbers, false, by default.
      }

      const translateConfig = { marshallOptions, unMarshallOptions }

      // Create the DynamoDB document client
      export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig)
      `}</Code>

      <H>List tables</H>

      <Code block js>{`
      // listTables.js
      import { ListTablesCommand  } from '@aws-sdk/client-dynamodb'
      import { ddbClient } from './ddbClient.js'

      export const listTables = async () => {
        try {
          const data = await ddbClient.send(new ListTablesCommand ({}))
          console.log('Tables are listed: \n', data)
          return data
        } catch (err) {
          console.log('Error in table deletion', err)
        }
      }

      listTables()
      `}</Code>

      <H>Create table</H>

      <Code block js>{`
      // createTables.js
      import { CreateTableCommand } from '@aws-sdk/client-dynamodb'
      import { ddbClient } from './ddbClient.js'

      var tableParams1 = {
        TableName: 'Users',
        KeySchema: [{ AttributeName: 'email', KeyType: 'HASH' }],
        AttributeDefinitions: [{ AttributeName: 'email', AttributeType: 'S' }],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      }

      var tableParams2 = {
        TableName: 'Logins',
        KeySchema: [
          { AttributeName: 'email', KeyType: 'HASH' },
          { AttributeName: 'timestamp', KeyType: 'RANGE' },
        ],
        AttributeDefinitions: [
          { AttributeName: 'email', AttributeType: 'S' },
          { AttributeName: 'timestamp', AttributeType: 'N' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      }

      var tableParams3 = {
        TableName: 'Supervisors',
        KeySchema: [{ AttributeName: 'name', KeyType: 'HASH' }],
        AttributeDefinitions: [
          { AttributeName: 'name', AttributeType: 'S' },
          { AttributeName: 'company', AttributeType: 'S' },
          { AttributeName: 'factory', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
        GlobalSecondaryIndexes: [
          {
            IndexName: 'FactoryIndex',
            KeySchema: [
              {
                AttributeName: 'company',
                KeyType: 'HASH',
              },
              {
                AttributeName: 'factory',
                KeyType: 'RANGE',
              },
            ],
            Projection: {
              ProjectionType: 'ALL',
            },
            ProvisionedThroughput: {
              ReadCapacityUnits: 1,
              WriteCapacityUnits: 1,
            },
          },
        ],
      }

      var tableParams4 = {
        TableName: 'Companies',
        KeySchema: [
          { AttributeName: 'name', KeyType: 'HASH' },
          { AttributeName: 'subsidiary', KeyType: 'RANGE' },
        ],
        AttributeDefinitions: [
          { AttributeName: 'name', AttributeType: 'S' },
          { AttributeName: 'subsidiary', AttributeType: 'S' },
          { AttributeName: 'ceo', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
        LocalSecondaryIndexes: [
          {
            IndexName: 'CeoIndex',
            KeySchema: [
              {
                AttributeName: 'name',
                KeyType: 'HASH',
              },
              {
                AttributeName: 'ceo',
                KeyType: 'RANGE',
              },
            ],
            Projection: {
              ProjectionType: 'ALL',
            },
          },
        ],
      }

      export const createTable = async params => {
        try {
          const data = await ddbClient.send(new CreateTableCommand(params))
          console.log('Table created', data)
          return data
        } catch (err) {
          console.log('Error in table creation', err)
        }
      }

      createTable(tableParams1)
      createTable(tableParams2)
      createTable(tableParams3)
      createTable(tableParams4)
      `}</Code>

      <H>Create table with V2 SDK</H>

      <Code block js>{`
      var AWS = require('aws-sdk')

      AWS.config.update({
        region: 'eu-north-1',
        endpoint: 'http://localhost:8000',
      })

      var dynamodb = new AWS.DynamoDB()

      var params = {
        TableName: 'Cars',
        KeySchema: [
          { AttributeName: 'id', KeyType: 'HASH' }, //Partition key
        ],
        AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'N' }],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      }

      dynamodb.createTable(params, function (err, data) {
        if (err) {
          console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2))
        } else {
          console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2))
        }
      })
      `}</Code>

      <H>Delete table</H>

      <Code block js>{`
      // deleteTable.js
      import { DeleteTableCommand } from '@aws-sdk/client-dynamodb'
      import { ddbClient } from './ddbClient.js'

      export const deleteTable = async tblName => {
        try {
          const data = await ddbClient.send(new DeleteTableCommand({ TableName: tblName }))
          console.log('Table deleted', data)
          return data
        } catch (err) {
          console.log('Error in table deletion', err)
        }
      }

      deleteTable("Cars")
      `}</Code>

      <H>Query table</H>

      <Code block js>{`
      import { QueryCommand } from "@aws-sdk/lib-dynamodb"
      import { ddbDocClient } from "./ddbDocClient.js"

      export const queryTable = async () => {
        const params = {
          TableName: "Users",
          ProjectionExpression: "email, age, car, pets",
          ExpressionAttributeValues: {
            ":e": "olga.star@gmail.com",
          },
          KeyConditionExpression: "email = :e",    
        }

        try {
          const data = await ddbDocClient.send(new QueryCommand(params))
          console.log("Success querying: ", data)
          console.log(JSON.stringify(data.Items))
        } catch (err) {
          console.log("Error", err.stack)
        }
      }

      queryTable()
      `}</Code>

      <H>Scan table</H>

      <Code block js>{`
      import { ScanCommand  } from "@aws-sdk/lib-dynamodb"
      import { ddbDocClient } from "./ddbDocClient.js"

      export const scanTable = async () => {
        const params = {
          TableName: "Users",    
        }

        try {
          const data = await ddbDocClient.send(new ScanCommand(params))
          console.log("Success scanning: ", data)
        } catch (err) {
          console.log("Error", err.stack)
        }
      }

      scanTable()
      `}</Code>

      <H>Describe table</H>

      <Code block js>{`
      import { DescribeTableCommand } from "@aws-sdk/client-dynamodb"
      import { ddbDocClient } from "./ddbDocClient.js"

      export const describeTable = async () => {
        const params = {
          TableName: "Users",
        }

        try {
          const data = await ddbDocClient.send(new DescribeTableCommand(params))
          console.log("Success description: ", data)
        } catch (err) {
          console.log("Error", err.stack)
        }
      }

      describeTable()
      `}</Code>

      <Hs>With ProjectionExpression</Hs>

      <p>Returns only specified attributes.</p>

      <Code block js>{`
      const params = {
        TableName: "Users",
        ProjectionExpression: "email, age, car", // show only age & email attributes
        ExpressionAttributeNames: { 
          "#c": "car" 
        },
        ExpressionAttributeValues: {
          ":a": 35,
          ":c": "volvo",
        },
        FilterExpression:"#c = :c and age = :a",
      }
      `}</Code>

      <Hs>With filter</Hs>

      <Code block js>{`
          TableName: "Users",
          ProjectionExpression: "email, age, car", // show only age & email attributes
          ExpressionAttributeValues: { ":a1": 40, ":a2": 45, },
          FilterExpression:"age > :a1 and age < :a2",
        }
      `}</Code>

      <Hs>Filter checking property availability</Hs>

      <Code block js>{`
      const params = {
        TableName: "Users",
        ExpressionAttributeValues: { ":t": true, ":a": 30 },
        FilterExpression:"social.instagram = :t and age > :a" ,
      }
      `}</Code>

      <Hs>Filter with CONTAIN</Hs>

      <Code block js>{`
      const params = {
        TableName: "Users",
        ExpressionAttributeValues: { ":g": "jane" },
        FilterExpression:"contains(email, :g)" ,
      }
      `}</Code>

      <H>Put items</H>

      <Code block js>{`
      import { PutCommand } from "@aws-sdk/lib-dynamodb"
      import { ddbDocClient } from "./ddbDocClient.js"

      const params1 = {
        TableName: "Users",
        Item: {
          email: "anton.arbus@gmail.com",
          car: "volvo",
          age: 35,
          address: "2nd Avenue, New York",
          pets: ["cat", "dog", "rat"]
        },
      }
      const params2 = {
        TableName: "Users",
        Item: {
          email: "jane.blake@gmail.com",
          car: "audi",
          age: 21,
          address: "Boston, unknown street",
          pets: ["bat"]
        },
      }
      const params3 = {
        TableName: "Users",
        Item: {
          email: "timo.kuuski@gmail.com",
          car: "bmw",
          age: 44,
          address: "Vaasa, Kaupungintie 45",
          pets: null,
          social: {
            facebook: true,
            telegram: true,
            instagram: true
          }
        },
      }
      const params4 = {
        TableName: "Users",
        Item: {
          email: "olga.star@gmail.com",
          car: "mazda",
          age: 18,
          address: "Vaasa, Kaupungintie 45",
          pets: null,
          social: {
            facebook: true,
            telegram: true,
            instagram: false
          }
        },
      }

      export const putItem = async (params) => {
        try {
          const data = await ddbDocClient.send(new PutCommand(params))
          console.log("Success - item added or updated", data)
        } catch (err) {
          console.log("Error", err.stack)
        }
      }

      putItem(params1)
      putItem(params2)
      putItem(params3)
      putItem(params4)
      `}</Code>

      <H>Get item</H>

      <Code block js>{`
      import { GetCommand } from "@aws-sdk/lib-dynamodb"
      import { ddbDocClient } from "./ddbDocClient.js"

      export const readItem = async () => {
        const params = {
          TableName: "Users",
          Key: {
            email: "anton.arbus@gmail.com",
          },
        }

        try {
          const data = await ddbDocClient.send(new GetCommand(params))
          console.log("Success reading: ", data)
        } catch (err) {
          console.log("Error", err.stack)
        }
      }

      readItem()
      `}</Code>

      <H>Update item</H>

      <Code block js>{`
      import { UpdateCommand  } from "@aws-sdk/lib-dynamodb"
      import { ddbDocClient } from "./ddbDocClient.js"

      const params = {
        TableName: "Users",
        Key: {
          email: "anton.arbus@gmail.com",
        },
        ExpressionAttributeValues: {
          ":c": "mazda",
          ":a": 60,
        },
        UpdateExpression: "set car = :c, age = :a",
      }

      export const updateItem = async () => {
        try {
          const data = await ddbDocClient.send(new UpdateCommand(params))
          console.log("Success - item updated", data)
        } catch (err) {
          console.log("Error", err.stack)
        }
      }

      updateItem()
      `}</Code>

      <H>Delete item</H>

      <Code block js>{`
      import { DeleteCommand } from "@aws-sdk/lib-dynamodb"
      import { ddbDocClient } from "./ddbDocClient.js"

      export const deleteItem = async () => {
        const params = {
          TableName: "Users",
          Key: {
            email: "john.dow@gmail.com",
          },
        }

        try {
          const data = await ddbDocClient.send(new DeleteCommand(params))
          console.log("Success deleting", data)
        } catch (err) {
          console.log("Error", err.stack)
        }
      }

      deleteItem()
      `}</Code>

      <H>Get batch items</H>

      <Code block js>{`
      import { BatchGetCommand } from "@aws-sdk/lib-dynamodb"
      import { ddbDocClient } from "./ddbDocClient.js"

      export const getBatchItems = async () => {
        const params = {
          RequestItems: { // map of TableName to list of Key to get from each table
            Users: {
              Keys: [ // a list of primary key value maps
                {
                  email: 'anton.arbus@gmail.com',
                },
                {
                  email: 'olga.star@gmail.com',
                },
              ],
            },
          },
        };

        try {
          const data = await ddbDocClient.send(new BatchGetCommand(params))
          console.log("Success reading: ", data)
          console.log(JSON.stringify(data.Responses))
        } catch (err) {
          console.log("Error", err.stack)
        }
      }

      getBatchItems()
      `}</Code>

      <H>Batch write</H>

      <Code block js>{`
      import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb"
      import { ddbDocClient } from "./ddbDocClient.js"

      export const writeData = async () => {
        const TABLE_NAME = "Users"
        try {
          for (let i = 0; i < 10; i++) {
            const params = {
              RequestItems: {
                [TABLE_NAME]: [
                  {
                    PutRequest: {
                      Item: {
                        email: \`mail\${i}@gmail.com\`,
                        age: i,
                      },
                    },
                  }
                ]
              }
            }
            const data = ddbDocClient.send(new BatchWriteCommand(params))
            console.log("Success, table updated.")
          }
        } catch (error) {
          console.log("Error", error)
        }
      }
      writeData()
      `}</Code>

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
