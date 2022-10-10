const { exec, execSync } = require('child_process') // creates a new shell and executes a given command
const encoding = 'utf-8'
const options = { encoding }
let output

console.log('start...')

output = execSync('rm -r .next archive.tar.gz', options)
console.log(output)
console.log('removed .next & archive folders')

output = execSync('npm run build', options)
console.log(output)
console.log('built project locally')

output = execSync('tar czvf archive.tar.gz .next package.json next.config.js public', options)
console.log(output)
console.log('archived files')

output = execSync('ssh sherb@35.209.92.93 "cd /var/www/html/antonarbus.com/ && rm -r archive.tar.gz .next package.json next.config.js public"', options)
console.log(output)
console.log('removed .next folder')

output = execSync('scp -r ~/Git/antonarbus.com/archive.tar.gz sherb@35.209.92.93:/var/www/html/antonarbus.com/', options)
console.log(output)
console.log('sent files to server')

output = execSync('ssh sherb@35.209.92.93 "cd /var/www/html/antonarbus.com/ && tar -xf archive.tar.gz"', options)
console.log(output)
console.log('extracted files from the archive')

// output = execSync('ssh sherb@35.209.92.93 "cd /var/www/html/antonarbus.com/ && /home/sherb/.nvm/versions/node/v16.8.0/bin/npm i -f"', options)
// console.log(output)
// console.log('installed packages')

// output = execSync('ssh sherb@35.209.92.93 "pm2 restart app"', options)
// console.log(output)
// console.log('restarted the app')

console.log('done!')
