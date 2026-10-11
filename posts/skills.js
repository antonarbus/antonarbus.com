'use client'

import { Code, H, Hs, LazyImg, Lnk, React, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'skills',
  date: '2026.09.01',
  tags: ['tools', 'ai'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'Custom agent skills',
  body: (
    <>
      <H>What is a skill</H>

      <p>
        A skill is a Markdown file with instructions that an AI agent reads to perform a specific
        task. Each skill is a folder with a <code>SKILL.md</code> file, picked up automatically
        from a skills directory.
      </p>

      <H>Where to put a skill</H>

      <p>
        The location decides the scope: inside a repo the skill works only in that project, inside
        the home folder <code>~</code> it works everywhere on the computer.
      </p>

      <table border="1" cellPadding="6" cellSpacing="0">
        <thead>
          <tr>
            <th>Scope</th>
            <th>Claude Code</th>
            <th>Other agents (Codex etc.)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Repo (commit it to share with the team)</td>
            <td>
              <code>&lt;repo&gt;/.claude/skills/my-skill/SKILL.md</code>
            </td>
            <td>
              <code>&lt;repo&gt;/.agents/skills/my-skill/SKILL.md</code>
            </td>
          </tr>
          <tr>
            <td>Computer (all projects)</td>
            <td>
              <code>~/.claude/skills/my-skill/SKILL.md</code>
            </td>
            <td>
              <code>~/.agents/skills/my-skill/SKILL.md</code>
            </td>
          </tr>
        </tbody>
      </table>

      <ul>
        <li>
          A path without <code>~</code> like <code>.agents/skills/</code> is relative to the current
          folder, so it is a repo skill, not a computer-wide one.
        </li>
        <li>
          If <code>CLAUDE_CONFIG_DIR</code> is set (e.g. <code>~/.claude-personal</code>), Claude Code
          reads computer-wide skills from <code>$CLAUDE_CONFIG_DIR/skills/</code> instead of{' '}
          <code>~/.claude/skills/</code>.
        </li>
        <li>Start a new session after adding a skill so it gets picked up.</li>
      </ul>

      <p>
        To keep one copy for all agents, store the skill in <code>.agents/skills/</code> and symlink
        it into the Claude folder:
      </p>

      <Code block bash>{`
        # computer-wide
        ln -s ~/.agents/skills/my-skill ~/.claude/skills/my-skill

        # repo (relative link, so it works after cloning)
        mkdir -p .claude/skills
        ln -s ../../.agents/skills/my-skill .claude/skills/my-skill
      `}</Code>

      <H>Create a skill</H>

      <ol>
        <li>
          Create a folder in one of the locations above, e.g. <code>~/.claude/skills/my-skill/</code>
        </li>
        <li>
          Add a <code>SKILL.md</code> file with a YAML front-matter and the instructions body:
        </li>
      </ol>

      <Code block md>{`
        ---
        name: my-skill
        description: What this skill does and when to invoke it.
        ---

        ## Instructions

        Step-by-step instructions for the agent go here.
      `}</Code>

      <H>Invoke a skill</H>

      <p>
        The agent invokes a skill automatically when the <code>description</code> field matches the
        user's request. You can also trigger it explicitly with a slash command:
      </p>

      <Code block>{`/my-skill do something...`}</Code>

      <H>Resources</H>

      <ul>
        <li>
          <Lnk path="https://www.skills.sh">skills.sh</Lnk> — skill registry and docs
        </li>
        <li>
          <Lnk path="https://www.youtube.com/watch?v=cxQLKsktiBA">YouTube walkthrough</Lnk>
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
