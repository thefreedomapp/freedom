import { Layout } from 'components';
import dynamic from 'next/dynamic';
import { Component } from 'react';

const Button = dynamic(() => import('elementz/lib/Components/Button'), {
  ssr: false
});

const Input = dynamic(() => import('elementz/lib/Components/Input'), {
  ssr: false
});

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
        <Input
          onChange={(e) => this.setState({ username: e.target.value })}></Input>
        <br />
        <Button onClick={() => this.onClick()}>Click Me To Start VC</Button>
      </Layout>
    );
  }
}
