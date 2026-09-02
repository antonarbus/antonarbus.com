'use client'


import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'terminal tools',
  date: '2026.09.02',
  tags: ['terminal', 'tools'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'cheat sheet for modern CLI tools: ripgrep, fd, bat, eza, fzf, zoxide',
  body: (
    <>
      <H>Terminal Tools</H>

      <ul>
        <li>Modern replacements for grep / find / cat / ls</li>
        <li>Installed as separate commands, no aliasing over the originals (keeps muscle memory and scripts portable)</li>
        <li>All installed via <code>brew install ...</code></li>
      </ul>

      <H>ripgrep (rg)</H>

      <ul>
        <li>Replaces <code>grep</code> — recursive by default, respects .gitignore, much faster</li>
        <li><Lnk path="https://github.com/BurntSushi/ripgrep">https://github.com/BurntSushi/ripgrep</Lnk></li>
        <li><Code>brew install ripgrep</Code></li>
        <li><Code>rg "text"</Code> search current folder recursively for text</li>
        <li><Code>rg "text" -t ts</Code> limit search to one file type</li>
        <li><Code>rg "text" -C 2</Code> show 2 lines of context around each match</li>
      </ul>

      <H>fd</H>

      <ul>
        <li>Replaces <code>find</code> — simpler syntax, respects .gitignore</li>
        <li><Lnk path="https://github.com/sharkdp/fd">https://github.com/sharkdp/fd</Lnk></li>
        <li><Code>brew install fd</Code></li>
        <li><Code>fd Button</Code> find files/folders whose name contains "Button"</li>
        <li><Code>fd -e tsx</Code> find all files with a given extension</li>
      </ul>

      <H>bat</H>

      <ul>
        <li>Replaces <code>cat</code> — syntax highlighting, line numbers, git status in the gutter</li>
        <li><Lnk path="https://github.com/sharkdp/bat">https://github.com/sharkdp/bat</Lnk></li>
        <li><Code>brew install bat</Code></li>
        <li><Code>bat file.ts</Code> view a file with highlighting</li>
        <li>Opens long files in a pager — press <kbd>q</kbd> to quit, <kbd>/text</kbd> to search inside it</li>
      </ul>

      <H>eza</H>

      <ul>
        <li>Replaces <code>ls</code> — colorized, shows git status per file, can render a tree</li>
        <li><Lnk path="https://github.com/eza-community/eza">https://github.com/eza-community/eza</Lnk></li>
        <li><Code>brew install eza</Code></li>
        <li><Code>eza -la --git</Code> detailed listing with git status</li>
        <li><Code>eza --tree --level=2</Code> folder structure as a tree</li>
      </ul>

      <H>fzf</H>

      <ul>
        <li>Fuzzy finder wired into the shell — see the dedicated <Lnk path="/posts/fzf">fzf post</Lnk> for install/setup</li>
        <li><Lnk path="https://github.com/junegunn/fzf">https://github.com/junegunn/fzf</Lnk></li>
        <li><kbd>CTRL+R</kbd> fuzzy-search command history</li>
        <li><kbd>CTRL+T</kbd> fuzzy-insert a file path into the current command</li>
        <li><kbd>ALT+C</kbd> fuzzy-cd into a subdirectory</li>
      </ul>

      <H>zoxide</H>

      <ul>
        <li>Remembers directories by frequency + recency, jump to them from anywhere</li>
        <li><Lnk path="https://github.com/ajeetdsouza/zoxide">https://github.com/ajeetdsouza/zoxide</Lnk></li>
        <li><Code>brew install zoxide</Code></li>
        <li>
          add to <code>~/.zshrc</code>: <code>{'eval "$(zoxide init zsh)"'}</code>
        </li>
        <li><Code>z ask</Code> jump to a visited folder whose name matches "ask"</li>
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
