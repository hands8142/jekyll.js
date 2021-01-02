import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import yaml from "js-yaml";
import Link from "next/link";
import Head from "next/head";
import Analytics from "../lib/analytics";
import ReactMarkdown from "react-markdown";

export default function Home({ contents, config }) {
  let datas: matter.GrayMatterFile<any>[] = [];
  for (let content of contents) {
    const data = matter(content);
    datas.push(data);
  }
  datas = datas.sort(date_descending);
  return (
    <>
      <Head>
        <Analytics config={config} />
        <title>{config.title}</title>
        <meta property="og:title" content={config.title} />
        <meta name="description" content={config.description} />
        <meta property="og:description" content={config.description} />
        <meta name="twitter:card" content="summary" />
        <meta property="twitter:title" content={config.title} />
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
            {datas.map((data, key) => {
              const time = new Date(data.data.date);
              return (
                <li key={key}>
                  <div className="post-meta">
                    <Link href={`/posts/${data.data.name}/`}>
                      <h2 className="post-title">{data.data.title}</h2>
                    </Link>
                    <div className="post-date">
                      <i className="icon-calendar"></i>
                      {time.getFullYear()}년 {time.getMonth() + 1}월{" "}
                      {time.getDate()}일
                    </div>
                  </div>
                  <div className="post">
                    <ReactMarkdown children={data.data.description} />
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
  var dateA = new Date(a.data.date).getTime();
  var dateB = new Date(b.data.date).getTime();
  return dateA < dateB ? 1 : -1;
};

export const getStaticProps: GetStaticProps = async context => {
  const config = yaml.safeLoad(fs.readFileSync("./config.yml", "utf8"), "utf8");
  const files: string[] = await fs.readdirSync("./content", "utf8");
  let contents: Object[] = [];
  for (let file of files) {
    const content = await import(`../content/${file}`);
    contents.push(content.default);
  }
  return {
    props: {
      contents,
      config,
    },
  };
};
