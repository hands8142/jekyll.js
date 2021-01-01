import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";

export default function Home({ contents }) {
  let datas: matter.GrayMatterFile<any>[] = [];
  for (let content of contents) {
    const data = matter(content);
    datas.push(data);
  }
  return (
    <>
      <header className="texture-black">
        <div className="container">
          <div className="navbar">
            <ul>
              <a href="/">
                <li className="active">HOME</li>
              </a>
            </ul>
          </div>
        </div>
        <div className="container">
          <h1>한동수</h1>
          <h2>Developer</h2>
          <ul className="social">
            <a href="https://github.com/hands8142">
              <li>
                <i className="icon-github-circled"></i>
              </li>
            </a>
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
                    <a className="post-link" href={`/posts/${data.data.name}/`}>
                      <h2 className="post-title">{data.data.title}</h2>
                    </a>
                    <div className="post-date">
                      <i className="icon-calendar"></i>
                      {time.getFullYear()}년 {time.getMonth() + 1}월{" "}
                      {time.getDate()}일
                    </div>
                  </div>
                  <div className="post">
                    <p>{data.data.description}</p>
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

export const getStaticProps: GetStaticProps = async context => {
  const files: string[] = await fs.readdirSync("./content", "utf8");
  let contents: Object[] = [];
  for (let file of files) {
    const content = await import(`../content/${file}`);
    contents.push(content.default);
  }
  return {
    props: {
      contents,
    },
  };
};
