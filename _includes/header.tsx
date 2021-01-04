import Head from "next/head";

export default function Header({title, description}) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:title" content={title} />
    </Head>
  );
}
