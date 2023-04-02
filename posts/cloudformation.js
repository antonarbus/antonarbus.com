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
      </ul>

      <H>Structure</H>

      <ul>
        <li>May include 9 main top objects</li>
        <li><Code>AWSTemplateFormatVersion</Code> identifies capabilities of the template based on a version</li>
        <li><Code>Description</Code> arbitrary comments, purpose of service infrastructure</li>
        <li><Code>Metadata</Code> details of the resources in the template</li>
        <li><Code>Resources</Code> list of resource objects (the only mandatory field). Lambda function, S3 buckets, API Gateways etc... are listed here</li>
        <li><Code>Parameters</Code> values to customize template or resources (not clear)</li>
        <li><Code>Mappings</Code> not clear</li>
        <li><Code>Conditions</Code> define a condition when a resource is created or when a parameter is defined</li>
        <li><Code>Transform</Code> not clear</li>
        <li><Code>Outputs</Code> can declare the output which can be imported into other stacks or show on cloudformation console (not clear)</li>
      </ul>

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

      <H>Parameters</H>

      <ul>
        <li><Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html'>Details are here</Lnk></li>
        <li>Adds custom values to your template each time you create or update a stack</li>
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

      <ul>
        <li>to point to the parameter use <Code>Ref</Code> function</li>
        <li>can reference parameters from the <code>Resources</code> & <code>Outputs</code> sections of the same template.</li>
      </ul>

      <Code block yaml>{`
      Resources:
        Ec2Instance:
          Type: AWS::EC2::Instance
          Properties:
            InstanceType:
              Ref: InstanceTypeParameter
            ImageId: ami-0ff8a91507f77f867
      `}</Code>

      <ul>
        <li>maximum of 200 parameters in a template</li>
        <li>Each parameter must be given a logical name </li>
        <li>A parameter must have a <Lnk path='https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html#parameters-section-structure-properties-type'>type</Lnk></li>
        <li>Following props are available: <code>AllowedPattern</code> <code>AllowedValues</code> <code>ConstraintDescription</code> <code>Default</code> <code>Description</code> <code>MaxLength</code> <code>MaxValue</code> <code>MinLength</code> <code>MinValue</code> <code>NoEcho</code> <code>Type</code> </li>
      </ul>

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
