import { Component } from 'react';

export default class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem('id');
    localStorage.removeItem('auth');
    window.location.href = '/login';
  }

  render() {
    return <h1>Logging Out</h1>;
  }
}
