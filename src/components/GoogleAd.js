import React, { Component } from 'react';

class GoogleAd extends Component {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render() {
        return (
            <ins className="adsbygoogle"
                style={{display: 'block'}}
                data-ad-client="ca-pub-3014614649994013"
                data-ad-slot={this.props.slot}
                data-ad-format="auto" />
        );
    }
}

export default GoogleAd;