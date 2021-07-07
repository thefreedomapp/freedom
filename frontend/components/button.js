import { Component } from 'react';
import PropTypes from 'prop-types';
import * as styles from 'styles/button.module.scss';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        {...this.props}
        className={`${styles.btn} ${styles[`btn-${this.props.appearence}`]}`}
      >
        {this.props.children}
      </button>
    );
  }

  static defaultProps = {
    disabled: false,
    appearence: 'default'
  };

  static propTypes = {
    disabled: PropTypes.bool,
    appearence: PropTypes.oneOf(['primary', 'default', 'light'])
  };
}
