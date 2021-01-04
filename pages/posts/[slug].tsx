import ReactMarkdown from "react-markdown";
import { GetStaticPaths, GetStaticProps } from "next";
import yaml from "js-yaml";
import fs from "fs";
import Analytics from "@includes/analytics";
import { getPostBySlug, getAllPosts } from "@util";
import Header from "@includes/header";
import PostHeader from "@includes/post_header";

export default function PostTemplate({ post, config }) {
  return (
    <>
      <Analytics config={config} />
      <Header title={post.title} description={post.categories.join(" ")} />
      <PostHeader post={post} />
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
  let paths = await getAllPosts();
  paths = paths.map(post => ({
    params: { slug: post.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const config = yaml.safeLoad(fs.readFileSync("./config.yml", "utf8"), "utf8");
  const post = await getPostBySlug(context.params.slug);
  return {
    props: {
      post,
      config,
    },
  };
};
