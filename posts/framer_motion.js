import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'
import { motion, AnimatePresence, useCycle } from 'framer-motion'
import { Button } from '@mui/material'

const Example1 = () => (
  <motion.div
    initial={{ opacity: 0, fontSize: '0px', color: '#fff', x: '-100vw' }}
    animate={{ opacity: 1, fontSize: '30px', color: '#ff2994', x: 0 }}
    transition={{ delay: 0.5, duration: 1.5, type: 'spring' }}
  >
    Animated text
  </motion.div>
)

const Example2 = () => (
  <motion.button
    whileHover={{ scale: 1.2 }}
  >
    Animated hover
  </motion.button>
)

const Example3 = () => (
  <Button
    variant="contained"
    component={motion.div}
    whileHover={{
      scale: 1.2,
      transition: { duration: 0.3 },
      textShadow: '0px 0px 8px rgb(255, 255, 255)',
      boxShadow: '0px 0px 8px rgb(255, 255, 255)'
    }}
  >
    Animated hover
  </Button>
)

const containerVariants = {
  hidden: { opacity: 0, x: '-100vw' },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', delay: 1 } }
}

const Example4 = () => (
  <motion.div
    variants={containerVariants}
    initial='hidden'
    animate='visible'
    css={{ fontSize: '30px' }}
  >
    Animated text
  </motion.div>
)

const Example5 = ({ children }) => (
  <motion.div
    variants={containerVariants}
    initial='hidden'
    animate='visible'
    css={{ fontSize: '30px' }}
  >
    Parent motion
    { children }
  </motion.div>
)

const Example6 = ({ children }) => (
  <motion.div
    variants={containerVariants}
    css={{ color: 'grey' }}
  >
    Child motion
  </motion.div>
)

const parentVariants = {
  hidden: { x: '-100vw' },
  visible: { x: 0, transition: { type: 'spring', delay: 1, when: 'beforeChildren' } }
}

const childVariants = {
  hidden: { y: '100%' },
  visible: { y: 0 }
}

const Example7 = ({ children }) => (
  <motion.div
    variants={parentVariants}
    initial='hidden'
    animate='visible'
    css={{ fontSize: '30px', overflow: 'hidden' }}
  >
    Parent motion
    <motion.div
      variants={childVariants}
      css={{ color: 'grey', fontSize: '16px' }}
    >
      Child motion
    </motion.div>
  </motion.div>
)

const parentVariants2 = {
  hidden: { x: '-100vw' },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      delay: 1,
      when: 'beforeChildren',
      staggerChildren: 0.5
    }
  }
}

const childVariants2 = {
  hidden: { y: 100 },
  visible: { y: 0 }
}

const Example8 = ({ children }) => (
  <motion.div
    variants={parentVariants2}
    initial='hidden'
    animate='visible'
    css={{ fontSize: '30px', overflow: 'hidden' }}
  >
    Parent motion
    <motion.div
      variants={childVariants2}
      css={{ color: 'grey', fontSize: '16px' }}
    >
      Child motion 1
    </motion.div>
    <motion.div
      variants={childVariants2}
      css={{ color: 'grey', fontSize: '16px' }}
    >
      Child motion 2
    </motion.div>
    <motion.div
      variants={childVariants2}
      css={{ color: 'grey', fontSize: '16px' }}
    >
      Child motion 3
    </motion.div>
  </motion.div>
)

const Example9 = () => (
  <motion.button
    whileHover={{ scale: [1.2, 1, 1.2, 1, 1.2, 1, 1.2, 1, 1.2, 1, 1.2] }}
  >
    Animated hover with keyframes
  </motion.button>
)

const Example10 = () => (
  <motion.button
    whileHover={{ scale: 1.2 }}
    transition={{ repeat: Infinity }}
  >
    Animated hover with yo-yo
  </motion.button>
)

const Example11 = () => {
  const [isShow, setIsShow] = useState(false)

  return (
    <>
      <AnimatePresence>
        {isShow && (
          <motion.h2
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '100vw' }}
          >
            Animated text
          </motion.h2>
        )}
      </AnimatePresence>
      <button onClick={() => setIsShow(!isShow)}>Toggle text</button>
    </>
  )
}

const Example12 = () => {
  return (
    <svg
      viewBox="0 0 100 20"
      xmlns="http://www.w3.org/2000/svg"
      css={{
        fill: 'none',
        stroke: 'black',
        strokeWidth: 2,
        strokeDasharray: 10
      }}
    >
      <motion.path
        d="M 0,10 h100"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeInOut', delay: 2 }}
      />
    </svg>
  )
}

const Example13 = () => {
  return (
    <motion.div
      css={{
        width: '10px',
        height: '10px',
        margin: '40px auto',
        borderRadius: '50%',
        background: 'grey'
      }}
      animate={{
        x: [-20, 20],
        y: [0, -30]
      }}
      transition={{
        x: {
          duration: 0.6,
          repeat: Infinity,
          repeatType: 'mirror'
        },
        y: {
          duration: 0.3,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut'
        }
      }}
    >
    </motion.div>
  )
}

const Example14 = () => {
  const [x, cycleX] = useCycle(0, 50, 100)

  return (
    <>
      <motion.div
        css={{
          width: '10px',
          height: '10px',
          background: 'red',
          borderRadius: '50%'
        }}
        animate={{ x }}
      />
      <button onClick={() => cycleX()}>Change position</button>
    </>
  )
}

const variants = {
  animationOne: {
    x: [-20, 20],
    y: 0,
    transition: {
      x: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'mirror'
      }
    }
  },
  animationTwo: {
    x: 0,
    y: [-20, 20],
    transition: {
      y: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'mirror'
      }
    }
  }
}

const Example15 = () => {
  const [animation, cycleAnimation] = useCycle('animationOne', 'animationTwo')

  return (
    <>
      <motion.div
        css={{
          width: '10px',
          height: '10px',
          margin: '40px auto',
          borderRadius: '50%',
          background: 'green'
        }}
        variants={variants}
        animate={animation}
      >
      </motion.div>
      <button onClick={() => cycleAnimation()}>Change animation variant</button>
    </>
  )
}

const itemsStackVariants = {
  hidden: {
    y: -100,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  },
  visible: (num) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.05 * num
    }
  })
}

function Example16() {
  const [items, setItems] = useState([5, 4, 3, 2, 1])

  return (
    <>
      <button
        onClick={() => {
          setItems([items[0] + 1, ...items])
        }}
      >
        add
      </button>
      <button
        onClick={() => {
          if (items.length < 2) return
          setItems(items.slice(1))
        }}
      >
        remove
      </button>
      <div>{JSON.stringify(items)}</div>

      <div style={{ marginTop: 50 }}>
        <AnimatePresence initial={true}>
          {items.map((num) => (
            <motion.div
              key={num}
              variants={itemsStackVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              layoutId={num}
              custom={num}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '10px 20px',
                marginBottom: 2,
                border: '1px solid firebrick',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              item {num}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}

const postObj = {
  title: 'framer motion',
  date: '2023.02.04',
  tags: ['React', 'css', 'animation'],
  imgUrl: 'https://antonarbus.com/imgs/framer_motion.png',
  desc: 'framer motion library for animation in React',
  body: (
    <>
      <H>Installation</H>

      <ul>
        <li><Lnk path='https://www.framer.com/motion/introduction/#quick-start'>https://www.framer.com/motion/introduction/#quick-start</Lnk></li>
        <li><Code bash>npm i framer-motion</Code> - install</li>
        <li><Code>{'import { motion } from "framer-motion"'}</Code> - import</li>
      </ul>

      <H>Some info</H>

      <ul>
        <li><Lnk path='https://egghead.io/lessons/react-create-micro-interactions-with-framer-motion-gesture-props'>https://egghead.io/lessons/react-create-micro-interactions-with-framer-motion-gesture-props</Lnk></li>
        <li><Lnk path='https://www.youtube.com/playlist?list=PLNG2YBDrzK-yhlQtfsrzzQvaLDVj-pMXI'>https://www.youtube.com/playlist?list=PLNG2YBDrzK-yhlQtfsrzzQvaLDVj-pMXI</Lnk></li>
        <li><Lnk path='https://www.youtube.com/playlist?list=PL4cUxeGkcC9iHDnQfTHEVVceOEBsOf07i'>https://www.youtube.com/playlist?list=PL4cUxeGkcC9iHDnQfTHEVVceOEBsOf07i</Lnk></li>
      </ul>

      <H>Simple animation</H>

      <Code block jsx>{`
      import { motion } from 'framer-motion'

      const Example1 = () => (
        <motion.div
          initial={{ opacity: 0, fontSize: '0px', color: '#fff', x: '-100vw' }}
          animate={{ opacity: 1, fontSize: '30px', color: '#ff2994', x: 0 }}
          transition={{ delay: 0.5, duration: 1.5, type: 'spring' }}
        >
          Animated text
        </motion.div>
      )
      `}</Code>

      <Example1 />

      <H>Hover</H>

      <Example2 />

      <Code block jsx>{`
      <motion.button
        whileHover={{ scale: 1.2 }}
      >
        Animated hover
      </motion.button>
      `}</Code>

      <H>With MUI</H>

      <Code block jsx>{`
      <Button
        variant="contained"
        component={motion.div}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.3 }
        }}
      >
        Animated hover
      </Button>
      `}</Code>

      <Example3 />

      <H>Variants</H>

      <ul>
        <li>Variants allows to extract <code>initial</code>, <code>animate</code> & <code>transition</code> props into an external object and reference it in multiple components.</li>
        <li>It makes code cleaner</li>
      </ul>

      <Code block jsx>{`
      const containerVariants = {
        hidden: { opacity: 0, x: '-100vw' },
        visible: { opacity: 1, x: 0, transition: { type: 'spring', delay: 1} }
      }

      const Example4 = () => (
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          css={{ fontSize: '30px' }}
        >
          Animated text
        </motion.div>
      )
      `}</Code>

      <Example4 />

      <H>Variants props propagation</H>

      <ul>
        <li>If we have a parent motions element with enabled variants</li>
        <li>And it has children with another motions elements with same variant prop</li>
        <li>Then children will inherit <code>initial</code> and <code>animate</code> props from the parent, unless not specified other values</li>
      </ul>

      <Code block jsx>{`
      const containerVariants = {
        hidden: { opacity: 0, x: '-100vw' },
        visible: { opacity: 1, x: 0, transition: { type: 'spring', delay: 1 } }
      }

      const Example5 = ({ children }) => (
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          css={{ fontSize: '30px' }}
        >
          Parent motion
          { children }
        </motion.div>
      )

      const Example6 = ({ children }) => (
        <motion.div
          variants={containerVariants}
          css={{ color: 'grey' }}
        >
          Child motion
        </motion.div>
      )

      <Example5>
        <Example6 />
      </Example5>
      `}</Code>

      <Example5>
        <Example6 />
      </Example5>

      <H>beforeChildren</H>

      <ul>
        <li>We have animated parent and children</li>
        <li>By default animations starts at the same time everywhere</li>
        <li>Usually we want parent to animate and only after start children animation</li>
        <li>We may play with delays, but that is not elegant</li>
        <li>With <code>variants</code> we can use <Code>when</Code> prop of <code>transition</code> with <Code>beforeChildren</Code> value to achieve it</li>
      </ul>

      <Code block jsx>{`
      const parentVariants = {
        hidden: { x: '-100vw' },
        visible: { x: 0, transition: { type: 'spring', delay: 1, when: 'beforeChildren' } }
      }

      const childVariants = {
        hidden: { y: '100%' },
        visible: { y: 0 }
      }

      const Example7 = ({ children }) => (
        <motion.div
          variants={parentVariants}
          initial='hidden'
          animate='visible'
          css={{ fontSize: '30px', overflow: 'hidden' }}
        >
          Parent motion
          <motion.div
            variants={childVariants}
            css={{ color: 'grey', fontSize: '16px' }}
          >
            Child motion
          </motion.div>
        </motion.div>
      )
      `}</Code>

      <Example7 />

      <H>Stagger children</H>

      <Code block jsx>{`
      const parentVariants2 = {
        hidden: { x: '-100vw' },
        visible: {
          x: 0,
          transition: {
            type: 'spring',
            delay: 1,
            when: 'beforeChildren',
            staggerChildren: 0.5
          }
        }
      }

      const childVariants2 = {
        hidden: { y: 100 },
        visible: { y: 0 }
      }

      const Example8 = ({ children }) => (
        <motion.div
          variants={parentVariants2}
          initial='hidden'
          animate='visible'
          css={{ fontSize: '30px', overflow: 'hidden' }}
        >
          Parent motion
          <motion.div
            variants={childVariants2}
            css={{ color: 'grey', fontSize: '16px' }}
          >
            Child motion 1
          </motion.div>
          <motion.div
            variants={childVariants2}
            css={{ color: 'grey', fontSize: '16px' }}
          >
            Child motion 2
          </motion.div>
          <motion.div
            variants={childVariants2}
            css={{ color: 'grey', fontSize: '16px' }}
          >
            Child motion 3
          </motion.div>
        </motion.div>
      )
      `}</Code>

      <Example8 />

      <H>Keyframe</H>

      <Code block jsx>{`
      const Example9 = () => (
        <motion.button
          whileHover={{ scale: [1.2, 1, 1.2, 1, 1.2, 1, 1.2, 1, 1.2, 1, 1.2] }}
        >
          Animated hover with keyframes
        </motion.button>
      )
      `}</Code>

      <Example9 />

      <H>Repeating animation</H>

      <Code block jsx>{`
      const Example10 = () => (
        <motion.button
          whileHover={{ scale: 1.2 }}
          transition={{ repeat: Infinity }}
        >
          Animated hover with yo-yo
        </motion.button>
      )
      `}</Code>

      <Example10 />

      <H>Animate unmount</H>

      <ul>
        <li>Before we just animated a component's appetence </li>
        <li>With <Code>AnimatePresence</Code> can animate also removal of a component</li>
      </ul>

      <Code block jsx>{`
      import { motion, AnimatePresence } from 'framer-motion'

      const Example11 = () => {
        const [isShow, setIsShow] = useState(false)

        return (
          <>
            <AnimatePresence>
              {isShow && (
                <motion.h2
                  initial={{ x: '-100vw' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100vw' }}
                >
                  Animated text
                </motion.h2>
              )}
            </AnimatePresence>
            <button onClick={() => setIsShow(!isShow)}>Toggle text</button>
          </>
        )
      }
      `}</Code>

      <Example11 />

      <H>onAnimationComplete</H>

      <p>That is how I made a slide effect between invoices at my work.</p>

      <Code block jsx>{`
      import { motion, AnimatePresence } from 'framer-motion'

      export const Invoice = () => {
        const dispatch = useDispatch()
        const { data: user } = useUserQuery()
        const closeDialog = () => dispatch(handleCloseInvoice(user))
        const { id } = useParams()

        // disable scroll on body due to custom backdrop
        //! extract into a custom hook
        useEffectOnce(() => {
          document.body.style.overflow = 'hidden'
          return () => {
            document.body.style.overflow = 'auto'
          }
        })

        useUnmount(() => {
          queryClient.invalidateQueries({ queryKey: ['invoices'] })
          setTimeout(() => { queryClient.invalidateQueries({ queryKey: ['invoices'] }) }, 5000)
        })

        return (
          <Backdrop
            open={!!id}
            sx={{
              background: '#00000080',
              zIndex: 666
            }}
          >
            <AnimatePresence
              initial={false}
              mode='wait'
            >
              <motion.div
                key={id}
                initial={{ x: '100vw' }}
                animate={{ x: 0 }}
                exit={{ x: '-100vw' }}
                transition={{ ease: 'linear' }}
                onAnimationComplete={(definition) => {
                  // triggered twice on exit and enter animation completion
                  if (definition.x === 0) dispatch(handleInvoiceOpened(id, user))
                }}
              >
                <Box
                  data-testid='invoice-container'
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '95vw',
                    height: '95vh',
                    maxWidth: '95vw',
                    maxHeight: '95vh',
                    zIndex: 1000
                  }}
                >
                  <InvoiceTitle closeDialog={closeDialog} />
                  <InvoiceContent />
                  <InvoiceFooter closeDialog={closeDialog} />
                </Box>
              </motion.div>
            </AnimatePresence>
          </Backdrop>
        )
      }
      `}</Code>

      <H>Animate svg</H>

      <Code block jsx>{`
      const Example12 = () => {
        return (
          <svg
            viewBox="0 0 100 20"
            xmlns="http://www.w3.org/2000/svg"
            css={{
              fill: 'none',
              stroke: 'black',
              strokeWidth: 2,
              strokeDasharray: 10
            }}
          >
            <motion.path
              d="M 0,10 h100"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 2 }}
            />
          </svg>
        )
      }
      `}</Code>

      <Example12 />

      <H>Loader</H>

      <Code block jsx>{`
      const Example13 = () => {
        return (
          <motion.div
            css={{
              width: '10px',
              height: '10px',
              margin: '40px auto',
              borderRadius: '50%',
              background: 'grey'
            }}
            animate={{
              x: [-20, 20],
              y: [0, -30]
            }}
            transition={{
              x: {
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'mirror'
              },
              y: {
                duration: 0.3,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut'
              }
            }}
          >
          </motion.div>
        )
      }
      `}</Code>

      <Example13 />

      <H>Change between animation properties</H>

      <Code block jsx>{`
      const Example14 = () => {
        const [x, cycleX] = useCycle(0, 50, 100)

        return (
          <>
            <motion.div
              css={{
                width: '10px',
                height: '10px',
                background: 'red',
                borderRadius: '50%'
              }}
              animate={{ x }}
            />
            <button onClick={() => cycleX()}>Change position</button>
          </>
        )
      }
      `}</Code>

      <Example14 />

      <H>Change between animation variants</H>

      <Code block jsx>{`
      const variants = {
        animationOne: {
          x: [-20, 20],
          y: 0,
          transition: {
            x: {
              duration: 0.6,
              repeat: Infinity,
              repeatType: 'mirror'
            }
          }
        },
        animationTwo: {
          x: 0,
          y: [-20, 20],
          transition: {
            y: {
              duration: 0.6,
              repeat: Infinity,
              repeatType: 'mirror'
            }
          }
        }
      }

      const Example15 = () => {
        const [animation, cycleAnimation] = useCycle('animationOne', 'animationTwo')

        return (
          <>
            <motion.div
              css={{
                width: '10px',
                height: '10px',
                margin: '40px auto',
                borderRadius: '50%',
                background: 'green'
              }}
              variants={variants}
              animate={animation}
            >
            </motion.div>
            <button onClick={() => cycleAnimation()}>Change animation variant</button>
          </>
        )
      }
      `}</Code>

      <Example15 />

      <H>Layout & Custom prop</H>

      <ul>
        <li>with <code>custom</code> prop we may send data to variants for dynamic animation</li>
        <li>with <code>layoutId</code> prop we may animate movements of siblings when this element is added or removed</li>
      </ul>

      <Code block jsx>{`
      const itemsStackVariants = {
        hidden: {
          y: -100,
          opacity: 0,
          transition: {
            duration: 0.3
          }
        },
        visible: (num) => ({
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.3,
            delay: 0.05 * num
          }
        })
      }

      function Example16() {
        const [items, setItems] = useState([5, 4, 3, 2, 1])

        return (
          <>
            <button
              onClick={() => {
                setItems([items[0] + 1, ...items])
              }}
            >
              add
            </button>
            <button
              onClick={() => {
                if (items.length < 2) return
                setItems(items.slice(1))
              }}
            >
              remove
            </button>
            <div>{JSON.stringify(items)}</div>

            <div style={{ marginTop: 50 }}>
              <AnimatePresence initial={true}>
                {items.map((num) => (
                  <motion.div
                    key={num}
                    variants={itemsStackVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    layoutId={num}
                    custom={num}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '10px 20px',
                      marginBottom: 2,
                      border: '1px solid firebrick',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer'
                    }}
                  >
                    item {num}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )
      }
      `}</Code>

      <Example16 />

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
