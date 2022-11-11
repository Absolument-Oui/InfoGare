import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

import { MDCRipple } from '@material/ripple';
import { MDCDialog } from '@material/dialog';

import "../index.scss";
import GareCard from './GareCard';
import { child, get, getDatabase, ref } from 'firebase/database';
import NewGareDialog from './NewGareDialog';
import GoogleAd from './GoogleAd';

class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className='center'>
                    <img className='profile-pict' id='profilePict' width="128" height="128" alt="InfoGare" hidden />
                    <span className='material-icons big-icon' id='editProfilePictBtn'>account_circle</span>
                    <br />
                    <h1 id='username' className='inline-block'>Nom d'utilisateur</h1>&nbsp;&nbsp;<button className='mdc-icon-button material-icons inline-block' id='editBtn'><div className='mdc-icon-button__ripple'>edit</div></button>
                    <br />
                    <h3 id='email' className='inline-block'>Email</h3>
                    <br />
                    <button className='mdc-icon-button material-icons ripple-upgrade' id='newGare'><div className='mdc-icon-button__ripple'>add</div></button>
                    <GoogleAd slot="4075321002" />
                    <div id='cards'>

                    </div>
                    <NewGareDialog />
                </div>
            </div>
        );
    }

    componentDidMount() {
        document.title = "Mon compte - InfoGare";
        const db = ref(getDatabase());
        
        document.getElementById('username').innerHTML = this.props.user.displayName;
        document.getElementById('email').innerHTML = this.props.user.email;
        if (this.props.user.photoURL) {
            document.getElementById('profilePict').src = this.props.user.photoURL;
            document.getElementById('profilePict').hidden = false;
            document.getElementById('editProfilePictBtn').style.display = 'none';
        }
        const editBtn = new MDCRipple(document.querySelector('#editBtn'));
        editBtn.listen('click', () => {
            window.open('https://auth.infogare.fr/v2/account', '', 'width=750,height=750');
        });

        const newGareBtn = new MDCRipple(document.querySelector('#newGare'));
        newGareBtn.listen('click', () => {
            const newGareDialog = new MDCDialog(document.querySelector('#newGareDialog'));
            newGareDialog.open();
        });

        const root = createRoot(document.getElementById('cards'));

        get(child(db, '/users/' + this.props.user.uid + '/gares')).then(gares => {
            const elements = [];
            gares.forEach(gare => {
                let gareType;
                if (gare.child('type').val() === 'neutral') {
                    gareType = 'Gare classique';
                } else {
                    gareType = 'Gare RER';
                }
                const card = <GareCard key={elements.length} uid={this.props.user.uid} name={gare.child('name').val()} type={gareType} number={gare.child('trains').size} id={gare.key} />;
                elements.push(card);
            });
            root.render(elements);
        });
    }
}


export default AccountPage;