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
        <li>Download and install <Lnk path='https://karabiner-elements.pqrs.org'>Karabiner-Elements</Lnk> key binding app for Mac </li>
        <li>Modify its configuration json file  at <Code>~/.config/karabiner/karabiner.json</Code></li>
        <li>Here is the example of my file where I added arrow keys shortcuts for <kbd>i</kbd> <kbd>k</kbd> <kbd>j</kbd> <kbd>l</kbd> keys</li>
      </ul>

      <Code block json>{`
      {
        "global": {
          "check_for_updates_on_startup": true,
          "show_in_menu_bar": true,
          "show_profile_name_in_menu_bar": false,
          "unsafe_ui": false
        },
        "profiles": [
          {
            "complex_modifications": {
              "parameters": {
                "basic.simultaneous_threshold_milliseconds": 50,
                "basic.to_delayed_action_delay_milliseconds": 500,
                "basic.to_if_alone_timeout_milliseconds": 1000,
                "basic.to_if_held_down_threshold_milliseconds": 500,
                "mouse_motion_to_scroll.speed": 100
              },
              "rules": [
                {
                  "description": "Play/pause button should only control iTunes.",
                  "manipulators": [
                    {
                      "from": {
                        "key_code": "f8"
                      },
                      "to": [
                        {
                          "shell_command": "osascript -e 'tell application \"Music\" to playpause'"
                        }
                      ],
                      "type": "basic"
                    }
                  ]
                },
                {
                  "manipulators": [
                    {
                      "description": "Change caps_lock to command+control+option+shift.",
                      "from": {
                        "key_code": "caps_lock",
                        "modifiers": {
                          "optional": [
                            "any"
                          ]
                        }
                      },
                      "to": [
                        {
                          "key_code": "left_shift",
                          "modifiers": [
                            "left_command",
                            "left_option"
                          ]
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
                          "mandatory": [
                            "left_command",
                            "left_option",
                            "left_shift"
                          ],
                          "optional": [
                            "any"
                          ]
                        },
                        "simultaneous": [
                          {
                            "key_code": "i"
                          }
                        ]
                      },
                      "to": [
                        {
                          "key_code": "up_arrow"
                        }
                      ],
                      "type": "basic"
                    },
                    {
                      "description": "Left",
                      "from": {
                        "key_code": "j",
                        "modifiers": {
                          "mandatory": [
                            "left_command",
                            "left_option",
                            "left_shift"
                          ],
                          "optional": [
                            "any"
                          ]
                        }
                      },
                      "to": [
                        {
                          "key_code": "left_arrow"
                        }
                      ],
                      "type": "basic"
                    },
                    {
                      "description": "Down",
                      "from": {
                        "key_code": "k",
                        "modifiers": {
                          "mandatory": [
                            "left_command",
                            "left_option",
                            "left_shift"
                          ],
                          "optional": [
                            "any"
                          ]
                        }
                      },
                      "to": [
                        {
                          "key_code": "down_arrow"
                        }
                      ],
                      "type": "basic"
                    },
                    {
                      "description": "Down",
                      "from": {
                        "key_code": "comma",
                        "modifiers": {
                          "mandatory": [
                            "left_command",
                            "left_option",
                            "left_shift"
                          ],
                          "optional": [
                            "any"
                          ]
                        }
                      },
                      "to": [
                        {
                          "key_code": "down_arrow"
                        }
                      ],
                      "type": "basic"
                    },
                    {
                      "description": "Up",
                      "from": {
                        "key_code": "i",
                        "modifiers": {
                          "mandatory": [
                            "left_command",
                            "left_option",
                            "left_shift"
                          ],
                          "optional": [
                            "any"
                          ]
                        }
                      },
                      "to": [
                        {
                          "key_code": "up_arrow"
                        }
                      ],
                      "type": "basic"
                    },
                    {
                      "description": "Right",
                      "from": {
                        "key_code": "l",
                        "modifiers": {
                          "mandatory": [
                            "left_command",
                            "left_option",
                            "left_shift"
                          ],
                          "optional": [
                            "any"
                          ]
                        }
                      },
                      "to": [
                        {
                          "key_code": "right_arrow"
                        }
                      ],
                      "type": "basic"
                    },
                    {
                      "description": "Backspace",
                      "from": {
                        "key_code": "u",
                        "modifiers": {
                          "mandatory": [
                            "left_command",
                            "left_option",
                            "left_shift"
                          ],
                          "optional": [
                            "any"
                          ]
                        }
                      },
                      "to": [
                        {
                          "key_code": "delete_or_backspace"
                        }
                      ],
                      "type": "basic"
                    },
                    {
                      "description": "Delete",
                      "from": {
                        "key_code": "o",
                        "modifiers": {
                          "mandatory": [
                            "left_command",
                            "left_option",
                            "left_shift"
                          ],
                          "optional": [
                            "any"
                          ]
                        }
                      },
                      "to": [
                        {
                          "key_code": "delete_forward"
                        }
                      ],
                      "type": "basic"
                    },
                    {
                      "description": "Home",
                      "from": {
                        "key_code": "h",
                        "modifiers": {
                          "mandatory": [
                            "left_command",
                            "left_option",
                            "left_shift"
                          ],
                          "optional": [
                            "any"
                          ]
                        }
                      },
                      "to": [
                        {
                          "key_code": "home"
                        }
                      ],
                      "type": "basic"
                    },
                    {
                      "description": "End",
                      "from": {
                        "key_code": "semicolon",
                        "modifiers": {
                          "mandatory": [
                            "left_command",
                            "left_option",
                            "left_shift"
                          ],
                          "optional": [
                            "any"
                          ]
                        }
                      },
                      "to": [
                        {
                          "key_code": "end"
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
                "disable_built_in_keyboard_if_exists": false,
                "fn_function_keys": [],
                "identifiers": {
                  "is_keyboard": true,
                  "is_pointing_device": true,
                  "product_id": 45915,
                  "vendor_id": 1133
                },
                "ignore": false,
                "manipulate_caps_lock_led": true,
                "simple_modifications": [],
                "treat_as_built_in_keyboard": false
              },
              {
                "disable_built_in_keyboard_if_exists": false,
                "fn_function_keys": [],
                "identifiers": {
                  "is_keyboard": true,
                  "is_pointing_device": false,
                  "product_id": 34304,
                  "vendor_id": 1452
                },
                "ignore": true,
                "manipulate_caps_lock_led": true,
                "simple_modifications": [],
                "treat_as_built_in_keyboard": false
              },
              {
                "disable_built_in_keyboard_if_exists": false,
                "fn_function_keys": [],
                "identifiers": {
                  "is_keyboard": true,
                  "is_pointing_device": false,
                  "product_id": 671,
                  "vendor_id": 76
                },
                "ignore": false,
                "manipulate_caps_lock_led": true,
                "simple_modifications": [],
                "treat_as_built_in_keyboard": false
              },
              {
                "disable_built_in_keyboard_if_exists": false,
                "fn_function_keys": [],
                "identifiers": {
                  "is_keyboard": true,
                  "is_pointing_device": false,
                  "product_id": 834,
                  "vendor_id": 1452
                },
                "ignore": false,
                "manipulate_caps_lock_led": true,
                "simple_modifications": [],
                "treat_as_built_in_keyboard": false
              },
              {
                "disable_built_in_keyboard_if_exists": false,
                "fn_function_keys": [],
                "identifiers": {
                  "is_keyboard": false,
                  "is_pointing_device": true,
                  "product_id": 834,
                  "vendor_id": 1452
                },
                "ignore": true,
                "manipulate_caps_lock_led": false,
                "simple_modifications": [],
                "treat_as_built_in_keyboard": false
              },
              {
                "disable_built_in_keyboard_if_exists": false,
                "fn_function_keys": [],
                "identifiers": {
                  "is_keyboard": false,
                  "is_pointing_device": true,
                  "product_id": 617,
                  "vendor_id": 76
                },
                "ignore": true,
                "manipulate_caps_lock_led": false,
                "simple_modifications": [],
                "treat_as_built_in_keyboard": false
              },
              {
                "disable_built_in_keyboard_if_exists": false,
                "fn_function_keys": [],
                "identifiers": {
                  "is_keyboard": false,
                  "is_pointing_device": true,
                  "product_id": 613,
                  "vendor_id": 76
                },
                "ignore": true,
                "manipulate_caps_lock_led": false,
                "simple_modifications": [],
                "treat_as_built_in_keyboard": false
              }
            ],
            "fn_function_keys": [
              {
                "from": {
                  "key_code": "f1"
                },
                "to": [
                  {
                    "consumer_key_code": "display_brightness_decrement"
                  }
                ]
              },
              {
                "from": {
                  "key_code": "f2"
                },
                "to": [
                  {
                    "consumer_key_code": "display_brightness_increment"
                  }
                ]
              },
              {
                "from": {
                  "key_code": "f3"
                },
                "to": [
                  {
                    "apple_vendor_keyboard_key_code": "mission_control"
                  }
                ]
              },
              {
                "from": {
                  "key_code": "f4"
                },
                "to": [
                  {
                    "apple_vendor_keyboard_key_code": "spotlight"
                  }
                ]
              },
              {
                "from": {
                  "key_code": "f5"
                },
                "to": [
                  {
                    "consumer_key_code": "dictation"
                  }
                ]
              },
              {
                "from": {
                  "key_code": "f6"
                },
                "to": [
                  {
                    "key_code": "f6"
                  }
                ]
              },
              {
                "from": {
                  "key_code": "f7"
                },
                "to": [
                  {
                    "consumer_key_code": "rewind"
                  }
                ]
              },
              {
                "from": {
                  "key_code": "f8"
                },
                "to": [
                  {
                    "consumer_key_code": "play_or_pause"
                  }
                ]
              },
              {
                "from": {
                  "key_code": "f9"
                },
                "to": [
                  {
                    "consumer_key_code": "fast_forward"
                  }
                ]
              },
              {
                "from": {
                  "key_code": "f10"
                },
                "to": [
                  {
                    "consumer_key_code": "mute"
                  }
                ]
              },
              {
                "from": {
                  "key_code": "f11"
                },
                "to": [
                  {
                    "consumer_key_code": "volume_decrement"
                  }
                ]
              },
              {
                "from": {
                  "key_code": "f12"
                },
                "to": [
                  {
                    "consumer_key_code": "volume_increment"
                  }
                ]
              }
            ],
            "name": "Default profile",
            "parameters": {
              "delay_milliseconds_before_open_device": 1000
            },
            "selected": true,
            "simple_modifications": [],
            "virtual_hid_keyboard": {
              "country_code": 0,
              "indicate_sticky_modifier_keys_state": true,
              "mouse_key_xy_scale": 100
            }
          }
        ]
      }
      `}</Code>

      <p>File data structure examples can be found <Lnk path='https://karabiner-elements.pqrs.org/docs/json/typical-complex-modifications-examples/'>here</Lnk>.</p>

      <p>Also user generated key bindings community can be found <Lnk path='https://ke-complex-modifications.pqrs.org/'>here</Lnk>, which can be uploaded via in <i>Complex modifications</i> tab.</p>

      <LazyImg path="/imgs/karabiner-elements-complex.png" />

      <H>AutoHotkey app for Win</H>

      <ul>
        <li> Download and install <Lnk path='https://www.autohotkey.com/'>AutoHotkey</Lnk> key binding app for Windows. </li>
        <li> Create a file with <code>.ahk</code> extension, put following code inside and launch it. </li>
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

      <p>Add the script file to the startup folder <Code>C:\Users\John\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup</Code>, folder can be opened by <kbd>Win</kbd>+<kbd>R</kbd> and <code>shell:startup</code></p>

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
