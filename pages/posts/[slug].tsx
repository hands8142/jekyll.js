import ReactMarkdown from "react-markdown";
import { GetStaticPaths, GetStaticProps } from "next";
import yaml from "js-yaml";
import fs from "fs";
import Analytics from "@includes/analytics";
import { getPostBySlug, getAllPosts } from "@util";
import Header from "@includes/header";
import PostHeader from "@includes/post_header";

export default function PostTemplate({ post, config, slug }) {
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
          {config.disqus_shortname ? (
            <>
              <div id="disqus_thread" style={{ marginTop: "25px" }}></div>
              <script
                dangerouslySetInnerHTML={{
                  __html: `var disqus_config = function () {
            this.page.url = "${config.baseUrl}/posts/${slug}/";
            this.page.identifier = "${config.baseUrl}/posts/${slug}/";
          };
          (function () {
            var d = document,
              s = d.createElement("script");
            s.src = "https://${config.disqus_shortname}.disqus.com/embed.js";
            s.setAttribute("data-timestamp", +new Date());
            (d.head || d.body).appendChild(s);
          })();`,
                }}
              />
              <noscript>
                Please enable JavaScript to view the
                <a href="https://disqus.com/?ref_noscript" rel="nofollow">
                  comments powered by Disqus.
                </a>
              </noscript>
            </>
          ) : null}
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
  const slug = context.params.slug;
  const post = await getPostBySlug(slug);
  return {
    props: {
      post,
      config,
      slug,
    },
  };
};
