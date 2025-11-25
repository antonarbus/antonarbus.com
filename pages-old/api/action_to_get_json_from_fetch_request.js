// pages\api\action_to_get_json_from_fetch_request.js
export default async function handler(req, res) {
  res.json(req.body)
}
