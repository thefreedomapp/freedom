import { Layout } from 'components';
import dynamic from 'next/dynamic';
import { Component } from 'react';

const Button = dynamic(() => import('elementz/lib/Components/Button'), {
  ssr: false
});

export default class Vc extends Component {
  componentDidMount() {}

  async onClick() {
    alert('This feature is still in development!');
  }

  render() {
    return (
      <Layout>
        <Button onClick={() => this.onClick()}>Click Me To Start VC</Button>
      </Layout>
    );
  }
}
