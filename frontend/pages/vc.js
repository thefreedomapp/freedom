import io from 'socket.io-client';
import ss from 'socket.io-stream';
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
    ss(this.socket).emit('vc-stream', ss.createStream().pipe(), {
      hello: 'world'
    });
  }
  render() {
    return <Button onClick={() => this.onClick()}>Click Me To Start VC</Button>;
  }
}
