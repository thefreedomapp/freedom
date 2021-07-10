import { Component } from 'react';
import { Layout } from '../components';
import { Button } from 'elementz';
import hash from 'utils/hashing.ts';
import cookies from 'js-cookie';
import io from 'socket.io-client';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      name: '',
      pfp: ''
    };
  }

  componentDidMount() {
    if (cookies.get('id')) return window.location.replace('/');

    this.socket = io();

    document.getElementById('signup').addEventListener('click', () =>
      this.socket.emit(
        'signUp',
        {
          email: this.state.email,
          password: hash(this.state.password),
          name: this.state.name,
          username: this.state.username,
          pfp: this.state.pfp
        },
        this.signup.bind(this)
      )
    );
  }

  signup(data) {
    if (!data.created) return this.setState({ data: data.message });

    cookies.set('id', data.user.id);
    window.location.replace('/');
  }

  render() {
    return (
      <Layout>
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
          onChange={(e) => this.setState({ username: e.target.value })}
        ></input>
        <br />
        <input
          placeholder='email'
          onChange={(e) => this.setState({ email: e.target.value })}
        ></input>
        <br />
        <input
          placeholder='password'
          onChange={(e) => this.setState({ password: e.target.value })}
        ></input>
        <br />
        <input
          placeholder='full name'
          onChange={(e) => this.setState({ name: e.target.value })}
        ></input>
        <br />
        <Button id='signup'>Sign Up</Button>
        <span
          id='output'
          dangerouslySetInnerHTML={{ __html: this.state.data }}
        ></span>
      </Layout>
    );
  }
}
