import React, { Component } from 'react';

import { MDCRipple } from '@material/ripple';

import '../index.scss';
import err from '../assets/img/common/404.png';

class NoPage extends Component {
    render() {
        return (
            <div className='center'>
                <br />
                <img src={err} alt="404" />
                <br /><br /><br />
                <button className='primary mdc-button mdc-button--raised mdc-button--leading' id="returnHomeBtn">
                    <span className='mdc-button__ripple'></span>
                    <i className='material-icons mdc-button__icon' aria-hidden="true">home</i>
                    <span className='mdc-button__label'>Retour à l'accueil</span>
                </button>
            </div>
        );
    }

    componentDidMount() {
        document.title = "404 - InfoGare";
        const returnHomeBtn = new MDCRipple(document.querySelector('#returnHomeBtn'));
        returnHomeBtn.listen('click', () => {
            window.location.href = '/';
        });
    }
}

export default NoPage;