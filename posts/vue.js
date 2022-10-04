import { Code, H, Hs, LazyImg, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'vue',
  date: '2022.02.21',
  tags: ['vue', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/vue.png',
  desc: 'Vue basics',
  body: (
    <>
      <p><Lnk path="https://vuejs.org/">Vue</Lnk> is a front-end framework, similar to React.</p>

      <H>Installation</H>

      <ul>
        <li>
          Create a vue{' '}
          <Lnk path="https://vuejs.org/guide/quick-start.html#quick-start">project</Lnk> by{' '}
          <code>npm init vue@latest</code>
        </li>
        <li>
          Go to your project <code>cd projectName</code>
        </li>
        <li>
          Install all packages <code>npm i</code>
        </li>
        <li>
          Additionally install SCSS support <code>npm install -D sass-loader sass</code>
        </li>
        <li>
          Run development server <code>npm run dev</code>
        </li>
        <li>
          Install{' '}
          <Lnk path="https://marketplace.visualstudio.com/items?itemName=octref.vetur">Vetur</Lnk>{' '}
          extension for autocomplete in VSCode
        </li>
      </ul>

      <H>Component import</H>

      <Code block js>{`
        // main.js
        import { createApp } from 'vue'
        import App from './HelloWorld.vue'
        import router from './router'

        const app = createApp(App)
        app.use(router)
        app.mount('#app')
      `}</Code>

      <H>Component structure</H>

      <Code block js>{`
        <!-- HelloWorld.vue -->

        <!-- view -->
        <template>
          <h1>Hello {{name}} {{last}}</h1>
          <p>It is my first page in <span>Vue</span> which supports SCSS</p>
          
        </template>

        <!-- logic -->
        <script>
          export default {
            data() {
              return {
                <!-- reactive variables -->
                name: 'John',
                last: 'Smith',
              }
            }
          }
        </script>

        <!-- styles -->
        <style lang="scss" scoped>
          p {
            color: grey;
            span {
              color: red;
            }
          }
        </style>
      `}</Code>

      <H>Variable binding with {'{{ expression }}'}</H>

      <p>Only expressions are allowed in double curly braces.</p>
      <p><code>if...else</code>, <code>for...loop</code> are not allowed</p>

      <Code block jsx>{`
        <h1>Hello {{ variable }} </h1>
        <h1>Hello {{ 1 + 1 }} </h1>
        <h1>Hello {{ 10 > 5 ? 'Ok' : 'No' }} </h1>
        <h1>Hello {{ [1,2,3] }} </h1>
        <h1>Hello {{ [1,2,3].map(num => num *  2) }} </h1>
        <h1>Hello {{ 1 === 1 && 'that is true' }} </h1>
      `}</Code>

      <H>Life-cycle methods</H>

      <p>Presented in order of methods trigger</p>

      <Code block jsx>{`
        <script>
          console.log('start of script')
          export default {
            data() {
              return {
                name: 'John',
                last: 'Smith',
              }
            },
            beforeCreate() {
              // template is not injected, data is available
              console.log('beforeCreate')
            },
            created() {
              // template injection is done, but not shown, data is available
              console.log('created')
            }, 
            beforeMount() {
              // before Vue compiling on-fly, connected Vue in script src 
              console.log('beforeMount')
            },
            mounted() {
              // view is rendered, data is available
              console.log('mounted')
            },
            beforeUnmount() {
              console.log('beforeUnmount')
            },
            unmounted() {
              console.log('unmounted')
            },
          }
          console.log('start of script')
        </script>
      `}</Code>

      <>In console we will see following sequence</>

      <ul>
        <li><code>start of script</code></li>
        <li><code>end of script</code></li>
        <li><code>beforeCreate</code></li>
        <li><code>created</code></li>
        <li><code>beforeMount</code></li>
      </ul>

      <H>THIS</H>

      <p>THIS is bind by Vue via proxy to the object returned by <code>data()</code> method.</p>

      <p>Or to the 'methods' property, hmmm... that is magic.</p>

      <Code block jsx>{`
        <script>
          export default {
            data() {
              return {
                name: 'John',
                last: 'Smith',
              }
            },
            mounted() {
              this.hi() // hi
              console.log(this.name) // 'John
              this.name = 'Kate'
              console.log(this.name) // 'Kate
            },
            methods: {
              hi() {
                console.log('hi')
              }
            }
          }
        </script>
      `}</Code>

      <H>Methods</H>

      <p>Function go into the 'methods' object property, like in the example above.</p>

      <p>They are called by <code>this.methodName()</code>.</p>

      <Hs>Computed property vs method</Hs>

      <p>Method is fired when any reactive variable in the component is changed.</p>

      <p>Computed property is fired when reactive variable in his formula changes. For other states change computed property uses previously calculated value.</p>

      <Code block jsx>{`
        <template>
          <h1>Method vs computed property</h1>
          <p>Books: <b>{{ author.books }}</b></p>
          <p>Do author have books? <b>{{ author.books > 0 ? 'Yes' : 'No' }}</b></p>
          <p>Do author have books? <b>{{ doHaveBooksProp }}</b></p>
          <p>Do author have books? <b>{{ doHaveBooksFunc() }}</b></p>
          <button @click="author.books++">decrement books +1</button>
          <button @click="author.books--">increment books -1</button>

          <p>Author's age: <b>{{ author.age }}</b></p>
          <button @click="author.age++">add age +1</button>

          <p>Some number not related to author: <b>{{ num }}</b></p>
          <button @click="num++">Add num +1</button>
          
          </template>

          <script>
          export default {
            data() {
              return {
                author: {
                  age: 55,
                  books: 3
                },
                num: 1,
              }
            },
            methods: {
              doHaveBooksFunc() {
                // fires when author.books state changes
                // fires when author.age state changes
                // fires when num state changes
                console.log('method is fired')
                return this.author.books > 0 ? 'Yes' : 'No'
              }
            },
            computed: {
              // a computed getter property
              doHaveBooksProp() {
                // fires when author.books state changes
                console.log('computed property is fired')
                return this.author.books > 0 ? 'Yes' : 'No'
              }
            }
          }
          </script>
        `}</Code>

      <H>Html directives</H>

      <p>Special html attributes build by Vue to extend the functionality of a component.</p>

      <Hs>v-if</Hs>

      <p>Toggles element based on the truthiness of the value</p>

      <Code block jsx>{`
      <template>
        <button @click="toggleElement">Toggle element</button>
        <div v-if="showEl">Hi, I am div</div>
      </template>

      <script>
      export default {
        data() {
          return {
            showEl: false
          }
        },
        methods: {
          toggleElement() {
            this.showEl = !this.showEl
          }
        },
      }
      </script>
      `}</Code>

      <Hs>v-else</Hs>

      <Code block jsx>{`
      <template>
        <button @click="awesome = !awesome">Toggle</button>
        <h1 v-if="awesome">Vue is awesome!</h1>
        <h1 v-else>Oh no 😢</h1>
      </template>

      <script>
      export default {
        data() {
          return {
            awesome: true,
          }
        },
      }
      </script>
      `}</Code>

      <Hs>v-else-if</Hs>

      <Code block jsx>{`
      <template>
        <div v-if="type === 'A'"> A </div>
        <div v-else-if="type === 'B'"> B </div>
        <div v-else-if="type === 'C'"> C </div>
        <div v-else> Not A/B/C </div>
      </template>

      <script>
      export default {
        data() {
          return {
            type: 'B',
          }
        },
      }
      </script>
      `}</Code>

      <Hs>v-if with template</Hs>

      <Code block jsx>{`
      <template>
        Template below
        <template v-if="ok">
          <h1>Title</h1>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </template>
      </template>

      <script>
        export default {
          data() {
            return {
              ok: true,
            }
          },
        }
      </script>
      `}</Code>

      <Hs>v-ones</Hs>

      <p>Updates only ones, later it stays intact.</p>

      <Code block jsx>{`
      <template>
        <h1 v-once>Hello {{name}} {{last}}</h1>
        <p>It is my first page in <span>Vue</span> which supports SCSS</p>
      </template>

      <script>
        export default {
          data() {
            return {
              name: 'John',
              last: 'Smith',
            }
          },
          mounted() {
            this.name = 'Kate'
            console.log(this.name) // 'Kate' // but html shows 'John' due to 'v-ones' directive
          },
          methods: {
            hi() {
              console.log('hi')
            }
          }
        }
      </script>
      `}</Code>

      <Hs>v-html</Hs>

      <p>Renders html from string.</p>

      <p>Tag should be empty.</p>

      <Code block jsx>{`
        <template>
          <p v-html="rawHtml"></p>
          <p>{{rawHtml}}</p>  
        </template>

        <script>
          export default {
            data() {
              return {
                name: 'John',
                last: 'Smith',
                rawHtml: '<b>hi</b>'
              }
            },
          }
        </script>
      `}</Code>

      <LazyImg path='/imgs/vue/v-html.png' />

      <Hs>v-show</Hs>

      <p>Similar for <code>v-if</code>, but simpler. Component is always rendered with <code>v-show</code></p>

      <Code block jsx>{`
      <template>
        <h1 v-show="show">Hello!</h1>
      </template>

      <script>
      export default {
        data() {
          return {
            show: true,
          }
        },
        methods: {},
        computed: {},
      }
      </script>
      `}</Code>

      <Hs>v-if Vs v-show</Hs>

      <p><code>v-if</code> is "lazy": if the condition is false on initial render, it will not do anything - the conditional block won't be rendered until the condition becomes true for the first time.</p>
      <p><code>v-show</code> is simpler, the element is always rendered regardless of initial condition, with CSS-based toggling.</p>
      <p><code>v-if</code> has higher toggle costs while <code>v-show</code> has higher initial render costs.</p>

      <Hs>v-for</Hs>

      <p>Loops over data and renders it.</p>
      <p>Can be not only array, but even object.</p>
      <p>Do not forget to specify value for <code>v-bind:key</code> attribute.</p>

      <Code block jsx>{`
      <template>
        <p>Programming languages</p>
        <ul>
          <li v-bind:key='lang' v-for="(lang, index) in langsArrOfStr">{{index + 1}}: {{lang}}</li>
        </ul>
        <p>Programming languages</p>
        <ul>
          <li v-bind:key='lang' v-for="(lang, index) in langsArrOfObj">{{index + 1}}: {{lang.langName}}</li>
        </ul>
        <p>Programming languages</p>
        <ul>
          <li v-bind:key='lang' v-for="(lang) in langsObj">{{lang}}</li>
        </ul>
      </template>

      <script>
        export default {
          data() {
            return {
              langsArrOfStr: ['JS', 'C++', 'Java', 'C#', 'ObjectiveC'],
              langsArrOfObj : [{langName: 'JS'}, {langName:'C++'}, {langName:'Java'}, {langName:'C#'}, {langName:'ObjectiveC'}],
              langsObj: {language: 'JS', creator: 'I do not know', usedIn: 'Web '},
            }
          },
          mounted() {
            this.name = 'Kate'
          },
          methods: {
            hi() {
              console.log('hi')
            }
          }
        }
      </script>
      `}</Code>

      <LazyImg width='200px' path='/imgs/vue/v-for.png' />

      <Hs>v-for with template</Hs>

      <Code block jsx>{`
      <template>
        <ul>
          <template v-bind:key="item" v-for="item in items">
            <li>{{ item }}</li>
            <div class="divider"/>
          </template>
        </ul>
      </template>

      <script>
      export default {
        data() {
          return {
            items: ['apple', 'lemon', 'melon'],
          }
        },
      }
      </script>

      <style lang="scss" scoped>
        .divider {
          height: 1px;
          background: grey;
        }
      </style>
      `}</Code>

      <LazyImg width='200px' path='/imgs/vue/vForWithTemplate.png' />

      <H>Event handlers</H>

      <Hs>Inline</Hs>

      <Code block jsx>{`
      <template>
        <button @click="count++">Add 1</button>
        <p>Count is: {{ count }}</p>  
      </template>

      <script>
      export default {
        data() {
          return {
            count: 0
          }
        },
      }
      </script>
      `}</Code>

      <Hs>v-on:click</Hs>

      <p>We can use <code>v-on:click="methodName"</code> directive in html to pass a method to onClick event.</p>

      <Code block jsx>{`
      <template>
        <p>Random number: <b>{{randNum}}</b></p>
        <button v-on:click="returnRandNum">Random number</button>
      </template>

      <script>
        const randomNumFromTo = (from, to) => Math.floor(Math.random() * (to - from + 1) + from)
        export default {
          data() {
            return {
              randNum: randomNumFromTo(1, 100),
            }
          },
          methods: {
            returnRandNum() {
              this.randNum = randomNumFromTo(1, 100)
            }
          }
        }
      </script>
      `}</Code>

      <LazyImg width='200px' path='/imgs/vue/v-on.png' />

      <Hs>{'@click'}</Hs>

      <p>Or we can use shorter version <code>@click</code> which is nicer for eyes.</p>

      <Code block jsx>{`
      <button @click="returnRandNum">Random number</button>
      `}</Code>

      <Hs>Event object</Hs>

      <p>Event object is automatically received by event handler.</p>

      <Code block jsx>{`
      <template>
        <button @click="greet">Greet</button> 
      </template>

      <script>
      export default {
        data() {
          return {
            name: 'Vue.js'
          }
        },
        methods: {
          greet(e) {
            alert(\`Hello \${this.name}!\`)
            if (e) alert(e.target.tagName)
          }
        },
        computed: {},
      }
      </script>
      `}</Code>

      <Hs>Calling methods in inline handlers</Hs>

      <Code block jsx>{`
      <template>
        <button @click="say('hello')">Say hello</button>
        <button @click="say('bye')">Say bye</button>  
      </template>

      <script>
      export default {
        data() {
          return {
            name: 'Vue.js'
          }
        },
        methods: {
          say(message) {
            alert(message)
          }
        },
      }
      `}</Code>

      <Hs>Event object in inline handlers</Hs>

      <Code block jsx>{`
      <template>
        <button @click="warn('Form cannot be submitted yet.', $event)"> Submit </button>
      </template>

      <script>
      export default {
        data() {
          return {
          }
        },
        methods: {
          warn(message, event) {
            if (event) event.preventDefault()
            alert(message)
          }
        },
      }
      </script>
      `}</Code>

      <Hs>Event modifiers</Hs>

      <ul>
        <li><code>.stop</code> event's propagation will be stopped </li>
        <li><code>.prevent</code> submit event will no longer reload the page</li>
        <li><code>.self</code> trigger handler if event.target is the element itself, i.e. not from a child element</li>
        <li><code>.capture</code> capture mode</li>
        <li><code>.once</code> triggered at most once</li>
        <li><code>.passive</code> scroll event's default behavior (scrolling) will happen</li>
      </ul>

      <p>Modifiers can be chained or can be called without handler</p>

      <Code block jsx>{`
        <a @click.stop="doThis"></a>
        <form @submit.prevent="onSubmit"></form>
        <a @click.stop.prevent="doThat"></a>
        <form @submit.prevent></form>
        <div @click.self="doThat">...</div>
        <div @click.capture="doThis">...</div>
        <a @click.once="doThis"></a>
      `}</Code>

      <Hs>Key modifiers</Hs>

      <p>On keyboard events, we may listen and fire function on specific keys.</p>

      <p>Most commonly used keys</p>

      <ul>
        <li><code>.enter</code></li>
        <li><code>.tab</code></li>
        <li><code>.delete</code></li>
        <li><code>.esc</code></li>
        <li><code>.space</code></li>
        <li><code>.up</code></li>
        <li><code>.down</code></li>
        <li><code>.left</code></li>
        <li><code>.right</code></li>
        <li><code>.ctrl</code></li>
        <li><code>.alt</code></li>
        <li><code>.shift</code></li>
        <li><code>.meta</code></li>
        <li><code>.exact</code></li>
      </ul>

      <p>Any valid key names are applicable exposed via <code>KeyboardEvent.key</code> as modifiers by converting them to kebab-case.</p>

      <Code block jsx>{`
        <input @keyup.enter="submit" />
        <input @keyup.page-down="onPageDown" />
        <input @keyup.alt.enter="clear" />
        <div @click.ctrl="doSomething">Do something</div>
        <!-- this will fire even if Alt or Shift is also pressed -->
        <button @click.ctrl="onClick">A</button>
        <!-- this will only fire when Ctrl and no other keys are pressed -->
        <button @click.ctrl.exact="onCtrlClick">A</button>
        <!-- this will only fire when no system modifiers are pressed -->
        <button @click.exact="onClick">A</button>
      `}</Code>

      <Hs>Mouse button modifiers</Hs>

      <ul>
        <li><code>.left</code></li>
        <li><code>.middle</code></li>
        <li><code>.right</code></li>
      </ul>

      <p>Event will be fired only when we hit space.</p>

      <Code block jsx>{`
      <template>
        <input :value="inputVal" @keyup.space="updateInputVal($event)" />
        <div> Value from input: <b>{{ inputVal }}</b> </div>
      </template>

      <script>
      export default {
        data() {
          return {
            inputVal: '',
          }
        },
        methods: {
          updateInputVal(e) {
            this.inputVal = e.target.value
          },
        },
      }
      </script>
      `}</Code>

      <p>Before hit space</p>

      <LazyImg width='200px' path='/imgs/vue/beforeSpace.png' />

      <p>After hit space</p>

      <LazyImg width='200px' path='/imgs/vue/afterSpace.png' />

      <H>Binding</H>

      <Hs>v-bind:value="expression"</Hs>

      <p>To dynamically attach a value to an attribute we have to use <code>v-bind:value="expression"</code></p>

      <Hs>:value="expression"</Hs>

      <p>Shorter version <code>:value="expression"</code></p>

      <Code block jsx>{`
      <template>
        <input value="regular html attr value" /> <br><br>
        <input value={{randNum}} /> <br><br>
        <input v-bind:value="5 + 5"> <br><br>
        <input :value="randNum">
      </template>

      <script>
        const randomNumFromTo = (from, to) => Math.floor(Math.random() * (to - from + 1) + from)
        export default {
          data() {
            return {
              randNum: randomNumFromTo(1, 100),
            }
          },
          methods: {
            returnRandNum() {
              this.randNum = randomNumFromTo(1, 100)
            }
          }
        }
      </script>
      `}</Code>

      <LazyImg width='200px' path='/imgs/vue/v-bind.png' />

      <Hs>Multiple attributes binding</Hs>

      <Code block jsx>{`
      <template>
        <input v-bind="objectOfAttrs" value="v:bind='objectOfAttrs'" /><br>
      </template>

      <script>
      export default {
        data() {
          return {
            objectOfAttrs: {
              id: 'inp',
              class: 'basic'
            }
          }
        },
        methods: {
        },
      }
      </script>
      `}</Code>

      <LazyImg width='400px' path='/imgs/vue/multipleAttrBinding.png' />

      <Hs>Two way binding - long way</Hs>

      <Code block jsx>{`
      <template>
        <input :value="inputVal" @input="updateInputVal($event)"/>
        <div>Value from input: <b>{{inputVal}}</b></div>
      </template>

      <script>
        export default {
          data() {
            return {
              inputVal: '',
            }
          },
          methods: {
            updateInputVal(e) {
              this.inputVal = e.target.value
            }
          }
        }
      </script>
      `}</Code>

      <LazyImg width='200px' path='/imgs/vue/twoWayBinding.png' />

      <Hs>Two way binding - short way <code>v-model</code></Hs>

      <Code block jsx>{`
      <template>
        <input v-model="inputVal" />
        <div>Value from input: <b>{{inputVal}}</b></div>
      </template>

      <script>
        export default {
          data() {
            return {
              inputVal: '',
            }
          },
          methods: {

          }
        }
      </script>
      `}</Code>

      <Hs>Disabled element</Hs>

      <Code block jsx>{`
      <template>
        <input :disabled=true value=":disabled=true" /><br>
        <input :disabled=false value=":disabled=false" /><br>
        <input :disabled="truthyVal" value=":disabled='truthyVal'" /><br>
        <input :disabled="falsyVal" value=":disabled='falsyVal'" /><br>
      </template>

      <script>
      export default {
        data() {
          return {
            truthyVal: true,
            falsyVal: false,
          }
        },
      }
      </script>
      `}</Code>

      <LazyImg width='200px' path='/imgs/vue/disabledEl.png' />

      <H>Input</H>

      <Hs>General</Hs>

      <Code block jsx>{`
        <template>
          <p>Message is: {{ message }}</p>
          <input v-model="message" placeholder="edit me" />
        </template>

        <script>
        export default {
          data() {
            return {
              message: '',
            }
          },
        }
        </script>
      `}</Code>

      <Hs>Textarea</Hs>

      <Code block jsx>{`
        <template>
          <p style="white-space: pre-line;">{{ message }}</p>
          <textarea v-model="message" placeholder="add multiple lines"></textarea>
        </template>

        <script>
        export default {
          data() {
            return {
              message: '',
            }
          },
        }
        </script>
      `}</Code>

      <Hs>Checkbox</Hs>

      <Code block jsx>{`
      <template>
        <input type="checkbox" id="checkbox" v-model="checked" />
        <label for="checkbox">{{ checked }}</label>
      </template>

      <script>
      export default {
        data() {
          return {
            checked: true,
          }
        },
      }
      </script>
      `}</Code>

      <Hs>Checkboxes</Hs>

      <Code block jsx>{`
      <template>
        <div>Checked names: {{ checkedNames }}</div>

        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
        <label for="jack">Jack</label>

        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>

        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label>
      </template>

      <script>
      export default {
        data() {
          return {
            checkedNames: []
          }
        },
      }
      </script>
      `}</Code>

      <Hs>Radio</Hs>

      <Code block jsx>{`
      <template>
        <div>Picked: {{ picked }}</div>

        <input type="radio" id="one" value="One" v-model="picked" />
        <label for="one">One</label>

        <input type="radio" id="two" value="Two" v-model="picked" />
        <label for="two">Two</label>
      </template>

      <script>
      export default {
        data() {
          return {
            picked: 'One'
          }
        },
      }
      </script>
      `}</Code>

      <Hs>Select</Hs>

      <Code block jsx>{`
      <template>
        <div>Selected: {{ selected }}</div>

        <select v-model="selected">
          <option disabled value="">Please select one</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
      </template>

      <script>
      export default {
        data() {
          return {
            selected: ''
          }
        },
        methods: {
        }
      }
      </script>
      `}</Code>

      <Hs>Multiple select</Hs>

      <Code block jsx>{`
      <template>
        <div>Selected: {{ selected }}</div>

        <select v-model="selected" multiple>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
      </template>

      <script>
      export default {
        data() {
          return {
            selected: []
          }
        },
      }
      </script>
      `}</Code>

      <Hs>Modifiers</Hs>

      <Code block jsx>{`
      <!-- synced after "change" instead of "input" -->
      <input v-model.lazy="msg" />
      <!-- converts to number -->
      <input v-model.number="age" />
      <!-- trims white spaces -->
      <input v-model.trim="msg" />
      `}</Code>

      <H>Access updated DOM</H>

      <p>Use the nextTick() to wait for the DOM update to complete after a state change</p>

      <Code block jsx>{`
      import { nextTick } from 'vue'

      export default {
        methods: {
          increment() {
            this.count++
            nextTick(() => {
              // access updated DOM
            })
          }
        }
      }
      `}</Code>

      <H>DOM reference</H>

      <Hs>Ref</Hs>

      <Code block jsx>{`
      <template>
        <input ref="input">
      </template>

      <script>
      export default {
        data() {
          return {
          }
        },
        mounted() {
          this.$refs.input.focus()
        }
      }
      </script>
      `}</Code>

      <Hs>Refs inside v-for</Hs>

      <p><code>ref</code> used inside <code>v-for</code> gives an array containing the corresponding elements</p>

      <p>Elements order inside an array can be different.</p>

      <Code block jsx>{`
      <template>
        <ul>
          <li v-bind:key="item" v-for="item in list" ref="items"> {{ item }} </li>
        </ul>
      </template>

      <script>
      export default {
        data() {
          return {
            list: [
              'abb', 'siemens', 'GE', 'Alstom'
            ]
          }
        },
        mounted() {
          console.log(this.$refs.items) // (4) [li, li, li, li]
        }
      }
      </script>
      `}</Code>

      <H>Watchers</H>

      <p>With a watcher we may trigger a function on a state change.</p>

      <Code block jsx>{`
        <template>
          <p>Ask a yes/no question: <input v-model="question" /></p>
          <p>{{ answer }}</p>
        </template>

        <script>
        export default {
          data() {
            return {
              question: '',
              answer: 'Questions usually contain a question mark. ;-)'
            }
          },
          watch: {
            // whenever question changes, this function will run
            question(newQuestion, oldQuestion) {
              if (newQuestion.indexOf('?') > -1) this.getAnswer()
            }
          },
          methods: {
            async getAnswer() {
              this.answer = 'Thinking...'
              try {
                const res = await fetch('https://yesno.wtf/api')
                this.answer = (await res.json()).answer
              } catch (e) {
                this.answer = 'Error! Could not reach the API. ' + error
              }
            }
          }
        }
      `}</Code>

      <H>Components</H>

      <Hs>Export & import</Hs>

      <p>Child component <code>ButtonComponent.vue</code></p>

      <Code block jsx>{`
      <template>
        <button @click="sayHi">{{buttonText}}</button>
      </template>

      <script>
        export default {
          props: ['buttonText'],
          data() {
            return {
              someVar: '',
            }
          },
          methods: {
            sayHi() {
              alert('hello from ---' + this.buttonText + '--- button')
            },
          },
        }
      </script>

      <style lang="scss" scoped>
        button {
          padding: 10px;
          margin: 10px;
          background: black;
          color: white;
        }
      </style>
      `}</Code>

      <p>Parent component</p>

      <Code block jsx>{`
      <template>
        <h1>I am parent component</h1>
        <ButtonComponent buttonText='Click me' />
        <ButtonComponent buttonText='Press on me'/>
      </template>

      <script>
        import ButtonComponent from './ButtonComponent.vue'

        export default {
          components: { ButtonComponent },
          data() {
            return {
              someVar: '',
            }
          },
          methods: {
            someFunc() {
            },
          },
        }
      </script>
      `}</Code>

      <p>Imported components should be registered in <code>{'components {}'}</code> object.</p>

      <LazyImg width='400px' path='/imgs/vue/exportImportComponentResult.png' />

      <Hs>Components from array</Hs>

      <Code block jsx>{`
      <template>
        <h1>I am parent component</h1>
        <ButtonComponent
          v-for="text in bntTexts"
          :key="text"
          :buttonText="text"
        />
      </template>

      <script>
        import ButtonComponent from './ButtonComponent.vue'

        export default {
          components: { ButtonComponent },
          data() {
            return {
              bntTexts: ['Click me', 'Press on me'],
            }
          },
          methods: {
            someFunc() {
            },
          },
        }
      </script>
      `}</Code>

      <Hs>Emit</Hs>

      <p>We can emit data from a child component on listen for it and assign a handler on parent component.</p>

      <p>Child</p>

      <Code block jsx>{`
      <template>
        <button @click="$emit('msgFromChild', 'hello from child')">
          Emit from child to parent
        </button>
      </template>

      <script>
        export default {
          data() {
          },
          methods: {
          },
        }
      </script>
      `}</Code>

      <p>Parent</p>

      <Code block jsx>{`
      <template>
        <h1>Parent</h1>
        <Child @msgFromChild="readMessage"/>
      </template>

      <script>
        import Child from './Child.vue'

        export default {
          components: { Child },
          data() {
          },
          methods: {
            readMessage(args) {
              alert(args)
            },
          },
        }
      </script>
      `}</Code>

      <LazyImg width='400px' path='/imgs/vue/emit.png' />

      <Hs>Slots (props.children)</Hs>

      <p>{'<slot>'} is a placeholder where we want the content to go when we pass it between component tags.</p>

      <p>Parent</p>

      <Code block jsx>{`
      <template>
        <h1>Parent</h1>
        <Child>Hello, I am a child component</Child>
      </template>

      <script>
        import Child from './Child.vue'

        export default {
          components: { Child },
          data() {
          },
          methods: {
          },
        }
      </script>
      `}</Code>

      <p>Child</p>

      <Code block jsx>{`
      <template>
        <p>Passed content goes below</p>
        <b><slot /></b>
      </template>

      <script>
        export default {
          props: [],
          data() {
          },
          methods: {
          },
        }
      </script>
      `}</Code>

      <LazyImg width='200px' path='/imgs/vue/slot.png' />

      <Hs>Dynamic component</Hs>
      <p><code>{'<component>'}</code> tag with the special <code>:is="'componentName'"</code> attribute can dynamically add a component with such name.</p>

      <Code block jsx>{`
      <template>
        <h1>Parent</h1>
        <component :is="'Child1'"></component>
        <component :is="componentToShow"></component>
      </template>

      <script>
        import Child1 from './Child1.vue'
        import Child2 from './Child2.vue'
        import Child3 from './Child3.vue'

        export default {
          components: { Child1, Child2, Child3 },
          data() {
            return {
              componentToShow: 'Child3',
            }
          },
          methods: {
            myFunc() {
            },
          },
        }
      </script>
      `}</Code>

      <LazyImg width='150px' path='/imgs/vue/dynamicComponent.png' />
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
