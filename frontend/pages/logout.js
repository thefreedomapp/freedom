import { remove } from 'js-cookie';
import { Component } from 'react';

export default class Logout extends Component {
  componentDidMount() {
    remove('id');
    window.location.replace('/login');
  }

  render() {
    return <h1>Logging Out</h1>;
  }
}
