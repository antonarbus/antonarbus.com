function compilePostsList() {
  const fs = require('fs')
  const files = fs.readdirSync('./posts/')
  const posts = files
    .filter(fileName =>
      (fileName.includes('.js') || fileName.includes('.ts') || fileName.includes('.jsx') || fileName.includes('.tsx')) &&
      fileName !== '_xxx.js' &&
      fileName !== 'index.js' &&
      !fileName.includes('.test.js')
    )
    .map(fileName => fileName.replace('.jsx', '').replace('.tsx', '').replace('.js', '').replace('.ts', ''))

  let postsReExportFileText = ''
  posts.forEach(fileName => {
    postsReExportFileText += `export { post as ${fileName} } from './posts/${fileName}'\n`
  })

  fs.writeFileSync('exportAllPosts.js', postsReExportFileText)
  console.log('File with post exports is compiled')
}

compilePostsList()
