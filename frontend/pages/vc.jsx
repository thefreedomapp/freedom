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
      const conn = peer.connect(data.id);
      conn.on('open', () => {
        conn.send('hello!');
      });
      peer.on('connection', (conn) => {
        conn.on('data', (data) => {
          alert(data);
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
