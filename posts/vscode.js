import { Code, H, jsxToStr, Lnk } from '/components/post/reExport'

const postObj = {
  title: 'VSCode',
  date: '2022.02.03',
  tags: ['tools'],
  desc: 'VSCode settings & suggestions disable',
  body: (
    <>
      <H>Open folder in VSCode from terminal</H>

      <ul>
        <li>To open a folder in VSCode from the terminal need to add PATH. </li>
        <li>Find command <Lnk path='https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line'>command</Lnk> <Code>Install 'code' command in PATH </Code> in vs Code Command Palette <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd></li>
        <li><Code>code .</Code> opens current folder in a new VS Code instance</li>
        <li><Code>code -r</Code> opens current folder in an opened VS Code instance</li>
        <li><Code>code file_name.txt</Code> opens or creates the file</li>
        <li><Code>code -h</Code> help</li>
      </ul>

      <H>VSCode settings</H>

      <Code block json>{`
      {
        "breadcrumbs.enabled": true, // path at the top
        "workbench.editor.enablePreview": true, // file soft opening 
        "git.ignoreWindowsGit27Warning": true,
        "editor.linkedEditing": true,
        "editor.tabSize": 2,
        "prettier.singleQuote": true,
        "editor.wordWrapColumn": 100,
        "html.format.wrapLineLength": 100,
        "editor.formatOnSaveMode": "modifications",
        "cSpell.userWords": [ "antonarbus", "autogrow" ],
        "editor.accessibilitySupport": "off",
        "settingsSync.keybindingsPerPlatform": false,
        "editor.detectIndentation": false,
        
        // terminal
        "terminal.external.windowsExec": "C:\\\\Program Files\\\\Git\\\\git-bash.exe",
        "terminal.integrated.tabs.enabled": true,
        "terminal.integrated.fontFamily": "MesloLGS NF",
        "terminal.integrated.cursorStyle": "line",
        "terminal.integrated.lineHeight": 1,
        "terminal.external.osxExec": "iTerm.app",
        "terminal.integrated.defaultProfile.windows": "Git Bash",
        "terminal.integrated.defaultProfile.osx": "zsh",
        "terminal.integrated.profiles.windows": { "C:\\\\WINDOWS\\\\System32\\\\WindowsPowerShell\\\\v1.0\\\\powershell.exe (migrated)": { "path": "C:\\\\WINDOWS\\\\System32\\\\WindowsPowerShell\\\\v1.0\\\\powershell.exe", "args": [] } },
        "terminal.integrated.env.osx": {
          "FIG_NEW_SESSION": "1"
        },

        "files.defaultLanguage": "\${activeEditorLanguage}",
        "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
        "[jsonc]": { "editor.defaultFormatter": "vscode.json-language-features" },
        "[html]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
        "[python]": { "editor.defaultFormatter": "ms-python.python" },
        
        // live server
        "liveServer.settings.donotShowInfoMsg": true,
        "liveServer.settings.port": 8080,

        "security.workspace.trust.untrustedFiles": "open",
        "htmltagwrap.tag": "span",
        "emmet.triggerExpansionOnTab": true,
        "emmet.includeLanguages": { "javascript": "javascriptreact" },
        "emmet.syntaxProfiles": { "javascript": "jsx", "typescript": "jsx", "typescriptreact": "jsx", },
        "files.associations": { "*.scss": "scss", "*.js": "javascript" },
        "debug.javascript.autoAttachFilter": "disabled",
        "explorer.compactFolders": false,
        "editor.autoClosingBrackets": "always",
        "editor.foldingImportsByDefault": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "workbench.tree.expandMode": "doubleClick",
        "editor.fontLigatures": true,
        "editor.fontFamily": "Fira Code",
        "editor.rulers": [ 100 ],
        "js/ts.implicitProjectConfig.checkJs": true,
        "diffEditor.renderSideBySide": false,
        "workbench.editor.highlightModifiedTabs": true,
        "js/ts.implicitProjectConfig.strictNullChecks": true,
        "autoimport.filesToScan": "**/*.{ts,tsx,js,jsx}",
        "workbench.colorTheme": "Default Dark+",

        // to disable TypeScript warnings in VSCode - put false
        "typescript.validate.enable": true,
        "javascript.validate.enable": true,

        // show eslint icon at bottom toolbar
        "eslint.alwaysShowStatus": true,

        // prettier
        "prettier.arrowParens": "avoid",
        "prettier.semi": false,
        "prettier.trailingComma": "all",
        "prettier.printWidth": 100,
        "search.exclude": { "**/phpmyadmin": true },
        "bracket-pair-colorizer-2.depreciation-notice": false,
        "files.hotExit": "onExitAndWindowClose",
        "window.restoreWindows": "preserve",
        "editor.minimap.enabled": false,
        
        // suggestions
        "editor.acceptSuggestionOnEnter": "off",
        "editor.suggest.shareSuggestSelections": true,
        "editor.suggestSelection": "recentlyUsed",
        "editor.quickSuggestionsDelay": 200,
        "editor.suggest.snippetsPreventQuickSuggestions": false,
        "editor.wordBasedSuggestions": false,
        "editor.quickSuggestions": { "other": true, "comments": false, "strings": false },
        "editor.hover.enabled": true,
        "editor.parameterHints.enabled": true,
        "editor.acceptSuggestionOnCommitCharacter": false,

        "editor.suggest.preview": false,
        "workbench.startupEditor": "none",
        "vetur.experimental.templateInterpolationService": true,
        "vetur.validation.templateProps": true,
        "window.zoomLevel": 1
      }
      `}</Code>

      <H>Disable suggestions</H>

      <Code block json>{`
      {
        "editor.acceptSuggestionOnCommitCharacter": false,
        "editor.quickSuggestionsDelay": 100,
        "editor.suggest.snippetsPreventQuickSuggestions": false,
        "editor.suggestOnTriggerCharacters": false,
        "editor.wordBasedSuggestions": false,
        "editor.quickSuggestions": { "other": false, "comments": false, "strings": false },
        "editor.acceptSuggestionOnEnter": "off",
        "editor.hover.enabled": false,
        "editor.minimap.enabled": false,
        "editor.parameterHints.enabled": false,
      }
      `}</Code>

      <H>List of extensions</H>

      <p>Can be listed by <Code bash>code --list-extensions </Code></p>

      <Code block none>{`
      aaron-bond.better-comments
      albert.TabOut
      AndrewRazumovsky.vscode-styled-jsx-languageserver
      blanu.vscode-styled-jsx
      bradgashler.htmltagwrap
      CoenraadS.bracket-pair-colorizer-2
      dbaeumer.vscode-eslint
      dsznajder.es7-react-js-snippets
      eamodio.gitlens
      esbenp.prettier-vscode
      formulahendry.auto-rename-tag
      johnsoncodehk.volar
      johnsoncodehk.vscode-typescript-vue-plugin
      kuscamara.remove-unused-imports
      mgmcdermott.vscode-language-babel
      mikestead.dotenv
      octref.vetur
      oderwat.indent-rainbow
      patbenatar.advanced-new-file
      pranaygp.vscode-css-peek
      pustelto.bracketeer
      ritwickdey.live-sass
      ritwickdey.LiveServer
      sburg.vscode-javascript-booster
      sleistner.vscode-fileutils
      streetsidesoftware.code-spell-checker
      styled-components.vscode-styled-components
      tnrich.remove-whitespace-aka-join-words
      WallabyJs.quokka-vscode
      wingrunr21.vscode-ruby
      withfig.fig
      `}</Code>

      <H>Font</H>

      <p>Install <Lnk path='https://github.com/tonsky/FiraCode'>FiraCode</Lnk> font.</p>
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
