import { Code, H, Hs, LazyImg, jsxToStr, Lnk } from '/components/post/reExport'

const postObj = {
  title: 'git',
  date: '2022.04.02',
  tags: ['git', 'tools'],
  desc: 'git commands',
  body: (
    <>
      <H>Git flow</H>

      <LazyImg src="/imgs/gitFlow.png" noShadow></LazyImg>

      <H>Configuration</H>

      <ul>
        <p>Configuration has 3 levels</p>
        <li>
          <Code bash>git config --system</Code> for all users on machine
        </li>
        <li>
          <Code bash>git config --global</Code> for current user
        </li>
        <li>
          <Code bash>git config --local</Code> or <Code bash>git config</Code> for current repo
        </li>
      </ul>

      <Hs>User & mail</Hs>

      <ul>
        <li>
          <Code bash>git config --global user.email "you@example.com"</Code>
        </li>
        <li>
          <Code bash>git config --global user.name "name"</Code>
        </li>
      </ul>

      <H>VS Code as editor</H>

      <ul>
        <p>For mac</p>
        <li>
          <Code bash>git config --global core.editor "code -w"</Code>
        </li>
        <li>
          <Code bash>git commit --amend</Code> to check, VSCode should open
        </li>
      </ul>

      <H>Remote repo</H>

      <ul>
        <p>
          Create a folder on a server for remote repository & initialize remote git repository
          inside by <Code bash>git --bare init</Code>
        </p>
        <li>
          <Code bash>
            mkdir <i>newProject.git</i>
          </Code>
        </li>
        <li>
          <Code bash>
            cd <i>newProject.git</i>
          </Code>
        </li>
        <li>
          <Code bash>git --bare init</Code>
        </li>
      </ul>

      <Hs>post-receive</Hs>
      <ul>
        <li>
          We can automatically deploy the site or run commands upon git events on remote server via
          remote git repository
        </li>
        <li>
          For example after <Code bash>git push</Code> actions can be done on remote server
        </li>
        <li>
          Create file <Code bash>post-receive</Code> in <Code bash>/gitFolder/hooks/</Code>
        </li>
        <li>
          <Code bash>nano post-receive</Code>
        </li>
        <li>
          make 'post-receive' file executable by <Code bash>chmod +x post-receive</Code>
        </li>
        <li>
          folder where post-receive will copy files needs to have Write permission{' '}
          <Code bash>chmod -R 777 /var/www/siteFolder/</Code> (not sure 100%)
        </li>
        <li>
          to check the path to your npm run <Code bash>echo $PATH</Code>
        </li>
      </ul>

      <p>File content</p>

      <Code block lang="bash">{`
      export PATH=$PATH:/home/sherb/.nvm/versions/node/v16.8.0/bin
      echo "--> Copying files..."
      git --work-tree=/var/www/html/antonarbus.com --git-dir=/var/www/antonarbus.com(gitFolder) checkout -f
      echo "--> Installing libraries..."
      cd /var/www/html/antonarbus.com/ && npm i
      echo "--> Creating build folder..."
      npm run build
      `}</Code>

      <p>For myvocab.org it looks like</p>

      <Code block lang="bash">{`
      git --work-tree=/var/www/html/myvocab.org --git-dir=/var/www/myVocabGitRemoteRepo checkout -f
      `}</Code>

      <H>Create repo</H>

      <ul>
        <li>
          <Code bash>git init</Code> make local repo inside a folder
        </li>
      </ul>

      <H>Clone repo</H>

      <ul>
        <p>Files can be already in remote repo and we just</p>
        <li>
          <Code>
            git clone <i>repo_path</i>
          </Code>{' '}
          clone existing whole remote repo to current folder
        </li>
        <li>
          <Code>
            git clone <i>repo_path</i> <i>path_where_to_clone</i>
          </Code>{' '}
          clone to path (will be created if does not exist)
        </li>
        <li>
          <Code>
            git clone <i>repo_path</i> .
          </Code>{' '}
          clone to current folder
        </li>
        <li>
          <Code>
            git clone -b <i>branch_name</i> --single-branch <i>repo_path</i>{' '}
            <i>folder_name_where_to_clone</i>
          </Code>{' '}
          clone specific branch only
        </li>
        <li>
          <Code>
            git clone <i>repo_path</i> --depth=<i>5</i> <i>folder_name_where_to_clone</i>
          </Code>{' '}
          clone only 5 latest commits
        </li>
        <p>Example</p>
        <li>
          <Code>
            git clone <i>sherb@35.209.92.93:/var/www/antonarbus.com</i> .
          </Code>{' '}
          clone existing remote repo files to current folder
        </li>
      </ul>

      <H>Clone repo with all branches</H>

      <ul>
        <li>
          <Code>
            git clone --bare <i>repo_url</i> <i>project_folder</i>/.git
          </Code>
        </li>
        <li>
          <Code>
            cd <i>project_folder</i>
          </Code>
        </li>
        <li>
          <Code bash>git config --bool core.bare false</Code>
        </li>
        <li>
          <Code bash>git reset --hard</Code>
        </li>
      </ul>

      <H>Status</H>

      <ul>
        <li>
          <Code bash>git status</Code> status of changed files
        </li>
      </ul>

      <H>Add</H>

      <ul>
        <li>
          <Code>
            git add <i>read.me</i> <i>style.css</i>
          </Code>{' '}
          add files to the staging area, can chain files
        </li>
        <li>
          <Code>
            git add <i>pages/posts/vim.js</i>
          </Code>{' '}
          add file with path
        </li>
        <li>
          <Code bash>git add .</Code> add all files that are not staged
        </li>
      </ul>

      <H>Logs</H>

      <ul>
        <li>
          <Code bash>git log</Code> list of commits
        </li>
        <li>
          <Code bash>git log -p</Code> with details
        </li>
        <li>
          <Code bash>git log --oneline</Code> short version
        </li>
        <li>
          <Code>
            git show <i>hash</i>
          </Code>{' '}
          show commit details
        </li>
      </ul>

      <H>Commit</H>

      <ul>
        <p>
          Files are committed at the <i>add</i> snapshot. If modification are done after{' '}
          <Code bash>git add</Code> and we want them to be in commit, we need to{' '}
          <Code bash>git add</Code> files again before the commit.
        </p>
        <li>
          <Code>
            git commit -m <i>"message"</i>
          </Code>{' '}
          commit staged files
        </li>
        <li>
          <Code>
            git commit -m <i>"title line"</i> -m <i>"longer description"</i>
          </Code>{' '}
          message will be on 2 lines
        </li>
        <li>
          <Code>
            git commit -am <i>"message"</i>
          </Code>{' '}
          stage (add) all modified files and commit. The <Code bash>-a</Code> flag will not add any
          new files.
        </li>
      </ul>

      <Hs>Commit message</Hs>

      <p>
        Good commit message may look like "<span css={{ color: 'grey' }}>this commit will</span>{' '}
        <b>fix the margin issue on windows</b>" without "
        <span css={{ color: 'grey' }}>this commit will</span>" statement.
      </p>

      <H>Amend</H>

      <ul>
        <li>
          <Code bash>git commit --amend</Code> add changes to the last commit + modify commit
          details (commit hash will be changed)
        </li>
        <li>
          <Code>
            git commit --amend -m <i>"message"</i>
          </Code>{' '}
          update message in terminal
        </li>
        <li>
          <Code>
            git commit --amend --author=<i>"new_author"</i>
          </Code>{' '}
          update author
        </li>
        <li>
          <Code bash>git commit --amend --no-edit</Code> add changes to the last commit with same
          commit details
        </li>
      </ul>

      <H>Diff</H>

      <ul>
        <li>
          <Code bash>git diff</Code> changes in files from the last commit (before next commit)
        </li>
        <li>
          <Code>
            git diff <i>read.me</i>
          </Code>{' '}
          changes in file from the last commit
        </li>
        <li>
          <Code>git diff --staged</Code> changes in staged files (added) (regardless commits)
        </li>
      </ul>

      <H>Patch diff</H>

      <ul>
        <li>situation - you need to make a new branch from the differences between 2 branches</li>
        <li>
          for some reason you can not simply merge/rebase, due to for ex. problems in commit
          history, it happened to me
        </li>
        <li>
          <Lnk path="https://stackoverflow.com/questions/16675766/get-the-difference-between-two-branches-in-git">
            https://stackoverflow.com/questions/16675766/get-the-difference-between-two-branches-in-git
          </Lnk>
        </li>
        <li>
          from the branch <Code>{'git diff origin/master > patchfile'}</Code> save differences to
          file
        </li>
        <li>
          <Code>git checkout -b new_branch</Code> go to new branch
        </li>
        <li>
          <Code>git apply patchfile</Code> paste data from the file
        </li>
        <li>
          do not include <i>patchfile</i> into commit
        </li>
      </ul>

      <p>
        probably this will not add patch file in git{' '}
        <Code>{'git diff master Branch1 > ../patchfile'}</Code>
      </p>

      <H>Rename</H>

      <ul>
        <li>
          <Code>
            git mv <i>file1.txt</i> <i>file2.txt</i>
          </Code>{' '}
          rename file & stage (add)
        </li>
      </ul>

      <H>Move</H>

      <ul>
        <li>
          <Code>
            git mv <i>file1.txt</i> <i>/path/file2.txt</i>
          </Code>{' '}
          move, rename & stage
        </li>
      </ul>

      <H>Remove</H>

      <ul>
        <li>
          <Code>
            git rm <i>file.txt</i>
          </Code>{' '}
          remove file from machine and git repo
        </li>
        <li>
          <Code>
            git rm --cached <i>file.txt</i>
          </Code>{' '}
          remove file from git repo only (unstage file)
        </li>
        <li>
          <Code>
            git rm -r <i>folder_path</i>
          </Code>{' '}
          remove folder from git & stage
        </li>
      </ul>

      <Hs>Untrack file and put into .gitignore</Hs>

      <ul>
        <li>add the file to .gitignore file</li>
        <li>
          <Code>
            git rm --cached <i>file.txt</i>
          </Code>{' '}
          remove file from git repo only (unstage file)
        </li>
        <li>
          <Code>git commit -m "Stop tracking file.txt"</Code>
        </li>
      </ul>

      <H>Ignore</H>

      <p>
        Files which are not staged, can be put into <Code bash>.gitignore</Code> file. Such filed
        will not be shown as <i>untracked</i>.
      </p>
      <Code block lang="gitignore">{`
      # dependencies
      /node_modules # folder
      file.js # file
      folder/file.txt # file within folder
      *.py # files with extension
      *.py[abc] # files with extension .pya .pyb .pyc
      `}</Code>

      <H>Branch</H>

      <Hs>Show branch</Hs>

      <ul>
        <li>
          <Code bash>git branch</Code> local branches
        </li>
        <li>
          <Code bash>git branch -r</Code> remote branches, which are available locally
        </li>
        <li>
          <Code bash>git fetch</Code> update data about remote branches
        </li>
        <li>
          <Code bash>git branch -a</Code> local & remote branches
        </li>
        <li>
          <Code bash>git branch -a -vv</Code> branches and tracking remotes
        </li>
      </ul>

      <Hs>Create branch</Hs>

      <ul>
        <li>
          <Code>
            git branch <i>name</i>
          </Code>{' '}
          create local branch
        </li>
        <li>
          <Code>
            git checkout -b <i>name</i>
          </Code>{' '}
          create & checkout local branch
        </li>
      </ul>

      <Hs>Rename branch</Hs>

      <ul>
        <li>
          <Code>
            git branch -m <i>name</i>
          </Code>{' '}
          rename
        </li>
      </ul>

      <Hs>Delete local branch</Hs>

      <ul>
        <li>
          <Code>
            git branch -d <i>branch_name_1</i> <i>branch_name_2</i>
          </Code>{' '}
          delete local branches
        </li>
        <li>
          <Code>
            git branch -D <i>branch_name_1</i> <i>branch_name_2</i>
          </Code>{' '}
          delete local branches, even if it is unmerged
        </li>
      </ul>

      <Hs>Delete remote branch</Hs>

      <ul>
        <li>
          <Code>
            git push <i>remote_repo_name</i> --delete <i>branch_name</i>
          </Code>{' '}
          delete remote branch
        </li>
        <li>
          <Code>
            git remote prune <i>repo_name</i> --dry-run
          </Code>{' '}
          lists branches that do not exist on remote and can be deleted on your local
        </li>
        <li>
          <Code>
            git remote prune <i>repo_name</i>
          </Code>{' '}
          deletes branch references to remote branches that do not exist (do not delete local
          branches)
        </li>
        <li>
          <Code bash>git fetch --prune</Code> same (recommended)
        </li>
        <li>
          <Code bash>git config --global fetch.prune true</Code> automatically prune on every{' '}
          <Code bash>git fetch</Code>
        </li>
      </ul>

      <Hs>Set remote branch tracking</Hs>

      <ul>
        <li>
          <Code>
            git push -u <i>repo_name</i> <i>branch_name</i>
          </Code>{' '}
          set or change remote branch tracking
        </li>
        <li>
          <Code>
            git push --set-upstream <i>repo_name</i> <i>branch_name</i>
          </Code>{' '}
          push & track remote branch
        </li>
      </ul>

      <Hs>Show remote branch tracking</Hs>

      <ul>
        <li>
          <Code bash>git branch -vv</Code> show track info
        </li>
      </ul>

      <H>Checkout</H>

      <ul>
        <p>Go to branch or commit.</p>
        <li>
          <Code>
            git checkout <i>branch_name</i>
          </Code>{' '}
          jump to branch
        </li>
        <li>
          <Code>
            git checkout <i>hash</i>
          </Code>{' '}
          jump to commit (HEAD is moved & new commits are not in the branch)
        </li>
        <li>
          <Code>
            git checkout <i>branch_name</i> <i>hash</i>
          </Code>{' '}
          jump to branch & commit
        </li>
        <li>
          <Code>
            git checkout <i>master</i>
          </Code>{' '}
          jump to master branch
        </li>
        <li>
          <Code>
            git checkout -b <i>name</i>
          </Code>{' '}
          create & jump to branch
        </li>
        <li>
          <Code>
            git checkout <i>file1.me</i> <i>file2.me</i>
          </Code>{' '}
          jump to last committed files (discard changes)
        </li>
      </ul>

      <H>Switch</H>

      <ul>
        <li>
          <Code>
            git switch <i>branch_name</i>
          </Code>{' '}
          switch to another branch, kind of limited version of <code>git checkout</code>
        </li>
      </ul>

      <H>Merge types</H>

      <ul>
        <li>
          'Fast-forward' merge happens when the 'HEAD ' mark is just moved across the commits chain.
          No real merging happens.
        </li>
        <li>
          'Merge commit' happens when new commit is created combining commits from 2 branches.
        </li>
      </ul>

      <H>Merge</H>

      <ul>
        <li>
          <Code>
            git merge <i>branch_name</i>
          </Code>{' '}
          branch is merged with current branched & added into the current branch as a new commit
        </li>
        <li>
          <Code>
            git merge <i>branch_name_where_to_merge</i> <i>branch_name_what_to_merge</i>
          </Code>{' '}
          merge without checkout
        </li>
      </ul>

      <p>New commit will be created, history is not destroyed, save, may create a mess.</p>

      <H>Rebase</H>

      <ul>
        <li>
          <Code>
            git rebase <i>branch_name</i>
          </Code>{' '}
          branch is added before the current branch
        </li>
        <li>
          When I updated my local branch with updates from the master i did{' '}
          <code>git merge master</code> and got a mix of commits in their chronological order, but
          better to do <code>git rebase master</code> and it bring all changes from the master, but
          put all my commits in front.
        </li>
        <li>
          <Code>git rebase origin/master</Code> from the branch (team mates use it)
        </li>{' '}
        and then <Code>git push origin -f BRANCH_NAME</Code>
        <li>
          <Code>
            git rebase -i HEAD~<i></i>
          </Code>{' '}
          change 4 commits history in text editor
        </li>
        <li>
          <Code>
            git rebase -i <i>hash</i>
          </Code>{' '}
          change all commits after commit with hash
        </li>
      </ul>
      <p>
        History is modified, but commits are linear and beautiful, <Code bash>push -f</Code> is
        needed.
      </p>

      <Hs>Modify commit history</Hs>
      <ul>
        <p>
          In{' '}
          <Code>
            git rebase -i HEAD~<i>4</i>
          </Code>{' '}
          following flags are widely used in front of commit hashes:
        </p>
        <li>
          <code>r</code> flag to modify the commit message
        </li>
        <li>
          <code>f</code> flag to glue commit to the previous one
        </li>
        <li>
          <code>p</code> flag to leave commit as it is
        </li>
        <li>
          <code>d</code> flag to remove commit completely
        </li>
      </ul>

      <LazyImg src="/imgs/git/rebase interactive flags.png"></LazyImg>

      <H>Restore</H>

      <ul>
        <li>
          <Code>
            git restore <i>read.me</i>
          </Code>{' '}
          discard local changes in a file, i.e. restore to its last committed state
        </li>
        <li>
          <Code bash>git restore .</Code> discard local changes in all files
        </li>
        <li>
          <Code>
            git restore --staged <i>read.me</i>
          </Code>{' '}
          undo the git stage (add) operation
        </li>
      </ul>

      <H>Revert</H>

      <ul>
        <li>
          <Code>
            git revert <i>hash</i>
          </Code>{' '}
          undos changes in commit and puts the output as a new commit
        </li>
        <p>Used if error is found in some commit.</p>
      </ul>

      <H>Reset</H>

      <Hs>Mixed</Hs>
      <ul>
        <li>
          <Code>
            git reset <i>hash</i>
          </Code>{' '}
          undo changes (just move HEAD to some commit), all further modification are available, but
          not staged, commits are not deleted. We undo add + commit commands.
        </li>
        <li>
          <Code>
            git reset --mixed <i>hash</i>
          </Code>{' '}
          same
        </li>
        <li>
          we can reset back to the same commit knowing its hash, because commit is not deleted, even
          it is not visible in logs.
        </li>
        <li>
          <Code>git reset --hard origin/main</Code> if master is out of order and asks to push
          commits
        </li>
      </ul>

      <Hs>Soft</Hs>

      <ul>
        <li>
          <Code>
            git reset --soft <i>hash</i>
          </Code>{' '}
          undo changes, but stage all following modifications. We undo just commit command.
        </li>
        <li>
          <Code bash>git reset --soft HEAD~1</Code> undo changes the last commit
        </li>
      </ul>

      <Hs>Hard</Hs>

      <ul>
        <li>
          <Code bash>git reset --hard</Code> undo changes to the last commit & remove commits. We
          undo file modifications + add + commit commands. Untracked files are not involved.
        </li>
        <li>
          <Code>
            git reset --hard <i>hash</i>
          </Code>{' '}
          undo changes to the commit & remove commits, get rid of everything after specific commit
        </li>
        <li>
          <Code>git reset --hard HEAD^</Code> remove the last commit & <Code>git clean</Code> may
          clean unknown files
        </li>
        <li>
          <Code>git reset --hard HEAD~2</Code> remove last 2 commits
        </li>
      </ul>

      <H>Restore vs Reset</H>

      <ul>
        <li>
          <Code bash>git restore .</Code> undo unstaged changes (no <Code>git add .</Code> done)
        </li>
        <li>
          <Code bash>git reset .</Code> unstage staged but not committed changes, then you need to{' '}
          <Code bash>git restore .</Code>
        </li>
        <li>
          <Code bash>git reset HEAD~1</Code> unstage last commit and then{' '}
          <Code bash>git restore .</Code> to undo local changes
        </li>
        <li>
          <Code bash>git reset --hard HEAD~1</Code> unstage and last commit and undo changes (same
          as above)
        </li>
      </ul>

      <H>Clean</H>

      <ul>
        <li>
          <Code bash>git clean -n</Code> show untracked files to be removed
        </li>
        <li>
          <Code bash>git clean -n -d</Code> show untracked files & folders to be removed
        </li>
        <li>
          <Code bash>git clean -f</Code> remove untracked files
        </li>
        <li>
          <Code bash>git clean -f -d</Code> remove untracked files & folders
        </li>
      </ul>

      <H>Remote</H>

      <Hs>Add remote</Hs>

      <ul>
        <li>
          <Code>
            git remote add <i>name</i> <i>link</i>
          </Code>{' '}
          link the local & remote repos and name it
        </li>
        <p>
          Example{' '}
          <Code>
            git remote add <i>origin</i> <i>sherb@35.209.92.93:/var/www/myVocabGitRemoteRepo</i>
          </Code>
        </p>
        <p>
          Example{' '}
          <Code>
            git remote add <i>interviewTask</i> <i>git@github.com:sherbsherb/interview-task.git</i>
          </Code>
        </p>
      </ul>

      <Hs>Show remote</Hs>

      <ul>
        <li>
          <Code bash>git remote</Code> display names of remote repos
        </li>
        <li>
          <Code>
            git remote show <i>name</i>
          </Code>{' '}
          show info on remote repo
        </li>
        <li>
          <Code bash>git remote -v</Code> display remote with url
        </li>
      </ul>

      <Hs>Update remote</Hs>

      <ul>
        <li>
          <Code>
            git remote rename <i>old_name</i> <i>new_name</i>
          </Code>{' '}
          change name of remote repo
        </li>
        <li>
          <Code>
            git remote set-url <i>name</i> <i>new_url</i>
          </Code>{' '}
          set new address or update the existing one
        </li>
      </ul>

      <Hs>Remove remote</Hs>

      <ul>
        <li>
          <Code>
            git remote remove <i>name</i>
          </Code>{' '}
          remove the link to remote repo
        </li>
      </ul>

      <H>Push</H>

      <ul>
        <li>
          <Code>
            git push <i>repo_name</i> <i>branch_name</i>
          </Code>{' '}
          send data to remote repository
        </li>
        <li>
          <Code bash>git push</Code> same, if branch is 'tracked'
        </li>
        <li>
          <Code bash>git push -f</Code> push with warnings suppression
        </li>
        <p>
          Example{' '}
          <Code>
            git push <i>origin</i> <i>master</i>
          </Code>{' '}
          send data to <i>origin</i> repo into <i>master</i> branch
        </p>
      </ul>

      <H>Fetch</H>

      <ul>
        <li>
          <Code>
            git fetch <i>repo_name</i>
          </Code>{' '}
          get the latest changes from remote repo without merging, can be reviewed and merged
          manually later
        </li>
        <li>
          <Code>git diff main origin/main</Code> can compare differences
        </li>
      </ul>

      <H>Pull</H>

      <ul>
        <li>
          <Code>
            git pull <i>repo_name</i> <i>branch_name</i>
          </Code>{' '}
          get latest updates from remote repo's branch
        </li>
        <li>
          <Code bash>git pull</Code> same, if branch is 'tracked'
        </li>
        <p>
          Same as <Code bash>git fetch</Code> && <Code bash>git merge</Code>
        </p>
        <li>
          Same as <Code bash>git pull -p</Code> pull in case got{' '}
          <i>error: cannot lock ref 'refs/remotes/origin/master': is at dce82 but expected 2b16b</i>
        </li>
      </ul>

      <H>Copy & paste commit</H>

      <ul>
        <li>
          <Code>
            git cherry-pick <i>hash</i>
          </Code>{' '}
          copy commit and paste into current branch at the end
        </li>
        <li>
          <Code>
            git cherry-pick <i>hash</i> -edit
          </Code>{' '}
          add own commit message
        </li>
        <li>
          <Code>
            git cherry-pick <i>hash</i> --no-commit
          </Code>{' '}
          take data from commit and put into the staging area without commit
        </li>
      </ul>

      <H>Stash</H>

      <ul>
        <li>
          <Code bash>git stash</Code> cut uncommitted files & put in stash (kind of a smart
          clipboard) for letter usage
        </li>
        <li>
          <Code bash>git stash -u</Code> cut uncommitted + untracked files & put in stash
        </li>
        <li>
          <Code bash>git stash -a</Code> cut uncommitted + untracked + ignored files & put in stash
        </li>
        <li>
          <Code bash>git stash list</Code> show stash content
        </li>
        <li>
          <Code>
            git stash save <i>"name"</i>
          </Code>{' '}
          same, but with name for the stash to let you identify it in the list
        </li>
        <li>
          <Code bash>git stash apply</Code> copy latest stash & paste on your working directory
        </li>
        <li>
          <Code>
            git stash apply <i>stash_id_number</i>
          </Code>{' '}
          copy stash with id (0,1,2...) & paste into your working directory
        </li>
        <li>
          <Code bash>git stash pop</Code> cut latest stash and paste on your working directory
        </li>
        <li>
          <Code>
            git checkout stash@{'{'}
            <i>stash_id_number</i>
            {'}'} --<i>file.txt</i>
          </Code>{' '}
          take specific file from stash and put into working directory
        </li>
      </ul>

      <H>Track file, but remove from commit</H>

      <ul>
        <li>
          <Code>
            git update-index --assume-unchanged <i>file_name.txt</i>
          </Code>{' '}
          file will be kind of untracked
        </li>
        <li>
          <Code>
            git update-index --no-assume-unchanged <i>file_name.txt</i>
          </Code>{' '}
          undo previous operation
        </li>
        <p>
          May face a problem when pull requests because of changed such file, but impossible to
          notice it.
        </p>
      </ul>

      <H>Keyboard keys</H>

      <ul>
        <li>
          <kbd>q</kbd> exit
        </li>
      </ul>

      <H>Recommendations</H>

      <ul>
        <li>Never work in master, always make a branch</li>
        <li>Make short commit messages, try to connect it to a Jira ticket number</li>
        <li>When work alone, prefer to rebase instead of merge</li>
      </ul>

      <H>Shortcuts</H>

      <ul>
        <li>
          <Code bash>git add . && git commit -m "comment" && git push origin master</Code>
        </li>
        <li>
          <Code bash>git add . && git commit -m "comment" && git push</Code>
        </li>
      </ul>

      <H>Minimize merge conflicts</H>

      <ul>
        <li>We have many commits in a branch</li>
        <li>
          It is possible that a conflict should resolved for every commit instead of just resolving
          it ones for the final code
        </li>
        <li>Pull the latest version of main/master and checkout a new branch based on it</li>
        <li>
          <Code bash>git checkout master</Code>
        </li>
        <li>
          <Code bash>git pull</Code>
        </li>
        <li>
          <Code bash>git checkout -b temp_work</Code>
        </li>
        <li>Pull & squash changes from your messy branch</li>
        <li>Changes are staged without creating a commit</li>
        <li>
          <Code bash>git merge --squash messy_branch</Code>
        </li>
        <li>At this point, you might be getting a smaller number of unavoidable merge conflicts</li>
        <li>Make a commit after resolving conflicts</li>
        <li>
          <Code bash>git commit</Code>
        </li>
        <li>
          If you'd like to re-use your old branch, you can now reset it to your temporary branch
          created above
        </li>
        <li>Force-push the changes up to GitHub before deleting my temporary work branch</li>
        <li>
          <Code bash>git checkout messy_branch</Code>
        </li>
        <li>
          <Code bash>git reset --hard temp_work</Code>
        </li>
        <li>
          <Code bash>git push -f</Code>
        </li>
        <li>
          <Code bash>git branch -D temp_work</Code>
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
  imgUrl: postObj.imgUrl || null,
  bodyStr: jsxToStr(postObj.body)
}
