import React, { Component } from 'react';

import { MDCTextField } from '@material/textfield';

class IssuePage extends Component {
    constructor(props) {
        super(props);

        this.usernameRef = React.createRef();
        this.discordUsernameRef = React.createRef();
    }

    render() {
        return (
            <div>
                <h1>Rapporter un bug</h1>
                <p>Si vous avez constater une anomalie sur le site, veuillez nous le faire savoir via ce formulaire.</p>
                <label className="inpage-form full-width mdc-text-field mdc-text-field--outlined" ref={this.usernameRef}>
                    <span className="mdc-notched-outline">
                        <span className="mdc-notched-outline__leading"></span>
                        <span className="mdc-notched-outline__notch">
                        <span className="mdc-floating-label" id="username-label">Nom d'utilisateur</span>
                        </span>
                        <span className="mdc-notched-outline__trailing"></span>
                    </span>
                    <input type="text" className="mdc-text-field__input" aria-labelledby="username-label" />
                </label><br /><br />
                <label className="inpage-form full-width mdc-text-field mdc-text-field--outlined" ref={this.discordUsernameRef}>
                    <span className="mdc-notched-outline">
                        <span className="mdc-notched-outline__leading"></span>
                        <span className="mdc-notched-outline__notch">
                        <span className="mdc-floating-label" id="username-label">Tag Discord *</span>
                        </span>
                        <span className="mdc-notched-outline__trailing"></span>
                    </span>
                    <input type="text" className="mdc-text-field__input" aria-labelledby="username-label" />
                </label><br />
                <i>* Applicable uniquement si vous avez rejoint le <a href="https://link.infogare.fr/Discord" target="_blank">serveur Discord</a> d'InfoGare</i>
            </div>
        );
    }

    componentDidMount() {
        const username = new MDCTextField(this.usernameRef.current);
        const discordUsername = new MDCTextField(this.discordUsernameRef.current);
    }
}

export default IssuePage;