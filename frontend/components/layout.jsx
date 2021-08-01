import { Component } from 'react';
import io from 'socket.io-client';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    };
  }

  async componentDidMount() {
    if (!(await (await fetch('/api/isDev')).json()).isDev)
      setInterval(() => {
        console.clear();
        console.log(`${stopSign()}\n     
    Keep your account safe! Do not send any information from
    here to anyone or paste any text here.

    If someone is asking you to copy or paste text here then
    you're giving someone access to your account.
    
    If you know what you're doing, come work with us! https://freedomapp.cc/jobs`);
      }, 1000);

    const id = localStorage.getItem('id');
    require('peerjs');

    window.socket = io();
    //window.peer = new window.Peer(id, { host: '/', path: '/peerjs', port: 80 });
    window.id = id;

    this.setState({ ready: true });
    this.props.mount();

    if (!id) return;
    socket.emit('online', id);
    setInterval(() => socket.emit('keepOnline', id), 500);
  }

  render() {
    return (
      <div>
        {this.state.ready ? (
          this.props.children
        ) : (
          <h1>
            Loading <b>Freedom</b>, Please Wait...
          </h1>
        )}
      </div>
    );
  }
}

// Long lines of text, ignore this function
function stopSign() {
  return `


          ██████████████████████████████████████████████████████████    
        ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██  
      ██░░░░░░██████░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒████████▒▒▒▒▒▒██
      ██░░░░██░░░░░░░░░░██████████░░░░████████▒▒▒▒▒▒▒▒██▒▒▒▒▒▒▒▒██▒▒▒▒██
      ██░░░░██░░░░░░░░░░░░░░██░░░░░░██▒▒▒▒▒▒▒▒██▒▒▒▒▒▒██▒▒▒▒▒▒▒▒██▒▒▒▒██
      ██░░░░██░░░░░░░░░░░░░░██░░░░░░██▒▒▒▒▒▒▒▒██▒▒▒▒▒▒██▒▒▒▒▒▒▒▒██▒▒▒▒██
      ██░░░░░░██████░░░░░░░░██░░▒▒▒▒██▒▒▒▒▒▒▒▒██▒▒▒▒▒▒██▒▒▒▒▒▒▒▒██▒▒▒▒██
      ██░░░░░░░░░░░░██░░░░░░██▒▒▒▒▒▒██▒▒▒▒▒▒▒▒██▒▒▒▒▒▒██████████▒▒▒▒▒▒██
      ██░░░░░░░░░░░░██░░░░▒▒██▒▒▒▒▒▒██▒▒▒▒▒▒▒▒██▒▒▒▒▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
      ██░░░░░░░░░░░░██░░▒▒▒▒██▒▒▒▒▒▒██▒▒▒▒▒▒▒▒██▒▒▒▒▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
      ██░░░░████████░░░░▒▒▒▒██▒▒▒▒▒▒▒▒████████▒▒▒▒▒▒▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
        ██░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██  
          ██████████████████████████████████████████████████████████    




`;
}
