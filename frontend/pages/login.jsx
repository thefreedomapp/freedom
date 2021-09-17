import { Component } from 'react';
import { Layout } from 'components';
import hash from 'utils/hashing.ts';
import parse from 'html-react-parser';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      data: <></>
    };
  }

  componentMount() {
    if (window.loggedIn) return (window.location.href = '/');
  }

  onClick() {
    socket.emit(
      'login',
      {
        email: this.state.email,
        password: hash(this.state.password)
      },
      this.login.bind(this)
    );
  }

  login(data) {
    if (!data.logged_in)
      return this.setState({ data: <>{parse(data.message)}</> });

    localStorage.setItem('auth', data.user.id);
    localStorage.setItem('id', data.user.userid);
    window.location.href = '/';
  }

  render() {
    return (
      <Layout mount={() => this.componentMount()}>
        <style>{`
                    input {
                        margin: 10px;
                    }


                    #output {
                        display: block;
                    }
                `}</style>
        <input
          placeholder='email'
          onChange={(e) => this.setState({ email: e.target.value })}></input>
        <br />
        <input
          placeholder='password'
          onChange={(e) => this.setState({ password: e.target.value })}></input>
        <br />
        <button className='login' onClick={() => this.onClick()}>
          Login
        </button>
        <span id='output'>{this.state.data}</span>
      </Layout>
    );
  }
}
