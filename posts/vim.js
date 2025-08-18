import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'vim',
  date: '2023.10.15',
  tags: ['tools'],
  desc: 'vim text editor',
  body: (
    <>
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
          <kbd>v</kbd> visual mode - select
        </li>
      </ul>

      <H>Visual mode (selection)</H>

      <ul>
        <li>
          <kbd>v</kbd> visual mode
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

      <H>Jump to line</H>

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
        <li>
          <kbd>Ctrl+o</kbd> jump back in history
        </li>
        <li>
          <kbd>Ctrl+i</kbd> jump forward in history
        </li>
        <li>
          <kbd>Ctrl+g</kbd> show cursor position + file name
        </li>
      </ul>

      <H>Jump to matching bracket</H>

      <ul>
        <li>Place cursor on bracket</li>
        <li>
          <kbd>%</kbd> jumps to closing bracket
        </li>
      </ul>

      <H>Jump sentence</H>

      <ul>
        <li>
          <kbd>{'('}</kbd> / <kbd>{')'}</kbd> jump to beginning/end of the sentence
        </li>
      </ul>

      <H>Jump paragraph</H>

      <ul>
        <li>
          <kbd>{'{'}</kbd> / <kbd>{'}'}</kbd> jump to beginning/end of the paragraph
        </li>
      </ul>

      <H>Find</H>

      <ul>
        <li>
          <kbd>f</kbd> puts you in Find mode
        </li>
        <li>type a char and cursor jumps to the next typed char</li>
        <li>
          <kbd>f</kbd> jumps to the next <code>x</code>
        </li>
        <li>
          <kbd>3fx</kbd> jumps to the 3rd <code>x</code> from you
        </li>
        <kbd>F</kbd> same, but backwards
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
          <kbd>qq</kbd> start recording
        </li>
        <li>
          <kbd>q</kbd> stop recording
        </li>
        <li>
          <kbd>qQ</kbd> continue recording
        </li>
        <li>
          <kbd>Q</kbd> play recording
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
          <kbd>C-r</kbd> redo
        </li>
        <li>
          <kbd>C-u</kbd> undo in Insert mode
        </li>
      </ul>

      <H>Copy</H>

      <ul>
        <li>
          Select text in visual mode <kbd>v</kbd>
        </li>
        <li>
          <kbd>y</kbd> copy highlighted text
        </li>
        <li>
          <kbd>yw</kbd> copy to the word's end
        </li>
      </ul>

      <H>Paste</H>

      <ul>
        <li>
          <kbd>p</kbd> paste deleted text after cursor
        </li>
        <li>
          <kbd>P</kbd> paste deleted text before cursor
        </li>
      </ul>

      <H>Search</H>

      <ul>
        <li>
          <kbd>/</kbd> phrase search prompt, then <kbd>Enter</kbd>
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
      </ul>

      <H>Find and replace</H>

      <ul>
        <li>
          <Code>:s/old/new/</Code> replaces "old" with "new" occurrence in line
        </li>
        <li>
          <Code>:s/old/new/g</Code> replaces "old" with "new" all occurrences in line
        </li>
        <li>
          <Code>:1,5s/old/new/g</Code> replaces "old" with "new" all occurrences in 1...5 lines
        </li>
        <li>
          <Code>:%s/old/new/g</Code> replaces "old" with "new" in file
        </li>
        <li>
          <Code>:%s/old/new/gc</Code> replaces "old" with "new" in file with prompt
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

      <Hs>Installation</Hs>

      <ul>
        <li>
          Go to LazyVim extras by <kbd>x</kbd> from the dashboard
        </li>
        <li>
          Move your cursor to the line that contains <code>mini.files</code>
        </li>
        <li>
          Press <kbd>x</kbd> to install and restart NeoVim
        </li>
      </ul>

      <Hs>Usage</Hs>

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
