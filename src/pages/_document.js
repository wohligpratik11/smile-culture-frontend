import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add the favicon */}
          <link rel="icon" href="/favicon.ico" />
          {/* Add global stylesheets, including Tailwind CSS */}
          <link rel="stylesheet" href="../../src/styles/globals.css" />
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
