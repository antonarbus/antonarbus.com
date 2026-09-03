'use client'

import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'terminal tools',
  date: '2026.09.02',
  tags: ['terminal', 'tools', 'mac'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'cheat sheet for modern CLI tools: ripgrep, fd, bat, eza, jq, fzf, zoxide, delta, trash-cli',
  body: (
    <>
      <H>Terminal Tools</H>

      <ul>
        <li>Modern replacements for grep / find / cat / ls</li>
        <li>
          Installed as separate commands, no aliasing over the originals (keeps muscle memory and
          scripts portable)
        </li>
        <li>
          All installed via <code>brew install ...</code>
        </li>
      </ul>

      <H>ripgrep (rg)</H>

      <ul>
        <li>
          Searches <i>inside file contents</i> for matching text. Replaces <code>grep</code> —
          recursive by default, respects .gitignore, much faster
        </li>
        <li>
          <Lnk path="https://github.com/BurntSushi/ripgrep">
            https://github.com/BurntSushi/ripgrep
          </Lnk>
        </li>
        <li>
          <Code>brew install ripgrep</Code>
        </li>
        <li>
          <Code>rg "text"</Code> search current folder recursively for text
        </li>
        <li>
          <Code>rg "text" -t ts</Code> limit search to one file type
        </li>
        <li>
          <Code>rg "text" -C 2</Code> show 2 lines of context around each match
        </li>
      </ul>

      <H>fd</H>

      <ul>
        <li>
          Finds files and folders by <i>name</i> — never looks at file contents. Replaces{' '}
          <code>find</code> — simpler syntax, respects .gitignore
        </li>
        <li>
          <Lnk path="https://github.com/sharkdp/fd">https://github.com/sharkdp/fd</Lnk>
        </li>
        <li>
          <Code>brew install fd</Code>
        </li>
        <li>
          <Code>fd Button</Code> find files/folders whose name contains "Button"
        </li>
        <li>
          <Code>fd -e tsx</Code> find all files with a given extension
        </li>
      </ul>

      <H>bat</H>

      <ul>
        <li>
          Replaces <code>cat</code> — syntax highlighting, line numbers, git status in the gutter
        </li>
        <li>
          <Lnk path="https://github.com/sharkdp/bat">https://github.com/sharkdp/bat</Lnk>
        </li>
        <li>
          <Code>brew install bat</Code>
        </li>
        <li>
          <Code>bat file.ts</Code> view a file with highlighting
        </li>
        <li>
          Opens long files in a pager — press <kbd>q</kbd> to quit, <kbd>/text</kbd> to search
          inside it
        </li>
      </ul>

      <H>eza</H>

      <ul>
        <li>
          Replaces <code>ls</code> — colorized, shows git status per file, can render a tree
        </li>
        <li>
          <Lnk path="https://github.com/eza-community/eza">
            https://github.com/eza-community/eza
          </Lnk>
        </li>
        <li>
          <Code>brew install eza</Code>
        </li>
        <li>
          <Code>eza -la --git</Code> detailed listing with git status
        </li>
        <li>
          <Code>eza --tree --level=2</Code> folder structure as a tree
        </li>
      </ul>

      <H>jq</H>

      <ul>
        <li>
          Command-line JSON processor — extracts, filters, and reshapes JSON instead of just
          displaying it (unlike <code>bat</code>, which only shows a file as-is)
        </li>
        <li>
          <Lnk path="https://github.com/jqlang/jq">https://github.com/jqlang/jq</Lnk>
        </li>
        <li>
          <Code>brew install jq</Code>
        </li>
        <li>
          <Code>{"cat file.json | jq 'keys'"}</Code> list top-level keys when exploring an
          unfamiliar JSON file
        </li>
        <li>
          <Code>{"cat package.json | jq '.scripts'"}</Code> see a project's npm scripts without
          opening the file
        </li>
        <li>
          <Code>{"cat package.json | jq '.devDependencies | keys'"}</Code> drill into one nested
          field
        </li>
        <li>
          <Code>{"curl ... | jq '.someField'"}</Code> pull one field out of a live API response
        </li>
      </ul>

      <H>fzf</H>

      <ul>
        <li>Fuzzy finder for the terminal</li>
        <li>
          <Lnk path="https://github.com/junegunn/fzf">https://github.com/junegunn/fzf</Lnk>
        </li>
        <li>
          <Code>brew install fzf</Code>
        </li>
        <li>
          add at the end of <code>~/.zshrc</code>: <code>{'source <(fzf --zsh)'}</code>
        </li>
        <li>
          optionally set which files it searches:{' '}
          <code>
            {
              "export FZF_DEFAULT_COMMAND='fd --type f --hidden --exclude .git --exclude node_modules'"
            }
          </code>
        </li>
        <li>
          <Code>source ~/.zshrc</Code> apply changes
        </li>
      </ul>

      <Hs>fzf shortcuts</Hs>

      <ul>
        <li>
          <kbd>CTRL+T</kbd> search and paste the file or directory onto the command-line
        </li>
        <li>
          <kbd>ALT+C</kbd> cd into the found directory
        </li>
        <li>
          <kbd>CTRL-R</kbd> paste from terminal history onto the command-line
        </li>
        <li>
          <code>{'COMMAND [DIRECTORY/][FUZZY_PATTERN]**<TAB>'}</code> fuzzy completion
        </li>
      </ul>

      <H>zoxide</H>

      <ul>
        <li>Remembers directories by frequency + recency, jump to them from anywhere</li>
        <li>
          <Lnk path="https://github.com/ajeetdsouza/zoxide">
            https://github.com/ajeetdsouza/zoxide
          </Lnk>
        </li>
        <li>
          <Code>brew install zoxide</Code>
        </li>
        <li>
          add to <code>~/.zshrc</code>: <code>{'eval "$(zoxide init zsh)"'}</code>
        </li>
        <li>
          <Code>z ask</Code> jump to a visited folder whose name matches "ask"
        </li>
      </ul>

      <H>delta (git-delta)</H>

      <ul>
        <li>
          Pager for <code>git diff</code> / <code>git show</code> / <code>git log -p</code> — syntax
          highlighting, word-level change highlighting, line numbers
        </li>
        <li>
          <Lnk path="https://github.com/dandavison/delta">https://github.com/dandavison/delta</Lnk>
        </li>
        <li>
          <Code>brew install git-delta</Code>
        </li>
        <li>
          <Code>git config --global core.pager delta</Code> makes plain <code>git diff</code> render
          through delta automatically
        </li>
        <li>
          <Code>{'git config --global interactive.diffFilter "delta --color-only"'}</Code> also use
          it for <code>git add -p</code>
        </li>
      </ul>

      <H>trash-cli</H>

      <ul>
        <li>
          Move files and folders to the trash instead of permanently deleting them from the command
          line
        </li>
        <li>Works on macOS (10.12+), Linux, and Windows (8+)</li>
        <li>
          Accepts paths and{' '}
          <Lnk path="https://github.com/sindresorhus/globby#globbing-patterns">glob patterns</Lnk>
        </li>
        <li>
          <Code>npm install --global trash-cli</Code>
        </li>
      </ul>

      <Hs>trash-cli usage</Hs>

      <ul>
        <li>
          <Code>trash unicorn.png rainbow.png</Code> delete specific files
        </li>
        <li>
          <Code>trash '*.png'</Code> delete by pattern
        </li>
      </ul>

      <Hs>trash-cli patterns</Hs>

      <ul>
        <li>
          <code>*</code> matches any number of characters, but not /
        </li>
        <li>
          <code>?</code> matches a single character, but not /
        </li>
        <li>
          <code>**</code> matches any number of characters, including /, as long as it's the only
          thing in a path part
        </li>
        <li>
          <code>{'{}'}</code> allows for a comma-separated list of "or" expressions
        </li>
        <li>
          <code>!</code> at the beginning of a pattern will negate the match
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
