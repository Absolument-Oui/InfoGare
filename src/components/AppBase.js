import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';

class AppBase extends Component {
	render() {
		return (
			<div>
				<AppBar user={this.props.user} auth={this.props.auth} />
				<div className="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
					<main className="main-content" id="main-content">
						<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3014614649994013"
							crossOrigin="anonymous"></script>
						<ins className="adsbygoogle"
							style={{display: 'inline-block', width: '728px', height:'90px'}}
							data-ad-client="ca-pub-3014614649994013"
							data-ad-slot="5523609982"></ins>
						<script>
							(adsbygoogle = window.adsbygoogle || []).push({ });
						</script>
						<Outlet />
					</main>
				</div>
			</div>
		);
	}
}

export default AppBase;