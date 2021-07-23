import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <iframe
            src='https://freedom.instatus.com/embed-status/dark-sm'
            width='245'
            height='61'
            frameBorder='0'
            scrolling='no'
            className='status'
          ></iframe>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
