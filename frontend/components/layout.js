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
    window.peer = new Peer(id, { host: '/', path: '/peerjs' });
    window.id = id;

    this.setState({ ready: true });
    socket.emit('online', id);
    setInterval(() => socket.emit('keepOnline', id), 500);
  }

  render() {
    return (
      <div>
        {this.state.ready ? (
          this.props.children
        ) : (
          <h2>
            Loading <code>freedom</code>, Please Wait...
          </h2>
        )}
      </div>
    );
  }
}
