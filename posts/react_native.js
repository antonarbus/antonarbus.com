import { Code, H, Hs, LazyImg, Lnk, React, useEffect, useState, useRef, useCallback, useMemo, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'react native',
  date: '2022.10.28',
  tags: ['react', 'native'],
  imgUrl: 'https://antonarbus.com/imgs/react.png',
  desc: 'react native basics',
  body: (
    <>
      <H>Installation</H>

      <ul>
        <li>Follow official <Lnk path='https://reactnative.dev/docs/environment-setup'>instructions</Lnk></li>
        <li>Install <Lnk path='https://brew.sh/'>Homebrew</Lnk></li>
        <li><Code>brew install node</Code></li>
        <li><Code>brew install watchman</Code></li>
        <li><Code>{'\\curl -sSL https://get.rvm.io | bash -s stable'}</Code> install ruby version manager</li>
        <li>reboot terminal</li>
        <li><Code>rvm install 2.7.5</Code> install specific ruby version, same as <Lnk path='https://github.com/facebook/react-native/blob/main/template/_ruby-version'>here</Lnk></li>
        <li><Lnk path='https://apps.apple.com/us/app/xcode/id497799835?mt=12'>xcode</Lnk> to be installed</li>
        <li>Choose latest version in Xcode - File - Settings - Location - Command line tools</li>
        <li>Instal an iOS Simulator in Xcode</li>
        <li><Code>npm uninstall -g react-native-cli @react-native-community/cli</Code> uninstall perv versions</li>
        <li><Code>npx react-native init appName</Code></li>
      </ul>

      <H>Dev start</H>

      <ul>
        <li><Code>cd appName</Code></li>
        <li><Code>npx react-native run-ios</Code></li>
        <li>Simulator will be started and app build, takes around minute or more</li>
      </ul>

      <H>Port</H>

      <p>Choose different port if needed.</p>

      <ul>
        <li>default port is 8081</li>
        <li><Code>npx react-native start --port=8088</Code> configure port</li>
        <li>Also change port in file <code>ios/__App_Name__.xcodeproj/project.pbxproj</code></li>
      </ul>
      <H>Docs</H>

      <p><Lnk path='https://reactnative.dev/docs/getting-started'>React Native docs</Lnk></p>

      <H>Hello world</H>

      <Code block jsx>{`
      // App.js
      import React from 'react'
      import {Text, View} from 'react-native'

      const HelloWorldApp = () => (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ fontSize: 20}}>Hello, world!</Text>
        </View>
      )
      export default HelloWorldApp
      `}</Code>

      <H>State</H>

      <Code block jsx>{`
      import React, { useState } from 'react'
      import { View, Text, Button, StyleSheet } from 'react-native'

      const App = () => {
        const [count, setCount] = useState(0)

        return (
          <View style={styles.container}>
            <Text>You clicked {count} times</Text>
            <Button onPress={() => setCount(count + 1)} title="Click me!" />
          </View>
        )
      }

      const styles = StyleSheet.create({
        container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
      })

      export default App
      `}</Code>

      <H>Prop</H>

      <Code block jsx>{`
      import React from 'react'
      import { Text, View, StyleSheet } from 'react-native'

      const styles = StyleSheet.create({
        center: { alignItems: 'center' },
      })

      const Greeting = ({name}) => (
        <View style={styles.center}>
          <Text>Hello {name}!</Text>
        </View>
      )

      const LotsOfGreetings = () =>  (
        <View style={[styles.center, {top: 50}]}>
          <Greeting name="Rexxar" />
          <Greeting name="Jaina" />
          <Greeting name="Valeera" />
        </View>
      )

      export default LotsOfGreetings
      `}</Code>

      <H>Core components</H>

      <ul>
        <li><Code>{'<View>'}</Code> a container that supports layout with flexbox, style, some touch handling</li>
        <li><Code>{'<Text>'}</Code> displays, styles, and nests strings of text and even handles touch events</li>
        <li><Code>{'<Image>'}</Code> displays different types of images</li>
        <li><Code>{'<ScrollView>'}</Code> scrolling container that can contain multiple components and views</li>
        <li><Code>{'<TextInput>'}</Code> allows to enter text</li>
      </ul>

      <Code block jsx>{`
      import React from 'react'
      import { View, Text, Image, ScrollView, TextInput } from 'react-native'

      const App = () => (
        <ScrollView>
          <Text>Some text</Text>
          <View>
            <Text>Some more text</Text>
            <Image
              source={{ uri: 'https://reactnative.dev/docs/assets/p_cat2.png' }}
              style={{ width: 200, height: 200 }}
            />
          </View>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            defaultValue="You can type in me"
          />
        </ScrollView>
      )

      export default App
      `}</Code>

      <H>TextInput</H>

      <ul>
        <li><Code>onChangeText</Code> prop that takes a function to be called every time the text changed</li>
        <li><Code>onSubmitEditing</Code> prop that takes a function to be called when the text is submitted</li>
      </ul>

      <Code block jsx>{`
      import React, { useState } from 'react'
      import { Text, TextInput, View } from 'react-native'

      const PizzaTranslator = () => {
        const [text, setText] = useState('')
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
              style={{height: 40}}
              placeholder="Type here"
              onChangeText={newText => setText(newText)}
              defaultValue={text}
            />
            <Text style={{padding: 10}}>
              Number of chars: {text.length}
            </Text>
          </View>
        )
      }

      export default PizzaTranslator
      `}</Code>

      <H>ScrollView</H>

      <ul>
        <li>Main scrolling container that can contain multiple components and views</li>
        <li>Can scroll both vertically and horizontally </li>
      </ul>

      <Code block jsx>{`
      import React from 'react'
      import { ScrollView, Text } from 'react-native'

      const App = () => (
        <ScrollView>
          {[...Array(100).keys()].map(
            item => <Text key={item}>Line {item}</Text>
          )}
        </ScrollView>
      )

      export default App
      `}</Code>

      <H>FlatList & SectionList</H>

      <ul>
        <li>Common use is displaying list data that you fetch from a server</li>
        <li><Code>{'<FlatList>'}</Code> component displays a scrolling list of changing data</li>
        <li><Code>{'<SectionList>'}</Code> is the same, but broken into logical sections</li>
      </ul>

      <Code block jsx>{`
      import React from 'react'
      import { FlatList, StyleSheet, Text, View } from 'react-native'

      const styles = StyleSheet.create({
        container: { flex: 1, paddingTop: 22 },
        item: { padding: 10, fontSize: 18, height: 44 },
      })

      const FlatListBasics = () => (
        <View style={styles.container}>
          <FlatList
            data={[ {key: 'Devin'}, {key: 'Dan'}, {key: 'Dominic'}, {key: 'Jackson'}, {key: 'James'}, {key: 'Joel'}, {key: 'John'}, {key: 'Jillian'}, {key: 'Jimmy'}, {key: 'Julie'}, ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          />
        </View>
      )

      export default FlatListBasics
      `}</Code>

      <Code block jsx>{`
      import React from 'react'
      import {SectionList, StyleSheet, Text, View} from 'react-native'

      const styles = StyleSheet.create({
        container: { flex: 1, paddingTop: 22 },
        sectionHeader: { paddingTop: 2, paddingLeft: 10, paddingRight: 10, paddingBottom: 2, fontSize: 14, fontWeight: 'bold', backgroundColor: 'rgba(247,247,247,1.0)' },
        item: { padding: 10, fontSize: 18, height: 44 },
      })

      const SectionListBasics = () => {
        return (
          <View style={styles.container}>
            <SectionList
              sections={[
                {
                  title: 'D',
                  data: ['Devin', 'Dan', 'Dominic'],
                },
                {
                  title: 'J',
                  data: [ 'Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie' ],
                },
              ]}
              renderItem={({ item }) =>
                <Text style={styles.item}>{item}</Text>}
              renderSectionHeader={({section}) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
              )}
              keyExtractor={(item) =>
                \`basicListEntry-\${item.title}\`
              }
            />
          </View>
        )
      }

      export default SectionListBasics
      `}</Code>

      <H>Platform specific code</H>

      <p><Lnk path='https://reactnative.dev/docs/platform-specific-code'>https://reactnative.dev/docs/platform-specific-code</Lnk></p>

      <Code block jsx>{`
      import { Platform, StyleSheet } from 'react-native'

      const styles = StyleSheet.create({
        height: Platform.OS === 'ios' ? 200 : 100
      })
      `}</Code>

      <p>There is also a <code>Platform.select</code> method available, that given an object where keys can be one of 'ios' | 'android' | 'native' | 'default', returns the most fitting value for the platform you are currently running on. </p>

      <Code block jsx>{`
      import { Platform, StyleSheet } from 'react-native'

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          ...Platform.select({
            ios: {
              backgroundColor: 'red'
            },
            android: {
              backgroundColor: 'green'
            },
            default: {
              // other platforms, web for example
              backgroundColor: 'blue'
            }
          })
        }
      })
      `}</Code>

      <Code block jsx>{`
      const Component = Platform.select({
        ios: () => require('ComponentIOS'),
        android: () => require('ComponentAndroid')
      })()

      <Component />
      `}</Code>

      <H>Detecting the os version</H>

      <Code block jsx>{`
      import { Platform } from 'react-native';

      if (Platform.Version === 25) {
        console.log('Running on Nougat!');
      }
      `}</Code>

      <Code block jsx>{`
      import { Platform } from 'react-native';

      const majorVersionIOS = parseInt(Platform.Version, 10);
      if (majorVersionIOS <= 9) {
        console.log('Work around a change in behavior');
      }
      `}</Code>

      <H>Platform-specific components</H>

      <ul>
        <li>Consider splitting the code out into separate files for ios and android if needed</li>
        <li>React Native will detect when a file has a <code>.ios.</code> or <code>.android.</code> extension</li>
        <li>Or even platform specific components</li>
      </ul>

      <Code block jsx>{`
      // files
      Container.js # picked up by Webpack, Rollup or any other Web bundler
      Container.native.js # picked up by the React Native bundler for both Android and iOS (Metro)
      BigButton.ios.js
      BigButton.android.js
      `}</Code>

      <Code block jsx>{`
      import BigButton from './BigButton'
      import Container from './Container'
      `}</Code>

      <H>Run on device</H>

      <ul>
        <li></li>
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
