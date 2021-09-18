import { Component } from 'react';
import io from 'socket.io-client';
import { CgLogIn, CgLogOut } from 'react-icons/cg';
export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      loggedIn: false
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
    (this.props.mount || (() => {}))();

    this.setState({ loggedIn: (window.loggedIn = false) });

    if (!auth) return;

    this.setState({ loggedIn: (window.loggedIn = true) });
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
              <a href='mailto:mahir@molai.dev'>Support</a>
            </span>
          </div>
          <div className='nav-right'>
            {this.state.loggedIn ? (
              <a href='/logout'>
                <span>Login</span> <CgLogOut className='loginIcon' />
              </a>
            ) : (
              <a href='/login'>
                <span>Logout</span> <CgLogIn className='loginIcon' />
              </a>
            )}
          </div>
        </nav>

        {this.state.ready ? (
          this.props.children
        ) : (
          <h1>
            Loading <span className='freedom'>Freedom</span>, Please Wait...
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
