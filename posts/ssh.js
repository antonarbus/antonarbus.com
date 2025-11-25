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
        <li><Code bash>ssh sherb@35.217.12.143</Code> connect</li>
        <li><Code bash>cd /var/www/html/antonarbus.com</Code> go to this web page folder</li>
        <li><Code bash>npm i</Code> update packages</li>
        <li><Code bash>npm run build</Code></li>
      </ul>

      <H>SSH keys</H>

      <ul>
        <li><Code bash>ls -al ~/.ssh</Code> show files with ssh keys on Unix</li>
        <li><Code>c:\Users\sherb\.ssh\</Code> same on Windows</li>
        <li><Code bash>ssh-keygen -t rsa -b 4096 -C "<i>name</i>"</Code> create ssh key</li>
        <li><code>id_rsa.pub</code> file contains public keys</li>
        <li><code>id_rsa</code> file contains private keys</li>
      </ul>

      <Hs>Add keys to GitHub</Hs>
      <ul>
        <li><Lnk path="https://docs.github.com/en/authentication/connecting-to-github-with-ssh">check this link</Lnk></li>
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
