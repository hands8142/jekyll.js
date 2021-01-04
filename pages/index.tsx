import fs from "fs";
import { GetStaticProps } from "next";
import yaml from "js-yaml";
import Link from "next/link";
import Analytics from "@includes/analytics";
import ReactMarkdown from "react-markdown";
import { getAllPosts } from "@util";
import Header from "@includes/header";
import PageHeader from "@includes/page_header";

export default function Home({ posts, config }) {
  return (
    <>
      <Analytics config={config} />
      <Header title={config.title} description={config.description} />
      <PageHeader config={config} />
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
}

export const getStaticProps: GetStaticProps = async context => {
  const config = yaml.safeLoad(fs.readFileSync("./config.yml", "utf8"), "utf8");
  let posts = await getAllPosts();
  posts = posts.sort(date_descending);
  return {
    props: {
      posts,
      config,
    },
  };
};
