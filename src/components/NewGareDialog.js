import React, { Component } from 'react';

import { MDCDialog } from '@material/dialog';
import { MDCTextField } from '@material/textfield';
import { MDCFormField } from '@material/form-field';
import { MDCRadio } from '@material/radio';
import { MDCMenu } from '@material/menu';
import { MDCRipple } from '@material/ripple';

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
        this.newGareAFL = React.createRef();
        this.newGareAffichageType1 = React.createRef();
        this.newGareAffichageType2 = React.createRef();
        this.selectTypeRef = React.createRef();
        this.dropBtnRef = React.createRef();
        this.newGareInfos = React.createRef();
        this.newGareInfosType1 = React.createRef();
        this.newGareInfosType2 = React.createRef();
        this.typesMenu = React.createRef();
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
                            </div>
                            <div className='mdc-form-field'>
                                <div className='mdc-radio' ref={this.newGareAFL}>
                                    <input type="radio" id="newGareType3" name="newGareType" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="newGareType3" className="mdc-radio__label">AFL</label>
                            </div><br /><br />
                            <span>Type d'affichage (gares classiques)</span><br />
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
                            <span>Logo de la gare (gares AFL)</span>
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.selectTypeRef}>
                                <input className="mdc-text-field__input" id="selectType" type="text" readOnly />
                                <i className="material-icons mdc-text-field__icon mdc-text-field__icon--trailing" tabIndex="0" role="button" ref={this.dropBtnRef}>arrow_drop_down</i>
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="selectType" className="mdc-floating-label">Type</label>
                                    </div>
                                    <div className="mdc-notched-outline__trailing"></div>
                                </div>
                            </div>
                            <hr />
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
                <div className="mdc-menu mdc-menu-surface" id="typesMenu" ref={this.typesMenu} style={{ width: '200px' }}>
                    <ul className="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabIndex="-1">
                        <li>
                            <span style={{ marginBottom: '10px' }}>Trains régionaux</span>
                            <ul style={{ marginTop: '10px' }} className="mdc-menu__selection-group">
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ter"></span>
                                </li>
                                <li className=" menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ter-alsace"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ter-aquitaine"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-auvergne-rhone-alpes"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ter-basse-normandie"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ter-bourgogne"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ter-bretagne"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ter-centre"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ter-franche-comte"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-fluo"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ter-hauts-de-france"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ter-languedoc-roussillon"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ter-metrolor"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ter-midi-pyrenees"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ter-nord-pas-de-calais"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-occitanie"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ter-poitou-charentes"></span>
                                </li>
                            </ul>
                        </li>
                        <li className="mdc-list-divider" role="separator"></li>
                        <li>
                            <span style={{ marginBottom: '10px' }}>Trains nationaux</span>
                            <ul style={{ marginTop: '10px' }} className="mdc-menu__selection-group">
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-tgv"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-inoui"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ouigo"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ouigo-classique"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-intercite"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-teoz"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-lunea"></span>
                                </li>
                            </ul>
                        </li>
                        <li className="mdc-list-divider" role="separator"></li>
                        <li>
                            <span style={{ marginBottom: '10px' }}>Trains internationaux</span>
                            <ul style={{ marginTop: '10px' }} className="mdc-menu__selection-group">
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-lyria"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-eurostar"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-thalys"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-db"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-sbb"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-sncb"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-ice"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-renfe-ave"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-thello"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-trenitalia"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-frecciarossa"></span>
                                </li>
                            </ul>
                        </li>
                        <li className="mdc-list-divider" role="separator"></li>
                        <li>
                            <span style={{ marginBottom: '10px' }}>Cars</span>
                            <ul style={{ marginTop: '10px' }} className="mdc-menu__selection-group">
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-text mdc-list-item__text">Car TER</span>
                                </li>
                            </ul>
                        </li>
                        <li className="mdc-list-divider" role="separator"></li>
                        <li>
                            <span style={{ marginBottom: '10px' }}>Transports par régions</span>
                            <ul style={{ marginTop: '10px' }} className="mdc-menu__selection-group">
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-mobigo"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-breizhgo"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-aleop"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-lio"></span>
                                    <span className="menu-item-text mdc-list-item__text">Lio</span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-remi"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-zou"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-nomad"></span>
                                </li>
                            </ul>
                        </li>
                        <li className="mdc-list-divider" role="separator"></li>
                        <li>
                            <span style={{ marginBottom: '10px' }}>Logos SNCF</span>
                            <ul style={{ marginTop: '10px' }} className="mdc-menu__selection-group">
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-sncf-1937"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-sncf-1972"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-sncf-1985"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-sncf-1992"></span>
                                </li>
                                <li className="menu-item mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-sncf"></span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const gareName = new MDCTextField(this.newGareName.current);
        const gareType = new MDCRadio(this.newGareClassic.current);
        const gareType2 = new MDCRadio(this.newGareRER.current);
        const gareType3 = new MDCRadio(this.newGareAFL.current);
        const gareAffichageType = new MDCRadio(this.newGareAffichageType1.current);
        const gareAffichageType2 = new MDCRadio(this.newGareAffichageType2.current);
        const gareLogo = new MDCTextField(this.selectTypeRef.current);
        const dropBtn = new MDCRipple(this.dropBtnRef.current);
        const gareInfosType = new MDCRadio(this.newGareInfosType1.current);
        const gareInfos = new MDCTextField(this.newGareInfos.current);
        const dialog = new MDCDialog(this.dialogRef.current);
        const typesMenu = new MDCMenu(this.typesMenu.current);

        gareType.listen('change', () => {
            if (gareType.checked) {
                gareAffichageType.disabled = false;
                gareAffichageType2.disabled = false;
                gareLogo.disabled = true;
            }
        });

        gareType2.listen('change', () => {
            if (gareType2.checked) {
                gareAffichageType.disabled = true;
                gareAffichageType2.disabled = true;
                gareAffichageType.checked = true;
                gareLogo.disabled = true;
            }
        });

        gareType3.listen('change', () => {
            if (gareType3.checked) {
                gareAffichageType.disabled = true;
                gareAffichageType2.disabled = true;
                gareAffichageType.checked = true;
                gareLogo.disabled = false;
            }
        });

        typesMenu.setAnchorElement(this.dropBtnRef.current);
        typesMenu.setAbsolutePosition(true);
        dropBtn.listen('click', () => {
            typesMenu.open = !typesMenu.open;
        });

        dialog.listen('MDCDialog:closing', (event) => {
            if (event.detail.action === 'accept') {

                if (gareName.length == 0) {
                    alert('Veuillez entrer un nom pour la gare');
                    return;
                }
                let screen;
                if (gareAffichageType.checked) {
                    screen = 'Normal';
                } else if (gareAffichageType2.checked) {
                    screen = 'EVA';
                }

                let type;
                if (gareType.checked) {
                    type = 'neutral';
                } else if (gareType2.checked) {
                    type = 'RER';
                } else if (gareType3.checked) {
                    type = 'AFL';
                }

                const gareId = Math.floor(Math.random() * 1000000);

                const db = ref(getDatabase(), 'users/' + getAuth().currentUser.uid + '/gares/' + gareId);
                set(db, {
                    name: gareName.value,
                    type: type,
                    screen: screen,
                    logo: gareLogo.value,
                    infos: gareInfos.value,
                    infostype: gareInfosType.checked ? 'informations' : 'flash'
                }).then(() => {
                    window.location.reload();
                }).catch(error => {
                    console.error(error);
                });
            }
        });

        typesMenu.listen('MDCMenu:selected', (event) => {
            if (event.detail.index === 0) {
                gareLogo.getDefaultFoundation().setValue('TER');
            } else if (event.detail.index === 1) {
                gareLogo.getDefaultFoundation().setValue('TER Alsace');
            } else if (event.detail.index === 2) {
                gareLogo.getDefaultFoundation().setValue('TER Aquitaine');
            } else if (event.detail.index === 3) {
                gareLogo.getDefaultFoundation().setValue('TER Auvergne');
            } else if (event.detail.index === 4) {
                gareLogo.getDefaultFoundation().setValue('TER Basse-Normandie');
            } else if (event.detail.index === 5) {
                gareLogo.getDefaultFoundation().setValue('TER Bourgogne');
            } else if (event.detail.index === 6) {
                gareLogo.getDefaultFoundation().setValue('TER Bretagne');
            } else if (event.detail.index === 7) {
                gareLogo.getDefaultFoundation().setValue('TER Centre');
            } else if (event.detail.index === 8) {
                gareLogo.getDefaultFoundation().setValue('TER Franche Comte');
            } else if (event.detail.index === 9) {
                gareLogo.getDefaultFoundation().setValue('TER Fluo');
            } else if (event.detail.index === 10) {
                gareLogo.getDefaultFoundation().setValue('TER Hauts de France');
            } else if (event.detail.index === 11) {
                gareLogo.getDefaultFoundation().setValue('TER Languedoc Roussillon');
            } else if (event.detail.index === 12) {
                gareLogo.getDefaultFoundation().setValue('TER Metrolor');
            } else if (event.detail.index === 13) {
                gareLogo.getDefaultFoundation().setValue('TER Midi Pyrenees');
            } else if (event.detail.index === 14) {
                gareLogo.getDefaultFoundation().setValue('TER Nord Pas de Calais');
            } else if (event.detail.index === 15) {
                gareLogo.getDefaultFoundation().setValue('TER Occitanie');
            } else if (event.detail.index === 16) {
                gareLogo.getDefaultFoundation().setValue('TER Poitou Charentes');
            } else if (event.detail.index === 17) {
                gareLogo.getDefaultFoundation().setValue('TGV');
            } else if (event.detail.index === 18) {
                gareLogo.getDefaultFoundation().setValue('inOui');
            } else if (event.detail.index === 19) {
                gareLogo.getDefaultFoundation().setValue('Ouigo');
            } else if (event.detail.index === 20) {
                gareLogo.getDefaultFoundation().setValue('Ouigo Classique');
            } else if (event.detail.index === 21) {
                gareLogo.getDefaultFoundation().setValue('Intercité');
            } else if (event.detail.index === 22) {
                gareLogo.getDefaultFoundation().setValue('Teoz');
            } else if (event.detail.index === 23) {
                gareLogo.getDefaultFoundation().setValue('Lunea');
            } else if (event.detail.index === 24) {
                gareLogo.getDefaultFoundation().setValue('TGV Lyria');
            } else if (event.detail.index === 25) {
                gareLogo.getDefaultFoundation().setValue('Eurostar');
            } else if (event.detail.index === 26) {
                gareLogo.getDefaultFoundation().setValue('Thalys');
            } else if (event.detail.index === 27) {
                gareLogo.getDefaultFoundation().setValue('DB');
            } else if (event.detail.index === 28) {
                gareLogo.getDefaultFoundation().setValue('SBB');
            } else if (event.detail.index === 29) {
                gareLogo.getDefaultFoundation().setValue('SNCB');
            } else if (event.detail.index === 30) {
                gareLogo.getDefaultFoundation().setValue('ICE');
            } else if (event.detail.index === 31) {
                gareLogo.getDefaultFoundation().setValue('Renfe Ave');
            } else if (event.detail.index === 32) {
                gareLogo.getDefaultFoundation().setValue('Thello');
            } else if (event.detail.index === 33) {
                gareLogo.getDefaultFoundation().setValue('Trenitalia');
            } else if (event.detail.index === 34) {
                gareLogo.getDefaultFoundation().setValue('Frecciarossa');
            } else if (event.detail.index === 35) {
                gareLogo.getDefaultFoundation().setValue('Car TER');
            } else if (event.detail.index === 36) {
                gareLogo.getDefaultFoundation().setValue('Mobigo');
            } else if (event.detail.index === 37) {
                gareLogo.getDefaultFoundation().setValue('BreizhGo');
            } else if (event.detail.index === 38) {
                gareLogo.getDefaultFoundation().setValue('Aleop');
            } else if (event.detail.index === 39) {
                gareLogo.getDefaultFoundation().setValue('Lio');
            } else if (event.detail.index === 40) {
                gareLogo.getDefaultFoundation().setValue('Remi');
            } else if (event.detail.index === 41) {
                gareLogo.getDefaultFoundation().setValue('Zou');
            } else if (event.detail.index === 42) {
                gareLogo.getDefaultFoundation().setValue('Nomad');
            } else if (event.detail.index === 43) {
                gareLogo.getDefaultFoundation().setValue('SNCF (logo 1937)');
            } else if (event.detail.index === 44) {
                gareLogo.getDefaultFoundation().setValue('SNCF (logo 1972)');
            } else if (event.detail.index === 45) {
                gareLogo.getDefaultFoundation().setValue('SNCF (logo 1985)');
            } else if (event.detail.index === 46) {
                gareLogo.getDefaultFoundation().setValue('SNCF (logo 1992)');
            } else if (event.detail.index === 47) {
                gareLogo.getDefaultFoundation().setValue('SNCF (logo carmillon)');
            }
        });
    }
}

export default NewGareDialog;