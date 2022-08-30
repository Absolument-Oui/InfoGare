import { signOut } from 'firebase/auth';
import React, { Component } from 'react';
import '../index.scss';

class LogoutDialog extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    render() {
        return (
            <div className="mdc-dialog" id="logout-dialog">
                <div className='mdc-dialog__container'>
                    <div className="mdc-dialog__surface" role="alertdialog" aria-modal="true" aria-labelledby='logout-dialog-title' aria-describedby='logout-dialog-content'>
                        <h2 className="mdc-dialog__title" id='logout-dialog-title'>Se déconnecter</h2>
                        <div className="mdc-dialog__content" id='logout-dialog-content'>
                            Voulez-vous vraiment vous déconnecter d'InfoGare ?
                        </div>
                        <footer className="mdc-dialog__actions">
                            <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="cancel">
                                <div className='mdc-button__ripple'></div>
                                <span className="mdc-button__label">Annuler</span>
                            </button>
                            <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" onClick={this.logout}>
                                <div className='mdc-button__ripple'></div>
                                <span className="mdc-button__label">Oui</span>
                            </button>
                        </footer>
                    </div>
                </div>
                <div className="mdc-dialog__scrim"></div>
            </div>
        );
    }

    logout() {
        console.log('logout');
        signOut(this.props.auth).then(() => {
            window.location.href = '/';
        }).catch(error => {
            console.log(error);
        });
    }
}

export default LogoutDialog;