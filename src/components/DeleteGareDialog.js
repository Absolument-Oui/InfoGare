import React, { Component } from 'react';

import { MDCDialog } from '@material/dialog';

import { getAuth } from 'firebase/auth';
import { getDatabase, ref, remove } from 'firebase/database';

import "../index.scss";

class DeleteGareDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.deleteDialogRef = React.createRef();
    }

    render() {
        return (
            <div className="mdc-dialog" id={'delete-' + this.props.componentRef} ref={this.deleteDialogRef}>
                <div className='mdc-dialog__container'>
                    <div className="mdc-dialog__surface" role="alertdialog" aria-modal="true" aria-labelledby='delete-dialog-title' aria-describedby='logout-dialog-content'>
                        <h2 className="mdc-dialog__title" id='delete-dialog-title'>Supprimer</h2>
                        <div className="mdc-dialog__content" id='delete-dialog-content'>
                            Voulez-vous vraiment supprimer cette gare ?
                        </div>
                        <footer className="mdc-dialog__actions">
                            <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="cancel">
                                <div className='mdc-button__ripple'></div>
                                <span className="mdc-button__label">Annuler</span>
                            </button>
                            <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes">
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

    componentDidMount() {
        const deleteDialog = new MDCDialog(this.deleteDialogRef.current);
        deleteDialog.listen('MDCDialog:closing', (event) => {
            if (event.detail.action === 'yes') {
                const db = getDatabase();
                const uid = getAuth().currentUser.uid;
                const id = this.props.id;
                remove(ref(db, 'users/' + uid + '/gares/' + id)).then(() => {
                    window.location.href = '/account';
                });
            }
        });
    }
}

export default DeleteGareDialog;