import { Component } from 'react';

export default class Ad extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className={`adsbygoogle ${
          this.props.fixed
            ? 'fixedAd'
            : this.props.left
            ? 'leftAd'
            : this.props.right
            ? 'rightAd'
            : ''
        }`}
        style={{ display: 'block' }}
        data-ad-client='ca-pub-7979230612831330'
        data-ad-slot='6671535463'
        data-ad-format='auto'
      />
    );
  }
}

Ad.defaultProps = {
  left: false,
  right: false,
  fixed: false
};
