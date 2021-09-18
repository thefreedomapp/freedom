import { Component } from 'react';
import { Layout } from 'components';
import parse from 'html-react-parser';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: <></>,
      users: <></>,
      error: <></>
    };
  }
  componentMount() {
    socket.on('message', (msgs) =>
      msgs.map((msg) =>
        this.setState({
          messages: (
            <>
              {this.state.messages}
              <span>
                <br />
                {msg.author.username}: {parse(msg.content)}
              </span>
            </>
          )
        })
      )
    );
    socket.on('online', (users) =>
      users.map(
        (user) =>
          !user ||
          this.setState({
            users: (
              <>
                {this.state.users}
                <span id={user.userid} className='onlineUser'>
                  <br />
                  {user.codename}
                </span>
              </>
            )
          })
      )
    );
    socket.on('offline', (user) =>
      document.getElementById(user?.userid)?.remove()
    );
  }

  onClick() {
    socket.send(
      {
        message: this.state.message ?? '',
        id: auth
      },
      (err) => {
        this.setState({
          error: <>{parse(err)}</>
        });
      }
    );
  }

  render() {
    return (
      <Layout mount={() => this.componentMount()}>
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
          onChange={(e) => this.setState({ message: e.target.value })}></input>
        <br />
        <button className='test' onClick={() => this.onClick()}>
          Send Message
        </button>
        <div id='error'>{this.state.error}</div>
        <br />
        <div id='output'>{this.state.messages}</div>
        <div id='online'>
          <h2>Online Users</h2>
          <hr />
          <div>{this.state.users}</div>
        </div>
      </Layout>
    );
  }
}
