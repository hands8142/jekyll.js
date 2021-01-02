import ReactMarkdown from "react-markdown";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import yaml from "js-yaml";
import fs from "fs";
import Analytics from "../../lib/analytics";
import { getPostBySlug , getAllPosts } from "@util";
import Header from "@includes/header";

export default function PostTemplate({ post, config }) {
  const time = new Date(post.date);
  return (
    <>
      <Head>
        <Analytics config={config} />
        <Header title={post.title} description={post.categories.join(" ")} />
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
      <main>
        <div className="container">
          <div className="post-container">
            <ReactMarkdown children={post.content} renderers={renderers} />
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

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = await getAllPosts()
  paths = paths.map(post => ({
    params: { slug: post.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const config = yaml.safeLoad(
    fs.readFileSync("./config.yml", "utf8"),
    "utf8"
  );
  const post = await getPostBySlug(context.params.slug)
  return {
    props: {
      post,
      config,
    },
  };
};
