import { Component } from 'react';
import { Layout } from 'components';
import hash from 'utils/hashing.ts';
import dynamic from 'next/dynamic';

const Button = dynamic(() => import('elementz/lib/Components/Button'), {
  ssr: false
});

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      data: <></>
    };
  }

  componentDidMount() {
    if (window.id) return (window.location.href = '/');
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
    if (!data.logged_in) return this.setState({ data: <>{data.message}</> });

    require('js-cookie').set('id', data.user.id);
    window.location.href = '/';
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
          onChange={(e) => this.setState({ email: e.target.value })}></input>
        <br />
        <input
          placeholder='password'
          onChange={(e) => this.setState({ password: e.target.value })}></input>
        <br />
        <Button className='login' onClick={() => this.onClick()}>
          Login
        </Button>
        <span id='output'>{this.state.data}</span>
      </Layout>
    );
  }
}
