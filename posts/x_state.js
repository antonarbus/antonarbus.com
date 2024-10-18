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
  title: 'xState',
  date: '2024.10.17',
  tags: ['JavaScript', 'tool'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'Finite state machine with xState',
  body: (
    <>
      <H>Why</H>

      <ul>
        <li>If we need to add some feature it is intuitive to introduce some a boolean flag</li>
        <li>"Boolean" programming is bad</li>
        <li>Processes in the app better to be based on named states</li>
        <li>As a programmer we have to code the transitions between states</li>
        <li>xState helps with this</li>
      </ul>

      <H>Main principles</H>

      <ul>
        <li>
          <Lnk path="https://stately.ai/docs/state-machines-and-statecharts">
            https://stately.ai/docs/state-machines-and-statecharts
          </Lnk>
        </li>
        <li>
          A <i>state machine</i> is used to describe the behavior of something
        </li>
        <li> The machine describes the thing's states and the transitions between those states</li>
        <li>
          A state describes the machine's status or mode, which could be as simple as <i>Asleep</i>{' '}
          and
          <i>Awake</i>
        </li>
        <li>A state machine can only be in one state at a time</li>
        <li>
          When a state machine starts, it enters the <i>initial state</i> first.
        </li>
        <li>
          <i>Events</i> cause <i>transitions</i>
        </li>
        <li>When an event happens, the machine transitions to the next state</li>
        <li>
          The dog goes between <code>asleep</code> and <code>awake</code> through the{' '}
          <code>wake up</code> and <code>fall asleep</code> events.
        </li>

        <Code block jsx>{`
          import { createMachine } from 'xstate';

          const dogMachine = createMachine({
            id: 'dog',
            initial: 'asleep',
            states: {
              asleep: {
                on: {
                  'wakes up': 'awake',
                }
              },
              awake: {
                on: {
                  'falls asleep': 'asleep',
                }
              },
              //...
            }
          });
        `}</Code>

        <li>
          It's a <i>Finite State Machine</i> (FSM) because it has a finite number of states
        </li>
        <li>
          Events and transitions are defined inside the <code>on</code> property of a state.
        </li>
        <li>
          Transition has a <i>source</i> state which comes before the transition, and a{' '}
          <i>target</i> state, which comes after the transition
        </li>
        <li>
          Most processes with states will have a <i>final</i> state, the last state when the process
          is finished
        </li>
      </ul>

      <H>Parent state</H>
      <ul>
        <li>
          A <i>parent</i> state is a state that can contain more states, also known as <i>child</i>{' '}
          states.
        </li>
        <li>Child states can only happen when the parent state is happening</li>
        <li>
          An <i>atomic</i> state is a state that doesn't have any child states.
        </li>
      </ul>

      <Code block jsx>{`
          export const walkMachine = createMachine({
            id: 'walk',
            initial: 'waiting',

            states: {
              waiting: {
                on: {
                  'leave home': {
                    target: 'on a walk',
                    reenter: true,
                  },
                },
              },

              'on a walk': {
                initial: 'walking',

                on: {
                  'get back home': {
                    target: 'walk ended',
                    reenter: true,
                  },
                },

                states: {
                  walking: {
                    on: {
                      'speed up': 'running',
                    },
                  },
                  running: {
                    on: {
                      'slow down': 'walking',
                    },
                  },
                },
              },

              'walk ended': {
                type: 'final',
              },
            },
          })
        `}</Code>

      <H>Parallel state</H>

      <ul>
        <li>
          A <i>parallel state</i> is a state where all of its child states, also known as{' '}
          <i>regions</i>, are active simultaneously
        </li>
      </ul>

      <Code block jsx>{`
          export const callMachine = createMachine({
            id: 'call machine',
            type: 'parallel',
            states: {
              mic: {
                initial: 'muted',
                states: {
                  muted: {
                    on: {
                      unmute: 'unmuted',
                    },
                  },

                  unmuted: {
                    on: {
                      mute: 'muted',
                    },
                  },
                },
              },
              video: {
                initial: 'showing video',
                states: {
                  'showing video': {
                    on: {
                      hide: 'hiding video',
                    },
                  },

                  'hiding video': {
                    on: {
                      show: 'showing video',
                    },
                  },
                },
              },
            },
          })
        `}</Code>

      <H>Self-transition</H>

      <ul>
        <li>
          A <i>self-transition</i> is when an event happens, but the transition returns to the same
          state
        </li>
      </ul>

      <Code block jsx>{`
        xxx
      `}</Code>
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
