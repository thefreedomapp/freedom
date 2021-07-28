import { Component } from 'react';

export default class Logout extends Component {
  componentDidMount() {
    require('js-cookie').remove('id');
    window.location.href = '/login';
  }

  render() {
    return <h1>Logging Out</h1>;
  }
}
