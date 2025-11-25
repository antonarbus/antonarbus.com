'use client'


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
        // terminal
        "terminal.external.windowsExec": "C:\\\\Program Files\\\\Git\\\\git-bash.exe",
        "terminal.integrated.tabs.enabled": true,
        "terminal.integrated.fontFamily": "MesloLGS NF",
        "terminal.integrated.cursorStyle": "line",
        "terminal.integrated.lineHeight": 1,
        "terminal.external.osxExec": "iTerm.app",
        "terminal.integrated.defaultProfile.windows": "Git Bash",
        "terminal.integrated.defaultProfile.osx": "zsh",
        "terminal.integrated.profiles.windows": {
          "C:\\\\WINDOWS\\\\System32\\\\WindowsPowerShell\\\\v1.0\\\\powershell.exe (migrated)": {
            "path": "C:\\\\WINDOWS\\\\System32\\\\WindowsPowerShell\\\\v1.0\\\\powershell.exe",
            "args": []
          }
        },
        "terminal.integrated.env.osx": {
          "FIG_NEW_SESSION": "1"
        },
      
        // live server
        "liveServer.settings.donotShowInfoMsg": true,
        "liveServer.settings.port": 8080,
        "liveServer.settings.donotVerifyTags": true,
      
        // format
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "prettier.singleQuote": true,
        "prettier.printWidth": 100,
        "prettier.semi": false,
        "prettier.trailingComma": "none",
        "javascript.preferences.quoteStyle": "single",
        "typescript.preferences.quoteStyle": "single",
        "standard.enable": true,
        "standard.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
        "standard.workingDirectories": [],
        "editor.codeActionsOnSave": {
          "source.fixAll.eslint": "explicit"
        },
        // "eslint.validate": ["typescript", "typescriptreact"],
        "html.format.wrapLineLength": 100,
        "eslint.alwaysShowStatus": true, // show eslint icon at bottom toolbar
        "eslint.lintTask.enable": true,
        "eslint.debug": true,
        "eslint.enable": true,
        "eslint.format.enable": true,
        "editor.formatOnType": true,
        "eslint.validate": ["javascript"],
        "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
        "[typescriptreact]": { "editor.defaultFormatter": "vscode.typescript-language-features" },
        "[typescript]": { "editor.defaultFormatter": "vscode.typescript-language-features" },
        "[scss]": { "editor.defaultFormatter": "vscode.css-language-features" },
        "[json]": { "editor.defaultFormatter": "vscode.json-language-features" },
        "[css]": { "editor.defaultFormatter": "vscode.css-language-features" },
        "[jsonc]": { "editor.defaultFormatter": "vscode.json-language-features" },
        "[html]": { "editor.defaultFormatter": "vscode.html-language-features" },
      
        // suggestions
        "editor.acceptSuggestionOnEnter": "off",
        "editor.suggest.shareSuggestSelections": true,
        "editor.suggestSelection": "first",
        "editor.quickSuggestionsDelay": 200,
        "editor.suggest.snippetsPreventQuickSuggestions": false,
        "editor.wordBasedSuggestions": "off",
        "editor.quickSuggestions": { "other": true, "comments": false, "strings": false },
        "editor.hover.enabled": true,
        "editor.parameterHints.enabled": true,
        "editor.acceptSuggestionOnCommitCharacter": false,
        "editor.suggest.preview": false,
        "javascript.suggest.autoImports": true,
      
        // to disable TypeScript warnings in VSCode - put false
        "typescript.validate.enable": true,
        "javascript.validate.enable": false,
        "javascript.suggest.completeJSDocs": true,
      
        // git
        "git.autofetch": true,
        "git.enableSmartCommit": true,
        "git.confirmSync": false,
        "git.ignoreRebaseWarning": true,
        "gitlens.gitCommands.skipConfirmations": [
          "fetch:command",
          "stash-push:command",
          "switch:command",
          "push:command"
        ],
        "git.ignoreWindowsGit27Warning": true,
      
        // editor va
        "editor.minimap.enabled": false,
        "editor.renderWhitespace": "none",
        "editor.autoClosingBrackets": "always",
        "editor.foldingImportsByDefault": true,
        "editor.fontLigatures": true,
        "editor.fontFamily": "Fira Code",
        "editor.linkedEditing": true,
        "editor.tabSize": 2,
        "editor.wordWrapColumn": 100,
        "editor.formatOnSaveMode": "modifications",
        "editor.accessibilitySupport": "off",
        "editor.detectIndentation": false, // file soft opening
        "workbench.preferredHighContrastColorTheme": "Default Light+",
        "workbench.startupEditor": "none",
        "workbench.tree.expandMode": "doubleClick",
        "workbench.editor.highlightModifiedTabs": true,
      
        // emmet
        "emmet.triggerExpansionOnTab": true,
        "emmet.includeLanguages": { "javascript": "javascriptreact" },
        "emmet.syntaxProfiles": {
          "javascript": "jsx",
          "typescript": "jsx",
          "typescriptreact": "jsx"
        },
      
        // template-string-converter
        "template-string-converter.addBracketsToProps": true,
        "template-string-converter.autoRemoveTemplateString": true,
      
        // files
        "files.hotExit": "onExitAndWindowClose",
        "files.associations": { "*.scss": "scss", "*.js": "javascript" },
        "files.defaultLanguage": "\${activeEditorLanguage}",
      
        // va
        "cSpell.userWords": [
          "Aloitus",
          "antonarbus",
          "Arbus",
          "autofetch",
          "CIRCULA",
          "datatestid",
          "donot",
          "esbenp",
          "Fira",
          "htmltagwrap",
          "Meslo",
          "nestyo",
          "phpmyadmin"
        ],
        "settingsSync.keybindingsPerPlatform": false,
        "search.exclude": { "**/phpmyadmin": true },
        "bracket-pair-colorizer-2.depreciation-notice": false,
        "window.restoreWindows": "preserve",
        "security.workspace.trust.untrustedFiles": "open",
        "htmltagwrap.tag": "span",
        "debug.javascript.autoAttachFilter": "disabled",
        "explorer.compactFolders": false,
        "js/ts.implicitProjectConfig.checkJs": true,
        "js/ts.implicitProjectConfig.strictNullChecks": true,
        "standard.autoFixOnSave": true,
        "editor.stickyScroll.enabled": true,
        "quokka.suppressExpirationNotifications": true,
        "files.exclude": {
          "": true
        },
        "gitlens.advanced.messages": {
          "suppressRebaseSwitchToTextWarning": true
        },
      
      "git.mergeEditor": true,
      "codesnap.shutterAction": "copy",
      "githubPullRequests.createOnPublishBranch": "never",
      "githubPullRequests.terminalLinksHandler": "github",
      "diffEditor.ignoreTrimWhitespace": false,
      "githubPullRequests.fileListLayout": "tree",
      "githubPullRequests.pullBranch": "never",
      "window.commandCenter": true,
      "gitlens.views.branches.branches.layout": "list",
      "window.zoomLevel": 1,
      "[python]": {
        "editor.formatOnType": true
      },
      "workbench.colorTheme": "Default Dark+"
      }
      `}</Code>

      <H>Keyboard shortcuts</H>

      <Code block jsx>{`
        // Place your key bindings in this file to override the defaults
        // https://code.visualstudio.com/api/references/when-clause-contexts
        [
          //#region PREVENT QUITTING
          {
            "key": "cmd+q",
            "command": "-workbench.action.quit"
          },
          {
            "key": "ctrl+shift+w",
            "command": "-workbench.action.closeWindow"
          },
          //#endregion
          //#region DELETE LINE
          {
            "key": "ctrl+shift+backspace",
            "command": "editor.action.deleteLines",
            "when": "textInputFocus && !editorReadonly"
          },
          //#endregion
          //#region OR
          {
            "key": "ctrl+shift+o ctrl+shift+r",
            "command": "type",
            "args": {
              "text": "||"
            },
            "when": "editorTextFocus",
          },
          //#endregion
          //#region COMMENT OUT
          {
            "key": "ctrl+'",
            "command": "editor.action.commentLine",
            "when": "editorTextFocus && !editorReadonly"
          },
          {
            "key": "cmd+'",
            "command": "editor.action.commentLine",
            "when": "editorTextFocus && !editorReadonly"
          },
          //#endregion
          //#region BRACKETS
          {
            "key": "ctrl+shift+b ctrl+shift+s",
            "command": "bracketeer.swapBrackets"
          },
          {
            "key": "ctrl+shift+b ctrl+shift+r",
            "command": "bracketeer.removeBrackets"
          },
          {
            "key": "ctrl+shift+b ctrl+shift+a",
            "command": "bracketeer.selectBracketContent"
          },
          {
            "key": "ctrl+shift+c ctrl+shift+b",
            "command": "editor.action.insertSnippet",
            "when": "editorTextFocus",
            "args": {
              "name": "curly braces {}"
            }
          },
          //#endregion
          //#region QUOTES
          {
            "key": "ctrl+shift+q ctrl+shift+r",
            "command": "bracketeer.removeQuotes"
          },
          {
            "key": "ctrl+shift+q ctrl+shift+s",
            "command": "bracketeer.swapQuotes"
          },
          {
            "key": "ctrl+shift+q ctrl+shift+a",
            "command": "bracketeer.selectQuotesContent"
          },
          //#endregion
          //#region TAGS
          {
            "key": "ctrl+shift+t ctrl+shift+a",
            "command": "editor.emmet.action.balanceOut" // select tag in html
          },
          {
            "key": "ctrl+shift+t ctrl+shift+w",
            "command": "extension.htmlTagWrap", // wrap in div tag
            "when": "editorTextFocus"
          },
          {
            "key": "ctrl+shift+t ctrl+shift+r",
            "command": "editor.emmet.action.removeTag"
          },
          {
            "key": "ctrl+shift+i ctrl+shift+w",
            "command": "editor.action.insertSnippet",
            "when": "editorTextFocus",
            "args": { // shortcut for a snippet
              "langId": "javascript", // file name
              "name": "i tag" // snippet name
            }
          },
          {
            "key": "ctrl+shift+c ctrl+shift+w",
            "command": "editor.action.insertSnippet",
            "when": "editorTextFocus",
            "args": { // shortcut for a snippet
              "langId": "javascript", // file name
              "name": "code tag" // snippet name
            }
          },
          {
            "key": "ctrl+shift+l ctrl+shift+w",
            "command": "editor.action.insertSnippet",
            "when": "editorTextFocus",
            "args": { // shortcut for a snippet
              "langId": "javascript", // file name
              "name": "li tag" // snippet name
            }
          },
          {
            "key": "ctrl+shift+u ctrl+shift+w",
            "command": "editor.action.insertSnippet",
            "when": "editorTextFocus",
            "args": { // shortcut for a snippet
              "langId": "javascript", // file name
              "name": "ul tag" // snippet name
            }
          },
          {
            "key": "ctrl+shift+p ctrl+shift+w",
            "command": "editor.action.insertSnippet",
            "when": "editorTextFocus",
            "args": { // shortcut for a snippet
              "langId": "javascript", // file name
              "name": "p tag" // snippet name
            }
          },
          //#endregion
          //#region SMART SELECT
          {
            "key": "cmd+a",
            "command": "editor.action.smartSelect.expand",
            "when": "editorTextFocus"
          },
          {
            "key": "ctrl+a",
            "command": "editor.action.smartSelect.expand",
            "when": "editorTextFocus"
          },
          {
            "key": "shift+ctrl+a",
            "command": "editor.action.selectAll",
            "when": "editorTextFocus"
          },
          {
            "key": "shift+cmd+a",
            "command": "editor.action.selectAll",
            "when": "editorTextFocus"
          },
          //#endregion
          //#region UNDO CURSOR
          {
            "key": "ctrl+shift+u",
            "command": "cursorUndo",
            "when": "textInputFocus"
          },
          //#endregion
          //#region PLACEHOLDER
          {
            "key": "ctrl+shift+p ctrl+shift+h",
            "command": "editor.action.insertSnippet",
            "when": "editorTextFocus",
            "args": { // shortcut for a snippet
              "langId": "javascript", // file name
              "name": "placeholder" // snippet name
            }
          },
          //#endregion
          //#region BACK-TICKS
          {
            "key": "ctrl+shift+b ctrl+shift+t",
            "command": "editor.action.insertSnippet",
            "when": "editorTextFocus",
            "args": { // shortcut for a snippet
              // "langId": "javascript", // file name
              "name": "backticks" // snippet name
            }
          },
          //#endregion
          //#region CONSOLE
          {
            "key": "ctrl+shift+c ctrl+shift+l",
            "command": "editor.action.insertSnippet",
            "when": "editorTextFocus",
            "args": { // shortcut for a snippet
              "langId": "javascript", // file name
              "name": "console.log" // snippet name
            }
          },
          {
            "key": "ctrl+shift+r ctrl+shift+e",
            "command": "editor.action.insertSnippet",
            "when": "editorTextFocus",
            "args": { // shortcut for a snippet
              // "langId": "javascript", // file name
              "name": "region" // snippet name
            }
          },
          //#endregion
          //#region TEMPLATE LITERAL
          {
            "key": "ctrl+shift+t ctrl+shift+l",
            "command": "editor.action.insertSnippet",
            "when": "editorTextFocus",
            "args": { // shortcut for a snippet
              "langId": "javascript", // file name
              "name": "template literals \`\${}\`" // snippet name
            }
          },
          //#endregion
          //#region PRETTIER
          {
            "key": "ctrl+shift+p ctrl+shift+a",
            "command": "editor.action.formatDocument",
            "when": "editorHasDocumentFormattingProvider && editorTextFocus && !editorReadonly && !inCompositeEditor"
          },
          {
            "key": "ctrl+shift+p ctrl+shift+s",
            "command": "editor.action.formatSelection",
            "when": "editorHasDocumentSelectionFormattingProvider && editorTextFocus && !editorReadonly"
          },
          //#endregion
          //#region ADVANCED NEW FILE
          {
            "key": "ctrl+shift+n",
            "command": "extension.advancedNewFile",
            "when": "!terminalFocus"
          },
          //#endregion
          //#region COMMANDS & FILES MENU
          {
            "key": "alt+p",
            "command": "workbench.action.showCommands"
          },
          //#endregion
          // #region JUMP WITH TAB
          {
            "key": "tab",
            "command": "tabout",
            // "when": "editorTextFocus && !editorHasMultipleSelections && !inSnippetMode && !inlineSuggestionVisible && !suggestWidgetVisible"
            "when": "editorTextFocus && !editorHasMultipleSelections && !inSnippetMode && !inlineSuggestionVisible"
          },
          // #endregion
          // #region ACCEPT SNIPPETS WITH SHIFT+ENTER OR CMD+SPACE, NOT WITH TAB
          {
            "key": "tab",
            "command": "-acceptSelectedSuggestion",
            "when": "suggestWidgetVisible && textInputFocus"
          },
          {
            "key": "tab",
            "command": "-insertSnippet",
            "when": "editorTextFocus && hasSnippetCompletions && !editorTabMovesFocus && !inSnippetMode"
          },
          {
            "key": "cmd+space",
            "command": "editor.action.triggerSuggest",
            "when": "editorHasCompletionItemProvider && textInputFocus && !editorReadonly"
          },
          {
            "key": "ctrl+space",
            "command": "editor.action.triggerSuggest",
            "when": "editorHasCompletionItemProvider && textInputFocus && !editorReadonly"
          },
          {
            "key": "shift+enter",
            "command": "acceptSelectedSuggestion",
            "when": "suggestWidgetVisible && textInputFocus"
          },
          {
            "key": "shift+enter",
            "command": "insertSnippet",
            "when": "editorTextFocus && hasSnippetCompletions && !editorTabMovesFocus && !inSnippetMode"
          },
          {
            "key": "ctrl+space",
            "command": "acceptSelectedSuggestion",
            "when": "suggestWidgetVisible && textInputFocus"
          },
          {
            "key": "ctrl+space",
            "command": "insertSnippet",
            "when": "editorTextFocus && hasSnippetCompletions && !editorTabMovesFocus && !inSnippetMode"
          },
          {
            "key": "cmd+space",
            "command": "acceptSelectedSuggestion",
            "when": "suggestWidgetVisible && textInputFocus"
          },
          {
            "key": "cmd+space",
            "command": "insertSnippet",
            "when": "editorTextFocus && hasSnippetCompletions && !editorTabMovesFocus && !inSnippetMode"
          },
          {
            "key": "alt+space",
            "command": "acceptSelectedSuggestion",
            "when": "suggestWidgetVisible && textInputFocus"
          },
          {
            "key": "alt+space",
            "command": "insertSnippet",
            "when": "editorTextFocus && hasSnippetCompletions && !editorTabMovesFocus && !inSnippetMode"
          },
          // #endregion
          // #region CONVERT INTO TAG
          {
            "key": "tab",
            "command": "-editor.emmet.action.expandAbbreviation",
            "when": "config.emmet.triggerExpansionOnTab && editorTextFocus && !editorReadonly && !editorTabMovesFocus"
          },
          {
            "key": "shift+ctrl+enter",
            "command": "editor.emmet.action.expandAbbreviation",
            "when": "config.emmet.triggerExpansionOnTab && editorTextFocus && !editorReadonly && !editorTabMovesFocus"
          },
          // #endregion
          // #region INDENT LINE
          {
            "key": "ctrl+alt+right",
            "command": "editor.action.indentLines",
            "when": "editorTextFocus && !editorReadonly"
          },
          {
            "key": "ctrl+alt+left",
            "command": "editor.action.outdentLines",
            "when": "editorTextFocus && !editorReadonly"
          },
          // #endregion
          // #region COMMENT
          {
            "key": "ctrl+oem_5",
            "command": "editor.action.commentLine",
            "when": "editorTextFocus && !editorReadonly"
          },
          {
            "key": "ctrl+oem_2",
            "command": "editor.action.commentLine",
            "when": "editorTextFocus && !editorReadonly"
          },
          {
            "key": "ctrl+'",
            "command": "editor.action.commentLine",
            "when": "editorTextFocus && !editorReadonly"
          },
          // #endregion
          // #region OPEN TERMINAL
          {
            "key": "ctrl+shift+t ctrl+shift+n",
            "command": "workbench.action.terminal.new",
            "when": "terminalProcessSupported || terminalWebExtensionContributedProfile"
          },
          {
            "key": "ctrl+shift+oem_3",
            "command": "-workbench.action.terminal.new",
            "when": "terminalProcessSupported || terminalWebExtensionContributedProfile"
          },
          // #endregion
          // #region FOCUS
          {
            "key": "ctrl+shift+f ctrl+shift+t",
            "command": "terminal.focus"
          },
          {
            "key": "ctrl+k e",
            "command": "-workbench.files.action.focusOpenEditorsView",
            "when": "workbench.explorer.openEditorsView.active"
          },
          {
            "key": "ctrl+shift+f ctrl+shift+e",
            "command": "workbench.action.focusActiveEditorGroup"
          },
          {
            "key": "cmd+k e",
            "command": "-workbench.files.action.focusOpenEditorsView",
            "when": "workbench.explorer.openEditorsView.active"
          },
          {
            "key": "escape",
            "command": "-settings.action.focusLevelUp",
            "when": "inSettingsEditor && !inSettingsJSONEditor && !inSettingsSearch"
          },
          {
            "key": "ctrl+cmd+down",
            "command": "-notebook.cell.focusInOutput",
            "when": "notebookCellHasOutputs && notebookEditorFocused"
          },
          // #endregion
          // #region SEARCH
          {
            "key": "alt+f",
            "command": "workbench.action.findInFiles"
          },
          {
            "key": "ctrl+shift+f",
            "command": "-workbench.action.findInFiles"
          },
          // #endregion
          // #region FIND FILES
          {
            "key": "alt+f",
            "command": "workbench.action.findInFiles"
          },
          {
            "key": "ctrl+shift+f",
            "command": "-workbench.action.findInFiles"
          },
          {
            "key": "ctrl+shift+t ctrl+shift+t",
            "command": "workbench.action.reopenClosedEditor"
          },
          {
            "key": "ctrl+shift+f ctrl+shift+s",
            "command": "workbench.action.findInFiles"
          },
          // #endregion
          // #region SELECT ALL HIGHLIGHTS
          {
            "key": "ctrl+shift+d",
            "command": "editor.action.selectHighlights",
            "when": "editorFocus"
          },
          {
            "key": "shift+cmd+l",
            "command": "-editor.action.selectHighlights",
            "when": "editorFocus"
          },
          // #endregion
          // #region JOIN LINES
          {
            "key": "ctrl+shift+j ctrl+shift+l",
            "command": "editor.action.joinLines"
          },
          // #endregion
          // #region TOGGLE LAYOUT
          {
            "key": "ctrl+shift+c ctrl+shift+e",
            "command": "workbench.action.toggleCenteredLayout"
          },
          // #endregion
          // #region XXX
          {},
          {
            "key": "shift+cmd+'",
            "command": "editor.action.blockComment",
            "when": "editorTextFocus && !editorReadonly"
          },
          {
            "key": "shift+alt+a",
            "command": "-editor.action.blockComment",
            "when": "editorTextFocus && !editorReadonly"
          },
          {
            "key": "ctrl+shift+l ctrl+shift+l",
            "command": "turboConsoleLog.displayLogMessage"
          },
          {
            "key": "ctrl+alt+l",
            "command": "-turboConsoleLog.displayLogMessage"
          },
          // {
          //   "key": "ctrl+shift+f ctrl+shift+s",
          //   "command": "editor.createFoldingRangeFromSelection",
          //   "when": "editorTextFocus && foldingEnabled"
          // },
          {
            "key": "ctrl+k ctrl+oem_comma",
            "command": "-editor.createFoldingRangeFromSelection",
            "when": "editorTextFocus && foldingEnabled"
          },
          {
            "key": "ctrl+shift+u ctrl+shift+s",
            "command": "editor.removeManualFoldingRanges",
            "when": "editorTextFocus && foldingEnabled"
          },
          {
            "key": "ctrl+k ctrl+oem_period",
            "command": "-editor.removeManualFoldingRanges",
            "when": "editorTextFocus && foldingEnabled"
          },
          {
            "key": "ctrl+shift+b ctrl+shift+m",
            "command": "bookmarks.toggle",
            "when": "editorTextFocus"
          },
          {
            "key": "alt+cmd+k",
            "command": "-bookmarks.toggle",
            "when": "editorTextFocus"
          },
          {
            "key": "ctrl+shift+left",
            "command": "workbench.action.navigateBack",
            "when": "canNavigateBack"
          },
          {
            "key": "ctrl+-",
            "command": "-workbench.action.navigateBack",
            "when": "canNavigateBack"
          },
          {
            "key": "ctrl+-",
            "command": "-workbench.action.quickInputBack",
            "when": "inQuickOpen"
          },
          {
            "key": "ctrl+shift+left",
            "command": "-editor.action.smartSelect.shrink",
            "when": "editorTextFocus"
          },
          {
            "key": "ctrl+shift+right",
            "command": "workbench.action.navigateForward",
            "when": "canNavigateForward"
          },
          {
            "key": "ctrl+shift+-",
            "command": "-workbench.action.navigateForward",
            "when": "canNavigateForward"
          },
          {
            "key": "ctrl+shift+right",
            "command": "-editor.action.smartSelect.expand",
            "when": "editorTextFocus"
          },
          {
            "key": "ctrl+shift+s",
            "command": "saveAll"
          },
          {
            "key": "alt+cmd+s",
            "command": "-saveAll"
          },
          {
            "key": "ctrl+alt+cmd+n",
            "command": "-welcome.showNewFileEntries"
          },
          {
            "key": "ctrl+shift+n ctrl+shift+f",
            "command": "explorer.newFile",
            "when": "explorerViewletFocus"
          },
          {
            "key": "ctrl+shift+n ctrl+shift+d",
            "command": "explorer.newFolder",
            "when": "explorerViewletFocus"
          },
          {
            "key": "shift+cmd+n",
            "command": "-workbench.action.newWindow"
          },
          {
            "key": "ctrl+shift+down",
            "command": "workbench.action.terminal.focusNext",
            "when": "terminalFocus && terminalHasBeenCreated && !terminalEditorFocus || terminalFocus && terminalProcessSupported && !terminalEditorFocus"
          },
          {
            "key": "ctrl+shift+alt+cmd+9",
            "command": "-workbench.action.terminal.focusNext",
            "when": "terminalFocus && terminalHasBeenCreated && !terminalEditorFocus || terminalFocus && terminalProcessSupported && !terminalEditorFocus"
          },
          {
            "key": "ctrl+shift+up",
            "command": "workbench.action.terminal.focusPrevious",
            "when": "terminalFocus && terminalHasBeenCreated && !terminalEditorFocus || terminalFocus && terminalProcessSupported && !terminalEditorFocus"
          },
          {
            "key": "ctrl+shift+alt+cmd+8",
            "command": "-workbench.action.terminal.focusPrevious",
            "when": "terminalFocus && terminalHasBeenCreated && !terminalEditorFocus || terminalFocus && terminalProcessSupported && !terminalEditorFocus"
          },
          {
            "key": "ctrl+shift+f ctrl+shift+f",
            "command": "workbench.explorer.fileView.focus"
          },
          {
            "key": "cmd+l",
            "command": "-expandLineSelection",
            "when": "textInputFocus"
          },
          {
            "key": "cmd+l cmd+o",
            "command": "-extension.liveServer.goOnline",
            "when": "editorTextFocus"
          },
          {
            "key": "cmd+l cmd+c",
            "command": "-extension.liveServer.goOffline",
            "when": "editorTextFocus"
          },
          {
            "key": "cmd+l",
            "command": "cursorWordEndRight",
            "when": "textInputFocus"
          },
          {
            "key": "alt+right",
            "command": "-cursorWordEndRight",
            "when": "textInputFocus"
          },
          {
            "key": "shift+cmd+l",
            "command": "-selectAllSearchEditorMatches",
            "when": "inSearchEditor"
          },
          {
            "key": "shift+cmd+l",
            "command": "-addCursorsAtSearchResults",
            "when": "fileMatchOrMatchFocus && searchViewletVisible"
          },
          {
            "key": "shift+cmd+l",
            "command": "cursorWordEndRightSelect",
            "when": "textInputFocus"
          },
          {
            "key": "shift+alt+right",
            "command": "-cursorWordEndRightSelect",
            "when": "textInputFocus"
          },
          {
            "key": "cmd+j",
            "command": "cursorWordLeft",
            "when": "textInputFocus"
          },
          {
            "key": "alt+left",
            "command": "-cursorWordLeft",
            "when": "textInputFocus"
          },
          {
            "key": "shift+cmd+j",
            "command": "cursorWordLeftSelect",
            "when": "textInputFocus"
          },
          {
            "key": "shift+alt+left",
            "command": "-cursorWordLeftSelect",
            "when": "textInputFocus"
          },
          {
            "key": "cmd+j",
            "command": "-workbench.action.togglePanel"
          },
          {
            "key": "shift+cmd+j",
            "command": "-workbench.action.search.toggleQueryDetails",
            "when": "inSearchEditor || searchViewletFocus"
          },
          {
            "key": "cmd+backspace",
            "command": "-deleteAllLeft",
            "when": "textInputFocus && !editorReadonly"
          },
          {
            "key": "cmd+r",
            "command": "deleteInsideWord"
          },
          {
            "key": "ctrl+shift+f ctrl+shift+g",
            "command": "workbench.scm.focus"
          },
          {
            "key": "cmd+k cmd+0",
            "command": "-editor.foldAll",
            "when": "editorTextFocus && foldingEnabled"
          },
          {
            "key": "cmd+k shift+cmd+7",
            "command": "-editor.foldAllBlockComments",
            "when": "editorTextFocus && foldingEnabled"
          },
          {
            "key": "cmd+k cmd+-",
            "command": "-editor.foldAllExcept",
            "when": "editorTextFocus && foldingEnabled"
          },
          {
            "key": "cmd+k cmd+8",
            "command": "-editor.foldAllMarkerRegions",
            "when": "editorTextFocus && foldingEnabled"
          },
          {
            "key": "cmd+k cmd+1",
            "command": "-editor.foldLevel1",
            "when": "editorTextFocus && foldingEnabled"
          },
          {
            "key": "cmd+k cmd+2",
            "command": "-editor.foldLevel2",
            "when": "editorTextFocus && foldingEnabled"
          },
          {
            "key": "cmd+k cmd+3",
            "command": "-editor.foldLevel3",
            "when": "editorTextFocus && foldingEnabled"
          },
          {
            "key": "cmd+k cmd+4",
            "command": "-editor.foldLevel4",
            "when": "editorTextFocus && foldingEnabled"
          },
          {
            "key": "cmd+k cmd+5",
            "command": "-editor.foldLevel5",
            "when": "editorTextFocus && foldingEnabled"
          },
          {
            "key": "cmd+k cmd+6",
            "command": "-editor.foldLevel6",
            "when": "editorTextFocus && foldingEnabled"
          },
          {
            "key": "cmd+k cmd+7",
            "command": "-editor.foldLevel7",
            "when": "editorTextFocus && foldingEnabled"
          },
          {
            "key": "cmd+k ctrl+alt+cmd+8",
            "command": "-editor.foldRecursively",
            "when": "editorTextFocus && foldingEnabled"
          },
          // #endregion
          {
            "key": "cmd+i", // whatever keybinding you want
            "command": "cursorMove",
            "args": {
              "to": "up",
              "by": "line",
              "value": 5 // change this if you want
            },
            "when": "editorTextFocus"
          },
          {
            "key": "cmd+k", // whatever keybinding you want
            "command": "cursorMove",
            "args": {
              "to": "down",
              "by": "line",
              "value": 5 // change
            },
            "when": "editorTextFocus"
          },
          {
            "key": "cmd+r",
            "command": "-workbench.action.reloadWindow",
            "when": "isDevelopment"
          },
          {
            "key": "cmd+r",
            "command": "-workbench.action.terminal.runRecentCommand",
            "when": "accessibilityModeEnabled && terminalFocus && terminalHasBeenCreated || accessibilityModeEnabled && terminalFocus && terminalProcessSupported || accessibilityModeEnabled && accessibleViewIsShown && terminalHasBeenCreated && accessibleViewCurrentProviderId == 'terminal' || accessibilityModeEnabled && accessibleViewIsShown && terminalProcessSupported && accessibleViewCurrentProviderId == 'terminal'"
          }
        ]
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

      <H>Restore old synced settings</H>

      <ul>
        <li><Code>{'>settings sync: show synced data'}</Code></li>
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
