import { Component } from 'react';
import { Layout } from '../components';
import hash from 'utils/hashing.ts';
import parse from 'html-react-parser';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      name: '',
      pfp: '',
      data: <></>
    };
  }

  componentMount() {
    if (window.loggedIn) return (window.location.href = '/');
  }
  onClick() {
    socket.emit(
      'signUp',
      {
        email: this.state.email,
        password: hash(this.state.password),
        name: this.state.name,
        username: this.state.username,
        pfp: this.state.pfp
      },
      this.signup.bind(this)
    );
  }

  signup(data) {
    if (!data.created)
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
          placeholder='username'
          onChange={(e) => this.setState({ username: e.target.value })}></input>
        <br />
        <input
          placeholder='email'
          onChange={(e) => this.setState({ email: e.target.value })}></input>
        <br />
        <input
          placeholder='password'
          onChange={(e) => this.setState({ password: e.target.value })}></input>
        <br />
        <input
          placeholder='full name'
          onChange={(e) => this.setState({ name: e.target.value })}></input>
        <br />
        <button id='signup' onClick={() => this.onClick()}>
          Sign Up
        </button>
        <span id='output'>{this.state.data}</span>
      </Layout>
    );
  }
}
