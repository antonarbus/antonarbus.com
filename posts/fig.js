import { Code, H, LazyImg, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'fig',
  date: '2022.02.01',
  tags: ['productivity'],
  desc: 'Autocomplete for terminal in Mac',
  body: (
    <>
      <p>Fig is an app for autocomplete in terminal in mac.</p>

      <H>Homebrew</H>

      <p>Install package manager for mac <Lnk path='https://brew.sh/'>Homebrew</Lnk> if you did't before <Code bash>{'/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'}</Code>.</p>

      <H>iTerm</H>

      <p>Install <Lnk path='https://iterm2.com/downloads.html'>iTerm</Lnk>.</p>

      <H>Oh My Zsh</H>

      <ul>
        <li>Install <Lnk path='https://ohmyz.sh/'>Oh My Zsh framework</Lnk> for ZSH terminal <Code bash>{'sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"'}</Code>. </li>
        <li>Make ZSH the default terminal <Code bash>chsh -s /bin/zsh</Code> </li>
      </ul>

      <H>powerlevel10k</H>

      <ul>
        <li>Install a <Lnk path='https://github.com/romkatv/powerlevel10k'>powerlevel10k</Lnk>theme for the zsh terminal <Code bash>{'git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k'}</Code> </li>
        <li>Do not forget about <Lnk path='https://github.com/romkatv/powerlevel10k#manual-font-installation'>MesloLGS NF fonts</Lnk> </li>
        <li>Configure theme by command <Code bash>p10k configure</Code> </li>
      </ul>

      <p>
        <LazyImg src='/imgs/iTerm2/p10kConfig/img1.png'></LazyImg>
        <LazyImg src='/imgs/iTerm2/p10kConfig/img2.png'></LazyImg>
        <LazyImg src='/imgs/iTerm2/p10kConfig/img3.png'></LazyImg>
        <LazyImg src='/imgs/iTerm2/p10kConfig/img4.png'></LazyImg>
        <LazyImg src='/imgs/iTerm2/p10kConfig/img5.png'></LazyImg>
        <LazyImg src='/imgs/iTerm2/p10kConfig/img6.png'></LazyImg>
        <LazyImg src='/imgs/iTerm2/p10kConfig/img7.png'></LazyImg>
        <LazyImg src='/imgs/iTerm2/p10kConfig/img8.png'></LazyImg>
        <LazyImg src='/imgs/iTerm2/p10kConfig/img9.png'></LazyImg>
        <LazyImg src='/imgs/iTerm2/p10kConfig/img10.png'></LazyImg>
        <LazyImg src='/imgs/iTerm2/p10kConfig/img11.png'></LazyImg>
        <LazyImg src='/imgs/iTerm2/p10kConfig/img12.png'></LazyImg>
        <LazyImg src='/imgs/iTerm2/p10kConfig/img13.png'></LazyImg>
      </p>

      <p>Now terminal looks like</p>

      <LazyImg src='/imgs/iTerm2/p10kConfig/terminalAfterP10kConfig.png'></LazyImg>

      <p>Make sure that zsh configuration file uses <i>powerlevel10k</i> theme by opening file <Code bash>{'code -a ~/.zshrc'}</Code> and checking existence of the line <Code>{'ZSH_THEME="powerlevel10k/powerlevel10k"'}</Code></p>

      <H>VSCode</H>

      <p>To use iTerm app as VSCode terminal add following int VSCode json configuration file</p>

      <Code block json>{`
      "terminal.external.osxExec": "iTerm.app",
      "terminal.integrated.defaultProfile.osx": "zsh",
      "terminal.integrated.tabs.enabled": true,
      "terminal.integrated.fontFamily": "MesloLGS NF",
      "terminal.integrated.cursorStyle": "line",
      "terminal.integrated.lineHeight": 1,
      `}</Code>

      <H>Autocomplete via FIG</H>

      <p>Download <Lnk path='https://fig.io/'>Fig</Lnk> for autocomplete and IntelliSense in iTerm.</p>
      <p>We got IntelliSense in the terminal inside VSCode.</p>
      <p>Path autocomplete</p>
      <LazyImg src='/imgs/iTerm2/fig/fig1.png' />
      <p>Git autocomplete</p>
      <LazyImg src='/imgs/iTerm2/fig/fig2.png' />

      <H>Custom IntelliSense</H>

      <ul>
        <li>Instruction how to add your custom IntelliSense can be found <Lnk path='https://fig.io/docs/getting-started'>here</Lnk>. </li>
        <li>Firstly clone Fig <Lnk path='https://github.com/withfig/autocomplete'>repo</Lnk> from GitHub to your computer by <Code bash>{'git clone git@github.com:withfig/autocomplete.git figAutocomplete'}</Code> </li>
        <li>To create our own autocomplete we need to create it with internal tool and re-build the project. </li>
        <li>That is why drop into Fig project <Code bash>cd figAutocomplete</Code> & install all internal packages <Code bash>npm i</Code> </li>
        <li>Create an own snippet file with <Code bash>npm run create-spec myOwnSnippet</Code> & run dev mode <Code bash>npm run dev</Code> </li>
        <LazyImg src='/imgs/iTerm2/fig/createOwnSnippet.png' />
        <li>Open the snippet boiler plate and modify it <Code bash>{'code src/myOwnSnippet.ts'}</Code> </li>
      </ul>

      <Code block ts>{`
      const completionSpec: Fig.Spec = {
        name: "myOwnSnippet",
        description: "Some description",
        subcommands: [{
          name: "my_subcommand",
          description: "Example subcommand",
          subcommands: [{
            name: "my_nested_subcommand",
            description: "Nested subcommand, example usage: 'myOwnSnippet my_subcommand my_nested_subcommand'"
          }],
        }],
        options: [{
          name: ["--help", "-h"],
          description: "Show help for myOwnSnippet",
        }],
        // Only uncomment if myOwnSnippet takes an argument
        // args: {}
      };
      export default completionSpec;
      `}</Code>

      <p>Ones we done <Code bash>npm run build && npm run copy:all</Code></p>

      <p>Your .js file transpiled from the .ts one can be found and read from Fig folder <Code bash>{'code ~/.fig/autocomplete/build/myOwnSnippet.js'}</Code></p>

      <LazyImg src='/imgs/iTerm2/fig/myOwnSnippetResult.png' />

      <H>My completion for Git</H>

      <p>Open the file with completions for git <Code bash>{'code ~/Git/figAutocomplete/src/git.ts'}</Code> and add following to the end of the file.</p>

      <Code block ts>{`
      additionalSuggestions: [
        {
          name: "commit -m 'msg'",
          description: "Git commit shortcut",
          insertValue: "commit -m '{cursor}'",
          icon: "fig://template?color=2ecc71&badge=🔥",
          // type: "shortcut",
        },
        {
          name: "git add . && git commit -m 'msg' && git push",
          description: "My git shortcut",
          insertValue: "add . && git commit -m '{cursor}' && git push",
          icon: "fig://template?color=2ecc71&badge=💩",
          // type: "shortcut", 
        },
      ],
      `}</Code>

      <p>Run <Code bash>npm run build && npm run copy:all</Code></p>

      <LazyImg src='/imgs/iTerm2/fig/myCompletionForGit.png' />

      <H>Settings</H>

      <p><Code bash>code ~/.fig/settings.json</Code> open settings file.</p>

      <H>Ruby version in right corner</H>

      <p>After React Native installation I got annoying ruby logo with version at the end of every line in terminal. To remove it...</p>

      <ul>
        <li><Code>code ~/.p10k.zsh</Code></li>
        <li>Comment out following line <code>rvm # ruby version from rvm (https://rvm.io)</code></li>
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
