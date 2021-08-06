import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            data-ad-client='ca-pub-7979230612831330'
            async
            src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <iframe
            src='https://freedom.instatus.com/embed-status/dark-sm'
            width='245'
            height='61'
            frameBorder='0'
            scrolling='no'
            className='status'></iframe>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
