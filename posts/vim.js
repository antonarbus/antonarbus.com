import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'vim',
  date: '2023.10.15',
  tags: ['tools'],
  desc: 'vim text editor',
  body: (
    <>
      <H>LazyVim</H>

      <ul>
        <li>
          Notes are based on this resource
          <Lnk path="https://lazyvim-ambitious-devs.phillips.codes/course/chapter-1/">
            https://lazyvim-ambitious-devs.phillips.codes/course/chapter-1/
          </Lnk>
        </li>
      </ul>

      <H>Tutor</H>

      <ul>
        <li>
          <Code>:Tutor</Code> launch tutor
        </li>
      </ul>

      <H>Verb, count, motion</H>

      <ul>
        <li>count + verb + count + motion</li>
        <li>navigation is the default verb, can be omitted</li>
      </ul>

      <H>Motions</H>

      <ul>
        <li>
          <kbd>w</kbd> jump forward to the start of a word
        </li>
        <li>
          <kbd>e</kbd> jump forward to the end of a word
        </li>
        <li>
          <kbd>b</kbd> jump back to the start of a word
        </li>
        <li>
          <kbd>ge</kbd> jump back to the end of of a word
        </li>
        <li>
          <kbd>$</kbd> jump forward to the end of a line
        </li>
        <li>
          <kbd>0</kbd> jump backwards to the start of a line
        </li>
        <li>
          <kbd>^</kbd> same as <kbd>0</kbd>, but does not take white spaces into account
        </li>
        <li>
          <kbd>W</kbd> <kbd>E</kbd> <kbd>B</kbd> <kbd>gE</kbd> works the same, but splits words by
          white space, while lowercased versions split works also with dot, paren, quote
        </li>
      </ul>

      <H>Count + motion = Repeat motion</H>

      <ul>
        <li>
          <kbd>3w</kbd> jump forward to the end of a word 3 times
        </li>
      </ul>

      <H>Insert mode (text)</H>

      <ul>
        <li>
          <kbd>a</kbd> put caret after cursor
        </li>
        <li>
          <kbd>A</kbd> put caret at the end of the line
        </li>
        <li>
          <kbd>i</kbd> put caret before cursor
        </li>
        <li>
          <kbd>I</kbd> put caret at the start of the line
        </li>
        <li>
          <kbd>o</kbd> add line below and put caret
        </li>
        <li>
          <kbd>O</kbd> add line above and put caret
        </li>
        <li>
          <kbd>ge</kbd> go to the last insertion point
        </li>
        <li>
          <kbd>Esc</kbd> normal mode (navigate and manipulate text)
        </li>
        <li>
          <code>Ctrl+o</code> go back into Normal mode for one operation only
        </li>
        <li>
          <code>Ctrl+u</code> undo for current line in Insert mode
        </li>
      </ul>

      <H>Select</H>

      <ul>
        <li>
          <kbd>v</kbd> granule text selection in Visual mode
        </li>
        <li>
          <kbd>V</kbd> line text selection in Visual mode
        </li>
        <li>
          <kbd>Ctrl+v</kbd> block vertical text selection (handy for csv data), <kbd>$</kbd> -
          expands the selection to the longest line
        </li>
        <li>Or just click and drag mouse</li>
        <li>
          <kbd>Esc</kbd>/<kbd>v</kbd> exit Visual mode
        </li>
        <li>
          <kbd>gv</kbd> go back to prev selection
        </li>
        <li>
          <kbd>o</kbd> in Visual mode - jump to the start/end of selection
        </li>
        <li>
          <kbd>S</kbd> select with Seeking Surrounding Objects
        </li>
      </ul>

      <H>Expand selection</H>

      <ul>
        <li>
          there is no native vim way, but can use <code>treesitter</code> plugin
        </li>
        <li>
          Create or edit <code>~/.config/nvim/lua/plugins/treesitter.lua</code>
        </li>

        <Code block jsx>{`
          return {
            "nvim-treesitter/nvim-treesitter",
            opts = function(_, opts)
              opts.incremental_selection = vim.tbl_deep_extend("force", opts.incremental_selection or {}, {
                enable = true,
                keymaps = {
                  init_selection = "gnn", -- start at node under cursor
                  node_incremental = "grn", -- expand outward
                  node_decremental = "grm", -- shrink inward
                  scope_incremental = "grc", -- expand to scope (func/class)
                },
              })
            end,
          }
        `}</Code>

        <li>
          Run <code>:Lazy</code> sync, then restart NeoVim
        </li>
        <li>Put cursor inside some code.</li>
        <li>
          Type: <kbd>gnn</kbd> → selection starts.
        </li>
        <li>
          Then: <kbd>grn</kbd> → expand outward.
        </li>
        <li>
          Again: <kbd>grn</kbd> → expand more.
        </li>
        <li>
          <kbd>grm</kbd> → shrink back.
        </li>
      </ul>

      <H>Registers</H>

      <ul>
        <li>Registers are different named clipboards where you copy text</li>
        <li>
          <kbd>{'"'}</kbd> open register list
        </li>
        <li>
          <kbd>" a y y</kbd> copy line into named <code>a</code> register
        </li>
        <li>
          <kbd>" a p</kbd> paste from the <code>a</code> register
        </li>
        <li>you may also delete and replace into the register</li>
        <li>adding again to the same named register replaces the content</li>
        <li>
          <kbd>"Ay</kbd> copy into upper-cased named <code>A</code> register appends text into
          existing <code>a</code> register
        </li>
        <li>
          System clipboard is synched with <code>+</code> and <code>*</code> registers
        </li>
        <li>
          <kbd>Space s "</kbd> show all registers and add content to <code>+</code> register with{' '}
          <kbd>Enter</kbd>
        </li>
        <li>
          <kbd>Ctrl+r</kbd> show same registers menu in Insert mode
        </li>
        <li>
          last copied test is always available at <code>0</code> register and you may paste it with{' '}
          <kbd>" 0 p</kbd>
        </li>
        <li>
          Last typed text goes into <code>.</code> register
        </li>
        <li>
          Last deleted small text goes into <code>-</code> register
        </li>
        <li>
          The name of the file that you are currently editing goes into <code>%</code> register
        </li>
        <li>
          <code>:let @c=@.</code> copy <code>.</code> register to named <code>c</code> register
        </li>
      </ul>

      <H>Copy (yank)</H>

      <ul>
        <li>
          <kbd>y</kbd> copy highlighted text (yank)
        </li>
        <li>
          <kbd>yy</kbd> copy whole line
        </li>
        <li>
          <kbd>Y</kbd> copy to the end of the line
        </li>
        <li>
          <kbd>yw</kbd> copy to the word's end
        </li>
        <li>
          <kbd>yiq</kbd>/<kbd>yaq</kbd> copy inside nearest quotes / including quotes
        </li>
        <li>
          <kbd>yib</kbd>/<kbd>yab</kbd> copy inside nearest brackets / including brackets
        </li>
        <li>
          <kbd>yiw</kbd>/<kbd>yaw</kbd> copy nearest word / word and whitespaces around
        </li>
        <li>
          <kbd>yig</kbd> copy whole file
        </li>
      </ul>

      <H>Paste</H>

      <ul>
        <li>
          <kbd>p</kbd> paste deleted text after cursor
        </li>
        <li>
          <kbd>5p</kbd> paste 5 times
        </li>
        <li>
          <kbd>P</kbd> paste deleted text before cursor
        </li>
        <li>
          In Insert mode to paste <code>Ctrl+r</code> followed by <kbd>+</kbd>
        </li>
      </ul>

      <H>Yanky.nvim Plugin</H>

      <ul>
        <li>
          Install it from <code>:LazyExtras</code> and pushing <kbd>x</kbd> in front of it, then
          reload NeoVim
        </li>
        <li>
          <kbd>Space p</kbd> opens the clipboard history list
        </li>
        <li>
          <kbd>{'p[y[y[y…'}</kbd>/<kbd>{'p]y]y]y…'}</kbd> pastes previous/next clipboard entries in
          cycle
        </li>
        <li>
          <kbd>{'[p'}</kbd>/<kbd>{']p'}</kbd> pastes indented above/below current line
        </li>
        <li>
          <kbd>{'>p/<p/>P/<P'}</kbd> put after/before and indent right/left
        </li>
      </ul>

      <H>Undo, Redo</H>

      <ul>
        <li>
          <kbd>u</kbd> undo the last command
        </li>
        <li>
          <kbd>U</kbd> undo all for the line
        </li>
        <li>
          <kbd>Ctrl+r</kbd> redo
        </li>
        <li>
          <kbd>Ctrl+u</kbd> undo in Insert mode
        </li>
      </ul>

      <H>Command mode</H>

      <ul>
        <li>
          <kbd>:</kbd> command mode
        </li>
        <li>
          <kbd>:q!</kbd> exit without save
        </li>
      </ul>

      <H>Open project in NeoVim</H>

      <ul>
        <li>
          Navigate to you project in terminal with <kbd>cd</kbd>
        </li>
        <li>
          Type <code>nvim</code>
        </li>
      </ul>

      <H>Save</H>

      <ul>
        <li>
          <kbd>:w</kbd> write
        </li>
        <li>
          <kbd>:w TEST.txt</kbd> write under TEST name
        </li>
        <li>
          <kbd>:write TEST.txt</kbd> same
        </li>
        <li>
          <kbd>v</kbd> motion <kbd>:w</kbd> <code>FILENAME</code> saves the Visually selected lines
          in file FILENAME.
        </li>
      </ul>

      <H>Exit</H>

      <ul>
        <li>
          <kbd>:q</kbd> quite
        </li>
        <li>
          <kbd>:wq</kbd> write & quit
        </li>
        <li>
          <kbd>:x</kbd> write & quit
        </li>
        <li>
          <kbd>:q!</kbd> quit without save
        </li>
      </ul>

      <H>Navigate in list</H>

      <ul>
        <li>
          <kbd>Tab</kbd> move down in list
        </li>
        <li>
          <kbd>Ctrl+y</kbd> accept
        </li>
        <li>
          <kbd>Arrow Down</kbd> accept
        </li>
      </ul>

      <H>Cursor movement</H>

      <ul>
        <li>
          <kbd>j</kbd> up
        </li>
        <li>
          <kbd>k</kbd> down
        </li>
        <li>
          <kbd>h</kbd> left
        </li>
        <li>
          <kbd>l</kbd> right
        </li>
      </ul>

      <H>Cursor history</H>

      <ul>
        <li>
          <kbd>Ctrl+o</kbd> jump back in history location
        </li>
        <li>
          <kbd>Ctrl+i</kbd> jump forward in history location
        </li>
        <li>
          <kbd>Ctrl+g</kbd> show cursor position + file name
        </li>
      </ul>

      <H>Jump by line (go to)</H>

      <ul>
        <li>
          <kbd>15G</kbd> jumps to line #15
        </li>
        <li>
          <kbd>:15</kbd> jumps to line #15
        </li>
        <li>
          <kbd>gg</kbd> jumps to first line
        </li>
        <li>
          <kbd>G</kbd> jumps to last line
        </li>
      </ul>

      <H>Jump by sentence</H>

      <ul>
        <li>
          <kbd>{'('}</kbd> / <kbd>{')'}</kbd> jump to start/end of the sentence
        </li>
      </ul>

      <H>Jump by paragraph</H>

      <ul>
        <li>
          <kbd>{'{'}</kbd> / <kbd>{'}'}</kbd> jump to start/end of the paragraph
        </li>
      </ul>

      <H>Jump by bracket</H>

      <ul>
        <li>
          <kbd>{'['}</kbd> / <kbd>{']'}</kbd> open go to prev/next menu
        </li>
        <li>
          <kbd>{'])'}</kbd> go to block's <code>{')'}</code>
        </li>
        <li>
          <kbd>{']}'}</kbd> go to block's <code>{'}'}</code>
        </li>
        <li>
          <kbd>{']>'}</kbd> go to block's <code>{'>'}</code>
        </li>
        <li>
          <kbd>{']%'}</kbd> go to block's brace (universal, works for <Code>{'<>()[]{}'}</Code>)
        </li>
      </ul>

      <H>Jump to matching bracket</H>

      <ul>
        <li>Place cursor on bracket</li>
        <li>
          <kbd>%</kbd> jumps to closing bracket
        </li>
      </ul>

      <H>Jump by variable instance</H>

      <ul>
        <li>
          <kbd>{'[['}</kbd>/<kbd>{']]'}</kbd> jumps to prev/next variable instances
        </li>
      </ul>

      <H>Jump by function</H>

      <ul>
        <li>
          <kbd>{'[f'}</kbd>/<kbd>{']f'}</kbd> jumps to prev/next function start
        </li>
        <li>
          <kbd>{'[F'}</kbd>/<kbd>{']F'}</kbd> jumps to prev/next function end
        </li>
      </ul>

      <H>Jump by parameter</H>

      <ul>
        <li>
          <kbd>{'[a'}</kbd>/<kbd>{']a'}</kbd> jumps to prev/next parameter start
        </li>
        <li>
          <kbd>{'[A'}</kbd>/<kbd>{']A'}</kbd> jumps to prev/next parameter end
        </li>
      </ul>

      <H>Jump by method</H>

      <ul>
        <li>
          <kbd>{'[m'}</kbd>/<kbd>{']m'}</kbd> jumps to prev/next method start
        </li>
        <li>
          <kbd>{'[M'}</kbd>/<kbd>{']M'}</kbd> jumps to prev/next method end
        </li>
      </ul>

      <H>Jump by class</H>

      <ul>
        <li>
          <kbd>{'[c'}</kbd>/<kbd>{']c'}</kbd> jumps to prev/next class start
        </li>
        <li>
          <kbd>{'[C'}</kbd>/<kbd>{']C'}</kbd> jumps to prev/next class end
        </li>
      </ul>

      <H>Jump by scope</H>

      <ul>
        <li>
          <kbd>{'[i'}</kbd>/<kbd>{']i'}</kbd> jumps to start/end of scope
        </li>
      </ul>

      <H>Jump by error, warning, spell, diagnostic</H>

      <ul>
        <li>
          <kbd>{'[e'}</kbd>/<kbd>{']e'}</kbd> jumps to prev/next error
        </li>
        <li>
          <kbd>{'[w'}</kbd>/<kbd>{']w'}</kbd> jumps to prev/next warning
        </li>
        <li>
          <kbd>{'[s'}</kbd>/<kbd>{']s'}</kbd> jumps to prev/next spell issue (<Code>Space+us</Code>{' '}
          to enable spell check)
        </li>
        <li>
          <kbd>{'[d'}</kbd>/<kbd>{']d'}</kbd> jumps to prev/next diagnostic message
        </li>
        <li>
          <kbd>{'[t'}</kbd>/<kbd>{']t'}</kbd> jumps to prev/next TODO or FIXME comment
        </li>
        <li>
          <kbd>Space cd</kbd> show full error message under cursor
        </li>
      </ul>

      <H>Jump by hunk (changes)</H>

      <ul>
        <li>Hunk - modifications that haven't been staged or committed yet</li>
        <li>
          <kbd>{'[h'}</kbd>/<kbd>{']h'}</kbd> jumps to prev/next changes
        </li>
      </ul>

      <H>Go back/forward</H>

      <ul>
        <li>
          <kbd>Ctrl+o/i</kbd> go back/forward
        </li>
      </ul>

      <H>Go to definition</H>

      <ul>
        <li>
          <kbd>gd</kbd> go to definition
        </li>
      </ul>

      <H>Go to reference</H>

      <ul>
        <li>
          <kbd>gr</kbd> go to reference, shows the list of all files which uses the variable
        </li>
        <li>
          <kbd>Space s R</kbd> resumes your previous list
        </li>
        <li>
          <kbd>Alt+t</kbd> open all results in Trouble
        </li>
      </ul>

      <H>Go to symbol</H>

      <ul>
        <li>
          <kbd>Space s s</kbd> show list of symbols in file
        </li>
        <li>
          <kbd>Space c s</kbd> same, but another view, on the right side
        </li>
        <li>
          <kbd>Space s S</kbd> show list of symbols in project
        </li>
      </ul>

      <H>Show context info</H>

      <ul>
        <li>
          <kbd>K</kbd> show info (for ex. function signature from LSP)
        </li>
      </ul>

      <H>Marks</H>

      <ul>
        <li>
          <kbd>m a</kbd> mark line with <code>a</code>
        </li>
        <li>
          <kbd>' a</kbd> jump to the mark <code>a</code> within the file
        </li>
        <li>
          <kbd>m A</kbd> mark line globally with <code>A</code>, can jump to it from any file
        </li>
        <li>
          <kbd>'</kbd> open list with marks
        </li>
        <li>
          <kbd>Space s m</kbd> same, but different view with search
        </li>
        <li>
          <code>:delmarks a</code> delete the mark <code>a</code>
        </li>
        <li>
          <code>:delm a</code> same, delete the mark <code>a</code>
        </li>
        <li>
          <kbd>' .</kbd> jumps to the last place I inserted or changed text
        </li>
      </ul>

      <H>Jump to last edited text</H>

      <ul>
        <li>
          <kbd>' .</kbd> jumps to the last place I inserted or changed text
        </li>
      </ul>

      <H>Find</H>

      <ul>
        <li>
          <kbd>fx</kbd> puts you in Find mode and jumps to the nearest <code>x</code>
        </li>
        <li>
          <kbd>;</kbd>/<kbd>,</kbd> jumps to the next/prev one
        </li>
        <li>
          <kbd>3fx</kbd> jumps to the 3rd <code>x</code> from you
        </li>
        <kbd>F</kbd> searches backwards
      </ul>

      <H>To</H>

      <ul>
        <li>
          <kbd>t</kbd> same as Find mode, but puts cursor before the found char
        </li>
        <li>
          <kbd>t</kbd> searches for next char
        </li>
      </ul>

      <H>Seek</H>

      <ul>
        <li>
          <kbd>s</kbd> seek mode
        </li>
        <li>you may jump to any visible text simply by typing part of it</li>
        <li>and press green label character</li>
      </ul>

      <H>Seek in object</H>

      <ul>
        <li>May seek inside text object where your cursor is</li>
        <li>
          <kbd>v S</kbd>/<kbd>d S</kbd>/<kbd>c S</kbd>/<kbd>y S</kbd> select/delete/change/copy &
          enter into SEEK mode
        </li>
        <li>Green labels will surround the text part, a,b,c,d,e... from the inner to outer</li>
      </ul>

      <H>Seek remote</H>

      <ul>
        <li>
          May for ex copy (yank) something from remote place <kbd>r</kbd>
        </li>
        <li>
          <kbd>y r</kbd> (enters into Seek mode) + <code>phrase</code> + <kbd>i b</kbd> (inside
          brackets)
        </li>
        <li>Cursor comes back to the initial place</li>
      </ul>

      <H>Seek remote object</H>

      <ul>
        <li>
          Copy something from remote object with <kbd>R</kbd> (capital)
        </li>
        <li>Cursor comes back to original position</li>
        <li>
          <kbd>y R</kbd> (enters into Seek mode) + <code>phrase</code> + <code>a</code> (tag)
        </li>
        <li>
          Personally did not understand why it is helpful, better to jump to place, select & yank
        </li>
      </ul>

      <H>Surrounding Pair</H>

      <ul>
        <li>
          To change quotation marks or brackets, or content inside enable <code>mini.surround</code>{' '}
          extra plugin
        </li>
        <li>Select some text</li>
        <li>
          <kbd>gsa</kbd> add surrounding to selection
        </li>
        <li>
          <kbd>"</kbd>/<kbd>'</kbd>/<kbd>`</kbd> add quotation mark around
        </li>
        <li>
          <kbd>{'('}</kbd>/<kbd>{'{'}</kbd>/<kbd>{'['}</kbd> add braces with empty spaces
        </li>
        <li>
          <kbd>{')'}</kbd>/<kbd>{'}'}</kbd>/<kbd>{']'}</kbd> add braces without empty spaces
        </li>
        <li>
          Instead of selecting the text first may do directly <kbd>gsaiB"</kbd> to add quotation
          marks inside braces at your cursor
        </li>
        <li>
          <kbd>gsa$"</kbd> will surround text between the cursor and the end of the line with double
          quotation marks
        </li>
        <li>
          <kbd>gsaSb'</kbd> will surround text that you select with the label <code>b</code> after
          an <code>S</code> operation with single quotation marks
        </li>
        <li>
          <kbd>gsdb</kbd> delete surrounding braces
        </li>
        <li>
          <kbd>gsdq</kbd> delete surrounding quotes
        </li>
        <li>
          <kbd>{'gsd['}</kbd> delete surrounding square brackets
        </li>
        <li>
          <kbd>{'2gsd{'}</kbd> delete the second set of curly braces from cursor position
        </li>
        <li>
          <kbd>gsr"'</kbd> replace double quotes with single
        </li>
        <li>
          <kbd>gsfb</kbd>/<kbd>gsFb</kbd> jump to next/prev bracket
        </li>
        <li>
          <kbd>gsfb</kbd> highlight paired braces
        </li>
        <li>
          <kbd>gsat</kbd> add tags around selection
        </li>
      </ul>

      <H>Scroll</H>

      <ul>
        <li>
          <kbd>Ctrl+d/u</kbd> scroll down/up 50%
        </li>
        <li>
          <kbd>Ctrl+f/b</kbd> scroll down/up 100%
        </li>
        <li>
          <kbd>5</kbd> <kbd>Ctrl+f</kbd> scroll down 5 screens
        </li>
        <li>
          <kbd>Ctrl+e/y</kbd> scroll down/up 1 line
        </li>
        <li>
          <kbd>z</kbd> <kbd>t/b</kbd>scroll up/down to move active line almost to the top/bottom
        </li>
        <li>
          <kbd>zz</kbd> scroll to move active line to the middle
        </li>
      </ul>

      <H>Delete (verb)</H>

      <ul>
        <li>
          <kbd>d</kbd> [number] motion - delete operator
        </li>
        <li>
          <kbd>dh</kbd>/<kbd>dl</kbd> delete the character to the left/right of the cursor.
        </li>
        <li>
          <kbd>dw</kbd> delete to the beginning of next word
        </li>
        <li>
          <kbd>d2w</kbd> delete 2 words
        </li>
        <li>
          <kbd>de</kbd> delete to the end of the word
        </li>
        <li>
          <kbd>db</kbd> delete to the start of the word
        </li>
        <li>
          <kbd>d0</kbd> delete to the start of the line
        </li>
        <li>
          <kbd>d$</kbd> delete to the end of the line
        </li>
        <li>
          <kbd>dd</kbd> delete whole line (shortcut)
        </li>
        <li>
          <kbd>2dd</kbd> delete 2 lines
        </li>
        <li>
          <kbd>d2fe</kbd> delete to the second <code>e</code>, including <code>e</code>
        </li>
        <li>
          <kbd>d2ta</kbd> delete to the second <code>a</code>
        </li>
        <li>
          <kbd>dsfoos</kbd> the label <code>s</code> that pops up when you use Seek mode to seek to{' '}
          <code>foo</code>. Note that Seek mode jumps to the beginning of the word
        </li>
        <li>
          <kbd>D</kbd> delete to the end of the line (shortcut)
        </li>
        <li>
          <kbd>diq</kbd>/<kbd>daq</kbd> delete inside nearest quotes / including quotes
        </li>
        <li>
          <kbd>dib</kbd>/<kbd>dab</kbd> delete inside nearest brackets / including brackets
        </li>
        <li>
          <kbd>diw</kbd>/<kbd>daw</kbd> delete nearest word / word and whitespaces around
        </li>
      </ul>

      <H>Delete char (verb)</H>

      <ul>
        <li>
          <kbd>x</kbd> delete char under cursor
        </li>
        <li>
          <kbd>5x</kbd> delete 5 chars
        </li>
        <li>
          <kbd>X</kbd> delete char before cursor
        </li>
      </ul>

      <H>Change (verb)</H>

      <ul>
        <li>
          <kbd>c</kbd> - deletes and inters into Insert mode
        </li>
        <li>
          same as <kbd>d</kbd> + motion + <kbd>i</kbd>
        </li>
        <li>
          <kbd>cw</kbd> deletes to the end of the word & enters into Insert mode
        </li>
        <li>
          <kbd>cc</kbd> changes whole line (shortcut)
        </li>
        <li>
          <kbd>C</kbd> changes to the end of the line (shortcut)
        </li>
        <li>
          <kbd>ciq</kbd>/<kbd>caq</kbd> changes inside nearest quotes / including quotes
        </li>
        <li>
          <kbd>cib</kbd>/<kbd>cab</kbd> changes inside nearest brackets / including brackets
        </li>
        <li>
          <kbd>ciw</kbd>/<kbd>caw</kbd> changes nearest word / word and whitespaces around
        </li>
        <li>
          <kbd>cag</kbd> changes whole file
        </li>
      </ul>

      <H>Replace char (verb)</H>

      <ul>
        <li>
          <kbd>r</kbd> go into replace mode of single char, then <kbd>a</kbd> to replace with{' '}
          <code>a</code>
        </li>
        <li>
          <kbd>R</kbd> go into global replace mode
        </li>
      </ul>

      <H>Join lines</H>

      <ul>
        <li>
          <kbd>J</kbd> join lines merging white spaces
        </li>
        <li>
          <kbd>gJ</kbd> join lines keeping white spaces
        </li>
      </ul>

      <H>UpperCase & LowerCase</H>

      <ul>
        <li>
          <kbd>~</kbd> inverts case under the cursor
        </li>
        <li>
          <kbd>gU</kbd>/<kbd>gu</kbd> upper/lower case mode
        </li>
        <li>
          <kbd>gUU</kbd>/<kbd>guu</kbd> same, for whole line
        </li>
      </ul>

      <H>Dot repeat</H>

      <ul>
        <li>
          <kbd>.</kbd> repeats the verb
        </li>
        <li>
          <kbd>2.</kbd> repeats the verb two times (if you removed 3 lines with <kbd>3dd</kbd>,{' '}
          <kbd>2.</kbd> will not remove 6 lines, but 2)
        </li>
      </ul>

      <H>Record command</H>

      <ul>
        <li>
          <kbd>qq</kbd> start recording and store commands into <code>q</code> named register
        </li>
        <li>
          <kbd>q</kbd> stop recording
        </li>
        <li>
          <kbd>qQ</kbd> continue recording (append commands to <code>q</code> register)
        </li>
        <li>
          <kbd>Q</kbd> play most recent recording
        </li>
        <li>
          <kbd>@a</kbd> play back recording stored at <code>a</code> register saved previously by{' '}
          <kbd>qa</kbd>
        </li>
        <li>
          <kbd>@@</kbd> replay whichever register you most recently played
        </li>
        <li>
          To edit the recording just past it from the register by <kbd>"qp</kbd> if it was written
          to the named <code>q</code> register, then modify the text and copy it back to the{' '}
          <code>q</code> register by <kbd>"qyiw</kbd>
        </li>
      </ul>

      <H>Search in file</H>

      <ul>
        <li>
          <kbd>/</kbd> phrase search prompt, then <kbd>Enter</kbd> to jump to the first found match,
          or <kbd>Esc</kbd> to cancel it
        </li>
        <li>
          <kbd>?</kbd> phrase search prompt in backwards direction
        </li>
        <li>
          <kbd>n</kbd> find next
        </li>
        <li>
          <kbd>N</kbd> find next in reverse direction
        </li>
        <li>
          <kbd>Ctrl+o</kbd> go back to older position
        </li>
        <li>
          <kbd>Ctrl+i</kbd> go back to newer position
        </li>
        <li>Search is case insensitive until you put uppercase letter</li>
        <li>
          Include <code>\C</code> in your search phrase to make search case sensitive when you are
          interested only in lower cased results for ex.
        </li>
      </ul>

      <H>Regexp in search</H>

      <ul>
        <li>RegExp in Vim is strange</li>
        <li>
          <code>.</code> any char, <code>load..g</code> finds <code>loading</code>
        </li>
        <li>
          <code>\.</code> searches for <code>.</code> dot char
        </li>
        <li>
          <code>\S</code> not whitespace char
        </li>
        <li>
          <code>.*</code> match any string
        </li>
        <li>
          <code>\S\+</code> match any word without spaces
        </li>
        <li>
          <code>\=</code> optional, for ex <code>https\=:</code> will match <code>http</code> &{' '}
          <code>https</code>
        </li>
        <li>
          <code>\V</code> disable regexp for following search string
        </li>
      </ul>

      <H>Search and replace in file with Nvim-rip-substitute</H>

      <ul>
        <li>It is the plugin which has familiar dialog and easy to use</li>
        <li>
          Create <code>~/.config/nvim/lua/plugins/rip-substitute.lua</code> and restart NeoVim
          <Code block jsx>{`
            return {
              "chrisgrieser/nvim-rip-substitute",
              keys = {
                {
                  "g/",
                  function()
                    require("rip-substitute").sub()
                  end,
                  mode = { "n", "x" },
                  desc = "Rip Substitute",
                },
              },
            }
          `}</Code>
        </li>
        <li>
          <kbd>g /</kbd> open dialog in the lower right corner{' '}
        </li>
        <li>
          First line is for search, second line is for replace, use <kbd>j/k</kbd> to jump between
          them
        </li>
        <li>
          <kbd>Enter</kbd> in Normal mode or the <span>Ctrl+Enter</span> in Insert mode to perform
          the subtitution
        </li>
        <li>Use up/down arrows in Norma mode to select a previous substitution</li>
        <li>
          It supports RegExp by default <code>{'ba(r|z|n)'}</code> will find <code>bar</code>,{' '}
          <code>baz</code>, <code>ban</code>
        </li>
      </ul>

      <H>Search in project</H>

      <ul>
        <li>Telescope and RipGrep to be installed</li>
        <li>
          Maybe need to enable Telescope plugin via <code>:LazyExtras</code>
        </li>
        <li>
          <code>brew install ripgrep</code> install, it was not installed for me
        </li>
        <li>
          <kbd>Space /</kbd> open search prompt
        </li>
        <li>
          <kbd>Space s g</kbd> same
        </li>
      </ul>

      <H>Find and replace in file Vim way</H>

      <ul>
        <li>
          <Code>:substitute</Code> / <Code>:s</Code> enter into substitute mode
        </li>
        <li>
          <Code>:s/old/new</Code> replaces "old" with "new" first occurrence in line where your
          cursor is
        </li>
        <li>
          <Code>:.s/old/new</Code> same, but specifically indicate that operation is done on the
          same line, can be ommited as it is the default behaivor
        </li>
        <li>
          <Code>:s/old/new/g</Code> replaces "old" with "new" all occurrences in line where your
          cursor is
        </li>
        <li>
          <Code>:%s/old/new</Code> replaces first occurrences in every line of "old" with "new" in
          whole file
        </li>
        <li>
          <Code>:%s/old/new/g</Code> same, but all occurrences
        </li>
        <li>
          <Code>:5s/old/new/g</Code> replaces "old" with "new" at line 5
        </li>
        <li>
          <Code>5G</Code> maybe it is easier to jump to line 5 and then make replacement
        </li>
        <li>
          <Code>:2,5s/old/new/g</Code> replaces "old" with "new" all occurrences in 2...5 lines
        </li>
        <li>
          <Code>:,50s/old/new/g</Code> replaces "old" with "new" all occurrences from current line
          to line #50
        </li>
        <li>
          <Code>:,/text/s/old/new/g</Code> replaces "old" with "new" from current line to the first
          line with <code>text</code> including the line
        </li>
        <li>
          <Code>:%s/old/new/gc</Code> replaces "old" with "new" in file with prompt, useful when you
          need to skip some replacements
        </li>
        <li>
          <Code>:%s/old/new/gc</Code> <code>c</code> prompt flag, replaces "old" with "new" in file
          with prompt, useful when you need to skip some replacements
        </li>
        <li>
          <Code>:%s/old/new/gI</Code> <code>I</code> case sensitive flag
        </li>
        <li>
          <Code>:s//new</Code> if you omit search phrase, it replaces whatever pattern you last
          searched with "new"
        </li>
        <li>
          <Code>:s</Code> without any pattern or replacement, it will repeat the last pattern and
          replacement you did, but it will not use any previous flags, so most useful would be{' '}
          <code>:%sg</code> which means “repeat the last substitution on the entire file, globally.”
        </li>
      </ul>

      <H>Find and replace project wise</H>

      <ul>
        <li>
          <kbd>Space s r</kbd> open 'ripgrep' dialog
        </li>
        <li>
          <kbd>j</kbd>/<kbd>k</kbd> jump between fields
        </li>
        <li>As you type you get instant live update with proposed changes</li>
        <li>
          To accept changes you need to go back into normal mode with <kbd>Esc</kbd> and then{' '}
          <code>\r</code> to apply replacement
        </li>
        <li>
          You may modify replacement in preview window or even skip some replacements by deleting
          the preview line by <kbd>dd</kbd>. After that <kbd>\s</kbd> to sync changes.
        </li>
        <li>
          Press <kbd>Enter</kbd> over like in preview to jump to a source file
        </li>
        <li>
          <kbd>\t</kbd> open search history and <kbd>Enter</kbd> to reuse it
        </li>
      </ul>

      <H>External command</H>

      <ul>
        <li>
          <kbd>:!ls</kbd> show files
        </li>
        <li>
          <kbd>:!rm FILENAME</kbd> remove FILENAME file
        </li>
      </ul>

      <H>Read content and paste</H>

      <ul>
        <li>
          <code>:r TEST</code> reads content from the file TEST and pastes below the cursor
        </li>
        <li>
          <code>:r !ls</code> reads content from external command and pastes below the cursor
        </li>
      </ul>

      <H>Search file </H>

      <Hs>Search files in Current Working Directory</Hs>

      <ul>
        <li>
          <code>Current Working Directory</code> (CWD) is the directory where your terminal was in
          when you typed <code>nvim</code>
        </li>
        <li>
          <kbd>Space</kbd> <kbd>fF</kbd> files fuzzy search in (CWD)
        </li>
        <li>
          To check where you are, type <code>:pwd</code> (Print Working Directory)
        </li>
        <li>
          To change CWD <code>:cd path/to/directory</code>
        </li>
        <li>
          To change CWD just in one tab <code>:lcd path/to/directory</code>
        </li>
      </ul>

      <Hs>Search files in Root Directory</Hs>

      <ul>
        <li>
          <code>Root Directory</code> is where <code>package.json</code> or{' '}
          <code>tsconfig.json</code>
        </li>
        <li>
          <kbd>Space</kbd> <kbd>Space</kbd> files fuzzy search in current project
        </li>
        <li>
          <kbd>Space</kbd> <kbd>ff</kbd> same
        </li>
        <li>
          Root Directory may be confusing, coz they may change silently. Imagine you are in a
          monorepo with multiple tsconfig.json files and you will have different{' '}
          <code>Current Working Directory</code> depending on which file you are working on. In this
          case you may want to search relative to CWD
        </li>

        <Hs>Search gotchas</Hs>

        <li>Search is case insensitive, until you type a capital letter</li>
        <li>
          <code>phrase1 phrase2</code> - type <code>phrase1</code> first, get search results, hit{' '}
          <kbd>Space</kbd>, type second <code>phrase2</code>, already visible results will be
          narrowed by fuzzy search with second phrase, super convenient
        </li>
        <li>
          <kbd>Alt+s</kbd> seek mode (may need to enable <kbd>Alt</kbd> first{' '}
          <Code>iTerm2 → Preferences → Profiles → [your profile] → Keyboard</Code> and set Left
          Option Key to: <code>Esc+</code>)
        </li>
        <li>
          <kbd>Ctrl+j</kbd> <kbd>Ctrl+k</kbd> move down/up in the list
        </li>
        <li>
          <kbd>Ctrl+h</kbd> backspace
        </li>
        <li>
          <kbd>Tab</kbd> select multiple results
        </li>
        <li>
          <kbd>Enter</kbd> confirm selection
        </li>
        <li>
          <kbd>Esc</kbd> <kbd>Esc</kbd> exit from search mode
        </li>
      </ul>

      <H>Explorer</H>

      <ul>
        <li>
          <kbd>Space+e</kbd> open file explorer at Root Directory
        </li>
        <li>
          <kbd>Space+E</kbd> open file explorer at CWD
        </li>
        <li>
          <kbd>j</kbd>/<kbd>k</kbd> down/up
        </li>
        <li>
          <kbd>3j</kbd> jump down 3 lines
        </li>
        <li>
          <kbd>Enter</kbd> expand/collapse folder
        </li>
        <li>
          <kbd>Backspace</kbd> go to parent folder
        </li>
        <li>
          <kbd>Enter</kbd> expand/collapse folder
        </li>
        <li>
          <kbd>Tab</kbd> multiple select
        </li>
        <li>
          <kbd>Ctrl</kbd> <kbd>f/b</kbd> scroll down/up
        </li>
        <li>
          <kbd>i</kbd> jump to search field in Insert mode to search for a specific file
        </li>
        <li>
          <kbd>Alt+s</kbd> seek mode during Insert mode
        </li>
        <li>
          <kbd>s</kbd> seek mode also covers the explorer window
        </li>
        <li>
          <kbd>d</kbd> delete file
        </li>
        <li>
          <kbd>a</kbd> add file/folder
        </li>
        <li>
          <kbd>r</kbd> rename
        </li>
        <li>
          <kbd>y</kbd>/<kbd>p</kbd> copy/paste
        </li>
        <li>
          <kbd>m</kbd> move file
        </li>
        <li>
          <kbd>?</kbd> being focused on explorer - help window with other useful shortcuts
        </li>
      </ul>

      <H>mini.files</H>

      <p>Like explorer, but more Vim-ish</p>

      <Hs>mini.files Installation</Hs>

      <ul>
        <li>
          Go to LazyVim extras by <kbd>x</kbd> from the dashboard
        </li>
        <li>
          Move your cursor to the line that contains <code>mini.files</code>
        </li>
        <li>
          Press <kbd>x</kbd> to install, then restart NeoVim
        </li>
      </ul>

      <Hs>mini.files Usage</Hs>

      <ul>
        <li>
          <kbd>Space</kbd>
          <kbd>fm</kbd> open dir of current file at explorer
        </li>
        <li>
          <kbd>Space</kbd>
          <kbd>fM</kbd> open the directory where your terminal was in when you typed{' '}
          <code>nvim</code> (CWD)
        </li>
        <li>
          <kbd>j</kbd>/<kbd>k</kbd> move up/down
        </li>
        <li>
          <kbd>h</kbd>/<kbd>l</kbd> move out/in
        </li>
        <li>
          <kbd>o</kbd> add file/folder
        </li>
        <li>
          <kbd>dd</kbd> delete
        </li>
        <li>
          <kbd>i</kbd> go to Insert mode to rename
        </li>
        <li>
          <kbd>yy</kbd> copy
        </li>
        <li>
          <kbd>p</kbd> paste
        </li>
        <li>
          <kbd>q</kbd> close the explorer view
        </li>
        <li>
          <kbd>=</kbd> save changes
        </li>
      </ul>

      <H>Useful</H>

      <ul>
        <li>
          <Lnk path="https://marketplace.visualstudio.com/items?itemName=vscodevim.vim">
            vim plugin for vscode
          </Lnk>
        </li>
        <li>
          <Lnk path="https://marketplace.visualstudio.com/items?itemName=vintharas.learn-vim">
            learn vim plugin for vscode
          </Lnk>
        </li>
        <li>
          <Code>vimtutor</Code> terminal app to learn vim on most Unix operating systems
        </li>
        <li>
          <Lnk path="https://vim.rtorr.com/">cheatsheet</Lnk>
        </li>
      </ul>

      <H>NeoVim</H>

      <ul>
        <li>
          <Lnk path="https://neovim.io/">https://neovim.io/</Lnk> is Vim-based text editor
        </li>
        <li>
          <Lnk path="https://www.lazyvim.org/installation">LazyVim </Lnk> is opinionated popular
          Neovim setup
        </li>
        <li>
          <Lnk path="https://www.lazyvim.org/keymaps">LazyVim </Lnk>
          keybindings
        </li>
      </ul>

      <H>Font</H>

      <ul>
        <li>
          <Lnk path="https://www.nerdfonts.com/font-downloads">
            https://www.nerdfonts.com/font-downloads
          </Lnk>
        </li>
        <li>Download FiraCode Nerd Font, unzip, install all fonts</li>
        <li>Open iTerm2, then Preferences, then Profiles, then Text, pick FiraCode Nerd Font</li>
        <li>Restart the terminal</li>
      </ul>

      <H>Dashboard</H>

      <ul>
        <li>
          <code>:lua Snacks.dashboard()</code> open dashboard from editor
        </li>
      </ul>

      <H>Plugins</H>

      <ul>
        <li>
          The Lazy Extras mode can be accessed by pressing <kbd>x</kbd> from the dashboard or
        </li>
        <li>
          <code>:LazyExtras</code> from the editor
        </li>
        <li>
          Navigate and press <kbd>x</kbd> to pick
        </li>
        <li>Relaunch NeoVim</li>
        <li>
          <kbd>Space cm</kbd> open Mason, some other plugin list, alternative to LazyExtras
        </li>
      </ul>

      <H>Buffers</H>

      <ul>
        <li>
          <kbd>H</kbd>/<kbd>L</kbd> switch buffers visible in the currently active window
        </li>
        <li>
          <kbd>{'[b'}</kbd>/<kbd>{']b'}</kbd> same, switch buffers
        </li>
        <li>
          <kbd>Space ,</kbd> open current buffer list
        </li>
        <li>
          <kbd>Ctrl+x</kbd> close buffer from the list
        </li>
        <li>
          <kbd>Space `</kbd> switch to previous buffer
        </li>
        <li>
          <kbd>Space bb</kbd> same, switch to previous buffer
        </li>
        <li>
          <kbd>Space bd</kbd> close (delete) buffer
        </li>
        <li>
          <kbd>Space bD</kbd> close (delete) buffer & window split
        </li>
        <li>
          <kbd>Space bp</kbd> pin a buffer
        </li>
        <li>
          <kbd>Space</kbd> <kbd>bl</kbd>/<kbd>br</kbd>/<kbd>bo</kbd>/<kbd>bP</kbd> close to
          left/right/others/pinned buffers split
        </li>
        <li>
          <kbd>Space .</kbd> open scratch buffer where you may write notes. Scratch buffers are tied
          to the current working directory.
        </li>
        <li>
          <kbd>Space S</kbd> open scratch buffer list
        </li>
      </ul>

      <H>Windows</H>

      <ul>
        <li>Window in Vim is a pane or split</li>
        <li>
          <code>Space w v/s</code> split vertically/horizontally
        </li>
        <li>Same works in mini.files plugin</li>
        <li>
          <kbd>Ctrl+v/s</kbd> open in vertically/horizontally split from explorer
        </li>
        <li>
          <kbd>Ctrl+h/j/k/l</kbd> move between windows
        </li>
        <li>
          <kbd>Space w h/j/k/l</kbd> same, move between windows
        </li>
        <li>
          <kbd>Space w q</kbd> close window
        </li>
        <li>
          <kbd>Space w d</kbd> same, close window
        </li>
        <li>
          <kbd>Space w o</kbd> close other windows
        </li>
        <li>Resize split with mouse by dragging middle bar</li>
        <li>
          <kbd>{'Space w </>/+/-'}</kbd> same, resize split window
        </li>
        <li>
          <kbd>Space w =</kbd> reset split windows to equal size
        </li>
        <li>
          <kbd>Space w Space</kbd> go into Hydra mode, it will keep the menu open, now you may keep
          pressing <kbd>{'>>>>>'}</kbd> to continuously resize
        </li>
        <li>
          <kbd>Space u z</kbd> go into Zen mode, center the window and dim all around
        </li>
      </ul>

      <H>Tabs</H>

      <p>Skipped, did not understand why it is needed...</p>

      <H>Fold</H>

      <ul>
        <li>
          <kbd>z c/a</kbd> fold / unfold
        </li>
        <li>
          <kbd>za</kbd> toggle folding
        </li>
        <li>
          <kbd>zR</kbd> unfold all
        </li>
        <li>
          <kbd>zO</kbd> unfold all folds under cursor
        </li>
      </ul>

      <H>Session</H>

      <ul>
        <li>Session keeps information about windows, splits and tabs</li>
        <li>
          <kbd>Space qq</kbd> to exit LazyVim
        </li>
        <li>
          <code>cd</code> to the project and open NeoVim by <code>nvim</code>
        </li>
        <li>
          <kbd>s</kbd> to restore the last session
        </li>
        <li>
          <kbd>Space qs</kbd> same, restore session
        </li>
        <li>
          <kbd>Space qS</kbd> open session list, can be useful to see last opened projects
        </li>
        <li>
          <kbd>Space qd</kbd> close without saving the session, useful when you temporarily opened
          NeoVim and close it
        </li>
      </ul>

      <H>Language server</H>

      <ul>
        <li>
          <code>:LspRestart</code> restart the language server
        </li>
        <li>
          <code>:checkhealth</code>/<code>:LazyHealth</code> health of various installed plugins (do
          not expect all to be green) (there are overlaps, LazyHealth is easier to read)
        </li>
        <li>
          <kbd>Space xx/xX</kbd> show diagnostic window with list of errors
        </li>
      </ul>

      <H>Code action</H>

      <ul>
        <li>
          <kbd>Space ca</kbd> open code actions
        </li>
      </ul>

      <H>Notice</H>

      <ul>
        <li>
          NeoVim has a notice window in the top right corner where some important messages pops up
          once in a while
        </li>
        <li>
          <kbd>Space cna</kbd> show list of messages
        </li>
      </ul>

      <H>ESLint</H>

      <ul>
        <li>
          Lint plugin for NeoVim <code>nvim-lint</code>
        </li>
        <li>
          Add file <code>~/.config/nvim/lua/plugins/nvim-lint.lua</code>
        </li>
      </ul>

      <Code block lua>{`
        return {
          "mfussenegger/nvim-lint",
          event = { "BufReadPre", "BufNewFile" },
          config = function()
            local lint = require("lint")

            lint.linters_by_ft = {
              javascript = { "eslint" },
              typescript = { "eslint" },
              javascriptreact = { "eslint" },
              typescriptreact = { "eslint" },
            }

            -- Always use the project's local eslint
            lint.linters.eslint = lint.linters.eslint or {}
            lint.linters.eslint.prefer_local = "node_modules/.bin"

            -- Prefer the nearest folder that actually has the eslint binary;
            -- otherwise fall back to a folder with an ESLint config; else git root.
            lint.linters.eslint.cwd = function(bufnr)
              local bufpath = vim.api.nvim_buf_get_name(bufnr)
              local start = vim.fs.dirname(bufpath)

              -- 1) nearest node_modules/.bin/eslint
              local bin = vim.fs.find("node_modules/.bin/eslint", { path = start, upward = true })[1]
              if bin then
                -- strip trailing /node_modules/.bin/eslint -> project root
                return (bin:gsub("/node_modules/.bin/eslint$", ""))
              end

              -- 2) nearest ESLint config
              local cfg = vim.fs.find({
                "eslint.config.js",
                "eslint.config.cjs",
                ".eslintrc",
                ".eslintrc.json",
                ".eslintrc.js",
                ".eslintrc.cjs",
              }, { path = start, upward = true })[1]
              if cfg then
                return vim.fs.dirname(cfg)
              end

              -- 3) git root, then current cwd
              local git = vim.fs.find(".git", { path = start, upward = true })[1]
              return git and vim.fs.dirname(git) or vim.loop.cwd()
            end

            vim.api.nvim_create_autocmd({ "BufWritePost", "BufEnter", "InsertLeave" }, {
              callback = function()
                lint.try_lint()
              end,
            })
          end,
        }
      `}</Code>

      <H>Formatter</H>

      <ul>
        <li>
          Lint plugin for NeoVim <code>conform</code>
        </li>
        <li>
          Add file <code>~/.config/nvim/lua/plugins/conform.lua</code>
        </li>
      </ul>

      <Code block lua>{`
        return {
          "stevearc/conform.nvim",
          opts = {
            formatters_by_ft = {
              javascript = { "prettier" },
              javascriptreact = { "prettier" },
              typescript = { "prettier" },
              typescriptreact = { "prettier" },
              json = { "prettier" },
              css = { "prettier" },
              html = { "prettier" },
              yaml = { "prettier" },
              markdown = { "prettier" },
              -- add more filetypes if needed
            },
          },
        }
      `}</Code>

      <H>Commenting</H>

      <ul>
        <li>
          <kbd>gcc</kbd> comment/uncomment line
        </li>
        <li>
          <kbd>gc5j</kbd> comment 5 lines below
        </li>
        <li>
          <kbd>5gcc</kbd> same, comment 5 lines below, bit easier
        </li>
        <li>
          <kbd>gcap</kbd> comment out an entire block separated by newlines
        </li>
        <li>
          <kbd>gcSh</kbd> comment out the function surrounded by the <code>h</code> labels after the{' '}
          <kbd>S</kbd> is invoked
        </li>
        <li>
          <kbd>V5jgc</kbd> commenting can be applied on visual mode, select 5 lines and then comment
          them
        </li>
        <li>
          <kbd>gco</kbd>/<kbd>gcO</kbd> add comment below/above
        </li>
      </ul>

      <H>Indent</H>

      <ul>
        <li>
          <kbd>{'>>'}</kbd>/<kbd>{'<<'}</kbd> indent the line where cursor is
        </li>
        <li>
          Select text and <kbd>{'>'}</kbd>/<kbd>{'<'}</kbd> to indent
        </li>
        <li>Indentation is always applied automatically with formatting on save</li>
        <li>
          <code>gqag</code> format the entire file
        </li>
        <li>
          Also may select text and hit <kbd>=</kbd> to apply indentation
        </li>
        <li>
          In Insert mode <code>Ctrl+t/d</code> to indent (“add tab” and “dedent”)
        </li>
      </ul>

      <H>Wrap</H>

      <ul>
        <li>
          <kbd>gww</kbd> wrap line to 80 chars
        </li>
        <li>
          <kbd>gwip</kbd> wrap paragraph
        </li>
        <li>
          <kbd>gwig</kbd> wrap file
        </li>
        <li>
          <code>{':set textwidth=<number>'}</code> set wrap width
        </li>
      </ul>

      <H>Spell check</H>

      <ul>
        <li>
          <Code>Space us</Code> enable/disable spell check
        </li>
        <li>
          <code>{'[s'}</code>/<code>{']s'}</code> next/prev misspelled word
        </li>
        <li>
          <code>z=</code> show suggestion
        </li>
      </ul>

      <H>Snippets & Abbreviations</H>

      <ul>
        <li>
          <Lnk path="https://lazyvim-ambitious-devs.phillips.codes/course/chapter-14/#_abbreviations_and_filetype_configuration">
            check later...
          </Lnk>
        </li>
      </ul>

      <H>Terminal in vim</H>

      <ul>
        <li>
          <kbd>Ctrl+/</kbd> open Vim's terminal (Vim has it's own terminal)
        </li>
        <li>
          <code>Esc</code> exit from Insert to Normal mode (that is how zsh is configured)
        </li>
        <li>
          <kbd>a</kbd>/<kbd>i</kbd> go into Insert mode
        </li>
      </ul>

      <H>Git in</H>

      <ul>
        <li>
          <kbd>Space gs</kbd> opens list of changed files
        </li>
        <li>
          <kbd>Space gc</kbd> opens list of commits
        </li>
        <li>
          <kbd>Space ghs</kbd> stage hunk
        </li>
        <li>
          <kbd>Space ghS</kbd> stage file
        </li>
        <li>
          <kbd>Space ghr</kbd> reset hunk
        </li>
        <li>
          <kbd>Space ghR</kbd> reset file
        </li>
        <li>
          <kbd>Space ghu</kbd> unstage hunk
        </li>
        <li>
          <kbd>Space ghb</kbd> git blame, check commit for the active line
        </li>
        <li>
          <kbd>Space ghp</kbd> preview the hunk, what has been changed
        </li>
        <li>
          <kbd>Space ghd</kbd> show diff between the current file (right) and the staging index file
          (left)
        </li>
        <li>
          <kbd>Space ghD</kbd> show diff between the current file and the last commit
        </li>
        <li>
          <code>:diffoff</code> disable diff mode, then <kbd>Space bd</kbd> to close the buffer
        </li>
        <li>
          <code>brew install lazygit</code> install and learn LazyGit, useful plugin to work with
          Git
        </li>
        <li>
          <kbd>Space gg</kbd> open LazyGit (after installation)
        </li>
        <li>
          <Lnk path="https://lazyvim-ambitious-devs.phillips.codes/course/chapter-15/#_editing_diffs">
            Continue
          </Lnk>{' '}
          reading about Git...
        </li>
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
