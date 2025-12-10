async function compilePostsList() {
  const fs = require('fs')
  const files = fs.readdirSync('./posts/')
  const postsWithExtensions = files
    .filter(fileName =>
      (fileName.includes('.js') || fileName.includes('.ts') || fileName.includes('.jsx') || fileName.includes('.tsx')) &&
      fileName !== '_xxx.js' &&
      fileName !== 'index.js' &&
      !fileName.includes('.test.js')
    )

  // Generate post metadata by parsing the files
  const postsData = {}

  for (const fileNameWithExt of postsWithExtensions) {
    const fileName = fileNameWithExt.replace('.jsx', '').replace('.tsx', '').replace('.js', '').replace('.ts', '')
    const filePath = `./posts/${fileNameWithExt}`
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    // Extract postObj properties using regex
    const titleMatch = fileContent.match(/title:\s*['"`]([^'"`]+)['"`]/)
    const dateMatch = fileContent.match(/date:\s*['"`]([^'"`]+)['"`]/)
    const descMatch = fileContent.match(/desc:\s*['"`]([^'"`]+)['"`]/)
    const imgUrlMatch = fileContent.match(/imgUrl:\s*['"`]([^'"`]+)['"`]/)
    const tagsMatch = fileContent.match(/tags:\s*\[([^\]]+)\]/)

    // Extract bodyStr - full text for comprehensive search
    const bodyTextMatches = [...fileContent.matchAll(/['"`]([^'"`]{10,})['"`]/g)]
    const bodyStr = bodyTextMatches.map(m => m[1]).join(' ')

    postsData[fileName] = {
      title: titleMatch ? titleMatch[1] : fileName,
      date: dateMatch ? dateMatch[1] : '',
      desc: descMatch ? descMatch[1] : '',
      imgUrl: imgUrlMatch ? imgUrlMatch[1] : null,
      tags: tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, '')) : [],
      bodyStr: bodyStr
    }
  }

  // Write as JSON export for SSR/build-time usage
  const jsonExport = `export const postsData = ${JSON.stringify(postsData, null, 2)}`
  fs.writeFileSync('exportAllPosts.js', jsonExport)
  console.log('File with post exports is compiled')

  // Write as static JSON file for client-side usage
  const posts = Object.entries(postsData).map(([fileName, post]) => ({
    fileName,
    url: `/posts/${fileName}`,
    ...post
  }))

  // Ensure public directory exists
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public')
  }
  fs.writeFileSync('public/posts.json', JSON.stringify(posts))
  console.log('Static posts.json file created in public directory')
}

compilePostsList()
