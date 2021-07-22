import { Component } from 'react';
import io from 'socket.io-client';
import { get } from 'js-cookie';
import Peer from 'peerjs';
export default class Layout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const id = get('id');

    if (!id) return;

    socket.emit('online', id);
    setInterval(() => socket.emit('keepOnline', id), 500);
    window.peer = new Peer(id, { host: '/' });
    window.socket = io();
    window.id = id;
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
