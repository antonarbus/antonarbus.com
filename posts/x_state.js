import { createMachine } from 'xstate'
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

export const dogMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QQPZQHQENYBsxgAcBiHFAVwgAIA7FAS1jAG0AGAXUVAJVjoBc6KapxAAPRAFoAnAHZ0AFnksAHAEYWLGVIDM8mavkAaEAE9JqgKzplSlgDYZy7fvkAmVdoC+n46gzY8QiJYAFswHBxYSgAzFBQIVg4kEG5eASERcQQ9dBlXNVlXbQtXKVVXC2MzBAlLa1sHJxd3S29fNCwAd0wAazAiaMwIqID8AkSRVP5BYWSs1SlXBTdtZ3kdbRYF1yrzKxsNRucDd3zvHxBaCDgRP0meaYy583krRRV1TR09VTtdmvccmcUkWdgsLG0rnkJzaID8WFwY3uaRmmUQDnQHgsMjsygs2lUn1x-1qm3QLGxWy2+QqFjxsPhmG6fWRj1moCyGLBGkW6jyeOUUn+6lU1lW61WMl0qhkW3OniAA */
  id: 'dog',
  initial: 'asleep',
  states: {
    asleep: {
      on: {
        'smells food': {
          target: 'awake'
        },
        'loud noise': 'awake'
      }
    },
    awake: {
      on: {
        'falls asleep': {
          target: 'asleep'
        }
      }
    }
  }
})

/** @xstate-layout N4IgpgJg5mDOIC5QHcCGAbA1gOjQSwBc8A7KAYnTFQDcwACACwHsBbMAbQAYBdRUAByaxCeJsT4gAHogCsANmwBGOQCYA7HPkyAnCoAcegMwq5AGhABPRAFpFh7ABY9ijU80rFip4oC+P82hY2GJ0qHSBmGQwBHQARqgAxpiMrBw8EoLCRGIS0gjWKg72DtoOGsraajKGZXrmVgge2tg1GjJeMmUOMpxyfgEYOCFhEbiDJOSw-GCQdACu-Fy8SCCZIjkreYoGSnpqDg4qhmraqora9YhH9idy2yecaioqnJ39IKPD4YPYAE5zxGIEzIsHQTGQdAg4OISwyQnW4k2NhcSk4ihkPW8ck0ikel0ahhup3u2kez1eDj8-hAxCYEDgEgicKyokRoDyBW0Mmw+30nD0PR6di5+NsaKUhjkak4p35ByM71G+CIpGZCNyNg8Dh5ckO2hqnAc52MalFdmwzmOxJl+sM2j02kVPy+TJWa2ybKkNk0qPRmOc2Pa+NK2DkAYcnEjZX5fWpSsGdDAxHpEDVHo1+UKah5hz0-MFaLthnxdgUPT0Dk0FMjvSdQRdPwiEzTrIzumwMo0YYONb02JLziUakUHkjuLkMpUdaGxFC3yC-0Bzbd8PTSIQ7aOnkJKnankqKnx+m12nRkq5fcjnRkVJ8QA */
export const walkMachine = createMachine({
  id: 'walk',
  initial: 'waiting',

  states: {
    waiting: {
      on: {
        'leave home': {
          target: 'on a walk',
          reenter: true
        }
      }
    },

    'on a walk': {
      initial: 'walking',

      on: {
        'get back home': {
          target: 'walk ended',
          reenter: true
        }
      },

      states: {
        walking: {
          on: {
            'speed up': 'running'
          }
        },
        running: {
          on: {
            'slow down': 'walking'
          }
        }
      }
    },

    'walk ended': {
      type: 'final'
    }
  }
})

export const callMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMCGAbdACAtq5AFgJYB2YAdDkcpQK4AukAxLSTg2ANoAMAuoqAAOAe1hF6RYSQEgAHogBMANm7kAHAGYlAVgDsAFgUKNC7doCMAGhABPRAE5z5e-YXm1KjbrXGlugL7+1miYuPjEZJTU5KzsjBBMcVx8MiJiElIy8gj6Gk555ub2Ogpqaq72+tZ2CI7OrkX2GuXKGvaBwRjYeISkFABuRBBgwuSwBMIA7qRQWIPDwkzEwzz8SCBp4pLS69kAtOZ55IUm+h5nuRrcGtUOSuT65touZRpejWodICHd4X3k8xG5GWMzmQxGTHGU1WqVEW0yu0QenUSkOel0RnKSiUam0t1q90ez3sr3eLgCXxIwmG8HWPzCvTIsPS2yyiD2Rl0x0OCjOSgub2u+IO+m05G4JIUxTeagMhiUX3pPQiFCoyGZ8J2oGybgU6i0ekMxlMFhutnZyN0um0zVK+m4RhcCqC3y6DJVURoSQgGoyWrkiA0Zwe5n0GM0ZzU5lR+Kl5G0YZt3B0PjUuWdnVCyv+apibA4PvWmz9bIQb3s5FKyeUSlajqq5oQobU5Dymj0OIsT24FMzv0ZA3Bwl9rMRCAOugrJ155zTgrNNT22nubStsqDbmTnxdSr+kUBoyh0xIswPI4R2vZBmceSUbUuLi8CnxV2cpnMyie-J7Fm0ird2b7kOwJDKCZ5FnCJZjns2LkLofjaGo3CymmZjPo20b3E00ZSnoTTPKGgSBEAA */
  id: 'call machine',
  type: 'parallel',
  states: {
    mic: {
      initial: 'muted',
      states: {
        muted: {
          on: {
            unmute: 'unmuted'
          }
        },

        unmuted: {
          on: {
            mute: 'muted'
          }
        }
      }
    },
    video: {
      initial: 'showing video',
      states: {
        'showing video': {
          on: {
            hide: 'hiding video'
          }
        },

        'hiding video': {
          on: {
            show: 'showing video'
          }
        }
      }
    }
  }
})

/** @xstate-layout N4IgpgJg5mDOIC5QDMyQEYEMDGBrAdAI4CucALgJYD2AdgMSoY4FRVUQDaADALqKgAHKrAqVa-EAA9EXADQgAnjIC+q+TXZwJjCFjwShIsTQnSEAWgCMXAEz5LNgBwBmRwFYAbAHYujm1w95JQtHL3xnGxsATksItxtLHy8otRAdPQIScmoTJBBDURzTRHM3ABZ7J1dPHz8AgKDEL0d8MoTnV1dLMrKvGzLU9OZ8MgALTBpceDyC42KEBwrLKOc3RP6PNzcoty9GhGbW9ptnSy2yri4ox1VVIA */
export const feedbackMachine = createMachine({
  id: 'feedback',
  initial: 'question',
  states: {
    question: {
      on: {
        'feedback.good': {
          target: 'thanks'
        }
      }
    },
    thanks: {}
  }
})

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
