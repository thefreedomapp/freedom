import { Component } from 'react';
import { get } from 'js-cookie';
import { Provider } from 'react-redux';
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

    if (!id) return;

    window.socket = io();
    window.id = id;

    this.setState({ ready: true });
    socket.emit('online', id);
    setInterval(() => socket.emit('keepOnline', id), 500);
  }

  render() {
    return (
      <Provider>
        {this.state.ready ? (
          this.props.children
        ) : (
          <h2>
            Loading <code>freedom</code>, Please Wait...
          </h2>
        )}
      </Provider>
    );
  }
}
