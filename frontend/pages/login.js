import { Component } from 'react';
import { Button, Layout } from 'components';
import hash from 'utils/hashing.ts';
import cookies from 'js-cookie';
import io from 'socket.io-client';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    if (cookies.get('id')) return window.location.replace('/');

    this.socket = io();

    document.getElementById('login').addEventListener('click', () =>
      this.socket.emit(
        'login',
        {
          email: this.state.email,
          password: hash(this.state.password)
        },
        this.login.bind(this)
      )
    );
  }

  login(data) {
    if (!data.logged_in) return this.setState({ data: data.message });

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
          placeholder='email'
          onChange={(e) => this.setState({ email: e.target.value })}
        ></input>
        <br />
        <input
          placeholder='password'
          onChange={(e) => this.setState({ password: e.target.value })}
        ></input>
        <br />
        <Button id='login'>Login</Button>
        <span
          id='output'
          dangerouslySetInnerHTML={{ __html: this.state.data }}
        ></span>
      </Layout>
    );
  }
}
