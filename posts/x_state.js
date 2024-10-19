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

      <H>xState</H>

      <ul>
        <li>XState is a state management and orchestration solution for JavaScript apps</li>
        <li>
          XState allows to manage workflow state by creating a model logic as actors and state
          machines
        </li>
        <li>Can be used in the frontend, backend, or wherever JavaScript runs</li>
        <li>
          <Code>npm i xstate @xstate/react</Code> install with npm
        </li>

        <Code block jsx>{`
          import { createMachine, assign, createActor } from 'xstate';

          const countMachine = createMachine({
            context: {
              count: 0,
            },
            on: {
              INC: {
                actions: assign({
                  count: ({ context }) => context.count + 1,
                }),
              },
              DEC: {
                actions: assign({
                  count: ({ context }) => context.count - 1,
                }),
              },
              SET: {
                actions: assign({
                  count: ({ event }) => event.value,
                }),
              },
            },
          });

          const countActor = createActor(countMachine).start();

          countActor.subscribe((state) => {
            console.log(state.context.count);
          });

          countActor.send({ type: 'INC' });
          // logs 1
          countActor.send({ type: 'DEC' });
          // logs 0
          countActor.send({ type: 'SET', value: 10 });
          // logs 10
        `}</Code>

        <Code block jsx>{`
          const textMachine = createMachine({
            context: {
              committedValue: '',
              value: ''
            },
            initial: 'reading',
            states: {
              reading: {
                on: {
                  'text.edit': { target: 'editing' }
                }
              },
              editing: {
                on: {
                  'text.change': {
                    actions: assign({
                      value: ({ event }) => event.value
                    })
                  },
                  'text.commit': {
                    actions: assign({
                      committedValue: ({ context }) => context.value
                    }),
                    target: 'reading'
                  },
                  'text.cancel': {
                    actions: assign({
                      value: ({ context }) => context.committedValue
                    }),
                    target: 'reading'
                  }
                }
              }
            }
          })

          const textActor = createActor(textMachine).start()

          textActor.subscribe((state) => {
            console.log(state.context.value)
          })

          textActor.send({ type: 'text.edit' }) // logs ''
          textActor.send({ type: 'text.change', value: 'Hello' }) // logs 'Hello'
          textActor.send({ type: 'text.commit' }) // logs 'Hello'
          textActor.send({ type: 'text.edit' }) // logs 'Hello'
          textActor.send({ type: 'text.change', value: 'Hello world' }) // logs 'Hello world'
          textActor.send({ type: 'text.cancel' }) // logs 'Hello'
        `}</Code>
      </ul>

      <H>Actor</H>

      <ul>
        <li>
          <i>Actor</i> is a{' '}
          <Lnk path="https://en.wikipedia.org/wiki/Actor_model">mathematical model</Lnk> for
          building message-based systems by using actors to communicate
        </li>
        <li>When you run a state machine in XState, it becomes an actor</li>
        <li>Actors can communicate with each other via asynchronous message passing - events</li>
        <li>Actors process one message at a time</li>
        <li>Actor has its own internal state that can only be updated by the actor itself</li>
        <li>Actor may update its internal state in response to a message it receives</li>
        <li>Actors can create new actors</li>
        <li>Actors can be created and destroyed as needed to handle the workload efficiently</li>
      </ul>

      <Code block jsx>{`
        import { createMachine, createActor } from 'xstate';

        const toggleMachine = createMachine({
          id: 'toggle',
          initial: 'Inactive',
          states: {
            Inactive: {
              on: { toggle: 'Active' },
            },
            Active: {
              on: { toggle: 'Inactive' },
            },
          },
        });

        // Create an actor that you can send events to.
        // Note: the actor is not started yet!
        const actor = createActor(toggleMachine);

        // Subscribe to snapshots (emitted state changes) from the actor
        actor.subscribe((snapshot) => {
          console.log('Value:', snapshot.value);
        });

        // Start the actor
        actor.start(); // logs 'Inactive'

        // Send events
        actor.send({ type: 'toggle' }); // logs 'Active'
        actor.send({ type: 'toggle' }); // logs 'Inactive'
      `}</Code>

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
        <li>
          Useful for changing context and/or executing actions without changing the finite state
        </li>
      </ul>

      <Code block jsx>{`
        import { createMachine, assign } from 'xstate';

        const machine = createMachine({
          context: { count: 0 },
          on: {
            someEvent: {
              // No target
              actions: assign({
                count: ({context}) => context.count + 1,
              })
            }
          }
        });
      `}</Code>

      <H>Context data</H>

      <ul>
        <li>Context is how you store data in a state machine actor</li>

        <Code block jsx>{`
          import { assign, createMachine } from 'xstate';

          export const toggleMachine = createMachine({
            id: 'toggle',
            context: { count: 0 },
            initial: 'Inactive',
            states: {
              Inactive: {
                on: { toggle: 'Active' },
              },
              Active: {
                entry: assign({
                  count: ({ context }) => context.count + 1
                }),
                on: { toggle: 'Inactive' },
                after: { 2000: 'Inactive' },
              },
            },
          });
        `}</Code>
      </ul>

      <H>Input & Guards</H>

      <ul>
        <li>Input is how initial data can be provided to a machine actor</li>
        <li>Guards are used to conditionally allow or disallow transitions</li>

        <Code block jsx>{`
          import { assign, createMachine } from 'xstate';

          export const toggleMachine = createMachine({
            id: 'toggle',
            context: ({ input }) => ({
              count: 0,
              maxCount: input.maxCount
            }),
            initial: 'Inactive',
            states: {
              Inactive: {
                on: {
                  toggle: {
                    // Only trigger toggle transition if count is less than maxCount
                    guard: ({ context }) => context.count < context.maxCount,
                    target: 'Active'
                  }
                }
              },
              Active: {
                entry: assign({
                  count: ({ context }) => context.count + 1
                }),
                on: { toggle: 'Inactive' },
                after: { 2000: 'Inactive' },
              },
            },
          });

          const actor = createActor(toggleMachine, {
            input: { maxCount: 10 }
          });

          actor.subscribe(snapshot => {
            console.log('State:', snapshot.value);
          });

          actor.start();

          actor.send({ type: 'toggle' });
        `}</Code>
      </ul>

      <H>Machine with React</H>

      <Code block jsx>{`
        import { assign, createMachine } from 'xstate';
        import { useMachine } from '@xstate/react';

        export const toggleMachine = createMachine({
          id: 'toggle',
          context: { count: 0 },
          initial: 'Inactive',
          states: {
            Inactive: {
              on: { toggle: 'Active' },
            },
            Active: {
              entry: assign({
                count: ({ context }) => context.count + 1
              }),
              on: { toggle: 'Inactive' },
              after: { 2000: 'Inactive' },
            },
          },
        });

        const App = () => {
          const [state, send] = useMachine(toggleMachine);

          return (
            <div>
              <div>Value: {state.value}</div>
              <button onClick={() => send({ type: 'toggle' })}>
                Toggle
              </button>
            </div>
          );
        };
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
