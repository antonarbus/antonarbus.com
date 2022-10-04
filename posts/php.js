import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'php',
  date: '2021.12.20',
  tags: ['php', 'basics'],
  imgUrl: 'https://antonarbus.com/imgs/php.png',
  desc: 'PHP basic syntax',
  body: (
    <>
      <p>
        <Lnk path="https://www.php.net/downloads.php">Install PHP</Lnk>.
        In my case I just downloaded <Lnk path="https://windows.php.net/download#php-8.1">window package</Lnk> and
        unzipped it into <code>/C/php/</code> folder. Type <code>/C/php/php.exe -v</code> and get <Code>PHP 8.1.1 (cli)</Code>
      </p>

      <H>Get started</H>

      <p>
        Create <code>file.php</code> inside <code>/C/php/myFolder/</code> with
        following code <Code lang="php">{'<?php echo "hi" ?>'}</Code> and execute the file
        by <code>/C/php/php.exe /C/php/myFolder/file.php</code> and got <Code>hi</Code> in the terminal
      </p>

      <H>Output</H>

      <Code block php>{`
          <?php
            echo "hi\\n"; # hi + new line
            echo 'hi'; # \\n not working in single quotes
            print "hi"; # hi
            var_dump('hi'); # string(2) "hi"
            print_r('hi'); # hi
          ?>
      `}</Code>

      <H>Comment</H>

      <Code block php>{`
          <?php
            # comment

            // comment
            
            /*
              multiline
              comment
            */
          ?>
      `}</Code>

      <H>Variable</H>

      <>Starts with dollar sign <kbd>$</kbd></>

      <Code block php>{`
          <?php
            $num = 5;
            echo $num;
          ?>
      `}</Code>

      <H>Constant</H>

      <Code block php>{`
        <?php
          define('PI', 3.1415926);
          echo PI; # 3.1415926
        ?>
      `}</Code>

      <H>Strings</H>

      <Hs>Concatenation</Hs>

      <Code block php>{`
          <?php
            echo "Hello "."John"."\\n"."I am your robot";
            # Hello John
            # I am your robot
          ?>
      `}</Code>

      <Hs>Interpolation</Hs>

      <Code block php>{`
          <?php
            $str = 'John';
            echo "Hi, $str. How are you?"; # Hi, John. How are you?
            echo "Hi, {$str}. How are you?"; # Hi, John. How are you?
            echo 'Hi, '.$str. '. How are you?'; # Hi, John. How are you?
            echo 'Hi, '.$str. '. How are you?'; # Hi, John. How are you?
          ?>
      `}</Code>

      <Hs>Multiline string</Hs>

      <Code block php>{`
          <?php
            $information = <<<XXX
              line 1
              line 2
            XXX;
            echo $information;

            # line 1
            # line 2
          ?>
      `}</Code>

      <Hs>Length</Hs>

      <Code block php>{`
          <?php
            echo strlen("abcd"); # 4
          ?>
      `}</Code>

      <Hs>Trim</Hs>

      <Code block php>{`
          <?php
            var_dump(ltrim("   abcd   ")); # string(7) "abcd   "
            var_dump(rtrim("   abcd   ")); # string(7) "   abcd"
            var_dump(trim("   abcd   ")); # string(4) "abcd"
          ?>
      `}</Code>

      <Hs>Uppercase, lowercase</Hs>

      <Code block php>{`
          <?php
            echo strtoupper("john"); # JOHN
            echo strtolower("JOHN"); # john
            echo ucfirst("john"); # John
          ?>
      `}</Code>

      <Hs>Split, explode</Hs>

      <Code block php>{`
          <?php
            var_dump(explode('ll', 'hello'));
            /*
              array(2) {
                [0] => string(2) "he"
                [1] => string(1) "o"
              }
            */

            var_dump(str_split('hello'));
            /*
              array(5) {
                [0] => string(1) "h"
                [1] => string(1) "e"
                [2] => string(1) "l"
                [3] => string(1) "l"
                [4] => string(1) "o"
              }
            */
          ?>
      `}</Code>

      <Hs>Substring</Hs>

      <Code block php>{`
          <?php
            echo substr('hello', 0, 3) # hel
          ?>
      `}</Code>

      <Hs>Position</Hs>

      <Code block php>{`
          <?php
            echo strpos('hello', 'e') # 2
          ?>
      `}</Code>

      <Hs>Replace</Hs>

      <Code block php>{`
          <?php
            echo str_replace('e', 'a', 'hello') # hallo
          ?>
      `}</Code>

      <H>Operators</H>

      <Hs>Math</Hs>

      <Code block php>{`
          <?php
            echo (5 + 2); # 7
            echo (5 - 2); # 3
            echo (5 * 2); # 10
            echo (5 / 2); # 2.5
            echo (integer) (5 / 2); # 2
            echo (5 % 2); # 1
          ?>
      `}</Code>

      <Hs>Comparison</Hs>

      <Code block php>{`
          == === != !== < > <= >=
      `}</Code>

      <Hs>Logical</Hs>

      <Code block php>{`
          && || !
      `}</Code>

      <H>Data types</H>

      <Code block php>{`
          <?php
            echo gettype(5); # integer
            echo gettype(5.123); # double
            echo gettype('hi'); # string
            echo gettype(true); # boolean
            echo gettype([1, 2, 3]); # array
            echo gettype(NULL); # NULL

            class Car {
              public $color;
              public $model;
              public function __construct($color, $model) {
                $this->color = $color;
                $this->model = $model;
              }
              public function message() {
                return "My car is a " . $this->color . " " . $this->model . "!";
              }
            }
            
            $myCar = new Car("black", "Volvo");
            echo $myCar -> message();
            echo gettype($myCar); # object
          ?>
      `}</Code>

      <Hs>Type conversion</Hs>

      <Code block php>{`
          <?php
            echo (integer) (5.123); # 5
            echo (integer) ("66 times"); # 66

            $decimalNum = 2.3456;
            printf ("decimal num = %.2f </br>", $decimalNum);
              // Other conversion codes
              // b : integer to binary
              // c : integer to character
              // d : integer to decimal
              // f : double to float
              // o : integer to octal
              // s : string to string
              // x : integer to hexadecimal
          ?>
      `}</Code>

      <H>Reference</H>

      <Code block php>{`
          <?php
            $num = 5;
            $refToNum = &$num;
            $num = 100;
            echo $refToNum; # 100
          ?>
      `}</Code>

      <H>Conditionals</H>

      <Hs>If-elseif-else</Hs>

      <Code block php>{`
          <?php
            if(5 == 10) {
              echo "5 = 10";
            } elseif(((5 > 10) && (10 > 20)) || (!true === true)) {
              echo "(5 > 10) && (10 > 20))";
            } else {
              echo "all above was false";
            }
            # all above was false
          ?>
      `}</Code>

      <Hs>Ternary operator</Hs>

      <Code block php>{`
          <?php
            $num = 15 > 10 ? 'bigger' : 'smaller';
            echo $num; # bigger
          ?>
      `}</Code>

      <Hs>Switch statement</Hs>

      <Code block php>{`
          <?php
            $name = 'John';

            switch($name) {
              case "Derek":
                echo "Hello Derek";
                break;
              case "John":
                echo "Hello John";
                break;
              default:
                echo "Hello unknown customer";
                break;
            }
          ?>
      `}</Code>

      <H>Loops</H>

      <Hs>for</Hs>

      <Code block php>{`
          <?php
            for ($num = 1; $num <= 10; $num++) {
              echo $num.', '; # 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
            }
          ?>
      `}</Code>

      <Hs>break, continue</Hs>

      <Code block php>{`
          <?php
            for ($num = 1; $num <= 10; $num++) {
              if($num === 9) break; # or exit();
              if($num === 5) continue; 
              echo $num.', '; # 1, 2, 3, 4, 6, 7, 8, 
            }
          ?>
      `}</Code>

      <Hs>while</Hs>

      <Code block php>{`
          <?php
            $num = 0;
            while ($num < 5) {
              echo ++$num . ', '; # 1, 2, 3, 4, 5, 
            }
          ?>
      `}</Code>

      <><Lnk path="https://overapi.com/php">PHP cheat-sheet</Lnk> on every property and method.</>

      <H>Arrays</H>

      <Hs>Indexed array</Hs>

      <Code block php>{`
          <?php
            $arr = array(1, 2, 3, 4, 5);
            echo $arr[0]; # 1
          
            $arr = [1, 2, 3, 4, 5];
            echo $arr[0]; # 1
          ?>
      `}</Code>

      <Hs>For each</Hs>

      <Code block php>{`
          <?php
            $arr = [1, 2, 3, 4, 5];
            foreach($arr as $num) {
              echo $num; # 12345
            }
          ?>
      `}</Code>

      <Hs>Associative array (key-value pairs)</Hs>

      <Code block php>{`
          <?php
            $arr = array('name' => 'John', 'sex' => 'male', 'age' => 35);
            foreach($arr as $key => $value) {
              echo $key.' - '.$value."\\n";
            }
            # name - John
            # sex - male
            # age - 35

            echo $arr['name']; # John

            $arr['name'] = 'Jane';
            echo $arr['name']; # Jane
          ?>
      `}</Code>

      <Hs>Add, modify</Hs>

      <Code block php>{`
          <?php
            $arr = [1, 2, 3];
            $arr[2] = 10;
            $arr[3] = 100;

            print_r($arr); # John
            /*
            Array
              (
                [0] => 1
                [1] => 2
                [2] => 10
                [3] => 100
              )
            */
          ?>
      `}</Code>

      <Hs>Combine</Hs>

      <Code block php>{`
          <?php
            $arr1 = array('name' => 'John');
            $arr2 = array('name' => 'Anton', 'sex' => 'male', 'age' => 36, 'isHappy' => "yes");
            $arr3 = $arr1 + $arr2;
            print_r($arr3);
            /*
              Array
              (
                [name] => John
                [sex] => male
                [age] => 36
                [isHappy] => yes
              )
            */
          
          ?>
      `}</Code>

      <Hs>Compare</Hs>

      <>Compares by values, not by reference, like in JS</>

      <Code block php>{`
          <?php
            $arr1 = [1, 2, 3];
            $arr2 = [1, 2, 3];
            var_dump($arr1 === $arr2); # bool(true)
          ?>
      `}</Code>

      <Hs>Sort</Hs>

      <Code block php>{`
          <?php
            // sort strings
            $arr = ['a', 'c', 'e', 'b', 'd'];
            sort($arr, SORT_STRING);
            print_r($arr);
            /*
              Array
              (
                [0] => a
                [1] => b
                [2] => c
                [3] => d
                [4] => e
              )
            */

            // sort numbers
            $arr = [1, 5, 2, 4, 3];
            var_dump(sort($arr, SORT_NUMERIC)); # bool(true)
            print_r($arr);
            /*
              Array
              (
                [0] => 1
                [1] => 2
                [2] => 3
                [3] => 4
                [4] => 5
              )
            */
            
            // reverse
            rsort($arr, SORT_NUMERIC);
            print_r($arr);
            /*
              Array
              (
                [0] => 5
                [1] => 4
                [2] => 3
                [3] => 2
                [4] => 1
              )
            */
            
            // sort with keys
            asort($arr);
            print_r($arr);
            /*
              Array
              (
                [0] => 1
                [2] => 2
                [4] => 3
                [3] => 4
                [1] => 5
              )
            */

            // sort by keys
            ksort($arr);
            print_r($arr);
            /*
              Array
              (
                [0] => 1
                [1] => 5
                [2] => 2
                [3] => 4
                [4] => 3
              )
            */
          ?>
      `}</Code>

      <Hs>Map</Hs>

      <Code block php>{`
        <?php
          $func = function($val) {
            return $val * 2;
          };
          
          $arr = [1, 2, 3];
          print_r(array_map($func, $arr));

          /*
            Array
            (
              [0] => 2
              [1] => 4
              [2] => 6
            )
          */
        ?>
      `}</Code>

      <Hs>Filter</Hs>

      <Code block php>{`
          <?php
            function odd($var) {
              return $var & 1;
            }
          
            $arr1 = ['a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5];
            $arr2 = [6, 7, 8, 9, 10, 11, 12];
          
            print_r(array_filter($arr1, "odd"));
            # Array ( [a] => 1 [c] => 3 [e] => 5 )

            print_r(array_filter($arr2, "odd"));
            # Array ( [1] => 7 [3] => 9 [5] => 11 )
          ?>
      `}</Code>

      <H>Function</H>

      <Hs>Function declaration</Hs>

      <Code block php>{`
          <?php
            function sum($num1, $num2) {
              return $num1 + $num2;
            }
            echo sum(1,2) # 3
          ?>
      `}</Code>

      <Hs>Function expression</Hs>

      <Code block php>{`
          <?php
            $sum = function($num1, $num2) {
              return $num1 + $num2;
            };
            echo $sum(1, 2); # 3
          ?>
      `}</Code>

      <Hs>Arrow function (lambda)</Hs>

      <Code block php>{`
          <?php
            $sum = fn($num1, $num2) => $num1 + $num2;
            echo $sum(1,2) # 3
          ?>
      `}</Code>

      <H>File</H>

      <Hs>Create, write</Hs>

      <Code block php>{`
          <?php
            $currentFolder = __DIR__; # C:\\php\\myFolder
            $myfile = fopen($currentFolder."\\file.txt", "w") or die("Unable to open file!");
            fwrite($myfile, "Line 1\\n");
            fwrite($myfile, "Line 2\\n");
            fclose($myfile);
          ?>
      `}</Code>

      <Hs>Read</Hs>

      <Code block php>{`
          <?php
            $currentFolder = __DIR__; # C:\\php\\myFolder
            $myfile = fopen($currentFolder."\\file.txt", "r") or die("Unable to open file!");
            echo fread($myfile,filesize($currentFolder."\\file.txt"));
            fclose($myfile);
            # Line 1
            # Line 2
          ?>
      `}</Code>

      <p><Lnk path="https://overapi.com/php">PHP cheat-sheet</Lnk> on every property and method.</p>

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
