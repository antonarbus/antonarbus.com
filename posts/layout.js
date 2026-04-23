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
  title: 'layout',
  date: '2026.04.23',
  tags: ['react'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'nice react layout example component for widgets',
  body: (
    <>
      <H>Layout</H>

      <ul>
        <li>Components on page should not position itself, it is layout's responsibility</li>
        <li>Layout has placeholders for components</li>
      </ul>

      <Code block jsx>{`
      import { Box, Modal, LinearProgress } from '@mui/material'
      import { theme } from '@src/shared/theme'
      import { browserType } from '@src/shared/utils/browserType'

      type Props = {
        headerText: React.ReactNode
        isProgressBar: boolean
        closeButton: React.ReactNode
        content?: React.ReactNode
        leftFooterButton?: React.ReactNode
        rightFooterButton: React.ReactNode
        /**
         * - red border shadow for .layout boxes
         * - green border shadow around content
         */
        devMode?: boolean
      }

      export const Layout = (props: Props): React.JSX.Element => {
        return (
          <Modal
            className='layout modal'
            open={true}
            disableEscapeKeyDown
            hideBackdrop={false}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: theme.color.black,
              '& .MuiModal-backdrop': {
                transition: 'none !important',
              },
              // red shadow for .layout boxes in dev mode
              '.layout': {
                boxShadow:
                  props.devMode === true ? '0px 0px 1px 1px red inset' : 'initial',
              },
              // widgets are surrounded by green shadow and have low opacity in dev mode
              '.layout:not(:has(.layout))': {
                boxShadow:
                  props.devMode === true ? '0px 0px 2px 2px green' : 'initial',
              },
            }}
          >
            <Box
              className='layout modal'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '800px',
                maxWidth: '90vw',
                maxHeight: '80vh',
                borderRadius: '8px',
                overflow: 'hidden',
                background: 'white',
                outline: 'none',
                boxShadow: '0px 0px 50px 0px rgba(0, 0, 0, 0.30) !important',
              }}
            >
              <Box
                component='header'
                className='layout header'
                sx={{
                  height: 63,
                  flexShrink: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingInline: '20px',
                  borderBottom: '1px solid #dfdfdf',
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                <Box
                  className='layout header-text'
                  sx={{
                    fontSize: '22px',
                    fontWeight: 600,
                    letterSpacing: '-0.44px',
                  }}
                >
                  {props.headerText}
                </Box>
                <Box className='layout close-button'>{props.closeButton}</Box>
                {props.isProgressBar && (
                  <LinearProgress
                    sx={{
                      height: '1px',
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: '-1px',
                    }}
                  />
                )}
              </Box>
              <Box
                component='main'
                className='layout main'
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1, // take all available vertical space between header & footer
                  overflow: 'hidden', // used to enable overflow of decedent below
                  padding: '5px', // indent scrollbar a bit
                }}
              >
                <Box
                  className='layout content-container'
                  sx={{
                    overflowY: 'auto',
                    padding: '20px',
                    // blue scrollbar
                    ...(browserType !== 'firefox' && {
                      '&::-webkit-scrollbar': {
                        width: '6px',
                        height: '6px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.color.black,
                        borderRadius: '4px',
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                      },
                    }),
                    ...(browserType === 'firefox' && {
                      scrollbarColor: \`\${theme.color.black} transparent\`,
                    }),
                  }}
                >
                  <Box
                    className='layout content'
                    sx={{
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    {props.content}
                  </Box>
                </Box>
              </Box>
              <Box
                component='footer'
                className='layout footer'
                sx={{
                  containerType: 'inline-size',
                  height: 63,
                  flexShrink: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '5px',
                  alignItems: 'center',
                  paddingInline: '20px',
                  borderTop: '1px solid #dfdfdf',
                }}
              >
                <Box className='layout left-footer-button'>
                  {props.leftFooterButton}
                </Box>
                <Box className='layout right-footer-button'>
                  {props.rightFooterButton}
                </Box>
              </Box>
            </Box>
          </Modal>
        )
      }
    `}</Code>

      <Code block jsx>{`
        <Layout
          headerText={<HeaderText />}
          closeButton={<CloseFormIcon />}
          content={<FormContent />}
          leftFooterButton={urlParams.slug !== 'create' && <DeleteButton />}
          rightFooterButton={
            urlParams.slug === 'create' ? (
              <CreateRuleButton />
            ) : (
              <UpdateRuleButton />
            )
          }
          isProgressBar={isMutating}
          devMode={true}
        />
      `}</Code>

      <LazyImg path="/imgs/layout.png" />
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
