import { Layout } from 'components';
import dynamic from 'next/dynamic';
import { Component } from 'react';

export default class Vc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };
  }
  componentMount() {}

  async onClick() {
    socket.emit('usernameToID', this.state.username, (data) => {
      if (!data.exists);
    });
  }

  render() {
    return (
      <Layout mount={() => this.componentMount()}>
        <input
          onChange={(e) => this.setState({ username: e.target.value })}></input>
        <br />
        <button onClick={() => this.onClick()}>Click Me To Start VC</button>
      </Layout>
    );
  }
}
