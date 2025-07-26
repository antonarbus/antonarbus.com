import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

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

      <H>Modes</H>

      <ul>
        <li>
          <kbd>a</kbd> insert mode (type/edit text) - caret before cursor
        </li>
        <li>
          <kbd>i</kbd> insert mode - caret after cursor
        </li>
        <li>
          <kbd>Esc</kbd> normal mode (navigate and manipulate text)
        </li>
      </ul>

      <H>Exit</H>

      <ul>
        <li>
          <kbd>:w</kbd> write
        </li>
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

      <H>Undo, Redo</H>

      <ul>
        <li>
          <kbd>u</kbd> undo the last command
        </li>
        <li>
          <kbd>U</kbd> undo all for the line
        </li>
        <li>
          <kbd>ctrl</kbd> <kbd>r</kbd> redo
        </li>
      </ul>

      <H>Char cursor movement</H>

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
      </ul>

      <H>Repeat motion</H>

      <ul>
        <li>
          <kbd>3w</kbd> jump forward to the end of a word 3 times
        </li>
      </ul>

      <H>Cursor location in file</H>

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
          <kbd>Ctrl+g</kbd> show cursor position + file name
        </li>
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

      <H>Replace</H>

      <ul>
        <li>
          <kbd>r</kbd> go into replace mode, then <kbd>a</kbd> to replace with <code>a</code>
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

      <H>Jump to matching bracket</H>

      <ul>
        <li>Place cursor on bracket</li>
        <li>
          <kbd>%</kbd> jumps to closing bracket
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
