import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { GA_TRACKING_ID } from '../utils/gtag'

export default class MyDocument extends Document {
  render() {
    return (
      <Html className="w-full h-full scroll-smooth">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `,
            }}
          /> */}
          <link rel="shortcut icon" href="/favicon.svg" />
          {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
          <title>Scrawl</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
