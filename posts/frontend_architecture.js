import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'frontend architecture',
  date: '2024.03.21',
  tags: ['basic', 'architecture'],
  imgUrl: 'https://antonarbus.com/imgs/xxx.png',
  desc: 'frontend architecture',
  body: (
    <>
      <ul>
        <li>Based on 2 videos</li>
        <li><Lnk path='https://www.youtube.com/watch?v=c3JGBdxfYcU'>https://www.youtube.com/watch?v=c3JGBdxfYcU</Lnk></li>
        <li><Lnk path='https://www.youtube.com/watch?v=UUga4-z7b6s'>https://www.youtube.com/watch?v=UUga4-z7b6s</Lnk></li>
      </ul>

      <H>What is architecture</H>

      <ul>
        <li>architecture is how software modules interact with each other</li>
        <li>folders structure is not an architecture</li>
        <li>in frontend modules are ui components that uses business logic inside</li>
      </ul>

      <H>Classical</H>

      <ul>
        <li>can be seen in simple apps and youtube tutorials</li>
        <li>it is not an architecture, but simply tech oriented folder structure</li>
        <li>applicable for small projects, prototypes, no team involved</li>
      </ul>

      <LazyImg path='/imgs/frontend-architecture/01 01 classical no architecture.png' width='200px'/>

      <ul>
        <li>with this approach components like pages are isolated but rest of all are not</li>
        <li>components are interconnected</li>
        <li>ui components are mixed with business logic</li>
        <li>at the end we end up in decoupled chaos without clear data flow</li>
      </ul>

      <LazyImg path='/imgs/frontend-architecture/01 02 classical mix.png' width='400px' />

      <H>Modular</H>

      <Hs>Layers</Hs>

      <ul>
        <li>it is already an architecture with data flow rules</li>
        <li>it has mandatory layers</li>
      </ul>

      <LazyImg path='/imgs/frontend-architecture/02 01 layers.png' width='200px' />

      <ul>
        <li><code>modules</code> inside have business oriented segments, which do not interact with each other</li>
        <li><code>module</code> is responsible for one task & ideally has all needed to do the task</li>
        <li>data flows vertically, code from lower layers can not import data from upper layers</li>
        <li>other folders will naturally appear and permitted</li>
      </ul>

      <LazyImg path='/imgs/frontend-architecture/02 02 data flows from to to bottom.png' width='400px' />

      <Hs>UI</Hs>

      <p><code>UI</code> layer has most generic UI blocks without any logic</p>

      <LazyImg path='/imgs/frontend-architecture/02 03 ui.png' width='400px' />

      <Hs>Components</Hs>

      <ul>
        <li><code>components</code> layer contains a bit more complex components that may use blocks from <code>ui</code></li>
        <li>may include minimal business logic</li>
      </ul>

      <LazyImg path='/imgs/frontend-architecture/02 04 components.png' width='400px' />

      <Hs>Modules</Hs>

      <ul>
        <li><code>modules</code> layer has isolated independent parts with its own responsibilities</li>
        <li>main business logic is here</li>
        <li>here may appear apis, states, error handlers, validations, loading logic, etc...</li>
        <li>module can be big and difficult</li>
      </ul>

      <LazyImg path='/imgs/frontend-architecture/02 05 modules.png' width='400px' />

      <ul>
        <li><code>module</code> contains all needed data and functionality inside to be independent from other modules</li>
        <li><code>modules</code> do not interact with each other</li>
        <li>all logic is encapsulated inside a module and data to the outside should go via public apis <code>index</code> file</li>
      </ul>

      <LazyImg path='/imgs/frontend-architecture/02 06 module inside.png' width='600px' />

      <Hs>Pages</Hs>

      <p><code>pages</code> layer is like <code>modules</code> on upper level</p>

      <LazyImg path='/imgs/frontend-architecture/02 07 pages.png' width='400px'/>

      <p><code>page</code> may have own components, apis, helpers, etc...</p>

      <LazyImg path='/imgs/frontend-architecture/02 08 page inside.png' width='600px'/>

      <ul>
        <li><code>page</code> should be as thin as possible</li>
        <li>ideally it should be just a list of modules and components</li>
        <li>as much business logic, helpers, states etc... should be extracted down into modules if possible</li>
        <li>if 2 modules to be grouped, we do it on a page level</li>
      </ul>

      <LazyImg path='/imgs/frontend-architecture/02 09 page should be thin.png' width='600px'/>

      <ul>
        <li>in real project it is not enough just to have <code>pages</code>, <code>modules</code>, <code>components</code> & <code>ui</code></li>
        <li>more global folders will be introduced, like <code>helpers</code>, <code>state</code>, <code>config</code>, <code>consts</code> etc...</li>
      </ul>

      <LazyImg path='/imgs/frontend-architecture/02 02 data flows from to to bottom.png' width='400px'/>

      <Hs>Pros & cons</Hs>

      <ul>
        <li>+ code isolation on module layer with public apis</li>
        <li>+ one way data flow</li>
        <li>+ reusability due to layers</li>
        <li>+ modules are easy to modify & delete because pages are thin</li>
        <li>- not business oriented</li>
        <li>- not clear what goes to a component, what to a module</li>
        <li>- what do we do if one module should be used in other module, group logic on a page level, but what if we need it on different pages, then we have to duplicate it</li>
        <li>- where to keep business related entities like data, types & components for a product, an article, a user</li>
        <li>- unclear connections are formed in global folders like store, helpers, consts</li>
      </ul>

      <p>Modular architecture is a way better that classical, but does not fit well for a project with complex business logic and big variety of features</p>

      <H>Atomic design</H>

      <ul>
        <li>Similar to modular architecture</li>
        <li>More design oriented</li>
        <li>Was popular 4 years ago</li>
      </ul>

      <LazyImg path='/imgs/frontend-architecture/03 01 overall.png' width='400px'/>
      <LazyImg path='/imgs/frontend-architecture/03 02 folders.png' width='400px' />

      <Hs>Atomic vs modular design</Hs>

      <LazyImg path='/imgs/frontend-architecture/03 03 module vs atomic.png' width='400px'/>

      <Hs>Atoms</Hs>

      <LazyImg path='/imgs/frontend-architecture/03 04 atoms.png' width='400px' />

      <Hs>Molecules</Hs>

      <LazyImg path='/imgs/frontend-architecture/03 05 molecules.png' width='400px' />

      <Hs>Organisms</Hs>

      <LazyImg path='/imgs/frontend-architecture/03 06 organisms.png' width='400px' />

      <Hs>Templates</Hs>

      <LazyImg path='/imgs/frontend-architecture/03 07 templates.png' width='400px' />

      <Hs>Pages</Hs>

      <LazyImg path='/imgs/frontend-architecture/03 08 pages.png' width='400px' />

      <H>Feature sliced design</H>

      <Lnk path='https://feature-sliced.design/docs/get-started/overview'>https://feature-sliced.design/docs/get-started/overview</Lnk>

      <ul>
        <li>in FSD, a project consists of <code>layers</code>, <code>slices</code> and <code>segments</code></li>
      </ul>

      <LazyImg path='/imgs/frontend-architecture/04 01 fsd.png' width='600px' />

      <ul>
        <li>layers are vertically arranged</li>
        <li>layers are common across all projects</li>
        <li>❗️ code on one layer can only interact with code from the layers below</li>
      </ul>

      <Hs>Example</Hs>

      <LazyImg path='/imgs/frontend-architecture/04 02 example.png' width='600px' />

      <Hs>Shared layer</Hs>

      <ul>
        <li>reusable common functionality</li>
        <li>e.g. UIKit, libs, API</li>
        <li>❗️No business logic here</li>
      </ul>

      <LazyImg path='/imgs/frontend-architecture/04 03 shared.png' />

      <Hs>Entities layer (opt)</Hs>

      <ul>
        <li>elements which have a business value</li>
        <li>e.g. BlogPost, User, Order, Product</li>
        <li>can include a ui components with slots for content/interactive elements</li>
        <li>should contain the logic to describe how entity looks and behaves</li>
        <li>e.g. static UI elements, data stores, CRUD operations, reducers, selectors, mappers</li>
      </ul>

      <LazyImg path='/imgs/frontend-architecture/04 04 entities.png' width='300px' />

      <Hs>Features layer (opt)</Hs>

      <ul>
        <li>entity can act differently depending on features we apply to it</li>
        <li>feature is an action on entity to achieve a valuable outcome</li>
        <li>e.g. create-blog-post, login-by-auth, edit-account, publish-video, show-ad, grant-access, show-contact-information</li>
        <li>may contain interactive UI elements, internal state and API calls that enable value-producing actions</li>
      </ul>

      <LazyImg path='/imgs/frontend-architecture/04 05 feature.png' width='300px' />

      <Hs>Widgets layer</Hs>

      <ul>
        <li>compositional layer to combine lower-level units from entities + features into meaningful assembled blocks with content and interactive buttons wired to the api calls</li>
        <li>e.g. PostCard, IssuesList, UserProfile</li>
        <li>in this layer we fill slots left in the UI of Entities with other Entities and interactive elements from Features</li>
        <li>usually non-business logic come here (e.g. gestures, keyboard interaction, etc)</li>
        <li>for reach widgets business logic is permitted</li>
        <li>❗️ it might be hard to decide what goes into Entities and Features. Do not worry. Just put all logic into Widgets layer. You will feel later if it should be split into Entities and Features</li>
      </ul>

      <Hs>Pages layer</Hs>

      <ul>
        <li>compositional layer to construct full pages / views / routes</li>
        <li>❗️ no business and minimum other logic here</li>
      </ul>

      <LazyImg path='/imgs/frontend-architecture/04 06 page.png' width='400px' />

      <Hs>App layer</Hs>

      <ul>
        <li>app-wide settings</li>
        <li>e.g. styles, providers, router, store</li>
      </ul>

      <LazyImg path='/imgs/frontend-architecture/04 07 app.png' width='300px' />

      <Hs>Slices</Hs>

      <ul>
        <li>a layer can be divided into business oriented slices to keep related code together</li>
        <li>it is the same as a module in modular design described above</li>
        <li>e.g. post, add-user-to-friends, news-feed...</li>
        <li><code>shared</code> and <code>app</code> layers never have slices as they do not have business logic inside</li>
        <li>❗️ slices cannot use other slices on the same layer</li>
        <li>Closely related slices can be grouped in a folder, but they still should follow rule above</li>
        <li>❗️ slices (and segments without slices) must contain the <code>index</code> file entry points (public API) with module re-exports</li>
        <li>code outside can not reference internal slice file structure, but public API only</li>
      </ul>

      <Hs>Segments</Hs>

      <p>a slice consists of segments to separate code by its technical nature, common segments, ❗️ but not necessarily are</p>

      <ul>
        <li><code>ui</code> ui-logic, components</li>
        <li><code>model</code> business logic, store, actions, selectors</li>
        <li><code>lib</code> utils, helpers, hooks</li>
        <li><code>api</code> communication with external APIs, backend API methods</li>
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
