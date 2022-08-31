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
							crossorigin="anonymous"></script>
						<Outlet />
					</main>
				</div>
			</div>
		);
	}
}

export default AppBase;