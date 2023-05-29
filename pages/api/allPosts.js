import * as module from '/exportAllPosts.js'

export default function handler(req, res) {
  const fileNames = Object.keys(module)
  const posts = Object.values(module)
  posts.forEach((post, index) => {
    post.fileName = fileNames[index]
    post.url = `/posts/${fileNames[index]}`
  })

  res.status(200).json(posts)
}
