import { Component } from 'react';
import { Layout, Button } from 'components';
import io from 'socket.io-client';
import cookies from 'js-cookie';

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ''
    };
  }
  componentDidMount() {
    this.socket = io();

    document.getElementById('test').addEventListener('click', () =>
      this.socket.send(
        {
          message: this.state.message ?? '',
          id: cookies.get('id')
        },
        (data) => {
          this.setState({ data: data.message });
          if (!data.sent) cookies.remove('id');
        }
      )
    );

    this.socket.on(
      'message',
      (op) =>
        (document.getElementById(
          'output'
        ).innerHTML += `<span><br/>${op.user.username}: ${op.message}</span>`)
    );

    this.socket.on('online', (users) =>
      users.map(
        (user) =>
          (document.getElementById(
            'online'
          ).innerHTML += `<span id='${user.id}' class='onlineUser'><br />${user.username}</span>`)
      )
    );

    this.socket.on('offline', (user) =>
      document.getElementById(user.id)?.remove()
    );
  }

  render() {
    return (
      <Layout>
        <style>{`
                    input {
                        margin-bottom: 10px;
                    }


                    #output span * {
                        display: inline-block;
                    }
                    
                    #online {
                      margin: 100px;
                    }
                `}</style>
        <input
          placeholder='Send A Message!'
          onChange={(e) => this.setState({ message: e.target.value })}
        ></input>
        <br />
        <Button id='test'>Send Message</Button>
        <div
          id='output'
          dangerouslySetInnerHTML={{ __html: this.state.data }}
        ></div>
        <div id='online'>
          <h2>Online Users</h2>
          <hr />
        </div>
      </Layout>
    );
  }
}
