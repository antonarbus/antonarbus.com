'use client'


import {
  Code,
  H,
  Hs,
  LazyImg,
  Lnk,
  React,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  jsxToStr,
  ComponentFromHtmlString
} from '/components/post/reExport'

const postObj = {
  title: 'terraform',
  date: '2025.11.22',
  tags: ['IaC'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'terraform',
  body: (
    <>
      <H>Terraform</H>

      <p>To be updated in future... when i figure out how it works.</p>
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
