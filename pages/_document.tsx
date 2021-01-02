import Document, { Head, Main, NextScript, Html } from "next/document";
import yaml from "js-yaml";
import fs from "fs";

const config = yaml.safeLoad(fs.readFileSync("./config.yml", "utf8"), "utf8");

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          {config.analytics_id ? (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${config.analytics_id}`}
              ></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${config.analytics_id}');`,
                }}
              ></script>
            </>
          ) : null}
          <link
            href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
