const { exec, execSync } = require('child_process') // creates a new shell and executes a given command
const fs = require('fs')

const encoding = 'utf-8'
const options = { encoding }
let output

let i = 1
console.log(i + ': starting...')

let path
path = '.next'
if (fs.existsSync(path)) {
  output = execSync('rm -r ' + path, options)
  console.log(output)
  i++
  console.log(i + ' removed .next')
}

path = 'archive.tar.gz'
if (fs.existsSync(path)) {
  i++
  console.log(i + ': removing archive.tar.gz')
  output = execSync('rm -r ' + path, options)
  console.log(output)
}

i++
console.log(i + ': building project locally')
output = execSync('npm run build', options)
console.log(output)

i++
console.log(i + ': archiving files')
output = execSync('tar czvf archive.tar.gz .next package.json next.config.js public', options)
console.log(output)

i++
console.log(i + ': removing folders on server')
output = execSync('ssh sherb@35.209.92.93 "cd /var/www/html/antonarbus.com/ && rm -r archive.tar.gz .next package.json next.config.js public"', options)
console.log(output)

i++
console.log(i + ': sending files to server')
output = execSync('scp -r ~/Git/antonarbus.com/archive.tar.gz sherb@35.209.92.93:/var/www/html/antonarbus.com/', options)
console.log(output)

i++
console.log(i + ': extracting files from the archive')
output = execSync('ssh sherb@35.209.92.93 "cd /var/www/html/antonarbus.com/ && tar -xf archive.tar.gz"', options)
console.log(output)

i++
console.log(i + ': installing packages')
output = execSync('ssh sherb@35.209.92.93 "source ~/.nvm/nvm.sh && cd /var/www/html/antonarbus.com/ && npm i -f"', options)
console.log(output)

i++
console.log(i + ': restarting the app')
output = execSync('ssh sherb@35.209.92.93 "source ~/.nvm/nvm.sh && pm2 restart app"', options)
console.log(output)

i++
console.log(i + ': done!')
