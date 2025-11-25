'use client'


import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'python',
  date: '2021.12.19',
  tags: ['python', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/py.jpg',
  desc: 'python syntax',
  body: (
    <>
      <p>
        <Lnk path="https://www.python.org/downloads/">Install Python</Lnk>.
      </p>

      <p>
        Type <code>py</code> in terminal to enter into command shell and see the version. For me it is <Code>Python 3.10.1</Code>
      </p>

      <p>
        Type <code>exit()</code> or <kbd>Ctrl+Z</kbd> then <kbd>Return</kbd> to exit.
      </p>

      <H>Get started</H>

      <p>
        Create a file <code>file.py</code> with the following code{' '}
        <Code lang="py">print("hello world")</Code>, run it from the terminal with command{' '}
        <code>py file.py</code> and get output <Code>hello world</Code>. So Python
        is installed and executable.
      </p>

      <H>Print</H>

      <Hs>Quotes</Hs>

      <Code block py>{`
        print("hello world") # hello world
        print('hello world') # hello world
        `}</Code>

      <Hs>Line break</Hs>

      <Code block py>{`
        # print w/o line break
        print("line 1 ", end = "")
        print("line 2 ", end = "")
        # line 1 line 2 
        `}</Code>

      <Hs>Concatenate</Hs>

      <Code block py>{`
      print("5 + 2 =", 5 + 2) # 5 + 2 = 7

      var1 = "like"
      var2 = "to"
      var3 = "eat"
      print('I', var1, var2, var3) # I like to eat
      `}</Code>

      <Hs>Interpolation</Hs>

      <Code block py>{`
      print("{} + {} = {}".format(1, 2, 3)) # 1 + 2 = 3
      `}</Code>

      <Hs>Duplicate</Hs>

      <Code block py>{`
      print("hi " * 5) # hi hi hi hi hi 
      `}</Code>

      <Hs>Format</Hs>

      <Code block py>{`
      print("%c is my %s letter and my number %d number is %.5f" % 
        ('X', 'favorite', 1, .14))
      # X is my favorite letter and my number 1 number is 0.14000
      `}</Code>

      <H>Comments</H>

      <Code block py>{`
      # comment
      '''
        multiline comment
      '''
      `}</Code>

      <H>Variable</H>

      <Code block py>{`
      name = "John"
      print(name)
      `}</Code>

      <H>Types</H>

      <Hs>Types</Hs>

      <Code block py>{`
      "five" # <class 'str'>
      5 # <class 'int'>
      5.5 # <class 'float'>
      range(3) # <class 'range'> # nums from 0 to 2
      ["apple", "banana", "cherry"] # <class 'list'>
      {"apple", "banana", "cherry"} # <class 'set'>v # unchangeable
      ("apple", "banana", "cherry") # <class 'tuple'> # ordered, unchangeable
      {"name" : "John", "age" : 36} # <class 'dict'>
      True # <class 'bool'>

      # others
      1j # <class 'complex'>
      b"Hello" # <class 'bytes'>
      bytearray(5) # <class 'bytearray'>
      memoryview(bytes(5)) # <class 'memoryview'>
      `}</Code>

      <Hs>Check type</Hs>

      <Code block py>{`
      print(type(5)) # <class 'int'>
      `}</Code>

      <Hs>Convert type</Hs>

      <Code block py>{`
      str("Hello World")
      bool(5)
      int(20)
      float(20.5)
      list(("apple", "banana", "cherry"))
      tuple(("apple", "banana", "cherry"))
      range(6)
      dict(name="John", age=36)
      set(("apple", "banana", "cherry"))

      #others
      frozenset(("apple", "banana", "cherry"))
      complex(1j)
      bytes(5)
      bytearray(5)
      memoryview(bytes(5))
      `}</Code>

      <H>Operators</H>

      <Hs>Math</Hs>

      <Code block py>{`
      5 + 2 # 7
      5 - 2 # 3
      5 * 2 # 10
      5 / 2 # 2.5
      5 % 2 # 1
      5 ** 2 # 25
      5 // 2 # 2
      `}</Code>

      <Hs>Comparison</Hs>

      <Code block py>{`
      ==, !=, >, <, >=, <=
      `}</Code>

      <p>No triple equal <code>===</code></p>

      <Hs>Logical</Hs>

      <Code block py>{`
      and, or, not
      `}</Code>

      <H>String</H>

      <Hs>Single vs multiline</Hs>

      <Code block py>{`
      str = "single line string"
      str = "single line string with quotation mark \\""
      str = '''
        multiline
        text
        goes inside triple quotes
      '''
      `}</Code>

      <Hs>Concatenation</Hs>

      <Code block py>{`
      print('hello ' + 'John') # hello John
      `}</Code>

      <Hs>First N chars</Hs>

      <Code block py>{`
      str = "123456789"
      print(str[0:4]) # 1234
      `}</Code>

      <Hs>Last N chars</Hs>

      <Code block py>{`
      str = "123456789"
      print(str[-5:]) # 56789
      `}</Code>

      <Hs>Up to N chars</Hs>

      <Code block py>{`
      str = "123456789"
      print(str[:-5]) # 1234
      `}</Code>

      <Hs>Capitalize</Hs>

      <Code block py>{`
      print("hi".capitalize()) # Hi
      `}</Code>

      <Hs>Find</Hs>

      <Code block py>{`
      print("Hello my friend".find('m')) # 6
      `}</Code>

      <Hs>Length</Hs>

      <Code block py>{`
      print(len("Hello my friend")) # 15
      `}</Code>

      <Hs>Is number</Hs>

      <Code block py>{`
      print("1234".isalnum()) # True
      `}</Code>

      <Hs>Is alpha</Hs>

      <Code block py>{`
      print("abc".isalpha()) # True
      `}</Code>

      <Hs>Replace</Hs>

      <Code block py>{`
      print("abc".replace("b", "B")) # aBc
      `}</Code>

      <Hs>Strip</Hs>

      <Code block py>{`
      print("  abc   ".strip()) # abc
      `}</Code>

      <Hs>Split</Hs>

      <Code block py>{`
      print("a b c".split(" ")) # ['a', 'b', 'c']
      print(list("a b c")) # ['a', ' ', 'b', ' ', 'c']
      `}</Code>

      <Hs>Split with empty string</Hs>

      <Code block py>{`
      print("a b c".list(" ")) # ['a', 'b', 'c']
      `}</Code>

      <H>List (array)</H>

      <Hs>Create</Hs>

      <Code block py>{`
      grocery_list = ['Juice', 'Tomatoes', 'Potatoes', 'Bananas']
      `}</Code>

      <Hs>Access</Hs>

      <Code block py>{`
      grocery_list = ['Juice', 'Tomatoes', 'Potatoes', 'Bananas']
      grocery_list[1] # Tomatoes
      grocery_list[0:2] # ['Juice', 'Tomatoes']

      arr = [1, 2, [3, 4]] 
      arr[2][0] # 3

      for x in [1, 2, 3, 4, 5]:
        print(x, ' ', end="") # 1  2  3  4  5
        `}</Code>

      <Hs>Change</Hs>

      <Code block py>{`
      arr = [1, 2, 3]
      arr[0] = 666
      print(arr) # [666, 2, 3]
      `}</Code>

      <Hs>Add</Hs>

      <Code block py>{`
      arr = [1, 2, 3]
      arr.append(4)
      print(arr) # [1, 2, 3, 4]

      arr.insert(0, 0)
      print(arr) # [0, 1, 2, 3, 4]
      `}</Code>

      <Hs>Remove, delete</Hs>

      <Code block py>{`
      arr = [0, 1, 2, 3, 4]
      arr.remove(0)
      print(arr) # [1, 2, 3, 4]

      del arr[0]
      print(arr) # [2, 3, 4]
      `}</Code>

      <Hs>Reverse</Hs>

      <Code block py>{`
      arr = [0, 1, 2, 3, 4]
      arr.reverse()
      print(arr) # [4, 3, 2, 1, 0]
      `}</Code>

      <Hs>Concatenate</Hs>

      <Code block py>{`
      arr1 = [0, 1, 2]
      arr2 = [3, 4, 5]
      arr3 = arr1 + arr2
      print(arr3) # [0, 1, 2, 3, 4, 5]
      `}</Code>

      <Hs>Length</Hs>

      <Code block py>{`
      arr = [0, 1, 2]
      print(len(arr)) # 3
      `}</Code>

      <Hs>Max, min</Hs>

      <Code block py>{`
      arr = [0, 1, 2]
      print(max(arr)) # 2
      print(min(arr)) # 0
      `}</Code>

      <Hs>All</Hs>

      <Code block py>{`
      arr = [1, 2, 3, 4, 5]
      print(all(i > 0 for i in arr)) # True
      print(all(i > 3 for i in arr)) # False
      `}</Code>

      <Hs>Filter</Hs>

      <Code block py>{`
      arr = [1, 2, 3, 4, 5]

      def filterFunc(x):
        return x > 2
      
      print(list(filter(filterFunc, arr))) # [3, 4, 5]
      # alternatively
      print(list(filter(lambda x: x > 2, arr))) # [3, 4, 5]
      # alternatively
      print([x for x in arr if x > 2]) # [3, 4, 5]
      `}</Code>

      <Hs>Next</Hs>

      <p>Returns the first element that meets a condition</p>

      <Code block py>{`
      arr = [1, 2, 3, 4, 5]

      print(next(x for x in arr if x > 2)) # 3
      # print(next(x for x in arr if x > 5)) # error: StopIteration
      print(next((x for x in arr if x > 5), None)) # None
      `}</Code>

      <Hs>Includes</Hs>

      <Code block py>{`
      arr = [1, 2, 3, 4, 5]

      print(1 in arr) # True
      print(6 in arr) # False
      `}</Code>

      <Hs>For each</Hs>

      <Code block py>{`
      arr = [1, 2, 3, 4, 5]
      for x in arr:
        print(x, end="") # 12345
        `}</Code>

      <Hs>Map</Hs>

      <Code block py>{`
      arr = [1, 2, 3, 4, 5]

      def square(x):
        return x * x

      print(list(map(square, arr))) # [1, 4, 9, 16, 25]
      # alternatively
      print(list(map(lambda x: x * x, arr))) # [1, 4, 9, 16, 25]
      # alternatively
      print([x * x for x in arr]) # [1, 4, 9, 16, 25]
      `}</Code>

      <Hs>Reduce</Hs>

      <Code block py>{`
      import functools

      arr = [1, 2, 3, 4, 5]
      
      def square_reducer(x, y):
        return x * y
      
      print(functools.reduce(square_reducer, arr)) # 120
      # alternatively
      print(functools.reduce(lambda x, y: x * y, arr)) # 120
      `}</Code>

      <Hs>Sort</Hs>

      <Code block py>{`
      arr = [2, 1, 5, 3, 4]
      print(sorted(arr)) # [1, 2, 3, 4, 5]
      print(sorted(arr, reverse=True)) # [5, 4, 3, 2, 1]
      
      students = [
        {'name': 'Jimmy', 'age': 15},
        {'name': 'Hector', 'age': 18},
        {'name': 'Paige', 'age': 16}
      ]
      print(sorted(students, key=lambda x: x['age'])) # [{'name': 'Jimmy', 'age': 15}, {'name': 'Paige', 'age': 16}, {'name': 'Hector', 'age': 18}]
      `}</Code>

      <Hs>Sort 2</Hs>

      <Code block py>{`
      arr = [0, 4, 3, 2, 1]
      arr.sort()
      print(arr) # [0, 1, 2, 3, 4]
      `}</Code>

      <Hs>Convert to tuple</Hs>

      <Code block py>{`
      arr = [1, 2, 3, 4, 5]
      print(arr) # [1, 2, 3, 4, 5]
      tuple = tuple(arr)
      print(tuple) # (1, 2, 3, 4, 5)
      
      `}</Code>

      <H>Tuple</H>

      <p>Same as list, but not changeable</p>

      <Hs>Create</Hs>

      <Code block py>{`
      tuple = (1, 2, 3, 4, 5)
      `}</Code>

      <Hs>Convert to a list</Hs>

      <Code block py>{`
      tuple = (1, 2, 3, 4, 5)
      print(tuple) # (1, 2, 3, 4, 5)
      list = list(tuple)
      print(list) # [1, 2, 3, 4, 5]
      `}</Code>

      <Hs>Length</Hs>

      <Code block py>{`
      tuple = (1, 2, 3, 4, 5)
      print(len(tuple)) # 5
      `}</Code>

      <Hs>Min, max</Hs>

      <Code block py>{`
      tuple = (1, 2, 3, 4, 5)
      print(min(tuple)) # 1
      print(max(tuple)) # 5
      `}</Code>

      <H>Dictionary</H>

      <p>Same as maps, objects, key-valued storage</p>

      <Hs>Create</Hs>

      <Code block py>{`
      dict = {
        "name": "John",
        "sex": "male",
        "age": 35,
      }
      print(dict) # {'name': 'John', 'sex': 'male', 'age': 35}
      `}</Code>

      <Hs>Access</Hs>

      <Code block py>{`
      dict = {
        "name": "John",
        "sex": "male",
        "age": 35,
      }
      print(dict['name']) # John
      print(dict.get("name")) # John
      print(dict.keys()) # dict_keys(['name', 'sex', 'age'])
      print(dict.values()) # dict_values(['John', 'male', 35])
      `}</Code>

      <Hs>Delete</Hs>

      <Code block py>{`
      dict = {
        "name": "John",
        "sex": "male",
        "age": 35,
      }
      del dict['name']
      print(dict) # {'sex': 'male', 'age': 35}
      `}</Code>

      <Hs>Length</Hs>

      <Code block py>{`
      dict = {
        "name": "John",
        "sex": "male",
        "age": 35,
      }
      print(len(dict)) # 3
      `}</Code>

      <Hs>Update</Hs>

      <Code block py>{`
      dict = {
        "name": "John",
        "sex": "male",
        "age": 35,
      }
      dict['name'] = 'James'
      print(dict) # {'name': 'James', 'sex': 'male', 'age': 35}
      `}</Code>

      <H>Conditionals</H>

      <Hs>if</Hs>

      <Code block py>{`
      age = 21
      if age > 16:
      print('can drive')
      `}</Code>

      <Hs>if-else</Hs>

      <Code block py>{`
      age = 21
      if age > 16:
        print('can drive')
      else:
        print('can not drive')
      `}</Code>

      <Hs>else-if</Hs>

      <Code block py>{`
      age = 21
      if age >= 21:
        print('can drive a tractor')
      elif age >= 16:
        print('can drive a car')
      else:
        print('can not drive')
      `}</Code>

      <Hs>ternary</Hs>

      <Code block py>{`
      a = 1 if (1 == 1) else 0
      print(a) # 1
      `}</Code>

      <Hs>logical operators</Hs>

      <Code block py>{`
      num = 2
      if (num == 1) and (num != 2) and not(num == 3):
        print('num is 1')
      else:
        print('num is not 1')
      # num is not 1
      `}</Code>

      <H>Loops</H>

      <Hs>For</Hs>

      <Code block py>{`
      for x in range(0, 5):
        print(x, ' ', end="") # 0  1  2  3  4  

      for x in [1, 2, 3, 4, 5]:
        print(x, ' ', end="") # 1  2  3  4  5  
      `}</Code>

      <Hs>While</Hs>

      <Code block py>{`
      i = 0
      while (i <= 10):
        if(i % 2 == 0):
          print(i, end="")
        i += 1
      # 0246810
      `}</Code>

      <Code block py>{`
      import random
      randNum = 0
      
      while(randNum != 5):
        print(randNum, end='')
        randNum = random.randrange(0, 10)
      # 0904994
      `}</Code>

      <Hs>Break, continue</Hs>

      <Code block py>{`
      for i in range(0, 10):
      if (i == 5):
        continue
      if (i == 9):
        break
      print(i, end="") # 01234678
      `}</Code>

      <H>Functions</H>

      <p>Variables defined in function are not visible outside.</p>

      <H>Functions declaration</H>

      <Code block py>{`
      def sum(num1, num2):
        sumNum = num1 + num2
        return sumNum
      
      print(sum(1, 2)) # 3
      `}</Code>

      <H>Lambda function (arrow)</H>

      <Code block py>{`
      sum = lambda num1, num2 : num1 + num2
      print(sum(1, 2)) # 3 
      `}</Code>

      <Code block py>{`
      def func(n):
        return lambda a : a * n

      tripler = myfunc(3)
      print(tripler(11)) # 33
      `}</Code>

      <H>Input</H>

      <Code block py>{`
      import sys
      print('what is your name?')
      name = sys.stdin.readline()
      print('hello', name)

      # what is your name?
      # John
      # hello John
      `}</Code>

      <H>File</H>

      <Hs>Create & write</Hs>

      <Code block py>{`       
      file = open("text.txt", "wb")  
      print(file.mode) # wb
      print(file.name) # text.txt
      file.write(bytes("Line1\n", 'UTF-8'))
      file.close()
      `}</Code>

      <Hs>Open & read</Hs>

      <Code block py>{`
      file = open("text.txt", "r+")
      text = file.read()
      print(text) # Line1
      file.close()
      `}</Code>

      <Hs>Delete</Hs>

      <Code block py>{`
      import os
      os.remove("text.txt")
      `}</Code>

      <H>Class</H>

      <Hs>Initialize, setters, getters, methods</Hs>

      <Code block py>{`
      class Human:
        __name = None # private
        __sex = None # like 'null' in JS
        __age = None
      
        # constructor to initialize an object
        # self = this in JS
        def __init__(self, name, sex, age, height):
          self.__name = name
          self.__sex = sex
          self.__age = age
          self.height = height
          
      
        # setters
        def set_name(self, name):
          self.__name = name
      
        def set_sex(self, sex):
          self.__sex = sex
      
        def set_age(self, sex):
          self.__sex = sex
      
        # getters
        def get_name(self):
          return self.__name
      
        def get_sex(self):
          return str(self.__sex)
      
        def get_age(self):
          return str(self.__age)
      
        def get_type(self):
          print("Human")
      
        #method
        def toString(self):
          return "{} is {}, {} years old, {} cm".format(self.__name, self.__sex, self.__age, self.height)
      
      # create an object
      john = Human('John', 'male', 35, 180)
      
      print(john.toString()) # John is male, 35 years old
      print(john.height) # 180
      print(john.get_age()) # 35
      print(john.__age) # !!! object has no attribute '__age' # it is private
      `}</Code>

      <Hs>Inherit</Hs>

      <Code block py>{`
      from classFile import Human

      class Superhero(Human):
        __superpower = None
      
        def __init__(self, name, sex, age, height, superpower):
          self.__superpower = superpower
      
          # call the super class constructor
          super(Superhero, self).__init__(name, sex, age, height)
      
        def set_superpower(self, superpower):
          self.__superpower = superpower
      
        def get_superpower(self):
          return self.__superpower
      
        def get_type(self):
          print ("Superhero")
      
        # We can overwrite functions in the super class
        def toString(self):
          return "{} is a superhero {}, {} years old, {} cm, with {} superpower".format(self.get_name(), self.get_sex(), self.get_age(), self.height, self.__superpower)
      
      immortalJohn = Superhero('John', 'male', 35, 180, "immortality")
      print(immortalJohn.toString()) # John is a superhero male, 35 years old, 180 cm, with immortality superpower
      print(immortalJohn.get_superpower()) # immortality
      immortalJohn.set_superpower("transparency")
      print(immortalJohn.get_superpower()) # transparency
      `}</Code>

      <p><Lnk path="https://overapi.com/python">Python cheat-sheet</Lnk> on every property and method.</p>
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
