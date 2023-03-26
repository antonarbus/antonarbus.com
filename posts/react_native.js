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
        <li>There you can create an emulator under <code>projects</code>{' --> '}<code>more actions</code>{' --> '}<code>virtual device manager</code> </li>
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

      <H>Custom TextInput</H>

      <Code block jsx>{`
      import { StyleSheet, Text, TextInput, View } from 'react-native';

      import { GlobalStyles } from '../../constants/styles';

      function Input({ label, invalid, style, textInputConfig }) {

        const inputStyles = [styles.input];

        if (textInputConfig && textInputConfig.multiline) {
          inputStyles.push(styles.inputMultiline)
        }

        if (invalid) {
          inputStyles.push(styles.invalidInput);
        }

        return (
          <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
          </View>
        );
      }

      export default Input;

      const styles = StyleSheet.create({
        inputContainer: {
          marginHorizontal: 4,
          marginVertical: 8
        },
        label: {
          fontSize: 12,
          color: GlobalStyles.colors.primary100,
          marginBottom: 4,
        },
        input: {
          backgroundColor: GlobalStyles.colors.primary100,
          color: GlobalStyles.colors.primary700,
          padding: 6,
          borderRadius: 6,
          fontSize: 18,
        },
        inputMultiline: {
          minHeight: 100,
          textAlignVertical: 'top'
        },
        invalidLabel: {
          color: GlobalStyles.colors.error500
        },
        invalidInput: {
          backgroundColor: GlobalStyles.colors.error50
        }
      });
      `}</Code>

      <Code block jsx>{`
      import { useState } from 'react';
      import { StyleSheet, Text, View } from 'react-native';

      import Input from './Input';
      import Button from '../UI/Button';
      import { getFormattedDate } from '../../util/date';
      import { GlobalStyles } from '../../constants/styles';

      function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
        const [inputs, setInputs] = useState({
          amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
          },
          date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true,
          },
          description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true,
          },
        });

        function inputChangedHandler(inputIdentifier, enteredValue) {
          setInputs((curInputs) => {
            return {
              ...curInputs,
              [inputIdentifier]: { value: enteredValue, isValid: true },
            };
          });
        }

        function submitHandler() {
          const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
          };

          const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
          const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
          const descriptionIsValid = expenseData.description.trim().length > 0;

          if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values');
            setInputs((curInputs) => {
              return {
                amount: { value: curInputs.amount.value, isValid: amountIsValid },
                date: { value: curInputs.date.value, isValid: dateIsValid },
                description: {
                  value: curInputs.description.value,
                  isValid: descriptionIsValid,
                },
              };
            });
            return;
          }

          onSubmit(expenseData);
        }

        const formIsInvalid =
          !inputs.amount.isValid ||
          !inputs.date.isValid ||
          !inputs.description.isValid;

        return (
          <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
              <Input
                style={styles.rowInput}
                label="Amount"
                invalid={!inputs.amount.isValid}
                textInputConfig={{
                  keyboardType: 'decimal-pad',
                  onChangeText: inputChangedHandler.bind(this, 'amount'),
                  value: inputs.amount.value,
                }}
              />
              <Input
                style={styles.rowInput}
                label="Date"
                invalid={!inputs.date.isValid}
                textInputConfig={{
                  placeholder: 'YYYY-MM-DD',
                  maxLength: 10,
                  onChangeText: inputChangedHandler.bind(this, 'date'),
                  value: inputs.date.value,
                }}
              />
            </View>
            <Input
              label="Description"
              invalid={!inputs.description.isValid}
              textInputConfig={{
                multiline: true,
                // autoCapitalize: 'none'
                // autoCorrect: false // default is true
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputs.description.value,
              }}
            />
            {formIsInvalid && (
              <Text style={styles.errorText}>
                Invalid input values - please check your entered data!
              </Text>
            )}
            <View style={styles.buttons}>
              <Button style={styles.button} mode="flat" onPress={onCancel}>
                Cancel
              </Button>
              <Button style={styles.button} onPress={submitHandler}>
                {submitButtonLabel}
              </Button>
            </View>
          </View>
        );
      }

      export default ExpenseForm;

      const styles = StyleSheet.create({
        form: {
          marginTop: 40,
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          color: 'white',
          marginVertical: 24,
          textAlign: 'center',
        },
        inputsRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        rowInput: {
          flex: 1,
        },
        errorText: {
          textAlign: 'center',
          color: GlobalStyles.colors.error500,
          margin: 8,
        },
        buttons: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        button: {
          minWidth: 120,
          marginHorizontal: 8,
        },
      });
      `}</Code>

      <H>Numbers keyboard</H>

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

      <p>Local image...</p>

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

      <ul>
        <li>for network image we do not use <code>require</code></li>
        <li>for web images should provide width / height styles</li>
      </ul>

      <Code block jsx>{`
      <Image
        style={styles.image}
        source={{uri: 'https://...'}}
      />
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

      <H>Icon button</H>

      <Code block jsx>{`
      import { Pressable, StyleSheet } from 'react-native';
      import { Ionicons } from '@expo/vector-icons';

      function IconButton({ icon, color, onPress }) {
        return (
          <Pressable
            onPress={onPress}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Ionicons name={icon} size={24} color={color} />
          </Pressable>
        );
      }

      export default IconButton;

      const styles = StyleSheet.create({
        pressed: {
          opacity: 0.7,
        },
      });
      `}</Code>

      <H>Outlined button</H>

      <Code block jsx>{`
      import { Pressable, StyleSheet, Text } from 'react-native';
      import { Ionicons } from '@expo/vector-icons';
      import { Colors } from '../../constants/colors';

      function OutlinedButton({ onPress, icon, children }) {
        return (
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}
          >
            <Ionicons
              style={styles.icon}
              name={icon}
              size={18}
              color={Colors.primary500}
            />
            <Text style={styles.text}>{children}</Text>
          </Pressable>
        );
      }

      export default OutlinedButton;

      const styles = StyleSheet.create({
        button: {
          paddingHorizontal: 12,
          paddingVertical: 6,
          margin: 4,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: Colors.primary500,
        },
        pressed: {
          opacity: 0.7,
        },
        icon: {
          marginRight: 6,
        },
        text: {
          color: Colors.primary500,
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
        <li>Multiple styles can be combined in array, with this approach we also can apply styles conditionally</li>
      </ul>

      <Code block jsx>{`
      // App.js
      import React from 'react'
      import {Text, View} from 'react-native'

      const someStyles = { marin: 5}

      const HelloWorldApp = () => (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ fontSize: 20}}>Hello, world!</Text>
          <Text style={[{ fontSize: 20}, someStyles]}>Hello, world!</Text>
        </View>
      )
      export default HelloWorldApp
      `}</Code>

      <Hs>StyleSheet.create</Hs>

      <ul>
        <li>Use <code>StyleSheet.create</code> to create multiple styles at ones</li>
        <li>Good thing is that VSCode autocompletion works in <code>StyleSheet.create</code></li>
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

      <H>Stack.Screen option</H>

      <ul>
        <li>At the of the screen we have a header, which takes the <code>name</code> prop value by default</li>
        <li>It can be configured inside <code>options</code> prop</li>
        <li>All options can be found <Lnk path='https://reactnavigation.org/docs/native-stack-navigator#options'>here</Lnk></li>
        <li>Also default navigation screens options can be set on the <code>Stack.Navigator</code> component</li>
      </ul>

      <Code block jsx>{`
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#351401' },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: '#3f2f25' },
          }}
        >
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
          <Stack.Screen
            name="MealDetail"
            component={MealDetailScreen}
            options={{
              title: 'About the Meal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      `}</Code>

      <H>Stack.Screen dynamic option</H>

      <ul>
        <li>we can pass a function into the <code>options</code> prop to get data and set options dynamically</li>
        <li>it has an access to <code>route</code> & <code>navigation</code> properties</li>
      </ul>

      <Code block jsx>{`
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({route, navigation}) => {
          const catId = route.params.categoryId
          return {
            title: catId
          }
        }}
      />
      `}</Code>

      <ul>
        <li>also we can set screen options from the component by special <code>navigation.setOptions()</code> method</li>
        <li>it should be done in <code>useEffect</code> or <code>useLayoutEffect</code> hook</li>
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

      <H>Add button to navigation</H>

      <ul>
        <li>by default in navigation header we have a title and <i>go back</i> button</li>
        <li>we may add additional button, for ex. to save some item</li>
      </ul>

      <Code block jsx>{`
      useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => {
            return (
              <IconButton
                icon="star"
                color="white"
                onPress={headerButtonPressHandler}
              />
            );
          },
        });
      }, [navigation, headerButtonPressHandler]);
      `}</Code>

      <p>or...</p>

      <Code block jsx>{`
      <Stack.Screen
        name="some name"
        component={SomeComponent}
        options={{
          headerRight: (
            <IconButton
              icon="star"
              color="white"
              onPress={headerButtonPressHandler}
            />
          ),
        }}
      />
      `}</Code>

      <H>Combine different navigators</H>

      <ul>
        <li>Stack navigation is the best, but in some apps we may need also a drawer and bottom tabs to navigate between screens</li>
        <li>We can combine different navigators</li>
      </ul>

      <Code block jsx>{`
      import { StatusBar } from 'expo-status-bar';
      import { StyleSheet, Button } from 'react-native';
      import { NavigationContainer } from '@react-navigation/native';
      import { createNativeStackNavigator } from '@react-navigation/native-stack';
      import { createDrawerNavigator } from '@react-navigation/drawer';
      import { Ionicons } from '@expo/vector-icons';

      import CategoriesScreen from './screens/CategoriesScreen';
      import MealsOverviewScreen from './screens/MealsOverviewScreen';
      import MealDetailScreen from './screens/MealDetailScreen';
      import FavoritesScreen from './screens/FavoritesScreen';

      const Stack = createNativeStackNavigator();
      const Drawer = createDrawerNavigator();

      function DrawerNavigator() {
        return (
          <Drawer.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#351401' },
              headerTintColor: 'white',
              sceneContainerStyle: { backgroundColor: '#3f2f25' },
              drawerContentStyle: { backgroundColor: '#351401' },
              drawerInactiveTintColor: 'white',
              drawerActiveTintColor: '#351401',
              drawerActiveBackgroundColor: '#e4baa1',
            }}
          >
            <Drawer.Screen
              name="Categories"
              component={CategoriesScreen}
              options={{
                title: 'All Categories',
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="list" color={color} size={size} />
                ),
              }}
            />
            <Drawer.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="star" color={color} size={size} />
                ),
              }}
            />
          </Drawer.Navigator>
        );
      }

      export default function App() {
        return (
          <>
            <StatusBar style="light" />
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerStyle: { backgroundColor: '#351401' },
                  headerTintColor: 'white',
                  contentStyle: { backgroundColor: '#3f2f25' },
                }}
              >
                <Stack.Screen
                  name="Drawer"
                  component={DrawerNavigator}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
                <Stack.Screen
                  name="MealDetail"
                  component={MealDetailScreen}
                  options={{
                    title: 'About the Meal',
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </>
        );
      }

      const styles = StyleSheet.create({
        container: {},
      });
      `}</Code>

      <H>Loading sinner</H>

      <Code block jsx>{`
      import { View, ActivityIndicator, StyleSheet } from 'react-native';

      import { GlobalStyles } from '../../constants/styles';

      function LoadingOverlay() {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="white" />
          </View>
        );
      }

      export default LoadingOverlay;

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
          backgroundColor: GlobalStyles.colors.primary700,
        },
      });

      `}</Code>

      <p>Overlay is used here during http request.</p>

      <Code block jsx>{`
      import { useContext, useEffect, useState } from 'react';

      import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
      import ErrorOverlay from '../components/UI/ErrorOverlay';
      import LoadingOverlay from '../components/UI/LoadingOverlay';
      import { ExpensesContext } from '../store/expenses-context';
      import { getDateMinusDays } from '../util/date';
      import { fetchExpenses } from '../util/http';

      function RecentExpenses() {
        const [isFetching, setIsFetching] = useState(true);
        const [error, setError] = useState();

        const expensesCtx = useContext(ExpensesContext);

        useEffect(() => {
          async function getExpenses() {
            setIsFetching(true);
            try {
              const expenses = await fetchExpenses();
              expensesCtx.setExpenses(expenses);
            } catch (error) {
              setError('Could not fetch expenses!');
            }
            setIsFetching(false);
          }

          getExpenses();
        }, []);

        if (error && !isFetching) {
          return <ErrorOverlay message={error} />;
        }

        if (isFetching) {
          return <LoadingOverlay />;
        }

        const recentExpenses = expensesCtx.expenses.filter((expense) => {
          const today = new Date();
          const date7DaysAgo = getDateMinusDays(today, 7);

          return expense.date >= date7DaysAgo && expense.date <= today;
        });

        return (
          <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="Last 7 Days"
            fallbackText="No expenses registered for the last 7 days."
          />
        );
      }

      export default RecentExpenses;

      `}</Code>

      <H>Camera</H>

      <ul>
        <li><Lnk path='https://docs.expo.dev/versions/latest/sdk/camera/'>https://docs.expo.dev/versions/latest/sdk/camera/</Lnk></li>
      </ul>

      <H>Image picker</H>

      <ul>
        <li>allows to pick or take an image</li>
        <li><Lnk path='https://docs.expo.dev/versions/v48.0.0/sdk/imagepicker/'>https://docs.expo.dev/versions/v48.0.0/sdk/imagepicker/</Lnk></li>
        <li><Code bash>npx expo install expo-image-picker</Code></li>
        <li>Add permission request via <code>app.json</code> (see link above)</li>

        <Code block jsx>{`
        {
          "expo": {
            "plugins": [
              [
                "expo-image-picker",
                {
                  "photosPermission": "The app accesses your photos to let you share them with your friends."
                }
              ]
            ]
          }
        }
        `}</Code>

        <li>for android permission logic is done automatically, but for iOS we need to make in on our own with <code>useCameraPermissions</code> and <code>PermissionStatus</code> utilities</li>
        <li>photo details object will be returned by <code>const image = await launchCameraAsync()</code> function </li>
        <li><code>image.uri</code> can be used with <Code>{'<Image style={styles.image} source={{ uri: pickedImage }} />'}</Code></li>
        <li>do not forget to provide dimensions in image styles</li>
      </ul>

      <Code block jsx>{`
      import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
      import { launchCameraAsync, useCameraPermissions, PermissionStatus, } from 'expo-image-picker';
      import { useState } from 'react';

      import { Colors } from '../../constants/colors';

      function ImagePicker() {
        const [pickedImage, setPickedImage] = useState();

        const [cameraPermissionInformation, requestPermission] =
          useCameraPermissions();

        async function verifyPermissions() {
          if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
          }

          if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
              'Insufficient Permissions!',
              'You need to grant camera permissions to use this app.'
            );
            return false;
          }

          return true;
        }

        async function takeImageHandler() {
          const hasPermission = await verifyPermissions();

          if (!hasPermission) {
            return;
          }

          const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
          });

          setPickedImage(image.uri);
        }

        let imagePreview = <Text>No image taken yet.</Text>;

        if (pickedImage) {
          imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
        }

        return (
          <View>
            <View style={styles.imagePreview}>{imagePreview}</View>
            <Button title="Take Image" onPress={takeImageHandler} />
          </View>
        );
      }

      export default ImagePicker;

      const styles = StyleSheet.create({
        imagePreview: {
          width: '100%',
          height: 200,
          marginVertical: 8,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.primary100,
          borderRadius: 4,
        },
        image: {
          width: '100%',
          height: '100%',
        },
      });
      `}</Code>

      <H>Geo location + Google Maps image</H>

      <ul>
        <li><Lnk path='https://docs.expo.dev/versions/v48.0.0/sdk/location/'>https://docs.expo.dev/versions/v48.0.0/sdk/location/</Lnk></li>
        <li><Code bash>npx expo install expo-location</Code></li>
      </ul>

      <Code block jsx>{`
      import { useState } from 'react';
      import { Alert, View, StyleSheet, Image, Text } from 'react-native';
      import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus, } from 'expo-location';
      import { Colors } from '../../constants/colors';
      import OutlinedButton from '../UI/OutlinedButton';

      const GOOGLE_API_KEY = 'AIzaSyCTCDNDtYPCpAD0FaKgHgdzCjMN1QUHnt4';
      function getMapPreview(lat, lng) {
        const imagePreviewUrl = \`https://maps.googleapis.com/maps/api/staticmap?center=\${lat},\${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C\${lat},\${lng}&key=\${GOOGLE_API_KEY}\`;
        return imagePreviewUrl;
      }

      function LocationPicker() {
        const [pickedLocation, setPickedLocation] = useState();

        const [locationPermissionInformation, requestPermission] =
          useForegroundPermissions();

        async function verifyPermissions() {
          if (
            locationPermissionInformation.status === PermissionStatus.UNDETERMINED
          ) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
          }

          if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
              'Insufficient Permissions!',
              'You need to grant location permissions to use this app.'
            );
            return false;
          }

          return true;
        }

        async function getLocationHandler() {
          const hasPermission = await verifyPermissions();

          if (!hasPermission) {
            return;
          }

          const location = await getCurrentPositionAsync();
          setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          });
        }

        function pickOnMapHandler() {}

        let locationPreview = <Text>No location picked yet.</Text>;

        if (pickedLocation) {
          locationPreview = (
            <Image
              style={styles.image}
              source={{
                uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
              }}
            />
          );
        }

        return (
          <View>
            <View style={styles.mapPreview}>{locationPreview}</View>
            <View style={styles.actions}>
              <OutlinedButton icon="location" onPress={getLocationHandler}>
                Locate User
              </OutlinedButton>
              <OutlinedButton icon="map" onPress={pickOnMapHandler}>
                Pick on Map
              </OutlinedButton>
            </View>
          </View>
        );
      }

      export default LocationPicker;

      const styles = StyleSheet.create({
        mapPreview: {
          width: '100%',
          height: 200,
          marginVertical: 8,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.primary100,
          borderRadius: 4,
          overflow: 'hidden'
        },
        actions: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        },
        image: {
          width: '100%',
          height: '100%',
          // borderRadius: 4
        },
      });
      `}</Code>

      <H>Interactive device map</H>

      <ul>
        <li><Code bash>npx expo install react-native-maps</Code></li>
        <li><Lnk path='https://docs.expo.dev/versions/v48.0.0/sdk/map-view/'>https://docs.expo.dev/versions/v48.0.0/sdk/map-view/</Lnk></li>
        <li>in the example below we open an interactive map on a separate screen</li>
        <li>on press put a picker</li>
        <li>on save button return to previous screen and pass coordinates to show it on the map</li>
        <li>one interesting note: when we return to the previous screen the <code>useEffect</code> is not firing, because the stack screen is not mounted, but simply unhides</li>
        <li>to let <code>useEffect</code> kicks in we add additional <code>useIsFocused()</code> hook</li>
      </ul>

      <Code block jsx>{`
      import { useEffect, useState } from 'react';
      import { Alert, View, StyleSheet, Image, Text } from 'react-native';
      import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus, } from 'expo-location';
      import { useNavigation, useRoute, useIsFocused, } from '@react-navigation/native';

      import { Colors } from '../../constants/colors';
      import OutlinedButton from '../UI/OutlinedButton';

      const GOOGLE_API_KEY = 'AIzaSyCTCDNDtYPCpAD0FaKgHgdzCjMN1QUHnt4';
      function getMapPreview(lat, lng) {
        const imagePreviewUrl = \`https://maps.googleapis.com/maps/api/staticmap?center=\${lat},\${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C\${lat},\${lng}&key=\${GOOGLE_API_KEY}\`;
        return imagePreviewUrl;
      }

      function LocationPicker() {
        const [pickedLocation, setPickedLocation] = useState();
        const isFocused = useIsFocused();

        const navigation = useNavigation();
        const route = useRoute();

        const [locationPermissionInformation, requestPermission] =
          useForegroundPermissions();

        useEffect(() => {
          if (isFocused && route.params) {
            const mapPickedLocation = {
              lat: route.params.pickedLat,
              lng: route.params.pickedLng,
            };
            setPickedLocation(mapPickedLocation);
          }
        }, [route, isFocused]);

        async function verifyPermissions() {
          if (
            locationPermissionInformation.status === PermissionStatus.UNDETERMINED
          ) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
          }

          if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
              'Insufficient Permissions!',
              'You need to grant location permissions to use this app.'
            );
            return false;
          }

          return true;
        }

        async function getLocationHandler() {
          const hasPermission = await verifyPermissions();

          if (!hasPermission) {
            return;
          }

          const location = await getCurrentPositionAsync();
          setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          });
        }

        function pickOnMapHandler() {
          navigation.navigate('Map');
        }

        let locationPreview = <Text>No location picked yet.</Text>;

        if (pickedLocation) {
          locationPreview = (
            <Image
              style={styles.image}
              source={{
                uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
              }}
            />
          );
        }

        return (
          <View>
            <View style={styles.mapPreview}>{locationPreview}</View>
            <View style={styles.actions}>
              <OutlinedButton icon="location" onPress={getLocationHandler}>
                Locate User
              </OutlinedButton>
              <OutlinedButton icon="map" onPress={pickOnMapHandler}>
                Pick on Map
              </OutlinedButton>
            </View>
          </View>
        );
      }

      export default LocationPicker;

      const styles = StyleSheet.create({
        mapPreview: {
          width: '100%',
          height: 200,
          marginVertical: 8,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.primary100,
          borderRadius: 4,
          overflow: 'hidden',
        },
        actions: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        },
        image: {
          width: '100%',
          height: '100%',
          // borderRadius: 4
        },
      });
      `}</Code>

      <Code block jsx>{`
      import { useCallback, useLayoutEffect, useState } from 'react';
      import { Alert, StyleSheet } from 'react-native';
      import MapView, { Marker } from 'react-native-maps';

      import IconButton from '../components/UI/IconButton';

      function Map({ navigation }) {
        const [selectedLocation, setSelectedLocation] = useState();

        const region = {
          latitude: 37.78,
          longitude: -122.43,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };

        function selectLocationHandler(event) {
          const lat = event.nativeEvent.coordinate.latitude;
          const lng = event.nativeEvent.coordinate.longitude;

          setSelectedLocation({ lat: lat, lng: lng });
        }

        const savePickedLocationHandler = useCallback(() => {
          if (!selectedLocation) {
            Alert.alert(
              'No location picked!',
              'You have to pick a location (by tapping on the map) first!'
            );
            return;
          }

          navigation.navigate('AddPlace', {
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng,
          });
        }, [navigation, selectedLocation]);

        useLayoutEffect(() => {
          navigation.setOptions({
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="save"
                size={24}
                color={tintColor}
                onPress={savePickedLocationHandler}
              />
            ),
          });
        }, [navigation, savePickedLocationHandler]);

        return (
          <MapView
            style={styles.map}
            initialRegion={region}
            onPress={selectLocationHandler}
          >
            {selectedLocation && (
              <Marker
                title="Picked Location"
                coordinate={{
                  latitude: selectedLocation.lat,
                  longitude: selectedLocation.lng,
                }}
              />
            )}
          </MapView>
        );
      }

      export default Map;

      const styles = StyleSheet.create({
        map: {
          flex: 1,
        },
      });
      `}</Code>

      <H>SQLite</H>

      <ul>
        <li>for data storage on device</li>
        <li><Code bash>https://docs.expo.dev/versions/latest/sdk/sqlite/</Code></li>
        <li><Lnk path='https://docs.expo.dev/versions/latest/sdk/sqlite/'>https://docs.expo.dev/versions/latest/sdk/sqlite/</Lnk></li>
        <li>Below how we interact with database</li>
      </ul>

      <Code block jsx>{`
      import * as SQLite from 'expo-sqlite';
      import { Place } from '../models/place';

      const database = SQLite.openDatabase('places.db');

      export function init() {
        const promise = new Promise((resolve, reject) => {
          database.transaction((tx) => {
            tx.executeSql(
              \`CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
              )\`,
              [],
              () => {
                resolve();
              },
              (_, error) => {
                reject(error);
              }
            );
          });
        });

        return promise;
      }

      export function insertPlace(place) {
        const promise = new Promise((resolve, reject) => {
          database.transaction((tx) => {
            tx.executeSql(
              \`INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)\`,
              [
                place.title,
                place.imageUri,
                place.address,
                place.location.lat,
                place.location.lng,
              ],
              (_, result) => {
                resolve(result);
              },
              (_, error) => {
                reject(error);
              }
            );
          });
        });

        return promise;
      }

      export function fetchPlaces() {
        const promise = new Promise((resolve, reject) => {
          database.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM places',
              [],
              (_, result) => {
                const places = [];

                for (const dp of result.rows._array) {
                  places.push(
                    new Place(
                      dp.title,
                      dp.imageUri,
                      {
                        address: dp.address,
                        lat: dp.lat,
                        lng: dp.lng,
                      },
                      dp.id
                    )
                  );
                }
                resolve(places);
              },
              (_, error) => {
                reject(error);
              }
            );
          });
        });

        return promise;
      }

      export function fetchPlaceDetails(id) {
        const promise = new Promise((resolve, reject) => {
          database.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM places WHERE id = ?',
              [id],
              (_, result) => {
                const dbPlace = result.rows._array[0];
                const place = new Place(
                  dbPlace.title,
                  dbPlace.imageUri,
                  { lat: dbPlace.lat, lng: dbPlace.lng, address: dbPlace.address },
                  dbPlace.id
                );
                resolve(place);
              },
              (_, error) => {
                reject(error);
              }
            );
          });
        });

        return promise;
      }
      `}</Code>

      <ul>
        <li>Database is initialized in App component after the load</li>
      </ul>

      <Code block jsx>{`
      import { useEffect, useState } from 'react';
      import { StatusBar } from 'expo-status-bar';
      import { NavigationContainer } from '@react-navigation/native';
      import { createNativeStackNavigator } from '@react-navigation/native-stack';
      import AppLoading from 'expo-app-loading';

      import AllPlaces from './screens/AllPlaces';
      import AddPlace from './screens/AddPlace';
      import IconButton from './components/UI/IconButton';
      import { Colors } from './constants/colors';
      import Map from './screens/Map';
      import { init } from './util/database';
      import PlaceDetails from './screens/PlaceDetails';

      const Stack = createNativeStackNavigator();

      export default function App() {
        const [dbInitialized, setDbInitialized] = useState(false);

        useEffect(() => {
          init()
            .then(() => {
              setDbInitialized(true);
            })
            .catch((err) => {
              console.log(err);
            });
        }, []);

        if (!dbInitialized) {
          return <AppLoading />;
        }

        return (
          <>
            <StatusBar style="dark" />
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerStyle: { backgroundColor: Colors.primary500 },
                  headerTintColor: Colors.gray700,
                  contentStyle: { backgroundColor: Colors.gray700 },
                }}
              >
                <Stack.Screen
                  name="AllPlaces"
                  component={AllPlaces}
                  options={({ navigation }) => ({
                    title: 'Your Favorite Places',
                    headerRight: ({ tintColor }) => (
                      <IconButton
                        icon="add"
                        size={24}
                        color={tintColor}
                        onPress={() => navigation.navigate('AddPlace')}
                      />
                    ),
                  })}
                />
                <Stack.Screen
                  name="AddPlace"
                  component={AddPlace}
                  options={{
                    title: 'Add a new Place',
                  }}
                />
                <Stack.Screen name="Map" component={Map} />
                <Stack.Screen
                  name="PlaceDetails"
                  component={PlaceDetails}
                  options={{
                    title: 'Loading Place...',
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </>
        );
      }
      `}</Code>

      <p>That is how we use inserting into DB function</p>

      <Code block jsx>{`
      import PlaceForm from '../components/Places/PlaceForm';
      import { insertPlace } from '../util/database';

      function AddPlace({ navigation }) {
        async function createPlaceHandler(place) {
          await insertPlace(place);
          navigation.navigate('AllPlaces');
        }

        return <PlaceForm onCreatePlace={createPlaceHandler} />;
      }

      export default AddPlace;
      `}</Code>

      <p>That is how we get data</p>

      <Code block jsx>{`
      import { useEffect, useState } from 'react';
      import { useIsFocused } from '@react-navigation/native';

      import PlacesList from '../components/Places/PlacesList';
      import { fetchPlaces } from '../util/database';

      function AllPlaces({ route }) {
        const [loadedPlaces, setLoadedPlaces] = useState([]);

        const isFocused = useIsFocused();

        useEffect(() => {
          async function loadPlaces() {
            const places = await fetchPlaces();
            setLoadedPlaces(places);
          }

          if (isFocused) {
            loadPlaces();
            // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
          }
        }, [isFocused]);

        return <PlacesList places={loadedPlaces} />;
      }

      export default AllPlaces;
      `}</Code>

      <p>That is how we fetch specific item from the db</p>

      <Code block jsx>{`
      import { useEffect, useState } from 'react';
      import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';

      import OutlinedButton from '../components/UI/OutlinedButton';
      import { Colors } from '../constants/colors';
      import { fetchPlaceDetails } from '../util/database';

      function PlaceDetails({ route, navigation }) {
        const [fetchedPlace, setFetchedPlace] = useState();

        function showOnMapHandler() {
          navigation.navigate('Map', {
            initialLat: fetchedPlace.location.lat,
            initialLng: fetchedPlace.location.lng,
          });
        }

        const selectedPlaceId = route.params.placeId;

        useEffect(() => {
          async function loadPlaceData() {
            const place = await fetchPlaceDetails(selectedPlaceId);
            setFetchedPlace(place);
            navigation.setOptions({
              title: place.title,
            });
          }

          loadPlaceData();
        }, [selectedPlaceId]);

        if (!fetchedPlace) {
          return (
            <View style={styles.fallback}>
              <Text>Loading place data...</Text>
            </View>
          );
        }

        return (
          <ScrollView>
            <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
            <View style={styles.locationContainer}>
              <View style={styles.addressContainer}>
                <Text style={styles.address}>{fetchedPlace.address}</Text>
              </View>
              <OutlinedButton icon="map" onPress={showOnMapHandler}>
                View on Map
              </OutlinedButton>
            </View>
          </ScrollView>
        );
      }

      export default PlaceDetails;

      const styles = StyleSheet.create({
        fallback: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        image: {
          height: '35%',
          minHeight: 300,
          width: '100%',
        },
        locationContainer: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        addressContainer: {
          padding: 20,
        },
        address: {
          color: Colors.primary500,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 16,
        },
      });
      `}</Code>

      <H>Without Expo</H>

      <ul>
        <li>Expo provides us a development service which has a client for all devices to run the code</li>
        <li>So far we used <i>Expo <Lnk path='https://docs.expo.dev/introduction/managed-vs-bare/#managed-workflow'>Managed</Lnk> workflow</i> with minimum configuration and where we can mix JS with native code</li>
        <li>We can use also <i>Expo <Lnk path='https://docs.expo.dev/introduction/managed-vs-bare/#bare-workflow'>Bare</Lnk> workflow</i> which is more configurable</li>
        <li>Or use just React Native CLI without Expo</li>
        <li>For Bare workflow you need to setup basic React Native <Lnk path='https://reactnative.dev/docs/environment-setup'>environment</Lnk></li>
        <li><Code bash>expo init</Code> and choose <i>bare</i> options</li>
        <li>Looks the same, but more files and folders</li>
        <li>To run the development emulator execute the npm script from the package.json, for ex. <Code bash>npm run ios</Code></li>
        <li>You may need to make additional configuration to use Expo services with bare workflow, for <Lnk path='https://docs.expo.dev/versions/latest/sdk/location/'>location</Lnk> service some <Lnk path='https://github.com/expo/expo/tree/sdk-48/packages/expo-location#installation-in-bare-react-native-projects'>steps</Lnk> are needed</li>
        <li>We can go from <i>managed</i> to <i>bare</i> workflow by <Code>expo eject</Code></li>
        <li>if you initialized a project with native cli and want to use expo packages you can do that</li>
        <li><Lnk path='https://docs.expo.dev/bare/installing-expo-modules/'>https://docs.expo.dev/bare/installing-expo-modules/</Lnk></li>
      </ul>

      <H>Publish</H>

      <ul>
        <li><Lnk path='https://expo.dev/eas'>https://expo.dev/eas</Lnk> - service from expo for building and publishing apps in app stores</li>
        <li><code>app.json</code> to be configured, details config can be found <Lnk path='https://docs.expo.dev/versions/v48.0.0/config/app/'>here</Lnk></li>
        <li>for environment variables check <Lnk path='https://docs.expo.dev/build-reference/variables/'>here</Lnk></li>
        <li>for icons and splashscreen go <Lnk path='https://docs.expo.dev/tutorial/configuration/'>here</Lnk></li>
        <li>read <Lnk path='https://docs.expo.dev/build/introduction/'>this</Lnk> to build an app with expo service</li>
        <li>check <Lnk path='https://www.udemy.com/course/react-native-the-practical-guide/learn/lecture/31404688'>this video</Lnk> about app distribution with Expo, quite long and boring process</li>
        <li>to publish ios version without expo follow <Lnk path='https://reactnative.dev/docs/publishing-to-app-store'>this link</Lnk></li>
        <li>to publish android version without expo follow <Lnk path='https://reactnative.dev/docs/signed-apk-android'>this link</Lnk></li>
      </ul>

      <H>Local notifications</H>

      <ul>
        <li>Local notifications are sent from this device to this device</li>
        <li>Such notifications can be scheduled</li>
        <li>Can be utilized for ex. in alarm, reminder or to-do apps, etc...</li>
        <li><Lnk path='https://docs.expo.dev/versions/latest/sdk/notifications/'>https://docs.expo.dev/versions/latest/sdk/notifications/</Lnk></li>
        <li><Code>npx expo install expo-notifications</Code></li>
        <li>Add some configuration from the link into the <code>app.json</code></li>
        <li>Explanation of <code>content</code> prop <Lnk path='https://docs.expo.dev/versions/latest/sdk/notifications/#notificationcontentinput'>https://docs.expo.dev/versions/latest/sdk/notifications/#notificationcontentinput</Lnk></li>
        <li>Explanation of <code>trigger</code> prop <Lnk path='https://docs.expo.dev/versions/latest/sdk/notifications/#notificationtriggerinput'>https://docs.expo.dev/versions/latest/sdk/notifications/#notificationtriggerinput</Lnk></li>
      </ul>

      <Code block jsx>{`
      // app.json
      {
        "expo": {
          "name": "RNCourse",
          "slug": "RNCourse",
          "version": "1.0.0",
          "orientation": "portrait",
          "icon": "./assets/icon.png",
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
          },
          "plugins": [
            [
              "expo-notifications",
              {
                "icon": "./local/assets/icon.png",
                "color": "#ffffff"
              }
            ]
          ]
        }
      }
      `}</Code>

      <Code block jsx>{`
        // App.js
        import { useEffect } from 'react';
        import { StatusBar } from 'expo-status-bar';
        import { StyleSheet, Button, View } from 'react-native';
        import * as Notifications from 'expo-notifications';

        Notifications.setNotificationHandler({
          handleNotification: async () => {
            return {
              shouldPlaySound: false,
              shouldSetBadge: false,
              shouldShowAlert: true
            };
          }
        });

        export default function App() {
          useEffect(() => {
            const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
              console.log('NOTIFICATION RECEIVED');
              console.log(notification);
              const userName = notification.request.content.data.userName;
              console.log(userName);
            });

            const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
              console.log('NOTIFICATION RESPONSE RECEIVED');
              console.log(response);
              const userName = response.notification.request.content.data.userName;
              console.log(userName);
            });

            return () => {
              subscription1.remove();
              subscription2.remove();
            };
          }, []);

          function scheduleNotificationHandler() {
            Notifications.scheduleNotificationAsync({
              content: {
                title: 'My first local notification',
                body: 'This is the body of the notification.',
                data: { userName: 'Max' }
              },
              trigger: {
                seconds: 5
              }
            });
          }

          return (
            <View style={styles.container}>
              <Button
                title="Schedule Notification"
                onPress={scheduleNotificationHandler}
              />
              <StatusBar style="auto" />
            </View>
          );
        }

        const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          },
        });
      `}</Code>

      <H>Push notifications</H>

      <ul>
        <li>Push notifications are sent from the backend to devices</li>
        <li>Actually backend sends notifications to google / apple push notification services and they distribute messages further</li>
        <li><Lnk path='https://docs.expo.dev/push-notifications/overview/'>https://docs.expo.dev/push-notifications/overview/</Lnk></li>
        <li>In the example below we test sending push notification right from the device, but in reality it should be done from some lambda function</li>
        <li>This is a bit trickier, take a closer look later ...</li>
      </ul>

      <Code block jsx>{`
      import { useEffect } from 'react';
      import { StatusBar } from 'expo-status-bar';
      import { StyleSheet, Button, View, Alert, Platform } from 'react-native';
      import * as Notifications from 'expo-notifications';

      Notifications.setNotificationHandler({
        handleNotification: async () => {
          return {
            shouldPlaySound: false,
            shouldSetBadge: false,
            shouldShowAlert: true,
          };
        },
      });

      export default function App() {
        useEffect(() => {
          async function configurePushNotifications() {
            const { status } = await Notifications.getPermissionsAsync();
            let finalStatus = status;

            if (finalStatus !== 'granted') {
              const { status } = await Notifications.requestPermissionsAsync();
              finalStatus = status;
            }

            if (finalStatus !== 'granted') {
              Alert.alert(
                'Permission required',
                'Push notifications need the appropriate permissions.'
              );
              return;
            }

            const pushTokenData = await Notifications.getExpoPushTokenAsync();
            console.log(pushTokenData);

            if (Platform.OS === 'android') {
              Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.DEFAULT,
              });
            }
          }

          configurePushNotifications();
        }, []);

        useEffect(() => {
          const subscription1 = Notifications.addNotificationReceivedListener(
            (notification) => {
              console.log('NOTIFICATION RECEIVED');
              console.log(notification);
              const userName = notification.request.content.data.userName;
              console.log(userName);
            }
          );

          const subscription2 = Notifications.addNotificationResponseReceivedListener(
            (response) => {
              console.log('NOTIFICATION RESPONSE RECEIVED');
              console.log(response);
              const userName = response.notification.request.content.data.userName;
              console.log(userName);
            }
          );

          return () => {
            subscription1.remove();
            subscription2.remove();
          };
        }, []);

        function scheduleNotificationHandler() {
          Notifications.scheduleNotificationAsync({
            content: {
              title: 'My first local notification',
              body: 'This is the body of the notification.',
              data: { userName: 'Max' },
            },
            trigger: {
              seconds: 5,
            },
          });
        }

        function sendPushNotificationHandler() {
          fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              to: '<Your Device Push Token>]',
              title: 'Test - sent from a device!',
              body: 'This is a test!'
            })
          });
        }

        return (
          <View style={styles.container}>
            <Button
              title="Schedule Notification"
              onPress={scheduleNotificationHandler}
            />
            <Button
              title="Send Push Notification"
              onPress={sendPushNotificationHandler}
            />
            <StatusBar style="auto" />
          </View>
        );
      }

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
      });
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
