import { Code, H, LazyImg, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'key bindings',
  date: '2022.01.31',
  tags: ['optimization'],
  desc: 'key bindings on mac and windows',
  body: (
    <>
      <H>Karabiner-Elements app for Mac</H>

      <ul>
        <li>
          Download and install{' '}
          <Lnk path="https://karabiner-elements.pqrs.org">Karabiner-Elements</Lnk> key binding app
          for Mac{' '}
        </li>
        <li>
          Modify its configuration json file at <Code>code ~/.config/karabiner/karabiner.json</Code>
        </li>
        <li>
          Here is the example of my file where I added arrow keys shortcuts for <kbd>i</kbd>{' '}
          <kbd>k</kbd> <kbd>j</kbd> <kbd>l</kbd> keys
        </li>
      </ul>

      <Code block json>{`
      {
        "machine_specific": {
          "krbn-cee609c8-9b7f-430a-b018-9b91e0d62d3e": { "enable_multitouch_extension": true }
        },
        "profiles": [
          {
            "complex_modifications": {
              "rules": [
                {
                  "description": "Play/pause button should only control iTunes.",
                  "manipulators": [
                    {
                      "from": { "key_code": "f8" },
                      "to": [
                        { "shell_command": "osascript -e 'tell application \\"Music\\" to playpause'" }
                      ],
                      "type": "basic"
                    }
                  ]
                },
                {
                  "description": "Change caps_lock to command+control+option+shift.",
                  "manipulators": [
                    {
                      "from": {
                        "key_code": "caps_lock",
                        "modifiers": { "optional": ["any"] }
                      },
                      "to": [
                        {
                          "key_code": "left_shift",
                          "modifiers": ["left_command", "left_option"]
                        }
                      ],
                      "type": "basic"
                    }
                  ]
                },
                {
                  "description": "my own shortcuts",
                  "manipulators": [
                    {
                      "description": "Up",
                      "from": {
                        "modifiers": {
                          "mandatory": ["left_command", "left_option", "left_shift"],
                          "optional": ["any"]
                        },
                        "simultaneous": [{ "key_code": "i" }]
                      },
                      "to": [{ "key_code": "up_arrow" }],
                      "type": "basic"
                    },
                    {
                      "description": "Left",
                      "from": {
                        "key_code": "j",
                        "modifiers": {
                          "mandatory": ["left_command", "left_option", "left_shift"],
                          "optional": ["any"]
                        }
                      },
                      "to": [{ "key_code": "left_arrow" }],
                      "type": "basic"
                    },
                    {
                      "description": "Down",
                      "from": {
                        "key_code": "k",
                        "modifiers": {
                          "mandatory": ["left_command", "left_option", "left_shift"],
                          "optional": ["any"]
                        }
                      },
                      "to": [{ "key_code": "down_arrow" }],
                      "type": "basic"
                    },
                    {
                      "description": "Down",
                      "from": {
                        "key_code": "comma",
                        "modifiers": {
                          "mandatory": ["left_command", "left_option", "left_shift"],
                          "optional": ["any"]
                        }
                      },
                      "to": [{ "key_code": "down_arrow" }],
                      "type": "basic"
                    },
                    {
                      "description": "Up",
                      "from": {
                        "key_code": "i",
                        "modifiers": {
                          "mandatory": ["left_command", "left_option", "left_shift"],
                          "optional": ["any"]
                        }
                      },
                      "to": [{ "key_code": "up_arrow" }],
                      "type": "basic"
                    },
                    {
                      "description": "Right",
                      "from": {
                        "key_code": "l",
                        "modifiers": {
                          "mandatory": ["left_command", "left_option", "left_shift"],
                          "optional": ["any"]
                        }
                      },
                      "to": [{ "key_code": "right_arrow" }],
                      "type": "basic"
                    },
                    {
                      "description": "Backspace",
                      "from": {
                        "key_code": "u",
                        "modifiers": {
                          "mandatory": ["left_command", "left_option", "left_shift"],
                          "optional": ["any"]
                        }
                      },
                      "to": [{ "key_code": "delete_or_backspace" }],
                      "type": "basic"
                    },
                    {
                      "description": "Delete",
                      "from": {
                        "key_code": "o",
                        "modifiers": {
                          "mandatory": ["left_command", "left_option", "left_shift"],
                          "optional": ["any"]
                        }
                      },
                      "to": [{ "key_code": "delete_forward" }],
                      "type": "basic"
                    },
                    {
                      "description": "Home",
                      "from": {
                        "key_code": "h",
                        "modifiers": {
                          "mandatory": ["left_command", "left_option", "left_shift"],
                          "optional": ["any"]
                        }
                      },
                      "to": [{ "key_code": "home" }],
                      "type": "basic"
                    },
                    {
                      "description": "End",
                      "from": {
                        "key_code": "semicolon",
                        "modifiers": {
                          "mandatory": ["left_command", "left_option", "left_shift"],
                          "optional": ["any"]
                        }
                      },
                      "to": [{ "key_code": "end" }],
                      "type": "basic"
                    },
                    {
                      "description": "backtick",
                      "from": { "key_code": "equal_sign" },
                      "to": [{ "key_code": "equal_sign" }, { "key_code": "spacebar" }],
                      "type": "basic"
                    },
                    {
                      "description": "left curly brace",
                      "from": {
                        "key_code": "8",
                        "modifiers": { "mandatory": ["left_command"] }
                      },
                      "to": [
                        {
                          "key_code": "8",
                          "modifiers": ["left_shift", "left_option"]
                        }
                      ],
                      "type": "basic"
                    },
                    {
                      "description": "right curly brace",
                      "from": {
                        "key_code": "9",
                        "modifiers": { "mandatory": ["left_command"] }
                      },
                      "to": [
                        {
                          "key_code": "9",
                          "modifiers": ["left_shift", "left_option"]
                        }
                      ],
                      "type": "basic"
                    }
                  ]
                }
              ]
            },
            "devices": [
              {
                "identifiers": {
                  "is_keyboard": true,
                  "product_id": 834,
                  "vendor_id": 1452
                },
                "manipulate_caps_lock_led": false
              }
            ],
            "name": "Default profile",
            "selected": true,
            "virtual_hid_keyboard": {
              "keyboard_type_v2": "ansi"
            }
          }
        ]
      }
      `}</Code>

      <p>
        File data structure examples can be found{' '}
        <Lnk path="https://karabiner-elements.pqrs.org/docs/json/typical-complex-modifications-examples/">
          here
        </Lnk>
        .
      </p>

      <p>
        Also user generated key bindings community can be found{' '}
        <Lnk path="https://ke-complex-modifications.pqrs.org/">here</Lnk>, which can be uploaded via
        in <i>Complex modifications</i> tab.
      </p>

      <LazyImg path="/imgs/karabiner-elements-complex.png" />

      <H>AutoHotkey app for Win</H>

      <ul>
        <li>
          Download and install <Lnk path="https://www.autohotkey.com/">AutoHotkey</Lnk> key binding
          app for Windows.{' '}
        </li>
        <li>
          {' '}
          Create a file with <code>.ahk</code> extension, put following code inside and launch it.{' '}
        </li>
      </ul>

      <Code block none>{`
      #If GetKeyState("CapsLock", "P")
      j::Left
      k::Down
      i::Up
      l::Right
      h::Home
      ö::End
      u::Send, {BackSpace}
      o::Send, {Delete}
      ; Disable Alt+Space
      !Space::Return

      #If

      *CapsLock::
      KeyWait, CapsLock
      `}</Code>

      <p>
        Add the script file to the startup folder{' '}
        <Code>C:\Users\John\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup</Code>,
        folder can be opened by <kbd>Win</kbd>+<kbd>R</kbd> and <code>shell:startup</code>
      </p>

      <H>Key bindings in VSCode</H>

      <Code block json>{`
      // Place your key bindings in this file to override the defaults
      // https://code.visualstudio.com/api/references/when-clause-contexts

      [

        // #region go up & down by 10 lines
        {
          "key": "ctrl+up",
          "command": "cursorMove",
          "when": "editorTextFocus",
          "args": { 
            "to": "up",
            "by": "line",
            "value": 10
          }
        },
        {
          "key": "ctrl+down",
          "command": "cursorMove",
          "when": "editorTextFocus",
          "args": { 
            "to": "down",
            "by": "line",
            "value": 10
          }
        },
        // #endregion

        //#region prevent quitting on cmd+q
        {
          "key": "cmd+q",
          "command": "-workbench.action.quit"
        },
        //#endregion
        
        //#region insert code block for article
        {
          "key": "ctrl+shift+i ctrl+shift+c",
          "command": "editor.action.insertSnippet",
          "when": "editorTextFocus",
          "args": { // shortcut for a snippet
            // "langId": "javascript", // file name
            "name": "code block" // snippet name
          }
        },
        //#endregion

        //#region delete line & word 
        {
          "key": "ctrl+shift+backspace",
          "command": "editor.action.deleteLines",
          "when": "textInputFocus && !editorReadonly"
        },
        {
          "key": "shift+alt+backspace",
          "command": "deleteInsideWord"
        },
        //#endregion

        //#region OR ||
        {
          "key": "ctrl+shift+o ctrl+shift+r",
          "command": "type",
          "args": { "text": "||" },
          "when": "editorTextFocus",
        },
        //#endregion
        
        //#region comment out
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

        //#region brackets
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
        //#endregion

        //#region quotes
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

        //#region tags
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
        //#endregion

        //#region smart select
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

        //#region undo cursor
        {
          "key": "ctrl+shift+u",
          "command": "cursorUndo",
          "when": "textInputFocus"
        },
        //#endregion

        //#region placeholder
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

        //#region backticks
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

        //#region console
        {
          "key": "ctrl+shift+c ctrl+shift+l",
          "command": "editor.action.insertSnippet",
          "when": "editorTextFocus",
          "args": { // shortcut for a snippet
            "langId": "javascript", // file name
            "name": "console.log" // snippet name
          }
        },
        //#endregion

        //#region template literal
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

        //#region prettier
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

        //#region advancedNewFile
        {
          "key": "ctrl+shift+n", 
          "command": "extension.advancedNewFile",
          "when": "!terminalFocus"
        },
        //#endregion

        //#region commands & files menu
        {
          "key": "alt+p",
          "command": "workbench.action.showCommands"
        },
        //#endregion

        // #region jump with tab
        
        // {
        //   "key": "tab",
        //   "command": "cursorWordPartRight",
        //   "when": "textInputFocus && !inSnippetMode && !editorHasSelection"
        // },
        // {
        //   "key": "shift+tab",
        //   "command": "cursorWordPartLeft",
        //   "when": "textInputFocus && !inSnippetMode && !editorHasSelection"
        // },
        {
          "key": "tab",
          "command": "tabout",
          // "when": "editorTextFocus && !editorHasMultipleSelections && !inSnippetMode && !inlineSuggestionVisible && !suggestWidgetVisible"
          "when": "editorTextFocus && !editorHasMultipleSelections && !inSnippetMode && !inlineSuggestionVisible"
        },
        // #endregion

        // #region accept snippets with shift+enter or cmd+space, NOT with tab
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

        // #region convert into tag
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

        // #region indent line
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

        // #region comment
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

        // #region re-open closed tab
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

        // #region focus
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
          "key": "ctrl+shift+f ctrl+shift+s",
          "command": "workbench.view.search.focus"
        },
        // #endregion

        // #region Search
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
          "key": "ctrl+f",
          "command": "settings.action.search",
          "when": "inSettingsEditor"
        },
        // #endregion

        // #region re-open closed tab
        {
          "key": "ctrl+shift+t",
          "command": "workbench.action.reopenClosedEditor"
        },
        // #endregion



        // #region xxx
        {
        },
        // #endregion
      ]
      `}</Code>

      <H>Hammerspoon</H>

      <ul>
        <li>
          <Lnk path="https://www.hammerspoon.org/">https://www.hammerspoon.org/</Lnk>
        </li>
      </ul>

      <Code block jsx>{`
        // init.lua

        -- =========================
        -- 🧭 Vim Cursor Mode Config
        -- =========================

        -- Timeout (in seconds) before auto-exiting nav mode due to inactivity
        local navTimeoutSeconds = 2

        -- Mode and state tracking
        local navMode = hs.hotkey.modal.new({}, nil)
        local navModeActive = false
        local navTimeoutTimer = nil

        -- Visual overlay reference
        local overlay = nil

        -- === Visual Indicator ===
        local function showOverlay()
          local screen = hs.screen.mainScreen()
          local frame = screen:frame()

          local width, height = 100, 5
          local x = frame.x + frame.w - width
          local y = frame.y

          overlay = hs.drawing.rectangle(hs.geometry.rect(x, y, width, height))
          overlay:setFill(true)
          overlay:setFillColor({red=1, green=0, blue=0, alpha=0.6})
          overlay:setStroke(false)
          overlay:bringToFront(true)
          overlay:setLevel("status")
          overlay:show()
        end

        local function hideOverlay()
          if overlay then
            overlay:delete()
            overlay = nil
          end
        end

        -- === Timeout Logic ===
        local function resetNavTimeout()
          if navTimeoutTimer then
            navTimeoutTimer:stop()
          end
          navTimeoutTimer = hs.timer.doAfter(navTimeoutSeconds, function()
            navMode:exit()
          end)
        end

        -- === Mode Entry/Exit ===
        function navMode:entered()
          navModeActive = true
          showOverlay()
          resetNavTimeout()
        end

        function navMode:exited()
          navModeActive = false
          hideOverlay()
          if navTimeoutTimer then
            navTimeoutTimer:stop()
            navTimeoutTimer = nil
          end
        end

        -- === Toggle Key ===
        hs.hotkey.bind({"cmd"}, "space", function()
          if navModeActive then
            navMode:exit()
          else
            navMode:enter()
          end
        end)

        -- === Bindings (with timeout reset) ===
        local function navKey(key, modifiers)
          return function()
            hs.eventtap.keyStroke(modifiers or {}, key)
            resetNavTimeout()
          end
        end

        navMode:bind({}, "j", navKey("left"))
        navMode:bind({}, "i", navKey("up"))
        navMode:bind({}, "k", navKey("down"))
        navMode:bind({}, "l", navKey("right"))
        navMode:bind({}, "u", navKey("delete"))
        navMode:bind({}, "o", navKey("forwarddelete"))
        navMode:bind({"alt"}, "j", navKey("left", {"alt"}))
        navMode:bind({"alt"}, "l", navKey("right", {"alt"}))
        navMode:bind({"alt"}, "u", navKey("delete", {"alt"}))         
        navMode:bind({"alt"}, "o", navKey("forwarddelete", {"alt"}))
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
