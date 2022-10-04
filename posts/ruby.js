import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'ruby',
  date: '2021.12.16',
  tags: ['ruby', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/ruby.png',
  desc: 'Ruby basic syntax',
  body: (
    <>
      <p>
        <Lnk path="https://www.ruby-lang.org/en/documentation/installation/">Install Ruby</Lnk>{' '}
        and restart your PC if you are on Windows machine.
      </p>

      <p>
        Type <code>ruby -v</code> in terminal to see the version. For me it is{' '}
        <Code>ruby 3.0.3p157 (2021-11-24 revision 3fb7d2cadc) [x64-mingw32]</Code>
      </p>

      <H>Get started</H>

      <p>
        Create a file <code>file.rb</code> with the following code{' '}
        <Code lang="ruby">puts 'hello world'</Code>, run it from the terminal with command{' '}
        <code>ruby file.rb</code> and get output <Code>hello world</Code>. So Ruby
        is installed and executable.
      </p>

      <H>Print</H>

      <Code block ruby>{`
        puts 'hi' # hi # adds new line at the end # returns nil
        print 123; print 456; print 789; # 123456789 # prints without new line
        p 'hi' # "hi" # shows raw version # returns passed object

        puts [1,2]
        #1
        #2
        print [1,2] # [1, 2]
        p [1,2] # [1, 2]
      `}</Code>

      <H>Load</H>

      <Code block ruby>{`
        # file1.rb
        puts 'hello from file 1'
      `}</Code>

      <Code block ruby>{`
        # file2.rb
        load 'file1.rb'
      `}</Code>

      <p>
        When we execute <code>ruby file2.rb</code> we get{' '}
        <Code>hello from file 1</Code>
      </p>

      <H>Comments</H>

      <Code block ruby>{`
        # single line comment
        
        =begin
          multiline
          comment
        =end
      `}</Code>

      <H>Variables</H>

      <Code block ruby>{`
        name = "John"
        num = 123
        cond = true

        p name, num, cond
        # "John"
        # 123
        # true
      `}</Code>

      <H>Types</H>

      <Code block ruby>{`
        p 1.class # Integer
        p 1.234.class # Float
        p "string".class # String
        p false.class # FalseClass
      `}</Code>

      <H>Conversion</H>

      <Code block ruby>{`
        p 4.to_s # "4"
        p 4.to_f # 4.0
        p "4".to_i # 4
      `}</Code>

      <H>Escape characters</H>

      <Code block ruby>{`
        # \\\ backslash
        # \\' single quote
        # \\" double quote
        # \\a bell
        # \\b backspace
        # \\f formfeed
        # \\n new line
        # \\r carriage
        # \\t tab
        # \\v vertical tab
      `}</Code>

      <H>Constant is writable</H>

      <Code block ruby>{`
        A_CONST = 123
        A_CONST = 321
        p A_CONST
        # file.rb:2: warning: already initialized constant A_CONST
        # file.rb:1: warning: previous definition of A_CONST was here
        # 321
      `}</Code>

      <H>Input</H>

      <Code block ruby>{`
        print "Enter your name: "
        name = gets.chomp
        p "Hello #{name}"

        # Enter your name: John
        # "Hello John"
      `}</Code>

      <Code block ruby>{`
        print "Enter number: "
        num = gets.chomp.to_i
        puts "5 + #{num} = #{5 + num}"

        # Enter number: 1
        # "5 + 1 = 6"
      `}</Code>

      <H>Strings</H>

      <Hs>Multiline</Hs>

      <Code block ruby>{`
        str1 = 'line1
        line2
        line3'
        p str1 # "line1\nline2\nline3"

        str2 = %/line1
        line2
        line3/
        puts str2 # "line1\nline2\nline3"

        str3 = <<EOM
          This is a very long string
          that contains interpolation
          like #{600 + 66} \n\n
        EOM
        puts str3
      `}</Code>

      <Hs>Interpolation</Hs>

      <Code block ruby>{`
        name = "John"
        p "Hello #{name}" # "Hello John"
        p 'Hello #{name}' # "Hello #{name}" # interpolation not working with single quotes
      `}</Code>

      <Hs>Length</Hs>

      <Code block ruby>{`
        name = "John"
        p name.size # 4
        p name.length # 4
      `}</Code>

      <Hs>Case</Hs>

      <Code block ruby>{`
        name = "joHn"
        p name.upcase # "JOHN"
        p name.downcase # "john"
        p name.capitalize # "John"
      `}</Code>

      <Hs>Reverse</Hs>

      <Code block ruby>{`
        name = "John"
        p name.reverse # "nhoJ"
      `}</Code>

      <Hs>Include</Hs>

      <Code block ruby>{`
        name = "John"
        p name.include? "ohn" # true
        p name.include? "xxx" # false
      `}</Code>

      <Hs>Start with</Hs>

      <Code block ruby>{`
        p 'hello'.start_with? "hel" # true
      `}</Code>

      <Hs>Index</Hs>

      <Code block ruby>{`
        p 'hello'.index("e") # 1
      `}</Code>

      <Hs>Count</Hs>

      <Code block ruby>{`
        p "vowels in the 'hello' word: " +  "hello".count("aeiou").to_s # "vowels in the 'hello' word: 2"
        p "consonants in the 'hello' word: " +  "hello".count("^aeiou").to_s #  "consonants in the 'hello' word: 3"
      `}</Code>

      <Hs>Strip (trim)</Hs>

      <Code block ruby>{`
        p "   hello    ".lstrip # "hello    "
        p "   hello    ".rstrip # "   hello"
        p "   hello    ".strip # "hello"
      `}</Code>

      <Hs>chop</Hs>

      <Code block ruby>{`
        p "hello".chop # "hell"
        p "hello".chomp("lo") # "hel"
      `}</Code>

      <Hs>delete</Hs>

      <Code block ruby>{`
        p "hello".delete("l") # "heo"
      `}</Code>

      <Hs>split</Hs>

      <Code block ruby>{`
        p "hello".split("") # ["h", "e", "l", "l", "o"]
        p "hello".split("e") # ["h", "llo"]
      `}</Code>

      <Hs>Concatenation</Hs>

      <Code block ruby>{`
        p "Hello, " "how are you" # "Hello, how are you"
        p "Hello, " + "how are you" # "Hello, how are you"
        p "Hello, ".concat("how are you") # "Hello, how are you"
      `}</Code>

      <Hs>Freeze</Hs>

      <Code block ruby>{`
        str = "Hi"
        p str # "Hi"
        str = str << " again"
        p str # "Hi again"
        str.freeze
        str = str << " again"
        p str # "Hi again" # can't modify frozen String: "Hi again" (FrozenError)
      `}</Code>

      <Hs>Compare</Hs>

      <Code block ruby>{`
        p "hi" === "hi" # true
        p "hi".eql? "hi" # true
      `}</Code>

      <Hs>Access characters</Hs>

      <Code block ruby>{`
        str = "Hello from Tokyo"
        p str # "Hello from Tokyo"
        p str["from"] # "from"
        p str[0] # "H"
        p str[0, 4] # "Hell" 
        p str[0..10] # "Hello from"
        p str[0, str.length] # "Hello from Tokyo"
        p str[-4] # "o"
        p str.length # 16
      `}</Code>

      <H>Operators</H>

      <Hs>Math</Hs>

      <Code block ruby>{`
        p 10 + 20 # 30
        p 20 - 10 # 10
        p 20 * 10 # 200
        p 20 / 10 # 2
        p 20 / 9 # 2
        p 20.to_f / 9 # 2.2222222222222223
        p 20.0 / 9 # 2.2222222222222223
        p 20 / 9.0 # 2.2222222222222223
        p 10 % 3 # 1
        p 2 ** 3 # 8
      `}</Code>

      <Hs>Comparison</Hs>

      <Code block ruby>{`
        p 2 == 3 # false
        p 2 != 3 # true
        p 2 > 3 # false
        p 2 < 3 # true
        p 2 >= 3 # false
        p 2 <= 3 # true
      `}</Code>

      <Hs>Logical</Hs>

      <Code block ruby>{`
        p (true && true) # true
        p (true and true) # true
        p (false || true) # true
        p (false or true) # true
        p (!false) # true
        p (not false) # true
      `}</Code>

      <H>Array</H>

      <Hs>Create</Hs>

      <Code block ruby>{`
        p arr1 = [1, "two", 3, 4.4] # [1, "two", 3, 4.4]
        p arr2 = Array.new # []
        p arr3 = Array.new(5) # [nil, nil, nil, nil, nil]
        p arr4 = Array.new(5, "empty") # ["empty", "empty", "empty", "empty", "empty"]
      `}</Code>

      <Hs>Size</Hs>

      <Code block ruby>{`
        arr1 = [1,2,3,4,5]
        p arr1.size # 5
        p arr1.length # 5

        arr2 = Array.new(5)
        p arr2.size # 5
      `}</Code>

      <Hs>Access</Hs>

      <Code block ruby>{`
        arr = [1,2,3,4,5]
        p arr[0] # 1
        p arr[1,4] # [2, 3, 4, 5]
        p arr.at(1) # 2
        p arr.at(5) # nil
        p arr.values_at(0,1,3) # [1, 2, 4]

        p arr.fetch(1) # 2
        p arr.fetch(5) # index 5 outside of array bounds: -5...5 (IndexError)

        p arr.first # 1
        p arr.last # 5

        p arr.take(2) # [1, 2]

        arr.each do |value|
          p value # 1 2 3 4 5
        end
            `}</Code>

      <Hs>Manipulate</Hs>

      <Code block ruby>{`
        arr = [1,2,3,4,5]
        p arr.push(6) # [1, 2, 3, 4, 5, 6]
        p arr << 7 # [1, 2, 3, 4, 5, 6, 7]
        p arr.unshift(0) # [0, 1, 2, 3, 4, 5, 6, 7]
        p arr.insert(3, 666) # [0, 1, 2, 666, 3, 4, 5, 6, 7]

        p arr.pop # 7
        p arr # [0, 1, 2, 666, 3, 4, 5, 6]

        p arr.shift # 0
        p arr # [1, 2, 666, 3, 4, 5, 6]

        p arr.delete(666) # 666
        p arr # [1, 2, 3, 4, 5, 6]

        p arr.drop(3) # [4, 5, 6]
        p arr # [1, 2, 3, 4, 5, 6]
      `}</Code>

      <Hs>Include?</Hs>

      <Code block ruby>{`
        arr = [1, 2, 3, 1, 2, 3]
        p arr.include?(2) # true
      `}</Code>

      <Hs>Count</Hs>

      <Code block ruby>{`
        arr = [1, 2, 3, 1, 2, 3]
        p arr.count(2) # 2
      `}</Code>

      <Hs>Empty?</Hs>

      <Code block ruby>{`
        arr = []
        p arr.empty? # true
      `}</Code>

      <Hs>Join</Hs>

      <Code block ruby>{`
        arr = [1, 2, 3]
        p arr.join(" ") # "1 2 3"
        p arr.join # "123"
      `}</Code>

      <Hs>Reverse</Hs>

      <Code block ruby>{`
        arr = [1, 2, 3]
        p arr.reverse # [3, 2, 1]
      `}</Code>

      <Hs>Select</Hs>

      <Code block ruby>{`
        arr = [1, 2, 3, 4, 5]
        p arr.select { |num| num > 2 } # [3, 4, 5]
        p arr # [1, 2, 3, 4, 5]
      `}</Code>

      <Hs>flatten</Hs>

      <Code block ruby>{`
        p [1, 2, [3, 4, 5]].flatten # [1, 2, 3, 4, 5]
        p [1, 2, [3, [4, 5]]].flatten # [1, 2, 3, 4, 5]
        
      `}</Code>

      <Hs>each</Hs>

      <Code block ruby>{`
        arr = [1, 2, 3, 4, 5]
        arr.each do |el|
          p el
        end
        # 1 2 3 4 5
      `}</Code>

      <Hs>map</Hs>

      <Code block ruby>{`
        arr = [1, 2, 3, 4, 5]
        p arr.map { |el| el * 2 } # [2, 4, 6, 8, 10]
      `}</Code>

      <Hs>concat</Hs>

      <Code block ruby>{`
        arr = [1, 2, 3]
        p arr.concat([4, 5, 6]) # [1, 2, 3, 4, 5, 6]
        p arr # [1, 2, 3, 4, 5, 6]
      `}</Code>

      <Hs>uniq</Hs>

      <Code block ruby>{`
        arr = [1, 1, 2, 2, 3, 3]
        p arr.uniq # [1, 2, 3]
        p arr # [1, 1, 2, 2, 3, 3]
      `}</Code>

      <H>Hash (object)</H>

      <Hs>Create</Hs>

      <Code block ruby>{`
        hash1 = {
          "name" => "John",
          "sex" => "male",
          "age" => 35
        }

        hash2 = Hash[
          "name", "Jane",
          "sex", "female",
          "age", 35
        ]

        p hash1.size # 3
        p hash2.size # 3
      `}</Code>

      <Hs>Default key</Hs>

      <Code block ruby>{`
        hash = Hash.new("no such key")
        p hash["country"] # "no such key"
      `}</Code>

      <Hs>Access</Hs>

      <Code block ruby>{`
        hash = {
          "name" => "Jane",
          "sex" => "female",
          "age" => 35
        }

        p hash["name"] # "Jane"
        p hash["sex"] # "female"
        p hash["age"] # 35
        p hash["country"] # nil

        hash.each do |key, value|
          p "#{key} : #{value}" 
        end
        # "name : Jane", "sex : female", "age : 35"
      `}</Code>

      <Hs>Add</Hs>

      <Code block ruby>{`
        hash = {
          "name" => "Jane",
          "sex" => "female",
          "age" => 35
        }

        hash["country"] = "USA"
        p hash["country"] # "USA"
      `}</Code>

      <Hs>Delete</Hs>

      <Code block ruby>{`
        hash = {
          "name" => "Jane",
          "sex" => "female",
          "age" => 35
        }

        hash.delete("name")
        p hash # {"sex"=>"female", "age"=>35}
      `}</Code>

      <Hs>Merge</Hs>

      <Code block ruby>{`
        hash1 = {
          "name" => "Jane",
          "sex" => "female",
          "age" => 35
        }
        hash2 = {
          "age" => 66,
          "country" => "USA",
        }

        p hash1.merge(hash2) # {"name"=>"Jane", "sex"=>"female", "age"=>66, "country"=>"USA"}
        p hash1 # {"name"=>"Jane", "sex"=>"female", "age"=>35}
      `}</Code>

      <Hs>Update</Hs>

      <Code block ruby>{`
        hash1 = {
          "name" => "Jane",
          "sex" => "female",
          "age" => 35
        }
        hash2 = {
          "age" => 66,
          "country" => "USA",
        }

        p hash1.update(hash2) # {"name"=>"Jane", "sex"=>"female", "age"=>66, "country"=>"USA"}
        p hash1 # {"name"=>"Jane", "sex"=>"female", "age"=>66, "country"=>"USA"}
      `}</Code>

      <Hs>Has key, value</Hs>

      <Code block ruby>{`
        hash = {
          "name" => "Jane",
          "sex" => "female",
          "age" => 35
        }
        p hash.has_key?("name") # true
        p hash.has_value?("Jane") # true
        
      `}</Code>

      <Hs>Has key, value</Hs>

      <Code block ruby>{`
        hash = {}
        p hash.empty? # true
      `}</Code>

      <H>Conditions</H>

      <Hs>if</Hs>

      <Code block ruby>{`
        if 2 > 1
          p "2 is greater than 1"
        end
        # "2 is greater than 1"
      `}</Code>

      <Code block ruby>{`
        p "2 is greater that 1" if 2 > 1 # "2 is greater that 1"
      `}</Code>

      <Hs>if-else</Hs>

      <Code block ruby>{`
        if 1 > 2
          p "1 is greater than 2"
        else
          p "1 is not greater than 2"
        end
        # "1 is not greater than 2"
      `}</Code>

      <Hs>else-if</Hs>

      <Code block ruby>{`
        if 2 > 2
          p "2 is greater than 2"
        elsif 2 == 2
          p "2 is equal 2"
        else 2 < 2
          p "2 is less than 2"
        end
        # "2 is equal 2"
      `}</Code>

      <Hs>unless (negated 'if')</Hs>

      <Code block ruby>{`
        x = 3
        unless x < 5
          p 'x >= 5'
        else
          p 'x < 5'
        end
        # "x < 5"
      `}</Code>

      <Hs>Ternary statement</Hs>

      <Code block ruby>{`
        yesOrNo = 2 > 1 ? 'yes' : 'no'
        p yesOrNo # "yes"
      `}</Code>

      <Hs>Case statement</Hs>

      <Code block ruby>{`
        print "Enter day num: "
        day = gets.chomp.to_i

        case day
        when 1
          p "Mon"
          exit
        when 2
          p "Tue"
          exit
        when 3
          p "Wed"
          exit
        when 4
          p "Thu"
          exit
        when 5
          p "Fri"
          exit
        when 8..Float::INFINITY
          p "not valid"
          exit
        else
          p "weekend"
        end

        # Enter day num: 5
        # "Fri"

        # Enter day num: 7
        # "weekend"

        # Enter day num: 10
        # "not valid"
      `}</Code>

      <H>Loops</H>

      <Hs>For</Hs>

      <Code block ruby>{`
        for i in 1..5
          p i
        end
        # 1 2 3 4 5

        for i in [1, 2, 3, 4, 5]
          p i
        end
        # 1 2 3 4 5

        arr = [1, 2, 3, 4, 5]
        for i in arr
          p i
        end
        # 1 2 3 4 5
      `}</Code>

      <Hs>while</Hs>

      <Code block ruby>{`
        x = 1
        while x < 5 do
          p x
          x += 1
        end
        # 1 2 3 4
      `}</Code>

      <Hs>do</Hs>

      <Code block ruby>{`
        loop do
          p "enter a num > 10"
          num = gets.chomp.to_i
          if num > 10
            p "thank you"
            break
          end
        end
        # "enter a num > 10"
        # 11
        # "thank you"
      `}</Code>

      <Hs>until</Hs>

      <Code block ruby>{`
        i = 1
        until i === 5
          p i
          i += 1
        end
        # 1 2 3 4
      `}</Code>

      <Hs>each</Hs>

      <Code block ruby>{`
        arr = [1, 2, 3, 4, 5]
        arr.each do |num|
          p num
        end
        # 1 2 3 4 5
      `}</Code>

      <Code block ruby>{`
        (1..5).each do |num|
          p num
        end
        # 1 2 3 4 5
      `}</Code>

      <Hs>break</Hs>

      <Code block ruby>{`
        for i in 1..5
          if i === 3 
            break
          end
          p i
        end
        # 1 2
      `}</Code>

      <Hs>next</Hs>

      <Code block ruby>{`
        for i in 1..5
          if i === 3 
            next
          end
          p i
        end
        # 1 2 4 5
      `}</Code>

      <Hs>redo (repeat current iteration)</Hs>

      <Code block ruby>{`
        i = 1
        while i < 5
          p i
          i += 1
          # redo if i === 5 
        end
        # 1 2 3 4

        i = 1
        while i < 5
          p i
          i += 1
          redo if i === 5 
        end
        # 1 2 3 4 5
      `}</Code>

      <Hs>retry</Hs>

      <Code block ruby>{`
        for i in 1..5
          begin
          p i
          raise if i === 5
          rescue
            retry
          end
        end
        # 1 2 3 4 5 5 5 5 5 5 5 5 5...
      `}</Code>

      <H>Function</H>

      <Hs>Function declaration</Hs>

      <Code block ruby>{`
        def hello
          p "hello from method"
        end
        hello # "hello from method"
        
        def hello()
          p "hello from method"
        end
        hello() # "hello from method"

        def hello(name)
          p "hello from #{name}"
        end
        hello('John') # "hello from John"

        def hello(name = "John")
          puts "Hello from #{name}"
        end
        hello # "hello from John"
      `}</Code>

      <Hs>Function expression (lambda)</Hs>

      <Code block ruby>{`
        hello = lambda {p 'hello'}
        hello.call # "hello"
        hello.() # "hello"
        hello.[] # "hello"
        hello.=== # "hello"
      `}</Code>

      <Hs>Arrow function</Hs>

      <Code block ruby>{`
        hello = -> { puts "hello" }
        hello.call # "hello"

        hello = -> (arg) { puts "hello " + arg }
        hello.call("John") # "hello John"
      `}</Code>

      <H>Catch errors (begin-rescue)</H>

      <Code block ruby>{`
        print "Enter a number : "
        first_num = gets.to_i
        
        print "Enter Another : "
        second_num = gets.to_i
        
        begin
          answer = first_num / second_num
        
        rescue # You could use rescue ZeroDivisionError
          puts "You can't divide by zero"
          exit
        end
        
        puts "#{first_num} / #{second_num} = #{answer}"

        # Enter a number : 5
        # Enter Another : 0
        # You can't divide by zero
      `}</Code>

      <H>Symbols</H>

      <ul>
        <li>Symbols are strings that can't be changed</li>
        <li>Use them to speed string comparisons</li>
        <li>Use them if string value won't change & no need to access to string methods</li>
        <li>Many Ruby methods take symbols as arguments</li>
        <li>Symbols are used as keys for hashes</li>
      </ul>

      <Code block ruby>{`
        p :derek # :derek
        p :derek.to_s # "derek"
        p :derek.class # Symbol
        p :derek.object_id # 1101468
      `}</Code>

      <H>Class</H>

      <Hs>Initialize, getter, setter, method, self</Hs>

      <Code block ruby>{`
        class Car
          @brand
          @model
          @topSpeed
        
          def initialize(brand = "some brand", model = "some model", topSpeed = 100)
            @brand = brand
            @model = model
            @topSpeed = topSpeed
            puts "creating Car object"
          end
        
          # setter 1
          def set_brand(new_brand)
            # We can eliminate bad input in our setters
            if new_brand == "Apple"
              puts "Apple is not a car brand"
            else
              @brand = new_brand
            end
          end 
        
          # setter 2
          def model=(new_model)
            @model = new_model
          end 
        
          # getter
          def brand
            @brand 
          end
          def model
            @model 
          end
          def topSpeed
            @topSpeed 
          end
        
          # method
          def tellAboutCar()
            p "your car is #{self.brand} #{self.model} with top speed #{self.topSpeed}" 
          end
        
        end
        
        someCar = Car.new
        p someCar.brand # "some brand"
        someCar.set_brand("Toyota")
        p someCar.brand # "Toyota"
        someCar.set_brand("Apple") # Apple is not a car brand
        p someCar.brand # "Toyota"
        tesla = Car.new("Tesla", "Model 3", "220")
        p tesla.brand # "Tesla"
        tesla.model = "Modle Y"
        tesla.tellAboutCar() # "your car is Tesla Modle Y with top speed 220"
      `}</Code>

      <Hs>Accessors (shortcut for getters & setters)</Hs>

      <Code block ruby>{`
        class Dog
          attr_reader :name, :height, :weight
          attr_writer :name, :height, :weight
          
          # or just
          # attr_accessor :name, :height, :weight
          
          def bark
            return "Generic Bark"
          end
        end
          
        rover = Dog.new
        rover.name = "Rover"
        p rover.name # "Rover"
        p rover.bark # "Generic Bark"
      `}</Code>

      <Hs>Inherit</Hs>

      <Code block ruby>{`
        class Dog
          attr_accessor :name, :height, :weight
          
          def bark
            return "Generic Bark"
          end
        end
        
        class GermanShepard < Dog
          def bark
            return "Loud bark"
          end
        end
        
        chelsy = GermanShepard.new
        chelsy.name = "Chelsy"
        p chelsy.name, chelsy.bark() # "Chelsy" "Loud bark"
      `}</Code>

      <H>Module</H>

      <p>
        Modules hold methods, but unlike classes, modules can not be instantiated, meaning it is
        not possible to create objects from a module. With modules we can share methods between
        classes.
      </p>

      <Code block ruby>{`
        # animal.rb
        module Animal
          def make_sound
            puts "Grrrrrr"
          end
        end
      `}</Code>

      <Code block ruby>{`
        # file.rb
        load 'animal.rb'

        class Dog
          include Animal
        end

        rover = Dog.new
        rover.make_sound # Grrrrrr
      `}</Code>

      <H>Enumerable</H>

      <>Classes that include the Enumerable module get nice methods.
        To make class enumerable we have to define <code>each</code> function.
      </>

      <Code block ruby>{`
        class Menu
          include Enumerable
        
          # Each provides items one at a time
          def each
            yield "pizza"
            yield "spaghetti"
            yield "salad"
            yield "bread"
            yield "water"
          end
        end
        
        menu_options = Menu.new
        
        # cycle through all items
        menu_options.each do |item|
          puts "Would you like : #{item}" # "pizza" "spaghetti" "salad" "bread" "water" "pizza" 
        end
        
        # check if we have an item
        p menu_options.find { |item| item == "apple"} #nil
        p menu_options.find { |item| item == "pizza"} # pizza
        
        # return items over 5 letters in length
        p menu_options.select { |item| item.size > 5 } # ["spaghetti"]
        
        # reject items that meet the criteria
        p menu_options.reject { |item| item.size > 5 } # ["pizza", "salad", "bread", "water"]
        
        # first item
        p menu_options.first # "pizza"
        
        # first 2 items
        p menu_options.take(2) # ["pizza", "spaghetti"]
        
        # everything except first 2
        p menu_options.drop(2) # ["salad", "bread", "water"]
        
        # min
        p menu_options.min # "bread"
        
        # max
        p menu_options.max # "water"
        
        # sort
        p menu_options.sort # ["bread", "pizza", "salad", "spaghetti", "water"]
        
        # reverse
        menu_options.reverse_each { |item| p item} # "water", "bread", "salad", "spaghetti", "pizza"
      `}</Code>

      <H>File</H>

      <Hs>Create, add, read</Hs>

      <Code block ruby>{`
        # Returns a File object for writing
        myFile = File.new("file.txt", "w")

        # write text in the file
        myFile.puts "1st line"
        myFile.puts "2nd line"
        
        # Closes the file
        myFile.close
        
        # Read data from the defined file
        data_from_file = File.read("file.txt")
        p data_from_file # "1st line\\n2nd line\\n"
    `}</Code>

      <Hs>Append</Hs>

      <Code block ruby>{`
        myFile = File.new("file.txt", "a")
        myFile.puts "3rd line"
        myFile.close
        p File.read("file.txt") # "1st line\n2nd line\n3rd line\n"
    `}</Code>

      <Hs>Process text</Hs>

      <Code block ruby>{`
        File.open("file.txt") do |line|
          line.each do |item|
            p item
          end
        end
        # "1st line\\n"
        # "2nd line\\n"
        # "3rd line\\n"
    `}</Code>

      <><Lnk path="https://overapi.com/ruby">Ruby cheat-sheet</Lnk> on every property and method.</>
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
