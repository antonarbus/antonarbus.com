import { Code, H, LazyImg, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'environment variable',
  date: '2022.04.20',
  tags: ['devops'],
  desc: 'environment variable',
  body: (
    <>
      <H>environment variable</H>

      <ul>
        <li>env var is a name-value pair</li>
        <li>stores configuration information for your operating system and applications</li>
        <li>programs can access it when needed</li>
        <li>some are automatically set by your operating system during startup</li>
        <li>some applications might create environment variables during installation</li>
        <li>users can create them also</li>
        <li>
          may also set or modify environment variables directly on the fly using command{' '}
          <code>export</code>
        </li>
        <li>env vars are not stored in a single central location</li>
        <li>as i understood they are loaded from different places into memory</li>
      </ul>

      <H>Win</H>

      <ul>
        <li>
          Search for <Code>Advanced system settings</Code> in Windows
        </li>
        <li>
          Click the <i>Advanced</i> tab
        </li>
        <li>
          Click the <i>Environment Variables</i> button in the bottom
        </li>
        <li>
          At work I had to use <i>User variable</i> window
        </li>
      </ul>

      <H>Mac</H>

      <ul>
        <li>
          <Code bash>printenv</Code> show environment variables
        </li>
        <li>
          <Code>
            echo $<i>var_name</i>
          </Code>{' '}
          show specific variable value
        </li>
        <li>
          <Code>
            export <i>var_name</i>=<i>value</i>
          </Code>{' '}
          set var temporarily in terminal session
        </li>
        <li>
          <Code bash>code ~/.zshrc</Code>, then add{' '}
          <Code>
            export <i>var_name</i>=<i>value</i>
          </Code>
          , then <Code bash>source ~/.zshrc</Code> to add variable permanently into terminal profile
        </li>
      </ul>

      <H>Save var in session and use it in script</H>

      <Code block bash>{`
        gcloud projects list # to get project ID
        export PROJECT_ID="your-project-id" # Set your project id in here

        # later use variable in script
        gcloud iam service-accounts create "cloud-run-sa" --project="\${PROJECT_ID}" --description="Cloud Run Service Account" --display-name="Cloud Run Service Account
      `}</Code>

      <H>PATH</H>

      <ul>
        <li>
          how does terminal know what executable to launch when we type <code>docker</code>
        </li>
        <li>
          terminal searches for "docker" file inside folders listed at <code>PATH</code> env
          variable
        </li>
        <li>
          we can check where executable is with <Code>where docker</Code>
        </li>
      </ul>

      <LazyImg path="/imgs/path_variable.png" />
      <LazyImg path="/imgs/executables.png" />
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
