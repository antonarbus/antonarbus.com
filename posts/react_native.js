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

      <p>Notes are based primarily on <Lnk path='https://www.udemy.com/course/react-native-the-practical-guide/'>https://www.udemy.com/course/react-native-the-practical-guide/</Lnk></p>

      <ul>
        <li>Follow official <Lnk path='https://reactnative.dev/docs/environment-setup'>instructions</Lnk></li>
        <li>Install <Lnk path='https://brew.sh/'>Homebrew</Lnk></li>
        <li><Code>brew install node</Code></li>
        <li><Code>brew install watchman</Code></li>
        <li><Code>{'\\curl -sSL https://get.rvm.io | bash -s stable'}</Code> install ruby version manager</li>
        <li>reboot terminal</li>
        <li><Code>rvm install 2.7.5</Code> install specific ruby version, same as <Lnk path='https://github.com/facebook/react-native/blob/main/template/_ruby-version'>here</Lnk></li>
        <li><Lnk path='https://apps.apple.com/us/app/xcode/id497799835?mt=12'>XCode</Lnk> to be installed</li>
        <li>Choose latest version in <code>Xcode</code> - <code>File</code> - <code>Settings</code> - <code>Location</code> - <code>Command line tools</code></li>
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

      <H>Expo</H>

      <ul>
        <li>Despite on common environment setup above provided by react native team we can use <Lnk path='https://expo.dev/'>Expo CLI</Lnk></li>
        <li>It is easier</li>
        <li><Lnk path='https://reactnative.dev/docs/environment-setup?guide=quickstart'>https://reactnative.dev/docs/environment-setup?guide=quickstart</Lnk></li>
        <li><Code bash>npx create-expo-app react_native_heeros_learning_week</Code> create project with Expo cli </li>
        <li><Code>cd react_native_heeros_learning_week</Code></li>
        <li><Code>npx expo start</Code></li>
      </ul>

      <Hs>With phone</Hs>

      <ul>
        <li>Install for your phone<Lnk path='https://apps.apple.com/us/app/expo-go/id982107779'>https://apps.apple.com/us/app/expo-go/id982107779</Lnk></li>
        <li>With phone just redirect from the terminal to the link by barcode photo app to open the app directly on the phone</li>
      </ul>

      <Hs>With Android simulator</Hs>

      <ul>
        <li>Install <Lnk path='https://developer.android.com/studio'>https://developer.android.com/studio</Lnk></li>
        <li>There you can create an emulator under <code>projects</code> --> <code>more actions</code> --> <code>virtual device manager</code> </li>
        <li>From the terminal just press <kbd>A</kbd> to open the app in android simulator</li>
      </ul>

      <Hs>With iOS simulator</Hs>

      <ul>
        <li>Install <Lnk path='https://apps.apple.com/us/app/xcode/id497799835?mt=12'>Xcode</Lnk></li>
        <li>Choose latest version in <code>Xcode</code> - <code>File</code> - <code>Settings</code> - <code>Location</code> - <code>Command line tools</code></li>
        <li>Instal an iOS Simulator in Xcode</li>
        <li>From the terminal just press <kbd>I</kbd> to open the app in iOS simulator</li>
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
        <li><Code>{'<TextInput>'}</Code> allows to enter text</li>
        <li><Code>{'<Image>'}</Code> displays different types of images</li>
        <li><Code>{'<ImageBackground>'}</Code> same as image, but renders in the background instead of foreground</li>
        <li><Code>{'<Button>'}</Code> button</li>
        <li><Code>{'<ScrollView>'}</Code> scrolling container that can contain multiple components and views</li>
        <li><Code>{'<FlatList>'}</Code> for long list data</li>
        <li><Code>{'<Pressable>'}</Code> allows to press on item</li>
        <li><Code>{'<Modal>'}</Code> modal container with built-in animation</li>
        <li><Code>{'<SafeAreaView>'}</Code> provides usable phone area which does not include notch</li>
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

      <H>View</H>

      <ul>
        <li>Should have other components inside, can not have just a pure text</li>
        <li>It is kind of div element where we can group other things</li>
      </ul>

      <H>Text</H>

      <ul>
        <li>Text component can contain another Text</li>
        <li>But not View for ex.</li>
      </ul>

      <Code block jsx>{`
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
        rounds to guess the number{' '}
        <Text style={styles.highlight}>{userNumber}</Text>.
      </Text>
      ...
      const styles = StyleSheet.create({
        summaryText: {
          fontFamily: 'open-sans',
          fontSize: 24,
          textAlign: 'center',
          marginBottom: 24,
        },
        highlight: {
          fontFamily: 'open-sans-bold',
          color: Colors.primary500,
        },
      });
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
              value={text}
            />
            <Text style={{padding: 10}}>
              Number of chars: {text.length}
            </Text>
          </View>
        )
      }

      export default PizzaTranslator
      `}</Code>

      <H>TextInput with numbers keyboard</H>

      <Code block jsx>{`
        const [enteredNumber, setEnteredNumber] = useState('');
        function numberInputHandler(val) {
          setEnteredNumber(val)
        }

        return (
          <TextInput
            style={styles.numberInput}
            maxLength={2}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            value={enteredNumber}
            onChangeText={numberInputHandler}
        />
        )
      `}</Code>

      <H>Image</H>

      <ul>
        <li>image to be put into <code>assets/images</code></li>
        <li>path to an image should be done with <code>require</code> function</li>
      </ul>

      <Code block jsx>{`
      import { View, TextInput, Button, StyleSheet, Modal, Image, } from 'react-native';
      ...
        return (
          <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
              <Image
                style={styles.image}
                source={require('../assets/images/goal.png')}
              />              
            </View>
          </Modal>
        );
      }

      export default GoalInput;

      const styles = StyleSheet.create({
        inputContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
          backgroundColor: '#311b6b',
        },
        image: {
          width: 100,
          height: 100,
          margin: 20,
        }
      });
      `}</Code>

      <H>ImageBackground</H>

      <Code block jsx>{`
      import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
      import { LinearGradient } from 'expo-linear-gradient';

      export default function App() {

        return (
          <LinearGradient
            colors={[Colors.primary700, Colors.accent500]}
            style={styles.rootScreen}
          >
            <ImageBackground
              source={require('./assets/images/background.png')}
              resizeMode="cover"
              style={styles.rootScreen}
              imageStyle={styles.backgroundImage}
            >
              <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
            </ImageBackground>
          </LinearGradient>
        );
      }

      const styles = StyleSheet.create({
        rootScreen: {
          flex: 1,
        },
        backgroundImage: {
          opacity: 0.15,
        },
      });
      `}</Code>

      <H>Button</H>

      <ul>
        <li><Code>onPress</Code> same as on onClick in dom</li>
      </ul>

      <Code block jsx>{`
      <Button onPress={() => setCount(count + 1)} title="Click me!" />
      `}</Code>

      <H>Custom button</H>

      <ul>
        <li>for ripple effect for android we provide <Code>android_ripple</Code> prop</li>
        <li>for iOS we apply <code>pressed</code> styles in callback function at <code>style</code> prop</li>
        <li>note that styles are combined in array when button is pressed</li>
      </ul>

      <Code block jsx>{`
      import { View, Text, Pressable, StyleSheet } from 'react-native';
      import Colors from '../../constants/colors';

      function PrimaryButton({ children, onPress }) {
        return (
          <View style={styles.buttonOuterContainer}>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [styles.buttonInnerContainer, styles.pressed]
                  : styles.buttonInnerContainer
              }
              onPress={onPress}
              android_ripple={{ color: Colors.primary600 }}
            >
              <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
          </View>
        );
      }

      export default PrimaryButton;

      const styles = StyleSheet.create({
        buttonOuterContainer: {
          borderRadius: 28,
          margin: 4,
          overflow: 'hidden',
        },
        buttonInnerContainer: {
          backgroundColor: Colors.primary500,
          paddingVertical: 8,
          paddingHorizontal: 16,
          elevation: 2,
        },
        buttonText: {
          color: 'white',
          textAlign: 'center',
        },
        pressed: {
          opacity: 0.75,
        },
      });
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
        <li>Advantage is that it is lazy loaded</li>
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

      <ul>
        <li>In react we usually provide a <code>key</code> prop in map function</li>
        <li>In FlatList key should be integrated into the <code>data</code> items</li>
        <li>Or special <Code>keyExtractor</Code> prop should be used with callback returning something unique, see ex. below</li>
      </ul>

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

      <p>Flatlist supports columns view with help of <Code>numColumns</Code> prop</p>

      <Code block jsx>{`
      import { FlatList } from 'react-native';
      import CategoryGridTile from '../components/CategoryGridTile';

      import { CATEGORIES } from '../data/dummy-data';

      function CategoriesScreen({ navigation }) {
        function renderCategoryItem(itemData) {
          function pressHandler() {
            navigation.navigate('MealsOverview', {
              categoryId: itemData.item.id,
            });
          }

          return (
            <CategoryGridTile
              title={itemData.item.title}
              color={itemData.item.color}
              onPress={pressHandler}
            />
          );
        }

        return (
          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={2}
          />
        );
      }

      export default CategoriesScreen;

      `}</Code>

      <H>Pressable</H>

      <ul>
        <li>Button component is not much customizable</li>
        <li>Better to make a pressable component with text inside</li>
      </ul>

      <Code block jsx>{`
      <Pressable onPress={props.onDeleteItem.bind(this, props.id)}>
        <View style={styles.goalItem}>
          <Text style={styles.goalText}>{props.text}</Text>
        </View>
      </Pressable>
      `}</Code>

      <H>Pressable with ripple effect</H>

      <ul>
        <li>for android there is just a prop</li>
        <li>for iOS we do it manually providing a callback to the <code>style</code> prop</li>
      </ul>

      <Code block jsx>{`
      import { StyleSheet, View, Text, Pressable } from 'react-native';

      function GoalItem(props) {
        return (
          <View style={styles.goalItem}>
            <Pressable
              android_ripple={{ color: '#210644' }}
              onPress={props.onDeleteItem.bind(this, props.id)}
              style={({ pressed }) => pressed && styles.pressedItem}
            >
              <Text style={styles.goalText}>{props.text}</Text>
            </Pressable>
          </View>
        );
      }

      export default GoalItem;

      const styles = StyleSheet.create({
        goalItem: {
          margin: 8,
          borderRadius: 6,
          backgroundColor: '#5e0acc',
        },
        pressedItem: {
          opacity: 0.5,
        },
        goalText: {
          color: 'white',
          padding: 8,
        },
      });
      `}</Code>

      <H>Modal</H>

      <Code block jsx>{`
      <Modal visible={props.visible} animationType="slide">
        <View style={styles.inputContainer}>
          ...
        </View>
      </Modal>
      `}</Code>

      <H>SafeAreaView</H>

      <ul>
        <li><Code>{'<SafeAreaView>'}</Code> provides usable phone area which does not include notch</li>
        <li>Should wrap the app content</li>
      </ul>

      <Code block jsx>{`
      import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
      import { LinearGradient } from 'expo-linear-gradient';
  
      export default function App() {
        return (
          <LinearGradient
            colors={[Colors.primary700, Colors.accent500]}
            style={styles.rootScreen}
          >
            <ImageBackground
              source={require('./assets/images/background.png')}
              resizeMode="cover"
              style={styles.rootScreen}
              imageStyle={styles.backgroundImage}
            >
              <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
            </ImageBackground>
          </LinearGradient>
        );
      }

      const styles = StyleSheet.create({
        rootScreen: {
          flex: 1,
        },
        backgroundImage: {
          opacity: 0.15,
        },
      });

      `}</Code>

      <H>Style</H>

      <ul>
        <li>There is no CSS in React Native</li>
        <li>Styling does not cascade</li>
      </ul>

      <Hs>style prop</Hs>

      <ul>
        <li>That is inline styles</li>
        <li>Not all elements supports it</li>
      </ul>


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

      <Hs>StyleSheet.create</Hs>

      <ul>
        <li>Use <code>StyleSheet.create</code> to create multiple styles at ones</li>
      </ul>

      <Code block jsx>{`
      import React from 'react'
      import { StyleSheet, Text, View } from 'react-native'

      const LotsOfStyles = () => (
        <View style={styles.container}>
          <Text style={styles.red}>just red</Text>
          <Text style={styles.bigBlue}>just bigBlue</Text>
          <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
          <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
        </View>
      )

      const styles = StyleSheet.create({
        container: { marginTop: 50 },
        bigBlue: { color: 'blue', fontWeight: 'bold', fontSize: 30 },
        red: { color: 'red' }
      })

      export default LotsOfStyles
      `}</Code>

      <H>App background</H>

      <ul>
        <li>we may manually put background color for main views</li>
        <li>but that is annoying</li>
        <li>with <i>expo</i> just may add <code>backgroundColor</code> into the <code>app.json</code> file and it will be applied to all components except modals</li>
      </ul>

      <Code block jsx>{`
      export default function App() {

        return (
          <>
            <View style={styles.appContainer}>
              ...
            </View>
          </>
        );
      }

      const styles = StyleSheet.create({
        appContainer: { 
          flex: 1,
          backgroundColor: '#ddb52f' 
        },
      })
      `}</Code>

      <Code block json>{`
      {
        "expo": {
          "name": "RNCourse",
          "slug": "RNCourse",
          "version": "1.0.0",
          "orientation": "portrait",
          "icon": "./assets/icon.png",
          "backgroundColor": "#1e085a",
          "splash": {
            "image": "./assets/splash.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
          },
          "updates": {
            "fallbackToCacheTimeout": 0
          },
          "assetBundlePatterns": [
            "**/*"
          ],
          "ios": {
            "supportsTablet": true
          },
          "android": {
            "adaptiveIcon": {
              "foregroundImage": "./assets/adaptive-icon.png",
              "backgroundColor": "#FFFFFF"
            }
          },
          "web": {
            "favicon": "./assets/favicon.png"
          }
        }
      }
      `}</Code>

      <H>Linear gradient image</H>

      <ul>
        <li>expo provides the package for <Lnk path='https://docs.expo.dev/versions/latest/sdk/linear-gradient/'>linear gradient colors</Lnk></li>
        <li>install it with <Code bash>expo install expo-linear-gradient</Code></li>
      </ul>

      <Code block jsx>{`
      import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
      import { LinearGradient } from 'expo-linear-gradient';

      export default function App() {
        return (
          <LinearGradient
            colors={['#4e0329', '#ddb52f']}
            style={styles.rootScreen}
          >
            ...
          </LinearGradient>
        );
      }

      const styles = StyleSheet.create({
        rootScreen: {
          flex: 1,
        }
      });
      `}</Code>

      <H>Status bar</H>

      <ul>
        <li>in the upper part of phone we have battery icon, provider name, etc...</li>
        <li>we can change the color of elements with a special <i>expo</i> component {'<StatusBar />'}</li>
      </ul>

      <Code block jsx>{`
      import { StyleSheet, View, FlatList, Button } from 'react-native';
      import { StatusBar } from 'expo-status-bar';

      export default function App() {

        return (
          <>
            <StatusBar style="light" />
            <View style={styles.appContainer}>
              ...
            </View>
          </>
        );
      }
      `}</Code>

      <H>Shadow</H>

      <ul>
        <li>For android use <Code>elevation</Code> prop</li>
        <li>For iOS use variety of <Code>shadow...</Code> props</li>
        <li>do not forget to provide <code>backgroundColor</code> for iOS</li>
      </ul>

      <Code block jsx>{`
      import { View, Text, StyleSheet } from 'react-native';
      import Colors from '../../constants/colors';

      function GuessLogItem({ roundNumber, guess }) {
        return (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>#{roundNumber}</Text>
            <Text style={styles.itemText}>Opponent's Guess: {guess}</Text>
          </View>
        );
      }

      export default GuessLogItem;

      const styles = StyleSheet.create({
        listItem: {
          borderColor: Colors.primary800,
          borderWidth: 1,
          borderRadius: 40,
          padding: 12,
          marginVertical: 8,
          backgroundColor: Colors.accent500,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          elevation: 4, // for android
          shadowColor: 'black', // for iOS
          shadowOffset: { width: 0, height: 0 }, // for iOS
          shadowOpacity: 0.25, // for iOS
          shadowRadius: 3, // for iOS
        },
        itemText: {
          fontFamily: 'open-sans'
        }
      });
      `}</Code>

      <H>Debugging</H>

      <p>Some info can be found <Lnk path='https://reactnative.dev/docs/debugging#accessing-the-in-app-developer-menu'>here</Lnk></p>

      <Hs>Terminal</Hs>

      <ul>
        <li>there are different options</li>
        <li>error comes automatically to the terminal</li>
        <li>console logging also comes to the terminal</li>
        <li>expo shows some error messages at the bottom of the emulator</li>
      </ul>

      <Hs>JS dev tools</Hs>

      <ul>
        <li>we can also open Chrome like console with expo by <kbd>j</kbd> in the terminal, there we also can see network requests</li>
        <li>can do the same by opening the menu by <kbd>m</kbd> (or <kbd>Cmd + D</kbd> in emulator) and the press <i>Open JS debugger</i></li>
      </ul>

      <Hs>React dev tools</Hs>

      <ul>
        <li>to see the component tree and monitor state values we may use react dev tools</li>
        <li>install it globally with <Code bash>npm i -g react-devtools</Code></li>
        <li>open dev tools by <Code>react-devtools</Code> in a separate terminal window</li>
        <li>may require to reload the app with <kbd>r</kbd> key</li>
      </ul>

      <H>Alert, prompt</H>

      <ul>
        <li>alert and prompt can be invoked from the special object provided by react-native <code>Alert</code></li>
      </ul>

      <Code block jsx>{`
      import { TextInput, View, StyleSheet, Alert } from 'react-native';
      ...
      if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
        Alert.alert(
          'Invalid number!',
          'Number has to be a number between 1 and 99.',
          [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
        );
        return;
      }
      `}</Code>

      <H>Icons</H>

      <ul>
        <li>Expo comes with <Lnk path='https://docs.expo.dev/guides/icons/'>icons set</Lnk></li>
        <li>No need to install, just import it</li>
        <li>for ex. may find a proper icon here <Lnk path='https://icons.expo.fyi/'>https://icons.expo.fyi/</Lnk></li>
      </ul>

      <Code block jsx>{`
      import { View, StyleSheet, Alert, Text, FlatList } from 'react-native';
      import { Ionicons } from '@expo/vector-icons';

      function GameScreen() {

        return (
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
              
        );
      }

      export default GameScreen;

      const styles = StyleSheet.create({
        buttonContainer: {
          flex: 1,
        },
      });

      `}</Code>

      <H>Fonts</H>

      <ul>
        <li>custom fonts can be installed from Expo <Code bash>npm i expo-font</Code></li>
        <li>to utilize a font we need to bring a hook <Code bash>{"import { useFonts } from 'expo-font'"}</Code></li>
        <li>google fonts usage guide can be found <Lnk path='https://docs.expo.dev/guides/using-custom-fonts/#using-a-google-font'>here</Lnk></li>
        <li>also may add any font manually</li>
        <li>put font <code>.ttf</code> file into for ex. <code>assets/fonts/OpenSans-Regular.ttf</code></li>
        <li>then include it via hook as</li>
        <Code block jsx>{`
          useFonts({
            'open-sans': include('./assets/fonts/OpenSans-Regular.ttf')
            'open-sans-bold': include('./assets/fonts/OpenSans-Regular-Bold.ttf')
          })
        `}</Code>
        <li>fonts need some time to be loaded and we need to show some loading screen meanwhile</li>
        <li>add another package for that <Code bash>expo install expo-app-loading </Code></li>
        <li>check how to use a loading package in snippet below</li>
        <li>to use a font put its name property as a value for <code>fontFamily</code> prop of a style</li>
      </ul>

      <Code block jsx>{`
      // App.js
      import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
      import { LinearGradient } from 'expo-linear-gradient';
      import { useFonts } from 'expo-font';
      import AppLoading from 'expo-app-loading';

      export default function App() {
        const [fontsLoaded] = useFonts({
          'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
          'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        });

        if (!fontsLoaded) {
          return <AppLoading />;
        }

        return (
          <LinearGradient
            colors={[Colors.primary700, Colors.accent500]}
            style={styles.rootScreen}
          >
            <ImageBackground
              source={require('./assets/images/background.png')}
              resizeMode="cover"
              style={styles.rootScreen}
              imageStyle={styles.backgroundImage}
            >
              <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
            </ImageBackground>
          </LinearGradient>
        );
      }

      const styles = StyleSheet.create({
        rootScreen: {
          flex: 1,
        },
        backgroundImage: {
          opacity: 0.15,
        },
      });
      `}</Code>

      <Code block jsx>{`
      // NumberContainer.js
      import { View, Text, StyleSheet } from 'react-native';
            
      function NumberContainer({ children }) {
        return (
          <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
          </View>
        );
      }

      export default NumberContainer;

      const styles = StyleSheet.create({
        container: {
          ...
        },
        numberText: {
          color: Colors.accent500,
          fontSize: 36,
          fontFamily: 'open-sans-bold'
        },
      });
      `}</Code>

      <H>Dimensions</H>

      <ul>
        <li>Instead of using <code>width</code> with numbers</li>
        <li>Use <code>minWidth</code>, <code>maxWidth</code> and <code>width</code> with percents like <code>{"'80%"}</code></li>
        <li>We can set values dynamically based on device screen dimensions with <code>Dimensions</code> api</li>
      </ul>

      <Code block jsx>{`
      import { View, StyleSheet, Dimensions } from 'react-native';

      function Card({ children }) {
        return <View style={styles.card}>{children}</View>;
      }

      export default Card;

      const deviceWidth = Dimensions.get('window').width;

      const styles = StyleSheet.create({
        card: {
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: deviceWidth < 380 ? 18 : 36,
          marginHorizontal: 24,
          padding: 16,
        },
      });
      `}</Code>

      <H>Rotation</H>

      <ul>
        <li>to lock the vertical rotation add <code>"orientation": "portrait"</code> prop into <code>app.json</code> file</li>
        <li><code>"orientation": "landscape"</code> for horizontal view</li>
        <li><code>"orientation": "default"</code> to make it rotatable</li>
        <li>but design might be broken if we flip the device and we need to fix it manually</li>
        <li>we may use <Code>Dimensions.get('window').height</Code> but as I understood it will not response to the rotation</li>
        <li>for that reason there is a <Code>useWindowDimensions()</Code> hook</li>
      </ul>

      <H>useWindowDimensions</H>

      <ul>
        <li><Code>useWindowDimensions()</Code> hook does respond to the phone rotations</li>  
      </ul>

      <Code block jsx>{`
      import { TextInput, View, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, } from 'react-native';

      function StartGameScreen({ onPickNumber }) {
        const [enteredNumber, setEnteredNumber] = useState('');

        return (
          <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior="position">
              <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
                <TextInput
                style={styles.numberInput}
                  maxLength={2}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={numberInputHandler}
                  value={enteredNumber}
                />
                ...
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        );
      }

      export default StartGameScreen;
      `}</Code>

      <H>KeyboardAvoidingView</H>

      <ul>
        <li>with input interaction the keyboard appears and may break the style</li>
        <li>app style can be configured for the keyboard with conjunction of 3 components: <code>ScrollView</code>, <code></code></li>
      </ul>

      <Code block jsx>{`
      import { useState } from 'react';
      import { TextInput, View, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView, } from 'react-native';

      function StartGameScreen({ onPickNumber }) {
        const [enteredNumber, setEnteredNumber] = useState('');
        const { width, height } = useWindowDimensions();

        const marginTopDistance = height < 380 ? 30 : 100;

        return (
          <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior="position">
              <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
                ...
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        );
      }

      export default StartGameScreen;

      const styles = StyleSheet.create({
        screen: {
          flex: 1,
        },
        rootContainer: {
          flex: 1,
          // marginTop: deviceHeight < 380 ? 30 : 100,
          alignItems: 'center',
        },
        numberInput: {
          height: 50,
          width: 50,
          fontSize: 32,
          borderBottomColor: Colors.accent500,
          borderBottomWidth: 2,
          color: Colors.accent500,
          marginVertical: 8,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        buttonsContainer: {
          flexDirection: 'row',
        },
        buttonContainer: {
          flex: 1,
        },
      });
      `}</Code>

      <H>Platform specific code</H>

      <ul>
        <li>We can target not only the device screen dimensions with <code>useWindowDimensions</code> / <code>Dimensions</code></li>
        <li>but also the device models itself with <Lnk path='https://reactnative.dev/docs/platform-specific-code'>platform api</Lnk></li>
        <li></li>
      </ul>

      <Code block jsx>{`
      import { Platform, StyleSheet } from 'react-native'

      const styles = StyleSheet.create({
        height: Platform.OS === 'ios' ? 200 : 100
      })
      `}</Code>

      <p>There is also a <code>Platform.select</code> method available, that gives an object where keys can be one of 'ios' | 'android' | 'native' | 'default', returns the most fitting value for the platform you are currently running on. </p>

      <Code block jsx>{`
      import { Platform, StyleSheet } from 'react-native'

      const styles = StyleSheet.create({
        height: Platform.select({ ios: 200, android: 100 })
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
        <li>Consider splitting the code into separate files for ios and android if needed</li>
        <li>React Native will detect when a file has a <code>.ios.</code> or <code>.android.</code> extension</li>
        <li>Or even platform specific components</li>
        <li>applies not only to components, but to any javascript files, like constants, utils, styles etc...</li>
      </ul>

      <Code block jsx>{`
      // files
      Container.js # picked up by Webpack, Rollup or any other Web bundler
      Container.native.js # picked up by the React Native bundler for both Android and iOS (Metro)
      BigButton.ios.js
      BigButton.android.js
      `}</Code>

      <p>Not that imports does not have <i>.ios</i> or <i>.android</i> extensions in the file names.</p>

      <Code block jsx>{`
      import BigButton from './BigButton'
      import Container from './Container'
      `}</Code>

      <H>Navigation</H>

      <ul>
        <li>We may use conditional rendering for the navigation, that is fine</li>
        <li>But there is a better animated way via <Lnk path='https://reactnavigation.org/'>https://reactnavigation.org/</Lnk></li>
        <li>Install with <Code bash>npm install @react-navigation/native</Code></li>
        <li>For Expo also install this <Code bash>npx expo install react-native-screens react-native-safe-area-context</Code></li>
        <li>There are different navigator components, for ex. native-stack <Lnk path='https://reactnavigation.org/docs/native-stack-navigator'>https://reactnavigation.org/docs/native-stack-navigator</Lnk></li>
        <li>Install it also <Code bash>npm install @react-navigation/native-stack</Code></li>
        <li>We wrap content into <Code>NavigationContainer</Code> and <Code>Stack.Navigator</Code>component</li>
        <li>First <Code>Stack.Screen</Code> inside <Code>Stack.Navigator</Code> will be the initial screen</li>
        <li>Or init screen can be set by <Code>{'<Stack.Navigator initialRouteName="ProductDetails">'}</Code></li>
      </ul>

      <Code block jsx>{`
      // App.js
      import { StatusBar } from 'expo-status-bar';
      import { StyleSheet } from 'react-native';
      import { NavigationContainer } from '@react-navigation/native';
      import { createNativeStackNavigator } from '@react-navigation/native-stack';

      import CategoriesScreen from './screens/CategoriesScreen';
      import MealsOverviewScreen from './screens/MealsOverviewScreen';

      const Stack = createNativeStackNavigator();

      export default function App() {
        return (
          <>
            <StatusBar style="dark" />
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="MealsCategories" component={CategoriesScreen} />
                <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </>
        );
      }

      const styles = StyleSheet.create({
        container: {},
      });

      `}</Code>

      <ul>
        <li>Components at <Code>Stack.Navigator</Code> automatically receives <Code>navigation</Code> prop</li>
        <li>With <Code>navigation.navigate('name_of_the_screen');</Code> we do navigation</li>
      </ul>

      <Code block jsx>{`
      // CategoriesScreen.js
      import { FlatList } from 'react-native';
      import CategoryGridTile from '../components/CategoryGridTile';

      import { CATEGORIES } from '../data/dummy-data';

      function CategoriesScreen({ navigation }) {
        function renderCategoryItem(itemData) {
          function pressHandler() {
            navigation.navigate('MealsOverview');
          }

          return (
            <CategoryGridTile
              title={itemData.item.title}
              color={itemData.item.color}
              onPress={pressHandler}
            />
          );
        }

        return (
          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={2}
          />
        );
      }

      export default CategoriesScreen;
      `}</Code>

      <H>useNavigation</H>

      <ul>
        <li>If navigation action is required outside of a component at <Code>Stack.Navigator</Code> </li>
        <li>We may use <Code>useNavigation()</Code> hook at any component</li>
      </ul>

      <Code block jsx>{`
      import { View, Pressable, Text, Image, StyleSheet, Platform, } from 'react-native';
      import { useNavigation } from '@react-navigation/native';

      import MealDetails from './MealDetails';

      function MealItem({ id, title, imageUrl, duration, complexity, affordability, }) {
        const navigation = useNavigation();

        function selectMealItemHandler() {
          navigation.navigate('MealDetail', {
            mealId: id,
          });
        }

        return (
          <View style={styles.mealItem}>
            <Pressable
              android_ripple={{ color: '#ccc' }}
              style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
              onPress={selectMealItemHandler}
            >
              ...
              </View>
            </Pressable>
          </View>
        );
      }
      `}</Code>

      <H>Pass data via navigation</H>

      <ul>
        <li>With <Code>navigation.navigate('name_of_the_screen', {});</Code> we can pass data in second parameter</li> 
      </ul>

      <Code block jsx>{`
      import { FlatList } from 'react-native';
      import CategoryGridTile from '../components/CategoryGridTile';
      import { CATEGORIES } from '../data/dummy-data';

      function CategoriesScreen({ navigation }) {
        function renderCategoryItem(itemData) {
          function pressHandler() {
            navigation.navigate('MealsOverview', {
              categoryId: itemData.item.id,
            });
          }

          return (
            <CategoryGridTile
              title={itemData.item.title}
              color={itemData.item.color}
              onPress={pressHandler}
            />
          );
        }

        return (
          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={2}
          />
        );
      }

      export default CategoriesScreen;
      `}</Code>

      <ul>
        <li>to extract data we may use passed <Code>route</Code> object</li>
        <li>same data can be get with <Code>useRoute()</Code> hook</li>
      </ul>

      <Code block jsx>{`
      import { useLayoutEffect } from 'react';
      import { View, FlatList, StyleSheet } from 'react-native';
      import MealItem from '../components/MealItem';
      import { MEALS, CATEGORIES } from '../data/dummy-data';

      function MealsOverviewScreen({ route, navigation }) {
        const catId = route.params.categoryId;

        const displayedMeals = MEALS.filter((mealItem) => {
          return mealItem.categoryIds.indexOf(catId) >= 0;
        });

        useLayoutEffect(() => {
          const categoryTitle = CATEGORIES.find(
            (category) => category.id === catId
          ).title;

          navigation.setOptions({
            title: categoryTitle,
          });
        }, [catId, navigation]);

        function renderMealItem(itemData) {
          const item = itemData.item;

          const mealItemProps = {
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            affordability: item.affordability,
            complexity: item.complexity,
            duration: item.duration,
          };
          return <MealItem {...mealItemProps} />;
        }

        return (
          <View style={styles.container}>
            <FlatList
              data={displayedMeals}
              keyExtractor={(item) => item.id}
              renderItem={renderMealItem}
            />
          </View>
        );
      }

      export default MealsOverviewScreen;

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 16,
        },
      });

      `}</Code>

      <p>or...</p>

      <Code block jsx>{`
      import { useRoute } from '@react-navigation/native';
      
      function MealsOverviewScreen({ navigation }) {
        const route = useRoute()
        ...
      }
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
