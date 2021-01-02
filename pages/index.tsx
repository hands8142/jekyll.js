import fs from "fs";
import { GetStaticProps } from "next";
import yaml from "js-yaml";
import Link from "next/link";
import Head from "next/head";
import Analytics from "../lib/analytics";
import ReactMarkdown from "react-markdown";
import { getAllPosts } from "@util";
import Header from "@includes/header";

export default function Home({ posts, config }) {
  posts = posts.sort(date_descending);
  return (
    <>
      <Head>
        <Analytics config={config} />
        <Header title={config.title} description={config.description} />
      </Head>
      <header className="texture-black">
        <div className="container">
          <div className="navbar">
            <ul>
              <Link href="/">
                <li className="active">HOME</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="container">
          <h1>{config.title}</h1>
          <h2>{config.tagline}</h2>
          <ul className="social">
            {config.social_links.github ? (
              <a href={`https://github.com/${config.social_links.github}`}>
                <li>
                  <i className="icon-github-circled"></i>
                </li>
              </a>
            ) : null}
            {config.social_links.linkedIn ? (
              <a href={`https://linkedin.com/${config.social_links.linkedIn}`}>
                <li>
                  <i className="icon-linkedin-squared"></i>
                </li>
              </a>
            ) : null}
            {config.social_links.twitter ? (
              <a href={`https://twitter.com/${config.social_links.twitter}`}>
                <li>
                  <i className="icon-twitter-squared"></i>
                </li>
              </a>
            ) : null}
          </ul>
        </div>
      </header>
      <main>
        <div className="container">
          <ul className="posts">
            {posts.map((post, key) => {
              const time = new Date(post.date);
              return (
                <li key={key}>
                  <div className="post-meta">
                    <Link href={`/posts/${post.slug}/`}>
                      <h2 className="post-title">{post.title}</h2>
                    </Link>
                    <div className="post-date">
                      <i className="icon-calendar"></i>
                      {time.getFullYear()}년 {time.getMonth() + 1}월{" "}
                      {time.getDate()}일
                    </div>
                  </div>
                  <div className="post">
                    <ReactMarkdown children={post.description} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </>
  );
}

function date_descending(a, b) {
  var dateA = new Date(a.date).getTime();
  var dateB = new Date(b.date).getTime();
  return dateA < dateB ? 1 : -1;
};

export const getStaticProps: GetStaticProps = async context => {
  const config = yaml.safeLoad(fs.readFileSync("./config.yml", "utf8"), "utf8");
  const allPosts = await getAllPosts()
  return {
    props: {
      posts: allPosts,
      config,
    },
  };
};
