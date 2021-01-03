import { getAllPosts } from "@util";

export default async function Posts(req, res) {
  const posts = await getAllPosts()
  posts.map(post => post.date = new Date(post.date))
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(posts))
}