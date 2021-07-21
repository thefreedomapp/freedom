import io from 'socket.io-client';
import ss from 'socket.io-stream';
import { Layout } from 'components';
import dynamic from 'next/dynamic';
import { Component } from 'react';

const Button = dynamic(() => import('elementz/lib/Components/Button'), {
  ssr: false
});

export default class Vc extends Component {
  componentDidMount() {
    this.socket = io();
  }

  async onClick() {
    const stream = ss.createStream();
    ss(this.socket).emit('vc-stream', stream, {
      hello: 'world'
    });
    try {
      stream.pipe(
        await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        })
      );
    } catch (e) {}
  }
  render() {
    return (
      <Layout>
        <Button onClick={() => this.onClick()}>Click Me To Start VC</Button>
      </Layout>
    );
  }
}
