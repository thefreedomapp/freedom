import { Component } from 'react';
import { Layout } from 'components';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  mount() {
    this.setState({ loggedIn });
  }

  render() {
    return (
      <Layout mount={() => this.mount()}>
        {this.state.loggedIn ? (
          <>
            <h1>Freedom.</h1>
            <h3>
              <a href='/app'>Go to the app!</a>
            </h3>
          </>
        ) : (
          <>
            <h1>Freedom.</h1>
            <h3>
              A man who believes in freedom will do anything under the sun to
              acquire, or preserve his freedom.
              <br />
              <i>- Malcom X</i>
            </h3>
          </>
        )}
      </Layout>
    );
  }
}
