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
          <Code bash>pwd</Code> show where you are
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

      <H>App location</H>

      <ul>
        <li>
          <Code>which bash</Code> path of bash app executable on the system <code>/bin/bash</code>
        </li>
      </ul>

      <H>Variables</H>

      <ul>
        <li>Uppercase by convention</li>
        <li>Persisted in terminal session</li>
        <li>
          <Code>NAME="BRAD"</Code>
        </li>
        <li>
          <Code>echo "my name is $NAME"</Code> use money sign to reference a variable
        </li>
      </ul>

      <H>Script file</H>

      <ul>
        <li>
          <Code>touch myscript.sh</Code> create script file
        </li>
        <li>
          <Code>chmod +x myscript.sh</Code> make script executable
        </li>
        <li>
          <Code>./myscript.sh</Code> run the script
        </li>
        <li>Comment sign is hash #</li>
        <li>Need to point to your bash executable at the top of the file</li>

        <Code block bash>{`
          # path to bash executable, can be check by 'which bash'
          #! /bin/bash

          # print
          echo Hello world!
        `}</Code>
      </ul>

      <Hs>Variables</Hs>

      <Code block bash>{`
        NAME="Anton" # assign a value
        echo "my name is $NAME" # reference variable
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
        # case statement
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

      <Hs>Comparison</Hs>

      <Code block bash>{`
        # comparison

        # -eq equal
        # -ne not equal
        # -gt greater
        # -ge greater or equal
        # -lt less
        # -le less or equal

        NUM1=3
        NUM2=5

        if [ "$NUM1" -gt "$NUM2" ]
        then
          echo "$NUM1 is greater than $NUM2"
        else
          echo "$NUM1 is less than $NUM2"
        fi
      `}</Code>

      <Hs>Files conditions</Hs>

      <Code block bash>{`
        # FILE CONDITIONS
        
        # -d file   True if the file is a directory
        # -e file   True if the file exists (note that this is not particularly portable, thus -f is generally used)
        # -f file   True if the provided string is a file
        # -g file   True if the group id is set on a file
        # -r file   True if the file is readable
        # -s file   True if the file has a non-zero size
        # -u        True if the user id is set on a file
        # —W        True if the file is writable
        # -X        True if the file is an executable

        FILE="test.txt"

        if [ -f "$FILE" ]
        then
          echo "$FILE is a file"
        else
          echo "$FILE is NOT a file"
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
      `}</Code>

      <Hs>FOR loop to rename files</Hs>

      <Code block bash>{`
        # FOR LOOP to rename files
        touch 1.txt 2.txt 3.txt

        FILES=$(ls *.txt)
        NEW="new"

        for FILE in $FILES
          do
            echo "Renaming $FILE to new-$FILE"
            mV $FILE $NEW-$FILE
        done
      `}</Code>

      <Hs>WHILE loop</Hs>

      <Code block bash>{`
        # WHILE LOOP
        COUNT=1

        while [ $COUNT -le 5 ]
        do
          echo "Count is: $COUNT"
          ((COUNT++))  # Increment the count variable
        done
      `}</Code>

      <Hs>Function</Hs>

      <Code block bash>{`
        # function without params
        function sayHello() {
          echo "Hello World"
        }

        sayHello

        # function with positional params
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

      <Hs>CREATE FOLDER AND WRITE TO A FILE</Hs>

      <Code block bash>{`
        # CREATE FOLDER AND WRITE TO A FILE
        mkdir hello
        touch "hello/world. txt"
        echo "Hello World" >> "hello/world.txt"
        echo "Created hello/world.txt"
      `}</Code>

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
