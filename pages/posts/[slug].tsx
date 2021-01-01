import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import Link from "next/link";
import Head from "next/head";

export default function PostTemplate({ content, data }) {
  const frontmatter = data;

  const time = new Date(frontmatter.date);

  const categories = frontmatter.categories.split(" ");

  return (
    <>
    <Head>
      <meta property="og:title" content={frontmatter.title} />
      <meta name="description" content={categories.join(" ")} />
      <meta property="og:description" content={categories.join(" ")} />
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:title" content={frontmatter.title} />
    </Head>
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
          <h1>{frontmatter.title}</h1>
          <h4 className="post-description"></h4>
          <div className="post-date" style={{ marginTop: "20px" }}>
            {time.getFullYear()}년 {time.getMonth() + 1}월 {time.getDate()}일
          </div>
          <ul className="post-tags">
            {categories.map((category, key) => (
              <li key={key}>{category}</li>
            ))}
          </ul>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="post-container">
            <ReactMarkdown children={content} renderers={renderers} />
          </div>
        </div>
      </main>
    </>
  );
}

const renderers = {
  code: ({ value }) => {
    return (
      <div className="highlighter-rouge">
        <div className="highlight">
          <pre className="highlight">
            <code>{value}</code>
          </pre>
        </div>
      </div>
    );
  },
};

PostTemplate.getInitialProps = async context => {
  const { slug } = context.query;

  const content = await import(`../../content/${slug}.md`);

  const data = matter(content.default);

  return { ...data };
};
