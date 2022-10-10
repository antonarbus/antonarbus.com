const { exec, execSync } = require('child_process') // creates a new shell and executes a given command
const encoding = 'utf-8'
const options = { encoding }
let output

console.log('01/10 start...')

output = execSync('rm -r .next archive.tar.gz', options)
console.log(output)
console.log('02/10 removed .next & archive folders')

output = execSync('npm run build', options)
console.log(output)
console.log('03/10 built project locally')

output = execSync('tar czvf archive.tar.gz .next package.json next.config.js public', options)
console.log(output)
console.log('04/10 archived files')

output = execSync('ssh sherb@35.209.92.93 "cd /var/www/html/antonarbus.com/ && rm -r archive.tar.gz .next package.json next.config.js public"', options)
console.log(output)
console.log('05/10 removed folders on server')

output = execSync('scp -r ~/Git/antonarbus.com/archive.tar.gz sherb@35.209.92.93:/var/www/html/antonarbus.com/', options)
console.log(output)
console.log('06/10 sent files to server')

output = execSync('ssh sherb@35.209.92.93 "cd /var/www/html/antonarbus.com/ && tar -xf archive.tar.gz"', options)
console.log(output)
console.log('07/10 extracted files from the archive')

output = execSync('ssh sherb@35.209.92.93 "source ~/.nvm/nvm.sh && cd /var/www/html/antonarbus.com/ && npm i -f"', options)
console.log(output)
console.log('08/10 installed packages')

output = execSync('ssh sherb@35.209.92.93 "source ~/.nvm/nvm.sh && pm2 restart app"', options)
console.log(output)
console.log('09/10 restarted the app')

console.log('10/10 done!')
