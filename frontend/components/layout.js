import { Component } from 'react';
import { get } from 'js-cookie';
import io from 'socket.io-client';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    };
  }

  async componentDidMount() {
    const id = get('id');
    require('peerjs');

    if (!id) return;

    console.log(typeof Peer);
    window.socket = io();
    window.peer = new Peer(id, { host: '/', path: '/peerjs', port: 80 });
    window.id = id;

    this.setState({ ready: true });
    socket.emit('online', id);
    setInterval(() => socket.emit('keepOnline', id), 500);
  }

  render() {
    if (this.state.ready === true) return this.props.children;
    return (
      <h1>
        Loading <b>Freedom</b>, Please Wait...
      </h1>
    );
  }
}
