import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'npm',
  date: '2022.04.20',
  tags: ['tools'],
  desc: 'npm commands',
  body: (
    <>
      <H>NPM commands</H>

      <p>
        All commands <Lnk path="https://docs.npmjs.com/cli/v8/commands">list</Lnk>.
      </p>

      <ul>
        <li>
          <Code bash>npm view package_name</Code> show package details
        </li>
        <li>
          <Code bash>npm repo package_name</Code> open package github
        </li>
        <li>
          <Code bash>npm docs package_name</Code> open readme at package github
        </li>
        <li>
          <Code bash>npm install</Code> sync with <i>package.json</i>
        </li>
        <li>
          <Code bash>npm install package_name</Code> install
        </li>
        <li>
          <Code bash>npm i</Code> same
        </li>
        <li>
          <Code bash>npm ci</Code> install exact versions, not produces package.json, no global
          packages
        </li>
        <li>
          <Code bash>npm i -E</Code> install exact versions
        </li>
        <li>
          <Code bash>npm i -D</Code> install for development
        </li>
        <li>
          <Code bash>npm uninstall package_name</Code> remove package
        </li>
        <li>
          <Code bash>npm unlink package_name</Code> same
        </li>
        <li>
          <Code bash>npm un package_name</Code> same
        </li>
        <li>
          <Code bash>npm remove package_name</Code> same
        </li>
        <li>
          <Code bash>npm rm package_name</Code> same
        </li>
        <li>
          <Code bash>npm r package_name</Code> same
        </li>
        <li>
          <Code bash>npm t</Code> = <Code bash>npm test</Code> test
        </li>
        <li>
          <Code bash>npm it</Code> install and run test
        </li>
        <li>
          <Code bash>npm init -y</Code> = <Code bash>npm init --yes</Code> initialize a project
          quickly
        </li>
        <li>
          <Code bash>npm run script_name</Code> run a script
        </li>
        <li>
          <Code bash>npm -v</Code> npm version
        </li>
        <li>
          <Code bash>npm pack</Code> creates .tgz archive of your npm package
        </li>
        <li>
          <Code bash>npm install ./lambda-sdk-6.0.2.tgz</Code> installs local archived package
        </li>
      </ul>

      <H>npm i</H>

      <ul>
        <li>
          <i>npm i</i> produces the <code>package.lock.json</code>file based on{' '}
          <code>package.json</code>file
        </li>
        <li>
          <Code>{'npm install jquery@">=0.1.0 <3.0.0"'}</Code> install version within a range
        </li>
        <li>
          <Code>{'npm install jquery@"<3.0.0"'}</Code> install version below a specific version
        </li>
      </ul>

      <H>npm ci</H>

      <ul>
        <li>
          <i>npm ci</i> deletes the <code>node_modules</code> folder
        </li>
        <li>
          and installs packages according to <code>package.lock.json</code>file
        </li>
      </ul>

      <H>depcheck</H>

      <ul>
        <li>
          <Code bash>npx depcheck —oneline</Code> check for packages not used in the project
        </li>
        <li>
          <Lnk path="https://www.npmjs.com/package/depcheck">
            https://www.npmjs.com/package/depcheck
          </Lnk>
        </li>
      </ul>

      <H>npm-check-updates</H>

      <ul>
        <li>
          <Code bash>npm install -g npm-check-updates</Code> install globally
        </li>
        <li>
          <Code bash>npx npm-check-updates</Code> get details of packages updates
        </li>
        <li>
          <Code bash>npx npm-check-updates -u</Code> to upgrade package.json
        </li>
        <li>
          <Code bash>npm i</Code> install updates
        </li>
        <li>
          <Lnk path="https://www.npmjs.com/package/npm-check-updates">
            https://www.npmjs.com/package/npm-check-updates
          </Lnk>
        </li>
      </ul>

      <H>Check for circular references</H>

      <ul>
        <li>
          <Lnk path="https://www.npmjs.com/package/dpdm">https://www.npmjs.com/package/dpdm</Lnk>
        </li>
        <li>
          <Code bash>npm i -g dpdm</Code> install globally
        </li>
        <li>
          <Code bash>npx dpdm ./src/index.tsx</Code> check all
        </li>
        <li>
          <Code bash>npx dpdm -T --no-warning --no-tree ./index.tsx</Code> check for circular
          reference only
        </li>
        <li>
          <Code bash>
            npx dpdm --no-tree --no-warning --no-circular --detect-unused-files-from 'src/**/*.*'
            'index.js'
          </Code>{' '}
          find unused files by index.js in src directory
        </li>
      </ul>

      <H>ERESOLVE unable to resolve dependency tree while installing a package</H>

      <ul>
        <li>
          <Lnk path="https://stackoverflow.com/questions/71582397/eresolve-unable-to-resolve-dependency-tree-while-installing-a-pacakge">
            https://stackoverflow.com/questions/71582397/eresolve-unable-to-resolve-dependency-tree-while-installing-a-pacakge
          </Lnk>
        </li>
        <li>
          <Code>rm -rf node_modules</Code>
        </li>
        <li>
          <Code>npm config get legacy-peer-deps</Code> check peer dep config
        </li>
        <li>
          <Code>npm config set legacy-peer-deps true</Code>
        </li>
        <li>
          <Code>npm i</Code>
        </li>
      </ul>

      <H>Peer dependencies</H>

      <ul>
        <li>Nowadays peer dependencies are tried to be installed automatically</li>
        <li>Before npm v7 they were not installed automatically, it was a user responsibility</li>
        <li>
          <Code>npm config get legacy-peer-deps</Code> check peer dep config
        </li>
        <li>
          <Code>npm config set legacy-peer-deps false</Code> correct settings, you're telling npm
          NOT to use the legacy behavior
        </li>
        <li>It means you do not ignore peer dependency conflicts.</li>
        <li>Do not skip installing peer dependencies that are missing or conflicting</li>
      </ul>

      <H>Update specific package</H>

      <ul>
        <li>
          <Code>
            npm update --save <i>name</i>
          </Code>{' '}
          updates package in both <i>package-lock.json</i> & <i>package.json</i> files
        </li>
        <li>
          Without <Code>--save</Code> package will be updated only in <i>package-lock.json</i>, no
          clue why we may want it
        </li>
      </ul>

      <H>Dependency tree</H>

      <ul>
        <li>
          <Code>npm ls</Code> project's installed packages
        </li>
        <li>
          <Code>npm ls --global</Code> globally installed packages
        </li>
        <li>
          <Code>npm ls --depth=1</Code> dependencies one-level deep
        </li>
        <li>
          <Code>npm ls package-name</Code> how a specific package is installed in the tree. This is
          particular useful when you encounter an error at some node_module package which is not
          your direct dependency but installed by some other package.
        </li>
      </ul>

      <H>workspaces</H>

      <ul>
        <li>
          <Lnk path="https://docs.npmjs.com/cli/v10/using-npm/workspaces">
            https://docs.npmjs.com/cli/v10/using-npm/workspaces
          </Lnk>
        </li>
        <li>
          Workspaces provide a way to manage multiple packages within a single top-level root
          package
        </li>
        <li>
          For ex. we have many lambdas in folders and with workspaces we may all installation from
          the root with just one command
        </li>
        <li>It will be much faster</li>
      </ul>

      <H>Install package directly from github</H>

      <ul>
        <li>May even point to commit hash</li>
      </ul>

      <Code block json>{`
        {
          "dependencies": {
            "lambda-sdk": "github:heeros/LambdaSDK#a18b4e3"
          },
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
