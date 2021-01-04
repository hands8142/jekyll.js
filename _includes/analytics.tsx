export default function Analytics({ config }) {
  if (config.analytics_id) {
    return (
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
    );
  } else {
    return <></>;
  }
}
