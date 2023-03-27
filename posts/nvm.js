import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'nvm',
  date: '2022.06.18',
  tags: ['node', 'tools'],
  imgUrl: 'https://antonarbus.com/imgs/nvm.png',
  desc: 'install multiple node versions and switch between them',
  body: (
    <>
      <p><Lnk path='https://github.com/nvm-sh/nvm'>NVM</Lnk> allows to install multiple node versions and switch between them.</p>

      <p>In NVM the <i>node</i> is an alias for the latest version.</p>

      <H>Installation</H>

      <ul>
        <li><Code bash>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash</Code></li>
        <li>Reboot the terminal</li>
        <li>Check if it is installed by <Code bash>command -v nvm</Code> and get the <code>nvm</code> output.</li>
      </ul>

      <H>Available Node versions</H>

      <ul><li><Code bash>nvm ls-remote</Code></li></ul>

      <H>Install Node</H>

      <ul>
        <li><Code bash>nvm install node</Code> installs latest Node</li>
        <li><Code bash>nvm install 14</Code> installs 14th version</li>
        <li><Code bash>nvm install 14.7.0</Code> installs specific version</li>
        <li>First installed version becomes default</li>
      </ul>

      <H>Your current version</H>

      <ul><li><Code bash>node -v</Code></li></ul>

      <H>Installed versions</H>

      <ul><li><Code bash>nvm ls</Code></li></ul>

      <H>Switch version</H>

      <ul>
        <li><Code bash>nvm use node</Code> use the installed version (not clear)</li>
        <li><Code bash>nvm use 12</Code> use 12th version</li>
        <li><Code bash>nvm use 12.0.0</Code> use exact version</li>
      </ul>

      <H>Default</H>

      <ul>
        <li><Code bash>nvm alias default node</Code></li>
        <li><Code bash>nvm alias default 12</Code></li>
        <li><Code bash>nvm alias default 12.22.12</Code></li>
      </ul>

      <H>Run Node</H>

      <ul>
        <li><Code bash>node</Code> enter in current node terminal</li>
        <li><Code bash>nvm run node</Code> same</li>
        <li><Code bash>nvm run 12</Code> specific version</li>
        <li><Code bash>nvm run 12.0.0</Code> same</li>
      </ul>

      <H>Path</H>

      <ul>
        <li><Code bash>nvm which 18</Code> get the path to the executable </li>
        <li><Code bash>nvm which 18.4.0</Code> same</li>
      </ul>

      <H>Uninstall node</H>

      <ul>
        <li><Code bash>nvm uninstall 12</Code></li>
        <li><Code bash>nvm uninstall 12.0.0</Code></li>
      </ul>

      <H>Remove nvm</H>

      <ul>
        <li><Code bash>rm -rf "$NVM_DIR"</Code></li>
        <li>Go to <Code bash>~/.bashrc</Code> and remove following lines</li>
        <Code block bash>{`
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh" # This loads nvm
        [[ -r $NVM_DIR/bash_completion ]] && \\. $NVM_DIR/bash_completion
        `}</Code>
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
