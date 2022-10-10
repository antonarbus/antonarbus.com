import { Code, H, Hs, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'terminal',
  date: '2022.04.10',
  tags: ['tool'],
  desc: 'Commands in terminal',
  private: false,
  body: (
    <>
      <H>Files display</H>
      <ul>
        <li><Code bash>ls</Code> show files</li>
        <li><Code bash>ls -a</Code> with hidden files</li>
        <li><Code bash>ls -l</Code> table view</li>
        <li><Code bash>ls -lh</Code> size in human format</li>
        <li><Code bash>ls | wc -l</Code> number of files in dir</li>
      </ul>

      <H>Show path</H>
      <ul>
        <li><Code bash>pwd</Code> show where you are</li>
      </ul>

      <H>Go to</H>
      <ul>
        <li><Code bash>cd /</Code> root directory</li>
        <li><Code bash>cd</Code> home directory</li>
        <li><Code bash>cd ~</Code> same</li>
        <li><Code bash>cd ..</Code> 1 level up</li>
        <li><Code bash>cd ../..</Code> 2 levels up</li>
        <li><Code bash>cd -</Code> back</li>
        <li><Code>cd <i>path</i></Code> go to path</li>
        <li><Code bash>cd /var/www/html/</Code> go to on unix</li>
        <li><Code bash>cd c:/Users/sherb/Git/</Code> go to on win</li>
        <li><Code bash>cd /C/</Code> go to C drive on win</li>
      </ul>

      <H>Read</H>

      <ul>
        <li><Code>cat <i>file_path</i></Code> show file content in terminal</li>
        <li><Code>nano <i>file_name.txt</i></Code> read file in nano editor</li>
        <li><Code>vi <i>file_name.txt</i></Code> read file in vi editor</li>
      </ul>

      <H>Move content</H>

      <ul>
        <li><Code>cat <i>file_path_1</i> {'>'} <i>file_path_2</i></Code> put file_1 content into file_2</li>
        <li><Code>ls <i>file_path_1</i> {'>'} <i>file_path_2</i></Code> put file names at path_1 to the file at path_2</li>
        <li><Code>echo <i>string</i> {'>>'} <i>file_path</i></Code> add "string" to the end of the file</li>
      </ul>

      <H>Create folder</H>

      <ul>
        <li><Code>mkdir <i>folder_name</i></Code> create folder</li>
        <li><Code>touch <i>file_name.txt</i></Code> create file</li>
        <li><Code>{'>'} <i>file_name.txt</i></Code> same</li>
      </ul>

      <H>Create file</H>

      <ul>
        <li><Code>touch <i>file_name.txt</i></Code> create file</li>
        <li><Code>{'>'} <i>file_name.txt</i></Code> same</li>
        <li><Code>nano <i>file_name.txt</i></Code> create and open file in nano editor</li>
        <li><Code>vi <i>file_name.txt</i></Code> create and open file in vi editor</li>

      </ul>

      <H>Copy</H>

      <ul>
        <li><Code>cp <i>/path_from</i> <i>/path_to</i></Code> copy a file from to</li>
        <li><Code>cp -a <i>/path_from/</i>. <i>/path_to/</i></Code> copy all from folder to another folder</li>
        <li><Code>scp -r <i>/path_from/</i> <i>sherb@35.209.92.93:/var/www/html/folder_name</i></Code> copy folder to server via ssh</li>
        <li><Code>scp -r <i>sherb@35.209.92.93:/var/www/html/folder_name</i> <i>~/Temp</i></Code> copy folder from server via ssh</li>
      </ul>

      <H>Move</H>

      <ul>
        <li><Code>mv <i>/file_path_from</i> <i>/file_path_to</i> </Code> move a file</li>
        <li><Code>mv <i>/file_path_from</i> <i>/file_path_to</i> </Code> rename a file</li>
      </ul>

      <H>Rename</H>

      <ul>
        <li><Code>mv <i>/file_or_folder_path_from</i> <i>/file_or_folder_path_to</i></Code> move & rename</li>
        <li><Code>mv <i>./file_or_folder_path_from</i> <i>./file_or_folder_path_to</i></Code> rename in the same folder</li>
      </ul>

      <H>Remove</H>

      <ul>
        <li><Code>rm -r <i>folder_path</i></Code> remove folder with warnings</li>
        <li><Code>rm -rf <i>folder_path</i></Code> remove folder without warnings</li>
        <li><Code>rm -rf <i>*.zip</i></Code> remove files with .zip ext</li>
        <li><Code bash>rm *</Code> remove all files in folder with warnings</li>
        <li><Code bash>rm -f *</Code> remove all files in folder without warnings</li>
      </ul>

      <H>Tar</H>

      <ul>
        <li><Code bash>tar czvf ~/Temp/archive.tar.gz -C ~/Temp/ xxx yyy hi.txt</Code> archive listed folders and files from <code>~/Temp/</code> and put into <code>~/Temp/archive.tar.gz</code></li>
        <li><Code bash>tar -xf ~/Temp/archive.tar.gz -C ~/Temp/extracted</Code> extract the archive <code>archive.tar.gz</code> from folder <code>~/Temp/</code> into folder <code>~/Temp/extracted</code></li>
      </ul>

      <H>Zip</H>

      <ul>
        <li><Code>tar -xvf <i>file_name.tar</i></Code> untar archive file</li>
        <li><Code bash>sudo apt install zip unzip</Code> install zip</li>
        <li><Code>zip -r <i>file_name.zip</i> <i>path</i></Code> zip folder with full path</li>
        <li><Code>zip -r <i>path/file_name.zip</i> <i>./*</i></Code> zip folder without full path</li>
      </ul>

      <H>Documentation</H>

      <ul>
        <li><Code>man <i>command_name</i></Code> documentation for a command</li>
      </ul>

      <H>Sudo</H>

      <ul>
        <li><Code bash>sudo -s</Code> stay sudo permanently (Super User DO)</li>
      </ul>

      <H>Size</H>

      <ul>
        <li><Code bash>df -h</Code> size of disk</li>
        <li><Code>du -h <i>path</i></Code> size of folder</li>
      </ul>

      <H>Open with</H>

      <ul>
        <li><Code bash>open .</Code> open with finder (mac)</li>
        <li><Code bash>start .</Code> open with explorer (win)</li>
        <li><Code bash>code .</Code> open with VSCode new instance</li>
        <li><Code bash>code -a .</Code> open with VSCode same instance</li>
      </ul>

      <H>User</H>

      <ul>
        <li><Code bash>whoami</Code> user name</li>
        <li><Code bash>cat /etc/passwd</Code> list of users</li>
        <li><Code>su <i>user_name</i></Code> change user</li>
      </ul>

      <H>Permission</H>

      <ul>
        <li><Code>sudo chmod -R <i>777</i> <i>/path/</i>.</Code> set the permissions recursively</li>
        <li><Code bash>sudo chmod -R 777 /var/www/myVocabGitRemoteRepo/.</Code> example</li>
        <li><Code>sudo chmod +x <i>/file_path</i></Code> make file executable</li>
      </ul>

      <H>Apps</H>

      <ul>
        <li><Code>sudo apt install <i>app_name_1</i> <i>app_name_2</i></Code> install app on linux</li>
        <li><Code bash>sudo apt update</Code> latest info about the apps</li>
        <li><Code bash>apt list --upgradable</Code> list of upgradable apps</li>
        <li><Code bash>sudo apt upgrade</Code> upgrade all apps that have a newer version</li>
        <li><Code>sudo apt-get --only-upgrade install <i>app_name</i></Code> install upgrade for the app</li>
      </ul>

      <H>Reboot</H>

      <ul>
        <li><Code bash>sudo reboot</Code> reboot</li>
      </ul>

      <H>Git</H>

      <ul>
        <li><Code bash>git add . && git commit -m 'message' && git push</Code> git add, commit & push</li>
      </ul>

      <H>Alias</H>

      <Hs>For Bash</Hs>

      <ul>
        <li><Code bash>nano ~/.bashrc</Code></li>
        <li>Add some shortcuts</li>

        <Code block bash>{`
        # Aliases
        # alias alias_name="command_to_run"

        # Long format list
        alias ll="ls -la"

        # Print my public IP
        alias myip='curl ipinfo.io/ip'

        # Function to create a folder and navigate into it
        function mkcd () {
          mkdir -p -- "$1" && cd -P -- "$1"
        }
        `}</Code>

        <li>Add aliases to your current session <Code bash>source ~/.bashrc</Code></li>
      </ul>

      <H>Source</H>

      <ul>
        <li><Code>source <i>filename</i></Code> executes the content of the file passed as argument in the current shell</li>
      </ul>

      <H>SSH</H>

      <ul>
        <li><Code bash>ssh sherb@35.209.92.93</Code> connect</li>
        <li><Code bash>cd /var/www/html/antonarbus.com</Code> go to this web page folder</li>
        <li><Code bash>npm i</Code> update packages</li>
        <li><Code bash>npm run build</Code></li>
      </ul>

      <H>Keyboard</H>

      <ul>
        <li><kbd>Ctrl</kbd> + <kbd>L</kbd> clean terminal, same as <Code bash>clear</Code></li>
        <li><kbd>Alt</kbd> + <kbd>click</kbd> put cursor close to the click</li>
        <li><kbd>Arrow_Up</kbd> previous command</li>
        <li><kbd>Ctrl</kbd> + <kbd>C</kbd> exit</li>
        <li><kbd>Ctrl</kbd> + <kbd>D</kbd> log out</li>
        <li><kbd>Ctrl</kbd> + <kbd>U</kbd> delete line</li>
        <li><kbd>Ctrl</kbd> + <kbd>A</kbd> move cursor to the beginning</li>
        <li><kbd>Ctrl</kbd> + <kbd>E</kbd> move cursor to the end</li>
        <li><kbd>Ctrl</kbd> + <kbd>Left</kbd> / <kbd>Right</kbd>move cursor one word</li>
      </ul>

      <Hs>Search</Hs>

      <ul>
        <li><kbd>Ctrl</kbd> + <kbd>R</kbd> search command in terminal history</li>
        <li><kbd>Ctrl</kbd> + <kbd>R</kbd> (again) previous found command</li>
        <li><kbd>Ctrl</kbd> + <kbd>O</kbd> or <kbd>Enter</kbd> paste found command & execute</li>
        <li><kbd>Ctrl</kbd> + <kbd>G</kbd> exit & remove found command</li>
        <li><kbd>Arrow Left</kbd> exit & leave found command</li>
        <li><kbd>Ctrl</kbd> + <kbd>G</kbd> exit search mode</li>
      </ul>

      <H>Process on port</H>

      <ul>
        <li><Code>sudo lsof -i :3000</Code> check PID of process on port 3000</li>
        <li><Code>kill -9 <i>PID</i></Code> kill the process</li>
      </ul>

      <H>Kill the process</H>

      <ul>
        <li><Code>kill -9 <i>PID</i></Code> kill the process</li>
      </ul>

      <H>End of options <code>--</code></H>

      <p>Signify the end of the options</p>

      <Code bash>{'rm -f -- "file.txt"'}</Code>

      <H>Time & date</H>

      <Code bash>timedatectl</Code>

      <H>Useful shortcuts</H>

      <Hs>Git push</Hs>

      <ul>
        <li><Code bash>cd ~/Git/antonarbus.com</Code> go into folder</li>
        <li><Code bash>git add . && git commit -m 'xxx'</Code> git add, commit</li>
        <li><Code bash>git push</Code> git push</li>
      </ul>

      <Hs>Deploy Anton Arbus on server</Hs>

      <ul>
        <li><Code bash>ssh sherb@35.209.92.93</Code> connect</li>
        <li><Code bash>cd /var/www/html/antonarbus.com</Code> go to this web page folder</li>
        <li><Code bash>npm i</Code> update packages</li>
        <li><Code bash>npm run build</Code></li>

        <li><Code bash>pm2 restart app</Code> restart server</li>
        <li><Code bash>pm2 stop app</Code> stop server</li>
        <li><Code bash>pm2 delete app</Code> delete server</li>
        <li><Code bash>pm2 start "npm run start" --name app --watch</Code> start app in watch mode</li>
      </ul>

      <Hs>Send archive to Anton Arbus</Hs>

      <ul>
        <li><Code bash>cd ~/Git/antonarbus.com</Code> go into folder</li>
        <li><Code bash>rm -r .next</Code> remove existing build folder</li>
        <li><Code bash>npm run build</Code> build production folder</li>
        <li><Code bash>tar -czf archive.tar.gz .next package.json next.config.js public</Code> compress build folder</li>
        <li><Code bash>scp -r ~/Git/antonarbus.com/archive.tar.gz sherb@35.209.92.93:/var/www/html/antonarbus.com/</Code> copy build archive from Win to server</li>
        <li><Code bash>ssh sherb@35.209.92.93</Code> connect</li>
        <li><Code bash>cd /var/www/html/antonarbus.com</Code> go to this web page folder</li>
        <li><Code bash>rm -r /var/www/html/antonarbus.com/.next</Code> remove existing build folder</li>
        <li><Code bash>tar -xf archive.tar.gz</Code> extract archive</li>

        <Hs>Restart server via PM2</Hs>

        <li><Code bash>pm2 start "npm run start" --name app --watch</Code> start app in watch mode</li>
        <li><Code bash>pm2 restart app</Code> restart server</li>
        <li><Code bash>pm2 stop app</Code> stop server</li>
        <li><Code bash>pm2 delete app</Code> delete server</li>
      </ul>

      <Hs>DV</Hs>

      <ul>
        <li><Code bash>scp -r sherb@35.209.92.93:/var/www/html/dmitryvinokurov.com ./</Code> copy DV's folder to current folder</li>
        <li>
          Copy files to DV's folder
          <Code block bash>{`
            scp -r about.html audio.html contact.html cv.html index.html photographs.html videos.html style.css sherb@35.209.92.93:/var/www/html/dmitryvinokurov.com/
          `}</Code>
        </li>
        <li>
          Copy files from DV's folder
          <Code block bash>{`
            scp -r sherb@35.209.92.93:/var/www/html/dmitryvinokurov.com/about.html ./ &&
            scp -r sherb@35.209.92.93:/var/www/html/dmitryvinokurov.com/audio.html ./ &&
            scp -r sherb@35.209.92.93:/var/www/html/dmitryvinokurov.com/contact.html ./ &&
            scp -r sherb@35.209.92.93:/var/www/html/dmitryvinokurov.com/cv.html ./ &&
            scp -r sherb@35.209.92.93:/var/www/html/dmitryvinokurov.com/index.html ./ &&
            scp -r sherb@35.209.92.93:/var/www/html/dmitryvinokurov.com/photographs.html ./ &&
            scp -r sherb@35.209.92.93:/var/www/html/dmitryvinokurov.com/videos.html ./ &&
            scp -r sherb@35.209.92.93:/var/www/html/dmitryvinokurov.com/style.css ./
          `}</Code>
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
