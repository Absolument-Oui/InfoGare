import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.scss";
import logo from "../assets/img/common/favicon_v2.svg";

import { MDCDialog } from "@material/dialog";

import LogoutDialog from "./LogoutDialog";

class AppBar extends Component {

    render() {
        if (this.props.user) {
            return (
                <header className="mdc-top-app-bar app-bar">
                    <div className="mdc-top-app-bar__row">
                        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                            <Link to="/"><img src={logo} width="48" alt="InfoGare" /></Link>
                            <Link to=""><span className="mdc-top-app-bar__title">InfoGare</span></Link>
                        </section>
                        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                            <Link to="/account"><button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Mon compte" id="myAccountBtn">person</button></Link>
                            <Link to="users"><button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Tout les utilisateurs" id="allUsersBtn">people</button></Link>
                            <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Se déconnecter" id="logoutBtn" onClick={this.logoutBtnPressed}>logout</button>
                        </section>
                    </div>
                    <LogoutDialog auth={this.props.auth} />
                </header>
            );
        } else {
            return (
                <header className="mdc-top-app-bar app-bar">
                    <div className="mdc-top-app-bar__row">
                        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                            <Link to="/"><img src={logo} width="48" alt="InfoGare" /></Link>
                            <Link to=""><span className="mdc-top-app-bar__title">InfoGare</span></Link>
                        </section>
                        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                            <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Se connecter" id="loginBtn" onClick={this.loginBtnPressed}>login</button>
                        </section>
                    </div>
                </header>
            );
        }
    }

    logoutBtnPressed() {
        const logoutDialog = new MDCDialog(document.querySelector('#logout-dialog'));
        logoutDialog.open();
    }

    loginBtnPressed() {
        document.location.href = 'https://auth.infogare.fr/v2/redirect?service=infogare&version=beta';
    }
}

export default AppBar;