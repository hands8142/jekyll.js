import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Head from "next/head";
import yaml from "js-yaml";
import fs from "fs";

export default function PostTemplate({ data, config }) {
  const frontmatter = data.data;
  const content = data.content

  const time = new Date(frontmatter.date);

  const categories = frontmatter.categories.split(" ");

  return (
    <>
    <Head>
      <title>{frontmatter.title}</title>
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

export const getServerSideProps: GetServerSideProps = async context => {
  const config = yaml.safeLoad(fs.readFileSync("./config.yml", "utf8"), "utf8");
  const { slug } = context.params;
  const content = await import(`../../content/${slug}.md`);
  const data = matter(content.default);
  data.data.date = String(data.data.date)
  data.orig = null
  return {
    props: {
      data,
      config,
    },
  };
};
