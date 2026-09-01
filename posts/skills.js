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
        task. Skills live in <code>.agents/skills/</code> and are picked up automatically.
      </p>

      <H>Create a skill</H>

      <ol>
        <li>
          Create a folder: <code>.agents/skills/my-skill/</code>
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
