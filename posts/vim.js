import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'vim',
  date: '2023.10.15',
  tags: ['tools'],
  desc: 'vim text editor',
  body: (
    <>
      <H>Modes</H>

      <ul>
        <li>
          <kbd>a</kbd> insert mode before cursor
        </li>
        <li>
          <kbd>i</kbd> insert mode after cursor
        </li>
      </ul>

      <H>Short cursor movement</H>

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

      <H>word cursor movement</H>

      <ul>
        <li>
          <kbd>w</kbd> jump to next word
        </li>
        <li>
          <kbd>e</kbd> jump to the end next word
        </li>
        <li>
          <kbd>b</kbd> jump back to previous word
        </li>
        <li>
          <kbd>g</kbd> <kbd>e</kbd> jump back to the end of previous word
        </li>
      </ul>

      <H>WORD cursor movement</H>

      <ul>
        <li>
          <i>WORD</i> - word + special chars, like <code>sum(2,3)</code>
        </li>
        <li>
          <kbd>W</kbd> jump to next WORD
        </li>
        <li>
          <kbd>E</kbd> jump to the end next WORD
        </li>
        <li>
          <kbd>B</kbd> jump back to previous WORD
        </li>
        <li>
          <kbd>g</kbd> <kbd>E</kbd> jump back to the end of previous WORD
        </li>
      </ul>

      <H>Move to special char</H>

      <ul>
        <li>
          <Code>{'f{char}'}</Code> find & jump to next char in a line
        </li>
        <li>
          <Code>{'F{char}'}</Code> find & jump to prev char in a line
        </li>
        <li>
          <Code>{'t{char}'}</Code> find & jump before next char in a line
        </li>
        <li>
          <Code>{'T{char}'}</Code> find & jump before prev char in a line
        </li>
        <li>
          <kbd>;</kbd> go to next found char
        </li>
        <li>
          <kbd>,</kbd> go to prev found char
        </li>
      </ul>

      <H>Tutor</H>

      <ul>
        <li>
          <Code>:Tutor</Code> launch tutor
        </li>
      </ul>

      <H>Exit</H>

      <ul>
        <li>
          <kbd>Esc</kbd> <Code>:q!</Code> quit without save
        </li>
        <li>
          <kbd>Esc</kbd> <Code>:wq</Code> quit & save
        </li>
      </ul>

      <H>Delete</H>

      <ul>
        <li>
          <kbd>x</kbd> delete unwanted char under cursor
        </li>
      </ul>

      <H>Commands</H>
      <ul>
        <li>
          <kbd>Esc</kbd> <kbd>:</kbd> <kbd>w</kbd> exit
        </li>
        <li>
          <kbd>Esc</kbd> <kbd>:</kbd> <kbd>w</kbd> <kbd>q</kbd> <kbd>Enter</kbd>save & exit
        </li>
        <li>
          <kbd>Esc</kbd> <kbd>:</kbd> <kbd>x</kbd> save & exit
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
