import React, { Component } from 'react';

import { MDCTextField } from '@material/textfield';
import { MDCDialog } from '@material/dialog';
import { MDCRadio } from '@material/radio';

import { getDatabase, update, ref, get, child } from 'firebase/database';

import "../index.scss";

class EditGareDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.editGareName = React.createRef();
        this.editGareInfo = React.createRef();
        this.editGareAffichageType1 = React.createRef();
        this.editGareAffichageType2 = React.createRef();
        this.editGareInfosType1 = React.createRef();
        this.editGareInfosType2 = React.createRef();
        this.editGareDialog = React.createRef();
    }

    render() {
        return (
            <div className="mdc-dialog mdc-dialog--fullscreen" id={'edit-' + this.props.componentRef} ref={this.editGareDialog}>
                <div className='mdc-dialog__container'>
                    <div className="mdc-dialog__surface" role="dialog" aria-modal="true" aria-labelledby='editGareDialogTitle' aria-describedby='editGareDialgoContent'>
                        <div className="mdc-dialog__header">
                            <h2 className="mdc-dialog__title" id="editGareDialogTitle">Modifier la gare</h2>
                            <button className="mdc-icon-button material-icons mdc-dialog__close" data-mdc-dialog-action="close">close</button>
                        </div>
                        <div className="mdc-dialog__content" id="editGareDialogContent">
                            <br />
                            <div ref={this.editGareName} className="full-width mdc-text-field mdc-text-field--outlined">
                                <div className='mdc-notched-outline'>
                                    <div className='mdc-notched-outline__leading'></div>
                                    <div className='mdc-notched-outline__notch'>
                                        <label className="mdc-floating-label" id="gareNameLabel">Nom</label>
                                    </div>
                                    <div className='mdc-notched-outline__trailing'></div>
                                </div>
                                <input className="mdc-text-field__input" type="text" id="gareName" aria-labelledby='gareNameLabel' />
                            </div><br /><br />
                            <span>Type d'affichage</span><br />
                            <div className='mdc-form-field'>
                                <div className='mdc-radio' ref={this.editGareAffichageType1}>
                                    <input type="radio" id="gareAffichageType1" name="gareAffichageType" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="gareAffichageType1" className="mdc-radio__label">Classique</label>
                            </div>
                            <div className='mdc-form-field'>
                                <div className='mdc-radio' ref={this.editGareAffichageType2}>
                                    <input type="radio" id="gareAffichageType2" name="gareAffichageType" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="gareAffichageType2" className="mdc-radio__label">EVA</label>
                            </div><br /><br />
                            <label className="full-width mdc-text-field mdc-text-field--outlined mdc-text-field--textarea" ref={this.editGareInfo}>
                                <div className='mdc-notched-outline'>
                                    <div className='mdc-notched-outline__leading'></div>
                                    <div className='mdc-notched-outline__notch'>
                                        <span className='mdc-floating-label' id='gareInfoLabel'>Texte d'informations</span>
                                    </div>
                                    <div className='mdc-notched-outline__trailing'></div>
                                </div>
                                <span style={{width: '100%'}} className='mdc-text-filed__resizer'>
                                    <textarea  className="mdc-text-field__input" id="gareInfo" rows="4" aria-labelledby='gareInfoLabel'></textarea>
                                </span>
                            </label><br /><br />
                            <span>Type d'informations</span><br />
                            <div className="mdc-form-field">
                                <div className='mdc-radio' ref={this.editGareInfosType1}>
                                    <input type="radio" id="gareInfosType1" name="gareInfosType" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="gareInfosType1" className="mdc-radio__label">Classique</label>
                            </div>
                            <div className='mdc-form-field'>
                                <div className='mdc-radio' ref={this.editGareInfosType2}>
                                    <input type="radio" id="gareInfosType2" name="gareInfosType" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="gareInfosType2" className="mdc-radio__label">Info trafic</label>
                            </div>
                        </div>
                        <footer className="mdc-dialog__actions">
                            <button className="mdc-button mdc-dialog__button" data-mdc-dialog-action="close">Annuler</button>
                            <button className="mdc-button mdc-dialog__button" data-mdc-dialog-action="accept">Valider</button>
                        </footer>
                    </div>
                </div>
                <div className="mdc-dialog__scrim"></div>
            </div>
        );
    }

    componentDidMount() {
        this.dialog = new MDCDialog(this.editGareDialog.current);
        this.dialog.listen('MDCDialog:opening', () => {
            const gareName = new MDCTextField(this.editGareName.current);
            const gareInfo = new MDCTextField(this.editGareInfo.current);
            const gareAffichageType1 = new MDCRadio(this.editGareAffichageType1.current);
            const gareAffichageType2 = new MDCRadio(this.editGareAffichageType2.current);
            const gareInfosType1 = new MDCRadio(this.editGareInfosType1.current);
            const gareInfosType2 = new MDCRadio(this.editGareInfosType2.current);

            const db = ref(getDatabase(), 'users/' + this.props.uid + '/gares');
            get(child(db, this.props.id)).then(gare => {
                gareName.getDefaultFoundation().setValue(gare.child('name').val());
                gareInfo.getDefaultFoundation().setValue(gare.child('infos').val().replaceAll('<br>', '\n'));
                gareAffichageType1.checked = gare.child('screen').val() === 'Normal';
                gareAffichageType2.checked = gare.child('screen').val() === 'EVA';
                gareInfosType1.checked = gare.child('infostype').val() === 'informations';
                gareInfosType2.checked = gare.child('infostype').val() === 'flash';
            });

        });
        this.dialog.listen('MDCDialog:closing', (event) => {
            if (event.detail.action === 'accept') {
                this.updateGare();
            }
        });
    }

    updateGare() {
        const gareName = new MDCTextField(this.editGareName.current);
        const gareInfo = new MDCTextField(this.editGareInfo.current);
        const gareAffichageType1 = new MDCRadio(this.editGareAffichageType1.current);
        const gareInfosType1 = new MDCRadio(this.editGareInfosType1.current);

        const db = getDatabase();

        update(ref(db, 'users/' + this.props.uid + '/gares/' + this.props.id), {
            name: gareName.value,
            infos: gareInfo.value.split('\n').join('<br>'),
            screen: gareAffichageType1.checked ? 'Normal' : 'EVA',
            infostype: gareInfosType1.checked ? 'informations' : 'flash',
        }).then(() => {
            window.location.reload();
        }).catch(error => {
            console.error(error);
        });
    }
}

export default EditGareDialog;