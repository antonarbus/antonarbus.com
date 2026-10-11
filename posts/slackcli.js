'use client'

import { Code, H, Lnk, React, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'slackcli',
  date: '2026.10.11',
  tags: ['tools', 'ai'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'Common slackcli commands',
  body: (
    <>
      <H>What is slackcli</H>

      <p>
        <Lnk path="https://github.com/shaharia-lab/slackcli">slackcli</Lnk> is an open-source
        command line tool to read, search and send Slack messages. It is not the official Slack CLI
        (<code>slack</code>), which is only for building and deploying Slack apps and cannot read
        channels.
      </p>

      <p>
        It works with a browser session, so no Slack app and no admin approval is needed. The
        session tokens are stored in <code>~/.config/slackcli/</code>, never commit or share that
        folder.
      </p>

      <H>Install</H>

      <Code block bash>{`
        brew tap shaharia-lab/tap
        brew install slackcli
      `}</Code>

      <H>Login</H>

      <Code block bash>{`
        # opens a browser, sign in to Slack as usual
        slackcli auth login-auto

        # list stored workspaces, --check verifies each one with Slack
        slackcli auth list --check

        # show the active identity
        slackcli auth whoami

        # change the default workspace
        slackcli auth set-default
      `}</Code>

      <H>Workspace</H>

      <p>Commands use the default workspace. Pick another one per call or per shell:</p>

      <Code block bash>{`
        slackcli conversations list --workspace my-workspace

        export SLACKCLI_WORKSPACE=my-workspace

        slackcli team info
      `}</Code>

      <H>Read</H>

      <Code block bash>{`
        # channels, DMs and group DMs you can see
        slackcli conversations list

        # channel history, channel is addressed by ID
        slackcli conversations read C0123456789 --limit 50

        # one thread
        slackcli conversations read C0123456789 --thread-ts=1234567890.123456

        # time window, Unix timestamps
        slackcli conversations read C0123456789 --oldest 1760000000 --latest 1760086400

        # conversations with unread messages
        slackcli conversations unread
      `}</Code>

      <p>
        Add <code>--json</code> to get structured output with <code>ts</code> and{' '}
        <code>thread_ts</code> for each message. Channel history returns only top-level messages,
        replies need a separate thread read.
      </p>

      <H>Search</H>

      <Code block bash>{`
        # Slack search operators work
        slackcli search messages "in:team-tech after:2026-10-01 before:2026-10-10" --limit 100 --json

        slackcli search channels "banana"

        slackcli search people "ada"
      `}</Code>

      <H>Send</H>

      <p>
        The recipient is a channel ID (<code>C...</code>) or a user ID (<code>U...</code>) for a DM.
      </p>

      <Code block bash>{`
        # message to a channel
        slackcli messages send --recipient-id C0123456789 --message "Hello team"

        # reply in a thread
        slackcli messages send --recipient-id C0123456789 --thread-ts 1234567890.123456 --message "Done"

        # message from a file, good for long or multiline text
        slackcli messages send --recipient-id C0123456789 --message-file ./message.md --json
      `}</Code>

      <p>
        With <code>--json</code> the response contains the channel ID, message <code>ts</code> and a
        permalink, useful to read the message back and verify it.
      </p>

      <H>Drafts</H>

      <p>Create an unsent draft to review it in Slack before posting:</p>

      <Code block bash>{`
        slackcli messages draft
        slackcli messages list-drafts
        slackcli messages send-draft
        slackcli messages delete-draft
      `}</Code>

      <H>Other</H>

      <Code block bash>{`
        # users
        slackcli users list
        slackcli users info @handle

        # canvases as Markdown
        slackcli canvas list
        slackcli canvas read

        # files
        slackcli files info
        slackcli files download

        # saved for later
        slackcli saved list

        # update the tool
        slackcli update check
        slackcli update

        # diagnostic log, the log file is written even without -v
        slackcli logs path
        slackcli logs show
      `}</Code>

      <p>
        Run <code>slackcli --help</code> to see every command. Sending, editing and reacting write
        to Slack as you, so double check the recipient ID first.
      </p>

      <H>Resources</H>

      <ul>
        <li>
          <Lnk path="https://github.com/shaharia-lab/slackcli">shaharia-lab/slackcli</Lnk> — repo
          and docs
        </li>
        <li>
          <Lnk path="https://slackcli.dev/docs/user-guide/scripting/">Scripting slackcli</Lnk> —
          shell scripts and AI agents
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
