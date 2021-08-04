import { Layout } from 'components';
import { Component } from 'react';
import parse from 'html-react-parser';

export default class Vc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      error: <></>,
      output: <></>
    };
  }
  componentMount() {}

  async onClick() {
    socket.emit('usernameToID', this.state.username, (data) => {
      if (!data.exists)
        return this.setState({ error: <>{parse(data.message)}</> });
      else this.setState({ error: <></> });
      alert(data.id);
      const conn = peer.connect(data.id);
      console.log('connection');
      conn.on('open', () => {
        // here you have conn.id
        alert('connected! 2');
        conn.send('hi! 2');
      });
      peer.on('connection', (conn) => {
        conn.on('data', (data) => {
          // Will print 'hi!'
          alert('connected! 1');
          console.log(data);
        });
      });
    });
  }

  render() {
    return (
      <Layout mount={() => this.componentMount()}>
        <input
          onChange={(e) => this.setState({ username: e.target.value })}></input>
        <br />
        <button onClick={() => this.onClick()}>Click Me To Start VC</button>
        <div id='error'>{this.state.error}</div>
        <audio id='output'>{this.state.output}</audio>
      </Layout>
    );
  }
}
