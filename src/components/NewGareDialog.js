import React, { Component } from 'react';

import { MDCDialog } from '@material/dialog';
import { MDCTextField } from '@material/textfield';
import { MDCFormField } from '@material/form-field';
import { MDCRadio } from '@material/radio';

import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

class NewGareDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.dialogRef = React.createRef();
        this.newGareName = React.createRef();
        this.newGareClassic = React.createRef();
        this.newGareRER = React.createRef();
        this.newGareAffichageType1 = React.createRef();
        this.newGareAffichageType2 = React.createRef();
        this.newGareInfos = React.createRef();
        this.newGareInfosType1 = React.createRef();
        this.newGareInfosType2 = React.createRef();
    }
    render() {
        return (
            <div className="mdc-dialog mdc-dialog--fullscreen" id="newGareDialog" ref={this.dialogRef}>
                <div className='mdc-dialog__container'>
                    <div className="mdc-dialog__surface" role="dialog" aria-modal="true" aria-labelledby='newGareDialogTitle' aria-describedby='newGareDialgContent'>
                        <div className="mdc-dialog__header">
                            <h2 className="mdc-dialog__title" id="newGareDialogTitle">Nouvelle gare</h2>
                            <button className="mdc-icon-button material-icons mdc-dialog__close" data-mdc-dialog-action="close">close</button>
                        </div>
                        <div className="mdc-dialog__content" id="newGareDialogContent">
                            <br />
                            <div ref={this.newGareName} className="full-width mdc-text-field mdc-text-field--outlined">
                                <div className='mdc-notched-outline'>
                                    <div className='mdc-notched-outline__leading'></div>
                                    <div className='mdc-notched-outline__notch'>
                                        <label className="mdc-floating-label" id="newGareNameLabel">Nom</label>
                                    </div>
                                    <div className='mdc-notched-outline__trailing'></div>
                                </div>
                                <input className="mdc-text-field__input" type="text" id="newGareName" aria-labelledby='newGareNameLabel' />
                            </div><br /><br />
                            <span>Type de gare</span><br />
                            <div className='mdc-form-field'>
                                <div className='mdc-radio' ref={this.newGareClassic}>
                                    <input type='radio' id='newGareClassic' name='newGareType' className='mdc-radio__native-control' />
                                    <div className='mdc-radio__background'>
                                        <div className='mdc-radio__outer-circle'></div>
                                        <div className='mdc-radio__inner-circle'></div>
                                    </div>
                                </div>
                                <label htmlFor='newGareClassic' className='mdc-radio-label'>Classique</label>
                            </div>
                            <div className='mdc-form-field'>
                                <div className='mdc-radio' ref={this.newGareRER}>
                                    <input type='radio' id='newGareRER' name='newGareType' className='mdc-radio__native-control' />
                                    <div className='mdc-radio__background'>
                                        <div className='mdc-radio__outer-circle'></div>
                                        <div className='mdc-radio__inner-circle'></div>
                                    </div>
                                </div>
                                <label htmlFor='newGareRER' className='mdc-radio-label'>RER</label>
                            </div><br /><br />
                            <span>Type d'affichage</span><br />
                            <div className='mdc-form-field'>
                                <div className='mdc-radio' ref={this.newGareAffichageType1}>
                                    <input type="radio" id="newGareAffichageType1" name="newGareAffichageType" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="newGareAffichageType1" className="mdc-radio__label">Classique</label>
                            </div>
                            <div className='mdc-form-field'>
                                <div className='mdc-radio' ref={this.newGareAffichageType2}>
                                    <input type="radio" id="newGareAffichageType2" name="newGareAffichageType" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="newGareAffichageType2" className="mdc-radio__label">EVA</label>
                            </div><br /><br />
                            <label className="full-width mdc-text-field mdc-text-field--outlined mdc-text-field--textarea" ref={this.newGareInfos}>
                                <div className='mdc-notched-outline'>
                                    <div className='mdc-notched-outline__leading'></div>
                                    <div className='mdc-notched-outline__notch'>
                                        <span className='mdc-floating-label' id='gareInfoLabel'>Texte d'informations</span>
                                    </div>
                                    <div className='mdc-notched-outline__trailing'></div>
                                </div>
                                <span style={{ width: '100%' }} className='mdc-text-filed__resizer'>
                                    <textarea className="mdc-text-field__input" id="gareInfo" rows="4" aria-labelledby='gareInfoLabel'></textarea>
                                </span>
                            </label><br /><br />
                            <span>Type d'informations</span><br />
                            <div className="mdc-form-field">
                                <div className='mdc-radio' ref={this.newGareInfosType1}>
                                    <input type="radio" id="newGareInfosType1" name="newGareInfosType" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="newGareInfosType1" className="mdc-radio__label">Classique</label>
                            </div>
                            <div className='mdc-form-field'>
                                <div className='mdc-radio' ref={this.newGareInfosType2}>
                                    <input type="radio" id="newGareInfosType2" name="newGareInfosType" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="newGareInfosType2" className="mdc-radio__label">Info trafic</label>
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
        const gareName = new MDCTextField(this.newGareName.current);
        const gareType = new MDCRadio(this.newGareClassic.current);
        const gareType2 = new MDCRadio(this.newGareRER.current);
        const gareAffichageType = new MDCRadio(this.newGareAffichageType1.current);
        const gareAffichageType2 = new MDCRadio(this.newGareAffichageType2.current);
        const gareInfosType = new MDCRadio(this.newGareInfosType1.current);
        const gareInfos = new MDCTextField(this.newGareInfos.current);
        const dialog = new MDCDialog(this.dialogRef.current);

        gareType.listen('change', () => {
            if (gareType.checked) {
                gareAffichageType.disabled = false;
                gareAffichageType2.disabled = false;
            }
        });

        gareType2.listen('change', () => {
            if (gareType2.checked) {
                gareAffichageType.disabled = true;
                gareAffichageType2.disabled = true;
            }
        });

        dialog.listen('MDCDialog:closing', (event) => {
            if (event.detail.action === 'accept') {

                if (gareName.length = 0) {
                    alert('Veuillez entrer un nom pour la gare');
                    return;
                }

                const gareId = Math.floor(Math.random() * 1000000);

                const db = ref(getDatabase(), 'users/' + getAuth().currentUser.uid + '/gares/' + gareId);
                set(db, {
                    name: gareName.value,
                    type: gareType.checked ? 'neutral' : 'RER',
                    screen: gareAffichageType.checked ? 'Normal' : 'EVA',
                    infos: gareInfos.value,
                    infostype: gareInfosType.checked ? 'informations' : 'flash'
                }).then(() => {
                    window.location.reload();
                }).catch(error => {
                    console.error(error);
                });
            }
        });
    }
}

export default NewGareDialog;