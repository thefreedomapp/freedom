import { Component } from 'react';
import { Layout } from 'components';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: ''
    };
  }

  componentMount() {
    this.setState({ quote: window.quote });
  }

  render() {
    return (
      <Layout mount={() => this.componentMount()}>
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
              {this.state.quote.quote}
              <br />
              <i>- {this.state.quote.author}</i>
            </h3>
          </>
        )}
      </Layout>
    );
  }
}
