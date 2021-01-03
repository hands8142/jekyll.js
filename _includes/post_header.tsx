import Link from "next/link";

export default function PostHeader({ post }) {
  const time = new Date(post.date);
  return (
    <header className="texture-black">
      <div className="container">
        <div className="navbar">
          <ul>
            <Link href="/">
              <li>HOME</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="container">
        <h1>{post.title}</h1>
        <h4 className="post-description"></h4>
        <div className="post-date" style={{ marginTop: "20px" }}>
          {time.getFullYear()}년 {time.getMonth() + 1}월 {time.getDate()}일
        </div>
        <ul className="post-tags">
          {post.categories.map((category, key) => (
            <li key={key}>{category}</li>
          ))}
        </ul>
      </div>
    </header>
  );
}
