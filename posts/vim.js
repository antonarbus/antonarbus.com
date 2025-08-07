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

      <H>Undo, Redo</H>

      <ul>
        <li>
          <kbd>u</kbd> undo the last command
        </li>
        <li>
          <kbd>Ctrl+u</kbd> undo in Insert mode
        </li>
        <li>
          <kbd>U</kbd> undo all for the line
        </li>
        <li>
          <kbd>ctrl</kbd> <kbd>r</kbd> redo
        </li>
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
          <kbd>^</kbd> almost the same as <kbd>0</kbd>, but does not take white spaces into account
        </li>
        <li>
          <kbd>W</kbd> <kbd>E</kbd> <kbd>B</kbd> <kbd>gE</kbd> works the same, but splits words by
          white space, while lowercased versions split works also with dot, paren, quote
        </li>
      </ul>

      <H>Repeat motion</H>

      <ul>
        <li>
          <kbd>3w</kbd> jump forward to the end of a word 3 times
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

      <H>Seek</H>

      <ul>
        <li>
          <kbd>s</kbd> seek mode
        </li>
        <li>you may jump to any visible text simply by typing part of it</li>
        <li>and press green label character</li>
      </ul>

      <H>Find</H>

      <ul>
        <li>
          <kbd>f</kbd> puts you in Find mode
        </li>
        <li>type a char and cursor will jump to the next typed char</li>
        <li>
          <kbd>fx</kbd> jumps to the next "x"
        </li>
        <li>
          <kbd>3fx</kbd> jumps to the 3rd "x" from you
        </li>
        <kbd>F</kbd> does the same, but backwards
      </ul>

      <H>To</H>

      <p>Same as Find mode, but put cursor before the found char</p>

      <ul>
        <li>
          <kbd>f</kbd> & <kbd>t</kbd> searches for next char
        </li>
        <li>did not understand why it is useful</li>
        <li>to be continued...</li>
      </ul>

      <ul>
        <li>
          <kbd>f</kbd> find mode
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

      <ul>
        <li></li>
      </ul>

      <H>Delete</H>

      <ul>
        <li>
          <kbd>x</kbd> delete char under cursor
        </li>
        <li>
          <kbd>d</kbd> [number] motion - delete operator
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
          <kbd>dd</kbd> delete whole line
        </li>
        <li>
          <kbd>2dd</kbd> delete 2 lines
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

      <H>Copy</H>

      <ul>
        <li>
          <kbd>y</kbd> copy highlighted text
          <kbd>yw</kbd> copy to the word's end
        </li>
      </ul>

      <H>Copy / Paste</H>

      <ul>
        <li>
          Select text in visual mode <kbd>v</kbd>
        </li>
        <li>
          <kbd>y</kbd> copy highlighted text
        </li>
        <li>
          <kbd>p</kbd> paste after cursor or <kbd>P</kbd> before
        </li>
      </ul>

      <H>Replace</H>

      <ul>
        <li>
          <kbd>r</kbd> go into replace mode of single char, then <kbd>a</kbd> to replace with{' '}
          <code>a</code>
        </li>
        <li>
          <kbd>R</kbd> go into global replace mode
        </li>
        <li>
          <kbd>c</kbd> [number] motion - replace operator, deletes and enters into Insert mode
        </li>
        <li>
          <kbd>ce</kbd> deletes to the end of the word and enters into Insert mode
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
