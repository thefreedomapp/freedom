import { Component } from 'react';
import io from 'socket.io-client';
import { get } from 'js-cookie';

export default class Layout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const socket = io(),
      id = get('id');

    if (id) {
      socket.emit('online', id);
      setInterval(socket.emit, 5000, 'keepOnline', id);
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
