import Link from "next/link";

export default function PageHeader({ config }) {
  return (
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
  );
}
