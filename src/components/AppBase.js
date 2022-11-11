import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import GoogleAd from './GoogleAd';

class AppBase extends Component {
	render() {
		return (
			<div>
				<AppBar user={this.props.user} auth={this.props.auth} />
				<div className="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
					<main className="main-content" id="main-content">
						<Outlet />
					</main>
				</div>
			</div>
		);
	}
}

export default AppBase;