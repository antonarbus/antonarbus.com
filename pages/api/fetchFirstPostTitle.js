// toDo: change url depending on production or development build, to be done somehow via environment variable

export default async function handler(req, res) {
  const axios = require('axios')
  const url = 'http://localhost:3000/api/allPosts'
  const response = await axios(url)
  // console.log(response.data[0].title)
  res.status(200).json(response.data[0].title)
}
