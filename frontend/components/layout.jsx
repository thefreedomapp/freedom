import { Component } from 'react';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    };
  }

  async componentDidMount() {
    if (!(await (await fetch('/api/isDev')).json()).isDev)
      console.log(`${stopSign()}\n     
    Keep your account safe! Do not send any information from
    here to anyone or paste any text here.

    If someone is asking you to copy or paste text here then
    you're giving someone access to your account.
    
    If you know what you're doing, come work with us! https://freedomapp.cc/jobs`);

    const auth = localStorage.getItem('auth');
    const id = localStorage.getItem('id');
    require('peerjs');

    window.socket = io();
    window.peer = new window.Peer(id, {
      host: '/',
      port: !window.location.port ? 81 : parseInt(window.location.port) + 1
    });
    window.auth = auth;
    window.id = id;

    this.setState({ ready: true });
    this.props.mount();

    if (!auth) return;
    socket.emit('online', auth);
    setInterval(() => socket.emit('keepOnline', auth), 500);
  }

  render() {
    return (
      <>
        <nav className='nav'>
          <div className='nav-left'>
            <div className='logo'>
              <a href='/'>
                <span className='freedom'>Freedom</span>
                <span className='function'>.</span>
              </a>
            </div>
          </div>
          <div className='nav-middle'>
            <span data-toggle='modal'>
              <a href='#projects'>Projects</a>
            </span>{' '}
            <span data-toggle='modal'>
              <a href='https://blog.molai.dev'>Blog</a>
            </span>
          </div>
          <div className='nav-right'>
            <a
              href='https://twitter.com/@DevMolai'
              target='_blank'
              rel='noreferrer'>
              <i className='fab fa-twitter' aria-hidden='true'></i>
            </a>
            <a
              href='https://www.youtube.com/channel/UC2VmvzguTHSq232VFAhJGrQ'
              target='_blank'
              rel='noreferrer'>
              <i className='fab fa-youtube' aria-hidden='true'></i>
            </a>{' '}
            <a href='mailto:mahir@molai.dev' target='_blank' rel='noreferrer'>
              <i className='fas fa-envelope' aria-hidden='true'></i>
            </a>
          </div>
        </nav>

        {this.state.ready ? (
          this.props.children
        ) : (
          <h1>
            Loading <b>Freedom</b>, Please Wait...
          </h1>
        )}
      </>
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
