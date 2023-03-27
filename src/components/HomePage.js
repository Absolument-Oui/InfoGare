import React, { Component } from 'react';
import '../index.scss';

import biglogo from '../assets/img/common/logo_v2.svg';
import instgramlogo from '../assets/img/common/logo_instagram.svg';
import twitterlogo from '../assets/img/common/logo_twitter.svg';
import discordlogo from '../assets/img/common/logo_discord.svg';
import GoogleAd from './GoogleAd';

class HomePage extends Component {
    render() {
        return (
            <div className='center'>
                <div className='snows' id="snows"></div>
                <GoogleAd slot="5523609982" />
                <img src={biglogo} alt="InfoGare" id='logo' className='logo' />
                <h1>Bienvenue sur InfoGare !</h1>
                <h3><code>Créer des infogares deviens facile</code></h3>
                <div style={{ height: '100px' }}></div>
                <GoogleAd slot="5523609982" />
                <h2>Qu'est-ce qu'InfoGare ?</h2>
                <span>InfoGare est un site Internet qui vous permet de reproduire les écrans présents en gares SNCF en personnalisant les informations. Diverse options sont disponibles tel que la composition des trains, les gares desservies, les informations dynamiques et bien d'autres.</span><br />
                <small>ATTENTION : les informations sur les trains et gares que vous trouverez ici sont fictives !</small>
                <h2>Comment utiliser InfoGare ?</h2>
                <span>Il suffit tout simplement de vous créer un compte et vous pourrez ensuite créer des gares et trains. Vous disposez d'un guide complet <b><a href="https://docs.infogare.fr/InfoGare" target="_blank">ici</a></b> !</span>
                <h2>J'aimerais suivre les actualités du projet !</h2>
                <span>Voici les endroits où vous pouvez suivre le projet :</span><br /><br />
                <table>
                    <tbody>
                        <tr>
                            <td><img src={instgramlogo} height='32' alt='Instgaram' /></td>
                            <td><a href="https://link.infogare.fr/Instagram" target="_blank">@absolument_oui_dev</a></td>
                            <td>&nbsp;</td>
                            <td><img src={twitterlogo} height='32' alt='Twitter' /></td>
                            <td><a href="https://link.infogare.fr/Twitter" target="_blank">@AbsolumentOuiDe</a></td>
                            <td>&nbsp;</td>
                            <td><img src={discordlogo} height='32' alt='Discord' /></td>
                            <td><a href="https://link.infogare.fr/Discord" target="_blank">Serveur InfoGare</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    componentDidMount() {
        
    }
}

export default HomePage;