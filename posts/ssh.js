'use client'

import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'ssh',
  date: '2022.04.07',
  tags: ['ssh', 'basics'],
  desc: 'ssh basic commands',
  body: (
    <>
      <H>Basic actions on my server</H>

      <ul>
        <li>
          <Code bash>ssh sherb@35.217.12.143</Code> connect
        </li>
        <li>
          <Code bash>cd /var/www/html/antonarbus.com</Code> go to this web page folder
        </li>
        <li>
          <Code bash>npm i</Code> update packages
        </li>
        <li>
          <Code bash>npm run build</Code>
        </li>
      </ul>

      <H>SSH keys</H>

      <ul>
        <li>
          <Code bash>ls -al ~/.ssh</Code> show files with ssh keys on Unix
        </li>
        <li>
          <Code>c:\Users\sherb\.ssh\</Code> same on Windows
        </li>
        <li>
          <Code bash>
            ssh-keygen -t rsa -b 4096 -C "<i>name</i>"
          </Code>{' '}
          create ssh key
        </li>
        <li>
          <code>id_rsa.pub</code> file contains public keys
        </li>
        <li>
          <code>id_rsa</code> file contains private keys
        </li>
      </ul>

      <Hs>Add keys to GitHub</Hs>
      <ul>
        <li>
          <Lnk path="https://docs.github.com/en/authentication/connecting-to-github-with-ssh">
            check this link
          </Lnk>
        </li>
      </ul>

      <Hs>ssh-agent</Hs>
      <ul>
        <li>
          <code>ssh-agent</code> is a background program that holds unlocked keys in memory, so you
          don't have to enter the key's passphrase on every connection
        </li>
        <li>
          <Code bash>ssh-add -l</Code> list keys currently loaded into the agent
        </li>
        <li>
          <Code bash>ssh-add ~/.ssh/id_rsa</Code> load a key into the agent (prompts for its
          passphrase, if any)
        </li>
        <li>
          if <Code bash>ssh-add -l</Code> prints <code>The agent has no identities.</code>, the
          agent is empty and no key is loaded yet
        </li>
        <li>
          run <Code bash>ssh-add</Code> again after a reboot/new session, or when you get{' '}
          <code>Permission denied (publickey)</code> errors
        </li>
      </ul>

      <Hs>Two GitHub accounts, one host</Hs>

      <ul>
        <li>
          problem: if both personal and work keys are loaded into <code>ssh-agent</code>, SSH tries
          agent keys in order when connecting to <code>github.com</code>, so the wrong account can
          end up being used
        </li>

        <li>
          solution: define two <code>Host</code> aliases in <code>~/.ssh/config</code>, each locked
          to its own key with <code>IdentitiesOnly yes</code> (ignore the agent, use only the listed
          key)
        </li>

        <Code block bash>{`
        Host github.com
          IdentityFile ~/.ssh/id_rsa
          IdentitiesOnly yes

        Host work-github
          HostName github.com
          IdentityFile ~/.ssh/work_ssh
          IdentitiesOnly yes
        `}</Code>

        <li>
          <code>work-github</code> is not a real hostname, it's a made-up alias;{' '}
          <code>HostName github.com</code> tells SSH to actually connect to <code>github.com</code>{' '}
          when that alias is used
        </li>

        <li>
          which key is used is decided by the remote URL, not by the current folder or which key is
          loaded in the agent
        </li>

        <li>
          personal repos keep the normal <code>git@github.com:...</code> remote and pick up{' '}
          <code>id_rsa</code>
        </li>

        <li>
          work repos need the remote rewritten to use the <code>work-github</code> alias, which
          picks up the <code>work_ssh</code> key:{' '}
          <Code bash>git remote set-url origin git@work-github:org-name/repo.git</Code>
        </li>

        <li>
          <Code bash>git remote -v</Code> check which remote (and therefore which key) a repo is
          currently using
        </li>

        <li>
          this is the standard, idiomatic way to use multiple SSH identities with one host — SSH has
          no built-in concept of "one key per account", so <code>Host</code> aliasing is the usual
          fix
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
