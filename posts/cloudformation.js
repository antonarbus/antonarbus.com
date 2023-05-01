import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'CloudFormation',
  date: '2023.04.02',
  tags: ['aws'],
  imgUrl: 'https://antonarbus.com/imgs/aws.png',
  desc: 'AWS CloudFormation',
  body: (
    <>
      <H>CloudFormation</H>

      <ul>
        <li>AWS infrastructure resources management system</li>
        <li><Lnk path='https://aws.amazon.com/cloudformation/'>https://aws.amazon.com/cloudformation/</Lnk></li>
      </ul>

      <H>Template</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/gettingstarted.templatebasics.html'>Basics about templates</Lnk></li>
        <li>A template is a text file which declare your AWS resources that make up a stack</li>
        <li>Can be written in JSON or YAML (preferable) formats</li>
        <li>Find multiple template <Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/CHAP_TemplateQuickRef.html'>snippets</Lnk></li>
      </ul>

      <H>Structure</H>

      <ul>
        <li>AWS template follows <Lnk path='https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-template-anatomy.html'>AWS SAM template anatomy</Lnk></li>
        <li>SAM template has almost the same original CloudFormation template structure, but with special <Lnk path='https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-resources-and-properties.html'>additional resources and properties</Lnk></li>
        <li><Code>Transform</Code> (<b>required</b>) set a macro to process the template </li>
        <li><Code>Resources</Code> (<b>required</b>) list of resource objects, like Lambda function, S3 buckets, API Gateways etc...</li>
        <li><Code>AWSTemplateFormatVersion</Code> capabilities of the template based on a version</li>
        <li><Code>Description</Code> arbitrary comments</li>
        <li><Code>Metadata</Code> additional details of the resources in the template</li>
        <li><Code>Parameters</Code> customized values for template or resources</li>
        <li><Code>Mappings</Code> key-value dictionaries from which a value can be looked up and used in the template</li>
        <li><Code>Conditions</Code> condition to created a resource or set a parameter</li>
        <li><Code>Outputs</Code> set a value which can be imported into other stacks or show on CloudFormation console</li>
      </ul>

      <Code block yaml>{`
      Transform: AWS::Serverless-2016-10-31

      Globals:
        set of globals

      Description:
        String

      Metadata:
        template metadata

      Parameters:
        set of parameters

      Mappings:
        set of mappings

      Conditions:
        set of conditions

      Resources:
        set of resources

      Outputs:
        set of outputs

      `}</Code>

      <H>AWSTemplateFormatVersion</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/format-version-structure.html'>Details are here</Lnk></li>
        <li>if not specified the latest will be assumed</li>
      </ul>

      <Code block yaml>{`
      AWSTemplateFormatVersion: "2010-09-09"
      `}</Code>

      <H>Description</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-description-structure.html'>Details are here</Lnk></li>
        <li>Comments about your template.</li>
      </ul>

      <Code block yaml>{`
      Description: >
        Here are some
        details about
        the template.
      `}</Code>

      <H>Metadata</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html'>Details are here</Lnk></li>
        <li>Additional comments or some specific settings</li>
        <li>Not clear...</li>
      </ul>

      <Code block yaml>{`
      Metadata:
        Instances:
          Description: "Information about the instances"
        Databases: 
          Description: "Information about the databases"
      `}</Code>

      <H>Resources</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resources-section-structure.html'>Details are here</Lnk></li>
        <li>Resources list included in the stack</li>
        <li>All resources <Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html'>properties</Lnk></li>
      </ul>

      <Code block yaml>{`
      Resources:
        MyEC2Instance:
          Type: "AWS::EC2::Instance"
          Properties:
            ImageId: "ami-0ff8a91507f77f867"
      `}</Code>

      <p>Example of different property types</p>

      <Code block jsx>{`
      Properties:
        String: OneStringValue
        String: A longer string value 
        Number: 123
        LiteralList:
          - "[first]-string-value with a special characters"
          - "[second]-string-value with a special characters"
        Boolean: true
        ReferenceForOneValue:
          Ref: MyLogicalResourceName
        ReferenceForOneValueShortCut: !Ref MyLogicalResourceName
        FunctionResultWithFunctionParams: !Sub |
          Key=%\${MyParameter}
      `}</Code>

      <p>Example defines two resources. The <code>MyInstance</code> resource includes the <code>MyQueue</code> resource as part of its <code>UserData</code> property.</p>

      <Code block yaml>{`
      Resources: 
        MyInstance: 
          Type: "AWS::EC2::Instance"
          Properties: 
            UserData: 
              "Fn::Base64":
                !Sub |
                  Queue=\${MyQueue}
            AvailabilityZone: "us-east-1a"
            ImageId: "ami-0ff8a91507f77f867"
        MyQueue: 
          Type: "AWS::SQS::Queue"
          Properties: {}
      `}</Code>

      <H>Parameters</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html'>Details are here</Lnk></li>
        <li>Adds custom values to your template each time you create or update a stack</li>
        <li>to point to the parameter use <Code>Ref</Code> function</li>
        <li>can reference parameters from the <code>Resources</code> & <code>Outputs</code> sections of the same template.</li>
        <li>maximum of 200 parameters in a template</li>
        <li>Each parameter must be given a logical name </li>
        <li>A parameter must have a <Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html#parameters-section-structure-properties-type'>type</Lnk></li>
        <li>Following props are available: <code>AllowedPattern</code> <code>AllowedValues</code> <code>ConstraintDescription</code> <code>Default</code> <code>Description</code> <code>MaxLength</code> <code>MaxValue</code> <code>MinLength</code> <code>MinValue</code> <code>NoEcho</code> <code>Type</code> </li>
      </ul>

      <Code block yaml>{`
      Parameters:
        InstanceTypeParameter:
          Type: String
          Default: t2.micro
          AllowedValues:
            - t2.micro
            - m1.small
            - m1.large
          Description: Enter t2.micro, m1.small, or m1.large. Default is t2.micro.
      `}</Code>

      <Code block yaml>{`
      Resources:
        Ec2Instance:
          Type: AWS::EC2::Instance
          Properties:
            InstanceType:
              Ref: InstanceTypeParameter
            ImageId: ami-0ff8a91507f77f867
      `}</Code>

      <Code block jsx>{`
      Parameters: 
        DBPort: 
          Default: 3306
          Description: TCP/IP port for the database
          Type: Number
          MinValue: 1150
          MaxValue: 65535
        DBPwd: 
          NoEcho: true
          Description: The database admin account password
          Type: String
          MinLength: 1
          MaxLength: 41
          AllowedPattern: ^[a-zA-Z0-9]*$
      `}</Code>

      <Code block jsx>{`
      Parameters: 
        myKeyPair: 
          Description: Amazon EC2 Key Pair
          Type: "AWS::EC2::KeyPair::KeyName"
        mySubnetIDs: 
          Description: Subnet IDs
          Type: "List<AWS::EC2::Subnet::Id>"
      `}</Code>

      <H>Rules</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/rules-section-structure.html'>Details are here</Lnk></li>
        <li><code>Rules</code> validates parameter values during a stack creation</li>
        <li>CloudFormation evaluates the assertions to verify whether an assertion for a parameter value is true</li>
        <li>If a parameter value is invalid, AWS CloudFormation does not create or update the stack</li>
        <li>Following function can be used: You can use the following rule-specific intrinsic functions to define rule conditions and assertions: <code>Fn::And</code>, <code>Fn::Contains</code>, <code>Fn::EachMemberEquals</code>, <code>Fn::EachMemberIn</code>, <code>Fn::Equals</code>, <code>Fn::If</code>, <code>Fn::Not</code>, <code>Fn::Or</code>, <code>Fn::RefAll</code>, <code>Fn::ValueOf</code>, <code>Fn::ValueOfAll</code></li>
      </ul>

      <p>Two rules check the value of the <code>InstanceType</code> parameter. Depending on the value of the environment parameter (<code>test</code> or <code>prod</code>), the user must specify <code>a1.medium</code> or <code>a1.large</code> for the <code>InstanceType</code> parameter. The <code>InstanceType</code> and <code>Environment</code> parameters must be declared in the <code>Parameters</code> section of the same template.</p>

      <Code block yaml>{`
      Rules:
        testInstanceType:
          RuleCondition: !Equals 
            - !Ref Environment
            - test
          Assertions:
            - Assert:
                'Fn::Contains':
                  - - a1.medium
                  - !Ref InstanceType
              AssertDescription: 'For a test environment, the instance type must be a1.medium'
        prodInstanceType:
          RuleCondition: !Equals 
            - !Ref Environment
            - prod
          Assertions:
            - Assert:
                'Fn::Contains':
                  - - a1.large
                  - !Ref InstanceType
              AssertDescription: 'For a production environment, the instance type must be a1.large'

      `}</Code>

      <H>Mappings</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/mappings-section-structure.html'>Details are here</Lnk></li>
        <li>matches a key to a corresponding set of named values</li>
        <li>can use to specify conditional parameter values, similar to a lookup table</li>
        <li>match a key to a corresponding value by using the <code>Fn::FindInMap</code> function which returns a named value based on a specified key.</li>
      </ul>

      <p>Example template contains an Amazon EC2 resource whose <code>ImageId</code> property is assigned by the <code>FindInMap</code> function. The <code>FindInMap</code> function specifies key as the region where the stack is created and HVM64 as the name of the value to map to.</p>

      <Code block jsx>{`
      AWSTemplateFormatVersion: "2010-09-09"
      Mappings: 
        RegionMap: 
          us-east-1:
            HVM64: ami-0ff8a91507f77f867
            HVMG2: ami-0a584ac55a7631c0c
          us-west-1:
            HVM64: ami-0bdb828fd58c52235
            HVMG2: ami-066ee5fd4a9ef77f1
          eu-west-1:
            HVM64: ami-047bb4163c506cd98
            HVMG2: ami-0a7c483d527806435
          ap-northeast-1:
            HVM64: ami-06cd52961ce9f0d85
            HVMG2: ami-053cdd503598e4a9d
          ap-southeast-1:
            HVM64: ami-08569b978cc4dfa10
            HVMG2: ami-0be9df32ae9f92309
      Resources: 
        myEC2Instance: 
          Type: "AWS::EC2::Instance"
          Properties: 
            ImageId: !FindInMap [RegionMap, !Ref "AWS::Region", HVM64]
            InstanceType: m1.small
      `}</Code>

      <H>Conditions</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/conditions-section-structure.html'>Details are here</Lnk></li>
        <li>controls whether certain resources are created or whether certain resource properties are assigned a value during stack creation or update</li>
        <li>for ex. may create a condition when to create the resource or output or set a property</li>
        <li>function to be used: <code>Fn::And</code>, <code>Fn::Equals</code>, <code>Fn::If</code>, <code>Fn::Not</code>, <code>Fn::Or</code></li>
      </ul>

      <p>In the example we have <code>EnvType</code> input parameter, where you can specify <code>prod</code> or <code>test</code> to create a stack. For a prod env we create an EC2 instance and attache a volume to the instance. For a test env just create the EC2 instance.</p>

      <Code block yaml>{`
      AWSTemplateFormatVersion: 2010-09-09
      Parameters:
        EnvType:
          Description: Environment type.
          Default: test
          Type: String
          AllowedValues:
            - prod
            - test
          ConstraintDescription: must specify prod or test.
      Conditions:
        CreateProdResources: !Equals 
          - !Ref EnvType
          - prod
      Resources:
        EC2Instance:
          Type: 'AWS::EC2::Instance'
          Properties:
            ImageId: ami-0ff8a91507f77f867
        MountPoint:
          Type: 'AWS::EC2::VolumeAttachment'
          Condition: CreateProdResources
          Properties:
            InstanceId: !Ref EC2Instance
            VolumeId: !Ref NewVolume
            Device: /dev/sdh
        NewVolume:
          Type: 'AWS::EC2::Volume'
          Condition: CreateProdResources
          Properties:
            Size: 100
            AvailabilityZone: !GetAtt 
              - EC2Instance
              - AvailabilityZone
      `}</Code>

      <p>Nested condition.  For a stack deployed in a production environment, AWS CloudFormation creates a policy for the S3 bucket.</p>

      <Code block yaml>{`
      Parameters:
        EnvType:
          Type: String
          AllowedValues:
            - prod
            - test
        BucketName:
          Default: ''
          Type: String
      Conditions:
        IsProduction: !Equals 
          - !Ref EnvType
          - prod
        CreateBucket: !Not 
          - !Equals 
            - !Ref BucketName
            - ''
        CreateBucketPolicy: !And 
          - !Condition IsProduction
          - !Condition CreateBucket
      Resources:
        Bucket:
          Type: 'AWS::S3::Bucket'
          Condition: CreateBucket
        Policy:
          Type: 'AWS::S3::BucketPolicy'
          Condition: CreateBucketPolicy
          Properties:
            Bucket: !Ref Bucket
            PolicyDocument: ...
      `}</Code>

      <H>Transform</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html'>Details are here</Lnk></li>
        <li>Specifies a <Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html'>macros</Lnk> to process the template</li>
        <li>Must include this section with a value of <Code>AWS::Serverless-2016-10-31</Code></li>
        <li>Additional transforms are optional. </li>
        <li>Let's skip it for now...</li>
      </ul>

      <H>Globals</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-template-anatomy-globals.html'>Details are here</Lnk></li>
        <li>Defines properties that are common to all your serverless functions and APIs.</li>
        <li>This section is unique to AWS SAM.</li>
      </ul>

      <H>Transform</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html'>Details are here</Lnk></li>
        <li>Specifies a <Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html'>macros</Lnk> to process the template</li>
        <li>Must include this section with a value of <Code>AWS::Serverless-2016-10-31</Code></li>
        <li>Let's skip it for now...</li>
      </ul>

      <H>Outputs</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/outputs-section-structure.html'>Details are here</Lnk></li>
        <li>declares output values that you can import into other stacks, return in response (to describe stack calls), or view on the AWS CloudFormation console.</li>
        <li>For ex, can output the S3 bucket name to make the bucket easier to find.</li>
        <li>Max 200 outputs per template</li>
      </ul>

      <p><code>BackupLoadBalancerDNSName</code> output returns the DNS name for the resource with the logical ID <code>BackupLoadBalancer</code> only when the <code>CreateProdResources</code> condition is true. (The second output shows how to specify multiple outputs.)</p>

      <Code block yaml>{`
      Outputs:
        BackupLoadBalancerDNSName:
          Description: The DNSName of the backup load balancer
          Value: !GetAtt BackupLoadBalancer.DNSName
          Condition: CreateProdResources
        InstanceID:
          Description: The Instance ID
          Value: !Ref EC2Instance
      `}</Code>

      <p>Output named <code>StackVPC</code> returns the ID of a VPC, and then exports the value for cross-stack referencing with the name <code>VPCID</code> appended to the stack's name.</p>

      <Code block yaml>{`
      Outputs:
        StackVPC:
          Description: The ID of the VPC
          Value: !Ref MyVPC
          Export:
            Name: !Sub "\${AWS::StackName}-VPCID"
      `}</Code>

      <H>Pseudo parameters</H>

      <ul>
        <li>Parameters that are predefined by AWS CloudFormation</li>
        <li>Used as a parameter</li>
        <li><Code>AWS::AccountId</Code> returns the AWS account ID of the account in which the stack is being created, such as <i>123456789012</i></li>
        <li><Code>AWS::NotificationARNs</Code> returns the list of notification Amazon Resource Names (ARNs) for the current stack</li>
        <li><Code>AWS::NoValue</Code> removes the resource property when specified as a return value in the <code>Fn::If</code> function</li>
        <li><Code>AWS::Partition</Code> returns the partition that the resource is in</li>
        <li><Code>AWS::Region</Code> returns a string representing the Region in which the encompassing resource is being created</li>
        <li><Code>AWS::StackId</Code> returns the ID of the stack</li>
        <li><Code>AWS::StackName</Code> returns the name of the stack</li>
        <li><Code>AWS::URLSuffix</Code> returns the suffix for a domain. The suffix is typically <i>amazonaws.com</i></li>
      </ul>

      <Code block yaml>{`
      Outputs:
        MyStacksRegion:
          Value: !Ref "AWS::Region"
      `}</Code>

      <H>Built-in functions</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html'>Details are here</Lnk></li>
        <li>Can use intrinsic functions in resource properties, outputs, metadata attributes, and update policy attributes. You can also use intrinsic functions to conditionally create stack resources.</li>
        <li><code>Fn::Base64</code>, <code>Fn::Cidr</code>, <code>Condition functions</code>, <code>Fn::FindInMap</code>, <code>Fn::GetAtt</code>, <code>Fn::GetAZs</code>, <code>Fn::ImportValue</code>, <code>Fn::Join</code>, <code>Fn::Length</code>, <code>Fn::Select</code>, <code>Fn::Split</code>, <code>Fn::Sub</code>, <code>Fn::ToJsonString</code>, <code>Fn::Transform</code>, <code>Ref</code></li>
        <li>condition functions: <code>Fn::And</code>, <code>Fn::Equals</code>, <code>Fn::If</code>, <code>Fn::Not</code>, <code>Fn::Or</code></li>
      </ul>

      <H>Ref</H>

      <ul>
        <li>The function Ref returns the value of the specified <i>parameter</i> or <i>resource</i></li>
        <li>When specify a parameter's logical name, it returns the value of the parameter</li>
        <li>When specify a resource's logical name, it returns a value that you can typically use to refer to that resource, such as a physical ID</li>
        <li>Find what <code>Ref</code> returns for every resource or parameter <Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html'>here</Lnk></li>
      </ul>

      <Code block yaml>{`
      Ref: logicalName_of_the_resource_or_parameter
      `}</Code>

      <p>Or shorter way</p>

      <Code block yaml>{`
      !Ref logicalName_of_the_resource_or_parameter
      `}</Code>

      <p>Elastic IP address gets the instance ID of an EC2 MyEC2Instance resource</p>

      <Code block yaml>{`
      MyEIP:
        Type: "AWS::EC2::EIP"
        Properties:
          InstanceId: !Ref MyEC2Instance
      `}</Code>

      <H>AWS CDK</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/cdk/index.html'>https://docs.aws.amazon.com/cdk/index.html</Lnk></li>
        <li>If you do not like to deal with <i>template.yaml</i> you may manage your CloudFormation infrastructure through programming code using AWS CDK </li>
      </ul>

      <H>AWS SAM</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html'>AWS Serverless Application Model</Lnk> is the framework on top of CloudFormation</li>
        <li>can use both the AWS CloudFormation and AWS SAM syntax within the same template</li>
        <li>SAM template has almost the same original CloudFormation template structure, but with special <Lnk path='https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-resources-and-properties.html'>additional resources and properties</Lnk></li>
        <li>fewer lines of code for the same result, SAM transforms your template into real CloudFormation template</li>
        <li>SAM CLI has CLI for initialize a project, deploy, debug, test, Configure CI/CD pipeline, monitor, sync local changes</li>
      </ul>

      <p>SAM template</p>

      <Code block yaml>{`
      AWSTemplateFormatVersion: 2010-09-09
      Transform: AWS::Serverless-2016-10-31
      Resources:
        getAllItemsFunction:
          Type: AWS::Serverless::Function
          Properties:
            Handler: src/get-all-items.getAllItemsHandler
            Runtime: nodejs12.x
            Events:
              Api:
                Type: HttpApi
                Properties:
                  Path: /
                  Method: GET
          Connectors:
            MyConn:
              Properties:
              Destination:
                Id: SampleTable
                Permissions:
                  - Read
        SampleTable:
          Type: AWS::Serverless::SimpleTable
      `}</Code>

      <p>Vs same AWS CloudFormation template</p>

      <Code block json>{`
      {
        "AWSTemplateFormatVersion": "2010-09-09",
        "Resources": {
          "getAllItemsFunction": {
            "Type": "AWS::Lambda::Function",
            "Metadata": {
              "SamResourceId": "getAllItemsFunction"
            },
            "Properties": {
              "Code": {
                "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-1a4x26zbcdkqr",
                "S3Key": "what-is-app/a6f856abf1b2c4f7488c09b367540b5b"
              },
              "Handler": "src/get-all-items.getAllItemsHandler",
              "Role": {
                "Fn::GetAtt": [
                  "getAllItemsFunctionRole",
                  "Arn"
                ]
              },
              "Runtime": "nodejs12.x",
              "Tags": [
                {
                  "Key": "lambda:createdBy",
                  "Value": "SAM"
                }
              ]
            }
          },
          "getAllItemsFunctionRole": {
            "Type": "AWS::IAM::Role",
            "Properties": {
              "AssumeRolePolicyDocument": {
                "Version": "2012-10-17",
                "Statement": [
                  {
                    "Action": [
                      "sts:AssumeRole"
                    ],
                    "Effect": "Allow",
                    "Principal": {
                      "Service": [
                        "lambda.amazonaws.com"
                      ]
                    }
                  }
                ]
              },
              "ManagedPolicyArns": [
                "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
              ],
              "Tags": [
                {
                  "Key": "lambda:createdBy",
                  "Value": "SAM"
                }
              ]
            }
          },
          "getAllItemsFunctionApiPermission": {
            "Type": "AWS::Lambda::Permission",
            "Properties": {
              "Action": "lambda:InvokeFunction",
              "FunctionName": {
                "Ref": "getAllItemsFunction"
              },
              "Principal": "apigateway.amazonaws.com",
              "SourceArn": {
                "Fn::Sub": [
                  "arn:\${AWS::Partition}:execute-api:\${AWS::Region}:\${AWS::AccountId}:\${__ApiId__}/\${__Stage__}/GET/",
                  {
                    "__ApiId__": {
                      "Ref": "ServerlessHttpApi"
                    },
                    "__Stage__": "*"
                  }
                ]
              }
            }
          },
          "ServerlessHttpApi": {
            "Type": "AWS::ApiGatewayV2::Api",
            "Properties": {
              "Body": {
                "info": {
                  "version": "1.0",
                  "title": {
                    "Ref": "AWS::StackName"
                  }
                },
                "paths": {
                  "/": {
                    "get": {
                      "x-amazon-apigateway-integration": {
                        "httpMethod": "POST",
                        "type": "aws_proxy",
                        "uri": {
                          "Fn::Sub": "arn:\${AWS::Partition}:apigateway:\${AWS::Region}:lambda:path/2015-03-31/functions/\${getAllItemsFunction.Arn}/invocations"
                        },
                        "payloadFormatVersion": "2.0"
                      },
                      "responses": {}
                    }
                  }
                },
                "openapi": "3.0.1",
                "tags": [
                  {
                    "name": "httpapi:createdBy",
                    "x-amazon-apigateway-tag-value": "SAM"
                  }
                ]
              }
            }
          },
          "ServerlessHttpApiApiGatewayDefaultStage": {
            "Type": "AWS::ApiGatewayV2::Stage",
            "Properties": {
              "ApiId": {
                "Ref": "ServerlessHttpApi"
              },
              "StageName": "$default",
              "Tags": {
                "httpapi:createdBy": "SAM"
              },
              "AutoDeploy": true
            }
          },
          "SampleTable": {
            "Type": "AWS::DynamoDB::Table",
            "Metadata": {
              "SamResourceId": "SampleTable"
            },
            "Properties": {
              "AttributeDefinitions": [
                {
                  "AttributeName": "id",
                  "AttributeType": "S"
                }
              ],
              "KeySchema": [
                {
                  "AttributeName": "id",
                  "KeyType": "HASH"
                }
              ],
              "BillingMode": "PAY_PER_REQUEST"
            }
          },
          "getAllItemsFunctionMyConnPolicy": {
            "Type": "AWS::IAM::ManagedPolicy",
            "Metadata": {
              "aws:sam:connectors": {
                "getAllItemsFunctionMyConn": {
                  "Source": {
                    "Type": "AWS::Serverless::Function"
                  },
                  "Destination": {
                    "Type": "AWS::Serverless::SimpleTable"
                  }
                }
              }
            },
            "Properties": {
              "PolicyDocument": {
                "Version": "2012-10-17",
                "Statement": [
                  {
                    "Effect": "Allow",
                    "Action": [
                      "dynamodb:GetItem",
                      "dynamodb:Query",
                      "dynamodb:Scan",
                      "dynamodb:BatchGetItem",
                      "dynamodb:ConditionCheckItem",
                      "dynamodb:PartiQLSelect"
                    ],
                    "Resource": [
                      {
                        "Fn::GetAtt": [
                          "SampleTable",
                          "Arn"
                        ]
                      },
                      {
                        "Fn::Sub": [
                          "\${DestinationArn}/index/*",
                          {
                            "DestinationArn": {
                              "Fn::GetAtt": [
                                "SampleTable",
                                "Arn"
                              ]
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "Roles": [
                {
                  "Ref": "getAllItemsFunctionRole"
                }
              ]
            }
          }
        }
      }
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
