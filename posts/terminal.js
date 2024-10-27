import { Code, H, Hs, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'terminal',
  date: '2022.04.10',
  tags: ['tool'],
  desc: 'Commands in terminal',
  private: false,
  body: (
    <>
      <H>Display</H>

      <ul>
        <li>
          <Code bash>echo Hello World</Code> print on screen
          <Code bash>echo -n "Hello, World!"</Code> no new line
        </li>
      </ul>

      <H>Files display</H>

      <ul>
        <li>
          <Code bash>ls</Code> show files
        </li>
        <li>
          <Code bash>ls -a</Code> with hidden files
        </li>
        <li>
          <Code bash>ls -l</Code> table view
        </li>
        <li>
          <Code bash>ls -lh</Code> size in human format
        </li>
        <li>
          <Code bash>ls | wc -l</Code> number of files in dir
        </li>
      </ul>

      <H>Show path</H>

      <ul>
        <li>
          <Code bash>pwd</Code> shows where you are
        </li>
      </ul>

      <H>Go to</H>

      <ul>
        <li>
          <Code bash>cd /</Code> root directory
        </li>
        <li>
          <Code bash>cd</Code> home directory
        </li>
        <li>
          <Code bash>cd ~</Code> same
        </li>
        <li>
          <Code bash>cd ..</Code> 1 level up
        </li>
        <li>
          <Code bash>..</Code> same (on mac)
        </li>
        <li>
          <Code bash>cd ../..</Code> 2 levels up
        </li>
        <li>
          <Code bash>cd -</Code> back
        </li>
        <li>
          <Code>
            {' '}
            cd <i>path</i>{' '}
          </Code>{' '}
          go to path
        </li>
        <li>
          <Code bash>cd /var/www/html/</Code> go to on unix
        </li>
        <li>
          <Code bash>cd c:/Users/sherb/Git/</Code> go to on win
        </li>
        <li>
          <Code bash>cd /C/</Code> go to C drive on win
        </li>
      </ul>

      <H>Read</H>

      <ul>
        <li>
          <Code>
            cat <i>file_path</i>
          </Code>{' '}
          show file content in terminal
        </li>
        <li>
          <Code>
            nano <i>file_name.txt</i>
          </Code>{' '}
          read file in nano editor
        </li>
        <li>
          <Code>
            vi <i>file_name.txt</i>
          </Code>{' '}
          read file in vi editor
        </li>
      </ul>

      <H>Move content</H>

      <ul>
        <li>
          <Code>
            cat <i>file_path_1</i> {'>'} <i>file_path_2</i>
          </Code>{' '}
          put file_1 content into file_2
        </li>
        <li>
          <Code>
            ls <i>file_path_1</i> {'>'} <i>file_path_2</i>
          </Code>{' '}
          put file names at path_1 to the file at path_2
        </li>
        <li>
          <Code>
            echo <i>string</i> {'>>'} <i>file_path</i>
          </Code>{' '}
          add "string" to the end of the file
        </li>
      </ul>

      <H>Create folder</H>

      <ul>
        <li>
          <Code>
            mkdir <i>folder_name</i>
          </Code>{' '}
          create folder
        </li>
      </ul>

      <H>Create file</H>

      <ul>
        <li>
          <Code>
            touch <i>file_name.txt</i>
          </Code>{' '}
          create file
        </li>
        <li>
          <Code>
            {'>'} <i>file_name.txt</i>
          </Code>{' '}
          same
        </li>
        <li>
          <Code>
            nano <i>file_name.txt</i>
          </Code>{' '}
          create and open file in nano editor
        </li>
        <li>
          <Code>
            vi <i>file_name.txt</i>
          </Code>{' '}
          create and open file in vi editor
        </li>
      </ul>

      <H>Copy</H>

      <ul>
        <li>
          <Code>
            cp <i>/path_from</i> <i>/path_to</i>
          </Code>{' '}
          copy a file
        </li>
        <li>
          <Code>
            cp -a <i>/path_from/</i>. <i>/path_to/</i>
          </Code>{' '}
          copy all from folder to another folder
        </li>
        <li>
          <Code>
            scp -r <i>/path_from/</i> <i>sherb@35.209.92.93:/var/www/html/folder_name</i>
          </Code>{' '}
          copy folder to server via ssh
        </li>
        <li>
          <Code>
            scp -r <i>sherb@35.209.92.93:/var/www/html/folder_name</i> <i>~/Temp</i>
          </Code>{' '}
          copy folder from server via ssh
        </li>
      </ul>

      <H>Move</H>

      <ul>
        <li>
          <Code>
            mv <i>/file_path_from</i> <i>/file_path_to</i>{' '}
          </Code>{' '}
          move a file
        </li>
      </ul>

      <H>Rename</H>

      <ul>
        <li>
          <Code>
            mv <i>/file_or_folder_path_from</i> <i>/file_or_folder_path_to</i>
          </Code>{' '}
          move & rename
        </li>
        <li>
          <Code>
            mv <i>./file_or_folder_path_from</i> <i>./file_or_folder_path_to</i>
          </Code>{' '}
          rename in the same folder
        </li>
      </ul>

      <H>Remove</H>

      <ul>
        <li>
          <Code>
            rm -r <i>folder_path</i>
          </Code>{' '}
          remove folder with warnings
        </li>
        <li>
          <Code>
            rm -rf <i>folder_path</i>
          </Code>{' '}
          remove folder without warnings
        </li>
        <li>
          <Code>
            rm -rf <i>*.zip</i>
          </Code>{' '}
          remove files with .zip ext
        </li>
        <li>
          <Code bash>rm *</Code> remove all files in folder with warnings
        </li>
        <li>
          <Code bash>rm -f *</Code> remove all files in folder without warnings
        </li>
      </ul>

      <H>Tar</H>

      <ul>
        <li>
          <Code bash>tar czvf ~/Temp/archive.tar.gz -C ~/Temp/ xxx yyy hi.txt</Code> archive listed
          folders and files from <code>~/Temp/</code> and put into{' '}
          <code>~/Temp/archive.tar.gz</code>
        </li>
        <li>
          <Code bash>tar -xf ~/Temp/archive.tar.gz -C ~/Temp/extracted</Code> extract the archive{' '}
          <code>archive.tar.gz</code> from folder <code>~/Temp/</code> into folder{' '}
          <code>~/Temp/extracted</code>
        </li>
      </ul>

      <H>Zip</H>

      <ul>
        <li>
          <Code>
            tar -xvf <i>file_name.tar</i>
          </Code>{' '}
          untar archive file
        </li>
        <li>
          <Code bash>sudo apt install zip unzip</Code> install zip
        </li>
        <li>
          <Code>
            zip -r <i>file_name.zip</i> <i>path</i>
          </Code>{' '}
          zip folder with full path
        </li>
        <li>
          <Code>
            zip -r <i>path/file_name.zip</i> <i>./*</i>
          </Code>{' '}
          zip folder without full path
        </li>
      </ul>

      <H>Documentation</H>

      <ul>
        <li>
          <Code>
            man <i>command_name</i>
          </Code>{' '}
          documentation for a command
        </li>
      </ul>

      <H>Sudo</H>

      <ul>
        <li>
          <Code bash>sudo -s</Code> stay sudo permanently (Super User DO)
        </li>
        <li>
          <Code bash>sudo !!</Code> Run the previous command with sudo
        </li>
      </ul>

      <H>Size</H>

      <ul>
        <li>
          <Code bash>df -h</Code> size of disk
        </li>
        <li>
          <Code>
            du -h <i>path</i>
          </Code>{' '}
          size of folder
        </li>
      </ul>

      <H>Open with</H>

      <ul>
        <li>
          <Code bash>open .</Code> open with finder (mac)
        </li>
        <li>
          <Code bash>start .</Code> open with explorer (win)
        </li>
        <li>
          <Code bash>code .</Code> open with VSCode new instance
        </li>
        <li>
          <Code bash>code -a .</Code> open with VSCode same instance
        </li>
      </ul>

      <H>User</H>

      <ul>
        <li>
          <Code bash>whoami</Code> user name
        </li>
        <li>
          <Code bash>cat /etc/passwd</Code> list of users
        </li>
        <li>
          <Code>
            su <i>user_name</i>
          </Code>{' '}
          change user
        </li>
      </ul>

      <H>Permission</H>

      <ul>
        <li>
          <Code>
            sudo chmod -R <i>777</i> <i>/path/.</i>
          </Code>{' '}
          set the permissions recursively
        </li>
        <li>
          <Code bash>sudo chmod -R 777 /var/www/myVocabGitRemoteRepo/.</Code> example
        </li>
        <li>
          <Code>
            sudo chmod +x <i>./file_path</i>
          </Code>{' '}
          make file executable
        </li>
      </ul>

      <H>Apps</H>

      <ul>
        <li>
          <Code>
            sudo apt install <i>app_name_1</i> <i>app_name_2</i>
          </Code>{' '}
          install app on linux
        </li>
        <li>
          <Code bash>sudo apt update</Code> latest info about the apps
        </li>
        <li>
          <Code bash>apt list --upgradable</Code> list of upgradable apps
        </li>
        <li>
          <Code bash>sudo apt upgrade</Code> upgrade all apps that have a newer version
        </li>
        <li>
          <Code>
            sudo apt-get --only-upgrade install <i>app_name</i>
          </Code>{' '}
          install upgrade for the app
        </li>
      </ul>

      <H>Reboot</H>

      <ul>
        <li>
          <Code bash>sudo reboot</Code> reboot
        </li>
      </ul>

      <H>Git</H>

      <ul>
        <li>
          <Code bash>git add . && git commit -m 'message' && git push</Code> git add, commit & push
        </li>
      </ul>

      <H>Alias</H>

      <Hs>For Bash</Hs>

      <ul>
        <li>
          <Code bash>nano ~/.bashrc</Code>
        </li>
        <li>
          <Code bash>code ~/.zshrc</Code>
        </li>
        <li>Add some shortcuts</li>

        <Code block bash>{`
        # Aliases
        # alias alias_name="command_to_run"

        # Long format list
        alias ll="ls -la"
        alias cl="clear && printf '\\e[3J'" # clear with history
        alias start="npm run start"
        alias test="npm run test"
        alias lint="npm run lint"
        alias tsc="npx tsc"
        alias vpnoff="launchctl unload /Library/LaunchAgents/com.paloaltonetworks.gp.pangp*"
        alias vpnon="launchctl load /Library/LaunchAgents/com.paloaltonetworks.gp.pangp*"


        # Print my public IP
        alias myip='curl ipinfo.io/ip'

        # Function to create a folder and navigate into it
        function mkcd () {
          mkdir -p -- "$1" && cd -P -- "$1"
        }
        `}</Code>

        <li>
          Add aliases to your current session <Code bash>source ~/.zshrc</Code>
        </li>
      </ul>

      <H>Execute</H>

      <ul>
        <li>
          <Code>
            source <i>filename</i>
          </Code>{' '}
          executes the content of the file in the current shell
        </li>
        <li>
          <Code>. /opt/nvm/nvm.sh</Code> dot is the alias for the <Code>source</Code> command
        </li>
        <li>
          <Code>/opt/nvm/nvm.sh</Code> also executes if file is executable which can be done by{' '}
          <Code>
            sudo chmod +x <i>./file_path</i>
          </Code>
        </li>
      </ul>

      <H>SSH</H>

      <ul>
        <li>
          <Code bash>ssh sherb@35.217.12.143</Code> connect
        </li>
        <li>
          <Code bash>cd /var/www/html/antonarbus.com</Code> go to web page folder
        </li>
      </ul>

      <H>Keyboard</H>

      <ul>
        <li>
          <kbd>Ctrl</kbd> + <kbd>L</kbd> clean terminal, same as <Code bash>clear</Code>
        </li>
        <li>
          <kbd>Alt</kbd> + <kbd>click</kbd> put cursor close to the click
        </li>
        <li>
          <kbd>Arrow_Up</kbd> previous command
        </li>
        <li>
          <kbd>Ctrl</kbd> + <kbd>C</kbd> exit
        </li>
        <li>
          <kbd>Ctrl</kbd> + <kbd>D</kbd> log out
        </li>
        <li>
          <kbd>Ctrl</kbd> + <kbd>U</kbd> delete line
        </li>
        <li>
          <kbd>Ctrl</kbd> + <kbd>A</kbd> move cursor to the beginning
        </li>
        <li>
          <kbd>Ctrl</kbd> + <kbd>E</kbd> move cursor to the end
        </li>
        <li>
          <kbd>Ctrl</kbd> + <kbd>Left</kbd> / <kbd>Right</kbd>move cursor one word
        </li>
      </ul>

      <Hs>Search</Hs>

      <ul>
        <li>
          <kbd>Ctrl</kbd> + <kbd>R</kbd> search command in terminal history
        </li>
        <li>
          <kbd>Ctrl</kbd> + <kbd>R</kbd> (again) previous found command
        </li>
        <li>
          <kbd>Ctrl</kbd> + <kbd>O</kbd> or <kbd>Enter</kbd> paste found command & execute
        </li>
        <li>
          <kbd>Ctrl</kbd> + <kbd>G</kbd> exit & remove found command
        </li>
        <li>
          <kbd>Arrow Left</kbd> exit & leave found command
        </li>
        <li>
          <kbd>Ctrl</kbd> + <kbd>G</kbd> exit search mode
        </li>
        <li>
          <Code bash>history</Code> show history commands
        </li>
      </ul>

      <H>Process on port</H>

      <ul>
        <li>
          <Code>sudo lsof -i :3000</Code> check PID of process on port 3000
        </li>
      </ul>

      <H>Kill the process</H>

      <ul>
        <li>
          <Code>
            kill -9 <i>PID</i>
          </Code>{' '}
          kill the process
        </li>
      </ul>

      <H>End of option arguments</H>

      <ul>
        <li>
          <Code bash>{'rm -f -- "file.txt"'}</Code> signify the end of the options with two hyphens
        </li>
      </ul>

      <H>Time & date</H>

      <ul>
        <li>
          <Code bash>date</Code> show date
        </li>
        <li>
          <Code bash>date +"%Y-%m-%d %H:%M:%S"</Code> time in YYYY-MM-DD HH:MM:SS format
        </li>
      </ul>

      <H>Prompt</H>

      <Hs>
        Native <code>stdin</code> way
      </Hs>

      <Code block jsx>{`
        const readline = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        readline.question(\`What's your name?\`, name => {
          console.log(\`Hi \${name}!\`);
          readline.close();
        });
      `}</Code>

      <Hs>
        With <code>inquirer</code> package
      </Hs>

      <ul>
        <li>
          A more complete and abstract solution is provided by the{' '}
          <Lnk path="https://www.npmjs.com/package/inquirer">Inquirer.js</Lnk> package.
        </li>
        <li>
          It is even mentioned on the{' '}
          <Lnk path="https://nodejs.dev/en/learn/accept-input-from-the-command-line-in-nodejs/">
            Node.js website
          </Lnk>
        </li>
      </ul>

      <Code block jsx>{`
        const inquirer = require('inquirer');

        const questions = [
          {
            type: 'input',
            name: 'name',
            message: "What's your name?",
          },
        ];

        inquirer.prompt(questions).then(answers => {
          console.log(\`Hi \${answers.name}!\`);
        });
      `}</Code>

      <ul>
        <li>Used it ones to create a selection list</li>
      </ul>

      <Code block jsx>{`
        const inquirer = require('inquirer')

        const devDeploy = async () => {
          const lambdaDirs = await getLambdaDirs()

          const { dirs } = await inquirer.prompt([{
            type: 'checkbox',
            message: 'Lambdas',
            name: 'dirs',
            prefix: '\n',
            pageSize: 30,
            loop: false,
            choices: lambdaDirs.map(lambdaDir => ({ name: lambdaDir, checked: true }))
          }])

          const { actions } = await inquirer.prompt([{
            type: 'checkbox',
            message: 'Actions',
            name: 'actions',
            prefix: '\n',
            choices: [
              { name: 'lint', checked: true },
              { name: 'npm ci', checked: true },
              { name: 'test', checked: true },
              { name: 'zip', checked: true },
              { name: 'zip to desktop', checked: false },
              { name: 're-deploy template', checked: true }
            ]
          }])

          if (actions.includes('lint')) {
            await lint()
          }

          if (actions.includes('npm ci')) {
            await npmCi({ dirs })
          }

          if (actions.includes('test')) {
            await test({ dirs })
          }

          if (actions.includes('zip')) {
            await zip({ dirs })
          }

          if (actions.includes('zip to desktop')) {
            await zipToDesktop({ dirs })
          }

          if (actions.includes('re-deploy template')) {
            await builtTemplateYaml()
            const packageName = await getPackageName()
            await packagedTemplateYaml({ packageName })
            deploy({ packageName })
          }
        }
      `}</Code>

      <H>Executable location</H>

      <ul>
        <li>
          <Code>which bash</Code> path of bash app executable on the system <code>/bin/bash</code>
        </li>
      </ul>

      <H>Variables</H>

      <ul>
        <li>Uppercase by convention</li>
        <li>Persisted in terminal session</li>
        <li>Use money sign to reference a variable</li>
      </ul>

      <Code block bash>{`
        NAME="John"

        echo $NAME      # John
        echo "$NAME"    # John 
        echo \${NAME}    # John 
        echo "\${NAME}!" # John! 

        echo '$NAME'    # $NAME (Exact string)

        NAME = "John"   # Error (about space)
      `}</Code>

      <H>Script file</H>

      <ul>
        <li>
          <Code>touch ./script.sh</Code> create script file
        </li>

        <Code block bash>{`
          # path to bash executable, can be checked with 'which bash'
          #! /bin/bash

          # print
          echo Hello world!
        `}</Code>

        <li>
          <Code bash>bash ./script.sh</Code> execute the script
        </li>
      </ul>

      <Hs>Executable script</Hs>

      <ul>
        <li>
          <Code>chmod +x ./script.sh</Code> make script executable
        </li>
        <li>
          <Code>./myscript.sh</Code> run the script without <code>bash</code> command
        </li>
      </ul>

      <Hs>Comments</Hs>

      <ul>
        <li>Line comment starts with hash sign</li>
        <li>Multi-line comments use :' to open and ' to close</li>
      </ul>

      <Code block bash>{`
        # This is an inline Bash comment

        : '
        This is a
        very neat comment
        in bash
        '
      `}</Code>

      <Hs>Shell execution</Hs>

      <Code block jsx>{`
        echo "I'm in $(PWD)"
        echo "I'm in \`pwd\`" # Same as:
      `}</Code>

      <Hs>Brace expansion</Hs>

      <Code block jsx>{`
        echo {A,B} # A B
        echo {A,B}.js # A.js B.js
        echo {1..5} # 1 2 3 4 5
      `}</Code>

      <Hs>String replacement</Hs>

      <Code block jsx>{`
        # Remove Suffix
        TEXT="example.txt"
        echo \${TEXT%.txt}     # Output: example (removes the last suffix .txt)

        # Remove Prefix
        TEXT="prefix_example"
        echo \${TEXT#prefix}    # Output: _example (removes the 'prefix')

        # Remove Long Suffix
        TEXT="example.txt.bak"
        echo \${TEXT%%.*}       # Output: example (removes everything from the first dot to the end)

        # Remove Long Prefix
        TEXT="prefix_example_text"
        echo \${TEXT##prefix_}  # Output: example_text (removes everything up to the last 'prefix_')

        # Replace First Match
        TEXT="hello world"
        echo \${TEXT / h / H}  # Output: Hello world
      
        # Replace All
        TEXT="hello world world"
        echo \${TEXT//world/universe}  # Output: hello universe universe (replaces all 'world' with 'universe')
          
        # Replace Suffix
        TEXT="file.txt"
        echo \${TEXT/%txt/doc}  # Output: file.doc (replaces 'txt' suffix with 'doc')

        # Replace Prefix
        TEXT="hello_world"
        echo \${TEXT/#hello/hi}  # Output: hi_world (replaces 'hello' prefix with 'hi')
      `}</Code>

      <Hs>Slicing</Hs>

      <Code block jsx>{`
       name="John"

        echo \${name}           # => John
        echo \${name:0:2}       # => Jo
        echo \${name::2}        # => Jo
        echo \${name::-1}       # => Joh
        echo \${name:(-1)}      # => n
        echo \${name:(-2)}      # => hn
        echo \${name:(-2):2}    # => hn
      `}</Code>

      <Hs>Length</Hs>

      <Code block jsx>{`
        # Length of TEXT
        TEXT="example"
        echo \${#TEXT}  # Output: 7 (length of the string)
      `}</Code>

      <Hs>Text transform</Hs>

      <Code block jsx>{`
        STR="HELLO WORLD!"
        echo \${STR,}   # => hELLO WORLD!
        echo \${STR,,}  # => hello world!

        STR="hello world!"
        echo \${STR^}   # => Hello world!
        echo \${STR^^}  # => HELLO WORLD!

        ARR=(hello World)
        echo "\${ARR[@],}" # => hello world
        echo "\${ARR[@]^}" # => Hello World
      `}</Code>

      <Hs>BASE_PATH</Hs>

      <Code block jsx>{`
        SRC="/path/to/foo.cpp"

        BASE_PATH=\${SRC##*/}   
        echo $BASE_PATH  # => "foo.cpp"
      `}</Code>

      <Hs>DIR_PATH</Hs>

      <Code block jsx>{`
        SRC="/path/to/foo.cpp"

        DIR_PATH=\${SRC%$BASEPATH}
        echo $DIR_PATH  # => "/path/to/"
      `}</Code>

      <Hs>THIS_DIR</Hs>

      <Code block jsx>{`
        THIS_DIR="\${0%/*}"
      `}</Code>

      <Hs>Relative path</Hs>

      <Code block jsx>{`
        THIS_DIR="\${0%/*}"
        echo "\${THIS_DIR}/../share/foo.sh"
      `}</Code>

      <Hs>Define array</Hs>

      <Code block jsx>{`
        Fruits=('Apple' 'Banana' 'Orange')

        Fruits[0]="Apple"
        Fruits[1]="Banana"
        Fruits[2]="Orange"

        ARRAY1=(foo{1..2}) # => foo1 foo2
        ARRAY2=({A..D})    # => A B C D

        # Merge => foo1 foo2 A B C D
        ARRAY3=(\${ARRAY1[@]} \${ARRAY2[@]})
      `}</Code>

      <Hs>Index array</Hs>

      <Code block jsx>{`
        Fruits=('Apple' 'Banana' 'Orange')

        \${Fruits[0]}       First element --> Apple
        \${Fruits[*]}       All elements --> Apple Banana Orange
        \${Fruits[@]}       All elements --> Apple Banana Orange
        \${#Fruits[@]}      Number of all --> 3
        \${#Fruits}         Length of 1st --> 5
        \${#Fruits[2]}      Length of 2nd --> 6
        \${Fruits[@]:1:2}   Range --> Banana Orange
        \${!Fruits[@]}      Keys of all --> 0 1 2
      `}</Code>

      <Hs>Iteration over array</Hs>

      <Code block jsx>{`
        Fruits=('Apple' 'Banana' 'Orange')

        for e in "\${Fruits[@]}"; do
          echo $e 
        done

        # Apple 
        # Banana
        # Orange

        # With index
        for i in "\${!Fruits[@]}"; do
          printf "%s\t%s\n" "$i" "\${Fruits[$i]}"
        done

        # 0  Apple
        # 1  Banana
        # 2  Orange
        
      `}</Code>

      <Hs>Array operations</Hs>

      <Code block jsx>{`
        Fruits=("\${Fruits[@]}" "Watermelon")      # Push
        Fruits+=('Watermelon')                     # Also Push
        Fruits=( \${Fruits[@]/Ap*/} )              # Remove by regex match
        unset Fruits[2]                            # Remove one item
        Fruits=("\${Fruits[@]}")                   # Duplicate
        Fruits=("\${Fruits[@]}" "\${Veggies[@]}")  # Concatenate
      `}</Code>

      <Hs>Dictionary</Hs>

      <Code block jsx>{`
        # works from version 4 (check with bash --version)

        # declare
        declare -A sounds

        sounds[dog]="bark"
        sounds[cow]="moo"
        sounds[bird]="tweet"
        sounds[wolf]="howl"

        # access
        echo \${sounds[dog]} # Dog's sound
        echo \${sounds[@]}   # All values
        echo \${!sounds[@]}  # All keys
        echo \${#sounds[@]}  # Number of elements
        unset sounds[dog]   # Delete dog

        # iterate
        for val in "\${sounds[@]}"; do
          echo $val
        done

        for key in "\${!sounds[@]}"; do
          echo $key
        done
      `}</Code>

      <Hs>User input</Hs>

      <Code block bash>{`
        read -p "Enter your age: " AGE
        echo "you are $AGE years old"
      `}</Code>

      <Hs>If statement</Hs>

      <Code block bash>{`
        #! /bin/bash

        NAME="Anton"

        # if statement
        if [ "$NAME" == "Anton" ]
        then
          echo "Your name is Anton"
        fi

        NAME="John"

        # if-else statement
        if [ "$NAME" == "Anton" ]
        then
          echo "Your name is Anton"
        else 
          echo "Your name is not Anton"
        fi

        NAME="Jack"

        # else-if statement
        if [ "$NAME" == "Anton" ]
        then
          echo "Your name is Anton"
        elif [ "$NAME" == "Jack" ]
        then
          echo "Your name is Jack"
        else 
          echo "Your name is not Anton or Jack"
        fi
      `}</Code>

      <Hs>Case statement</Hs>

      <Code block bash>{`
        # example 1

        echo "Enter a number between 1 and 3:"
        read NUMBER

        case $NUMBER in
          1)
            echo "You chose 1!"
            ;;
          2)
            echo "You chose 2!"
            ;;
          3)
            echo "You chose 3!"
            ;;
          *)
            echo "Invalid choice, please enter a number between 1 and 3."
            ;;
        esac

        # example 2

        read -p "Are you 21 or over? Y/N " ANSWER

        case "$ANSWER" in
          [yY] | [yY][eE][sS])
            echo "You can have a beer :)"
            ;;
          [nN] | [nN][00])
            echo "Sorry, no drinking"
            ;;
          *)
            echo "Please enter y/yes or n/no"
            ;;
        esac
      `}</Code>

      <Hs>Conditions</Hs>

      <Code block jsx>{`
        [[ X && Y ]]   # And
        [[ X -a Y ]]   # And
        [[ X || Y ]]   # Or
        [[ X -o Y ]]   # Or
        [[ ! EXPR ]]   # Not

        # example

        if [[ X && Y ]]; then
          ...
        fi

        if [ "$1" = 'y' -a $2 -gt 0 ]; then
          echo "yes"
        fi

        if [ "$1" = 'n' -o $2 -lt 0 ]; then
          echo "no"
        fi
      `}</Code>

      <Hs>Comparison</Hs>

      <Code block bash>{`
        # NUMERICAL comparison

        [[ NUM -eq NUM ]]   # Equal
        [[ NUM == NUM ]]    # Equal

        [[ NUM -ne NUM ]]   # Not equal

        [[ NUM -lt NUM ]]   # Less than
        (( NUM < NUM ))     # Less than

        [[ NUM -le NUM ]]   # Less than or equal
        (( NUM <= NUM ))    # Less than or equal
        
        [[ NUM -gt NUM ]]   # Greater than
        (( NUM > NUM ))     # Greater than
        
        [[ NUM -ge NUM ]]   # Greater than or equal
        (( NUM >= NUM ))    # Greater than or equal

        # example

        NUM1=3
        NUM2=5

        if [[ "$NUM1" -gt "$NUM2" ]]
        then
          echo "$NUM1 is greater than $NUM2"
        else
          echo "$NUM1 is less than $NUM2"
        fi
      `}</Code>

      <Hs>String comparison</Hs>

      <Code block jsx>{`
        # STRING comparison

        [[ STR == STR ]]    # Equal
        [[ STR = STR ]]     # Equal (Same above)
        [[ STR < STR ]]     # Less than (ASCII)
        [[ STR > STR ]]     # Greater than (ASCII)
        [[ STR != STR ]]    # Not Equal
        [[ STR =~ STR ]]    # Regexp
        [[ -z STR ]]        # Empty string
        [[ -n STR ]]        # Not empty string

        # example

        if [[ "$A" == "$B" ]]; then
          ...
        fi

        if [[ '1. abc' =~ ([a-z]+) ]]; then
          echo \${BASH_REMATCH[1]}
        fi

        if (( $a < $b )); then
          echo "$a is smaller than $b"
        fi
      `}</Code>

      <Hs>Files conditions</Hs>

      <Code block bash>{`
        # FILE CONDITIONS
        
        [[ -e FILE ]]     # Checks if the file exists. 
        [[ -d FILE ]]     # Checks if FILE is a directory. 
        [[ -f FILE ]]     # Checks if FILE is a regular file. Returns true if FILE exists and is a file, not a directory or symlink.
        [[ -h FILE ]]     # Checks if FILE is a symbolic link (symlink). 
        [[ -s FILE ]]     # Checks if FILE has non-zero size. Returns true if FILE exists and has a size greater than 0 bytes.
        [[ -r FILE ]]     # Checks if FILE is readable. 
        [[ -w FILE ]]     # Checks if FILE is writable. 
        [[ -x FILE ]]     # Checks if FILE is executable. 
        [[ f1 -nt f2 ]]   # Checks if f1 is newer than f2. 
        [[ f1 -ot f2 ]]   # Checks if f1 is older than f2. 
        [[ f1 -ef f2 ]]   # Checks if f1 and f2 are the same file. 
        
        # example

        touch ./test.txt
        FILE="./test.txt"

        if [[ -f $FILE ]]
        then
          echo "$FILE is a file"
        else
          echo "$FILE is NOT a file"
        fi

        if [[ -e "file.txt" ]]; then
            echo "file exists"
        fi
      `}</Code>

      <Hs>FOR loop</Hs>

      <Code block bash>{`
        # FOR LOOP
        NAMES="Brad Kevin Alice Mark"

        for NAME in $NAMES
          do
            echo "Hello $NAME"
        done

        # FOR LOOP to rename files
        touch 1.txt 2.txt 3.txt

        FILES=$(ls *.txt)
        NEW="new"

        for FILE in $FILES
          do
            echo "Renaming $FILE to new-$FILE"
            mV $FILE $NEW-$FILE
        done

        # C-like for loop

        for ((i = 0 ; i < 100 ; i++)); do
          echo $i
        done

        # Continue
        for number in $(seq 1 3); do
          if [[ $number == 2 ]]; then
            continue;
          fi
          echo "$number"
        done

        # Break
        for number in $(seq 1 3); do
          if [[ $number == 2 ]]; then
              # Skip entire rest of loop.
              break;
          fi
          # This will only print 1
          echo "$number"
        done
      `}</Code>

      <Hs>Ranges</Hs>

      <Code block jsx>{`
        for i in {1..5}; do
          echo "Welcome $i"
        done
      `}</Code>

      <Hs>WHILE loop</Hs>

      <Code block bash>{`
        # WHILE LOOP
        COUNT=1

        while [[ $COUNT -le 5 ]]
        do
          echo "Count is: $COUNT"
          ((COUNT++))  # Increment the count variable
        done
      `}</Code>

      <Hs>Until</Hs>

      <Code block jsx>{`
        count=0
        until [ $count -gt 10 ]; do
          echo "$count"
          ((count++))
        done
      `}</Code>

      <Hs>Forever</Hs>

      <Code block jsx>{`
        while true; do
            # here is some code.
        done

        # shorthand
        while :; do
            # here is some code.
        done
      `}</Code>

      <Hs>Reading lines</Hs>

      <Code block jsx>{`
        cat file.txt | while read line; do
          echo $line
        done
      `}</Code>

      <Hs>Function</Hs>

      <Code block bash>{`
        # function without params
        function sayHello() {
          echo "Hello World"
        }

        sayHello
        echo "This is my $(sayHello) function"

        # function with params
        function greet() {
          echo "Hello $1, I am $2"
        }

        greet "Brad" "36"

        # same
        function greet() {
          local NAME=$1
          local AGE=$2
          echo "Hello $NAME, I am $AGE"
        }

        greet "Brad" "36"

      `}</Code>

      <Hs>Return value</Hs>

      <Code block jsx>{`
        myfunc() {
            local myresult='some value'
            echo $myresult
        }

        result="$(myfunc)"

        echo $result
      `}</Code>

      <Hs>Raise error</Hs>

      <Code block jsx>{`
        myfunc() {
          return 1
        }

        if myfunc; then
            echo "success"
        else
            echo "failure"
        fi
      `}</Code>

      <Hs>Arguments</Hs>

      <Code block text>{`
        $1 … $9     # Parameter 1 ... 9
        $0          # Filename of the script
        $1          # First argument
        \${10}      # Positional parameter 10
        $#          # Number of arguments
        $$          # Process id (PID) of the shell
        $!          # PID of last background task
        $?          # Exit status of last task
        $*          # All arguments
        $@          # All arguments, starting from first
        $-          # Current options
        $_          # Last argument of the previous command
      `}</Code>

      <Code block jsx>{`
        function greet() {
        echo $0 # ./script.sh (name of the script)
        echo $1 # Brad (parameter 1)
        echo Hello $1, I am $2 # Hello Brad, I am 36
        echo \${1} # Brad (positional parameter 1)
        echo $* # Brad 36 (all arguments)
        echo $@ # Brad 36 (all arguments starting from first)
        echo $9 # ""
        echo $# # 2 (number of arguments)
        echo $$ # 98438 (process id of the shell)
        echo $- # hB (current options)
        echo $_ # hB (last argument of the previous command)
      }

      greet "Brad" "36"
      `}</Code>

      <Hs>CREATE FOLDER AND WRITE TO A FILE</Hs>

      <Code block bash>{`
        # CREATE FOLDER AND WRITE TO A FILE
        mkdir hello
        touch "hello/world. txt"
        echo "Hello World" >> "hello/world.txt"
        echo "Created hello/world.txt"
      `}</Code>

      <Hs>Numeric calculations</Hs>

      <Code block jsx>{`
        a=1
        echo $((a + 200))
      `}</Code>

      <Hs>Randomize</Hs>

      <Code block jsx>{`
        echo $(($RANDOM%200))  # Random number 0..199
      `}</Code>

      <Hs>Subshell</Hs>

      <ul>
        <li>Use round braces to run a command in separate shell</li>
      </ul>

      <Code block jsx>{`
        (cd ..; echo $PWD) # /Users/sherb/Git
        echo $PWD # /Users/sherb/Git/antonarbus.com
      `}</Code>

      <Hs>Redirection</Hs>

      <Code block jsx>{`
        python hello.py > output.txt   # stdout to (file)
        python hello.py >> output.txt  # stdout to (file), append
        python hello.py 2> error.log   # stderr to (file)
        python hello.py 2>&1           # stderr to stdout

        python hello.py > /dev/null    # stdout to (null)
        python hello.py 2> /dev/null   # stderr to (null)
        python hello.py &> /dev/null   # stdout and stderr to (null)

        python hello.py < foo.txt      # feed foo.txt to stdin for python
      `}</Code>

      <Hs>Error handling</Hs>

      <ul>
        <li>
          <code>trap</code> executes an action when a certain event occurs
        </li>
      </ul>

      <Code block jsx>{`
        traperr() {
          echo "ERROR: \${BASH_SOURCE[1]} at about \${BASH_LINENO[0]}"
        }

        set -o errtrace
        trap traperr ERR

        some_incorrect_code

        # ERROR: ./script.sh at about 10
      `}</Code>

      <Hs>printf</Hs>

      <ul>
        <li>
          Supports format specifiers (e.g., <code>%s</code> for strings, <code>%d</code> for
          integers), allowing for more complex text formatting
        </li>
        <li>Requires format strings, so it's slightly more complex to use</li>
        <li>
          By default, <code>echo</code> adds a newline at the end of its output, but{' '}
          <code>printf</code> does not
        </li>
      </ul>

      <Code block jsx>{`
        printf "Hello, %s!\\n" "World"
        printf "Hello %s, I'm %s" Sven Olga   # => "Hello Sven, I'm Olga
        printf "1 + 1 = %d" 2                 # => "1 + 1 = 2"
        printf "Print a float: %f" 2          # => "Print a float: 2.000000"
      `}</Code>

      <Hs>Ping</Hs>

      <Code block jsx>{`
        if ping -c 1 google.com; then
          echo "It appears you have a working internet connection"
        fi
      `}</Code>

      <Hs>Grep (search in text)</Hs>

      <ul>
        <li>grep stands for Global Regular Expression Print</li>
        <li>
          <code>grep</code> searches for text patterns within files or input streams
        </li>
      </ul>

      <Code block jsx>{`
        # -i: Case-insensitive search
        grep -i "pattern" file.txt

        # -r or -R: Recursive search in directories
        grep -r "pattern" /path/to/directory

        # -l: Only lists file names with matches, not the matching lines
        grep -l "pattern" *.txt

        # -v: Invert match; shows lines that do not contain the pattern.
        grep -v "pattern" file.txt

        # -c: Counts the number of matches per file.
        grep -c "pattern" file.txt

        # -n: Shows line numbers for each matching line.
        grep -n "pattern" file.txt

        # -q: Quiet mode; suppresses output, sets exit status only.
        grep -q "pattern" file.txt && echo "Found" || echo "Not found"

        # example
        if grep -q 'foo' ~/.bash_history; then
          echo "You appear to have typed 'foo' in the past"
        fi
      `}</Code>

      <Hs>Backslash escapes</Hs>

      <ul>
        <li>
          Escape these special characters with <code>{'\\'}</code>
        </li>
        <li>
          <code>{'!'}</code>
          <code>{'"'}</code>
          <code>{'#'}</code>
          <code>{'&'}</code>
          <code>{"'"}</code>
          <code>{'('}</code>
          <code>{')'}</code>
          <code>{','}</code>
          <code>{';'}</code>
          <code>{'<'}</code>
          <code>{'>'}</code>
          <code>{'['}</code>
          <code>{'|'}</code>
          <code>{'\\'}</code>
          <code>{']'}</code>
          <code>{'^'}</code>
          <code>{'{'}</code>
          <code>{'}'}</code>
          <code>{'`'}</code>
          <code>{'$'}</code>
          <code>{'*'}</code>
          <code>{'?'}</code>
        </li>
      </ul>

      <Hs>Multi-line text</Hs>

      <Code block jsx>{`
        # Printing Multi-line Text

        cat <<EOF
        Welcome to the Script!
        This is a multi-line message.
        EOF

        # Redirecting Input to a Command

        mysql -u user -p database <<EOF
        SELECT * FROM users;
        EOF

        # Creating Configuration Files on the Fly

        cat <<EOF > config.conf
        [Settings]
        theme=dark
        EOF

        # Save Multi-line Text in variable

        message=$(cat <<EOF
        This is a
        multi-line string
        stored in a variable.
        EOF
        )
        echo "$message"
      `}</Code>

      <Hs></Hs>

      <H>Useful shortcuts</H>

      <Hs>Git push</Hs>

      <ul>
        <li>
          <Code bash>cd ~/Git/antonarbus.com</Code> go into folder
        </li>
        <li>
          <Code bash>git add . && git commit -m 'xxx'</Code> git add, commit
        </li>
        <li>
          <Code bash>git push</Code> git push
        </li>
      </ul>

      <Hs>Deploy Anton Arbus on server</Hs>

      <ul>
        <li>
          <Code bash>ssh sherb@35.217.12.143</Code> connect
        </li>
        <li>
          <Code bash>cd /var/www/html/antonarbus.com</Code> go to this web page folder
        </li>
        <li>
          <Code bash>npm i</Code> update packages
        </li>
        <li>
          <Code bash>npm run build</Code>
        </li>

        <li>
          <Code bash>pm2 restart app</Code> restart server
        </li>
        <li>
          <Code bash>pm2 stop app</Code> stop server
        </li>
        <li>
          <Code bash>pm2 delete app</Code> delete server
        </li>
        <li>
          <Code bash>pm2 start "npm run start" --name app --watch</Code> start app in watch mode
        </li>
      </ul>

      <Hs>Send archive to Anton Arbus</Hs>

      <ul>
        <li>
          <Code bash>cd ~/Git/antonarbus.com</Code> go into folder
        </li>
        <li>
          <Code bash>rm -r .next</Code> remove existing build folder
        </li>
        <li>
          <Code bash>npm run build</Code> build production folder
        </li>
        <li>
          <Code bash>tar -czf archive.tar.gz .next package.json next.config.js public</Code>{' '}
          compress build folder
        </li>
        <li>
          <Code bash>
            scp -r ~/Git/antonarbus.com/archive.tar.gz
            sherb@35.209.92.93:/var/www/html/antonarbus.com/
          </Code>{' '}
          copy build archive from Win to server
        </li>
        <li>
          <Code bash>ssh sherb@35.217.12.143</Code> connect
        </li>
        <li>
          <Code bash>cd /var/www/html/antonarbus.com</Code> go to this web page folder
        </li>
        <li>
          <Code bash>rm -r /var/www/html/antonarbus.com/.next</Code> remove existing build folder
        </li>
        <li>
          <Code bash>tar -xf archive.tar.gz</Code> extract archive
        </li>

        <Hs>Restart server via PM2</Hs>

        <li>
          <Code bash>pm2 start "npm run start" --name app --watch</Code> start app in watch mode
        </li>
        <li>
          <Code bash>pm2 restart app</Code> restart server
        </li>
        <li>
          <Code bash>pm2 stop app</Code> stop server
        </li>
        <li>
          <Code bash>pm2 delete app</Code> delete server
        </li>
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
  private: postObj.private,
  imgUrl: postObj.imgUrl || null,
  bodyStr: jsxToStr(postObj.body)
}
