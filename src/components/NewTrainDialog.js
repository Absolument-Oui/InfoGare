import React, { Component } from 'react';
import createRoot from 'react-dom';

import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';
import { MDCMenu } from '@material/menu';
import { MDCChipSet } from '@material/chips';
import { MDCFormField } from '@material/form-field';
import { MDCRadio } from '@material/radio';
import { MDCDialog } from '@material/dialog';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

class NewTrainDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.dialogRef = React.createRef();
        this.trainNumberRef = React.createRef();
        this.trainDestinationRef = React.createRef();
        this.trainProvenanceRef = React.createRef();
        this.selectTypeRef = React.createRef();
        this.dropBtnRef = React.createRef();
        this.typesMenu = React.createRef();
        this.trainTypeName = React.createRef();
        this.trainHourDeparture = React.createRef();
        this.trainHourArrival = React.createRef();
        this.trainDelayRef = React.createRef();
        this.trainGaresProvenanceRef = React.createRef();
        this.trainGaresProvenanceChipsRef = React.createRef();
        this.trainGaresProvenanceInputRef = React.createRef();
        this.trainGaresDestinationRef = React.createRef();
        this.trainGaresDestinationChipsRef = React.createRef();
        this.trainGaresDestinationInputRef = React.createRef();
        this.trainVoieRef = React.createRef();
        this.trainHallRef = React.createRef();
        this.trainInfoRef = React.createRef();
        this.trainInfoType1Ref = React.createRef();
        this.trainInfoType2Ref = React.createRef();
        this.trainInfoType1RadioRef = React.createRef();
        this.trainInfoType2RadioRef = React.createRef();
        this.trainCompoRef = React.createRef();
        this.trainCompoAddMotriceRef = React.createRef();
        this.trainCompoAddTGVLeftRef = React.createRef();
        this.trainCompoAddTGVRightRef = React.createRef();
        this.trainCompoAddWagonRef = React.createRef();
        this.trainCompoAddWagonBarRef = React.createRef();
        this.trainRetard1Ref = React.createRef();
        this.trainRetard2Ref = React.createRef();
        this.trainRetard3Ref = React.createRef();
        this.trainRetard4Ref = React.createRef();
        this.trainRetard1RadioRef = React.createRef();
        this.trainRetard2RadioRef = React.createRef();
        this.trainRetard3RadioRef = React.createRef();
        this.trainRetard4RadioRef = React.createRef();
        this.addGareDestinationRef = React.createRef();
        this.addGareProvenanceRef = React.createRef();

        this.addChip = this.addChip.bind(this);

        this.chips = "";
    }

    render() {
        return (
            <div className="mdc-dialog mdc-dialog--fullscreen" id="newTrainDialog" ref={this.dialogRef}>
                <div className='mdc-dialog__container'>
                    <div className="mdc-dialog__surface" role="dialog" aria-modal="true" aria-labelledby='newGareDialogTitle' aria-describedby='newGareDialgContent'>
                        <div className="mdc-dialog__header">
                            <h2 className="mdc-dialog__title" id="newGareDialogTitle">Nouveau train</h2>
                            <button className="mdc-icon-button material-icons mdc-dialog__close" data-mdc-dialog-action="close">close</button>
                        </div>
                        <div className="mdc-dialog__content" id="newGareDialogContent">
                            <br />
                            <h2>Général</h2>
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainNumberRef}>
                                <input className="mdc-text-field__input" id="trainName" type="number" />
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainName" className="mdc-floating-label">Numéro du train</label>
                                    </div>
                                    <div className="mdc-notched-outline__trailing"></div>
                                </div>
                            </div><br /><br />
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainDestinationRef}>
                                <input className="mdc-text-field__input" id="trainDest" type="text" />
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainDest" className="mdc-floating-label">Destination</label>
                                    </div>
                                    <div className="mdc-notched-outline__trailing"></div>
                                </div>
                            </div><br /><br />
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainProvenanceRef}>
                                <input className="mdc-text-field__input" id="trainProv" type="text" />
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainProv" className="mdc-floating-label">Provenance</label>
                                    </div>
                                    <div className="mdc-notched-outline__trailing"></div>
                                </div>
                            </div><br /><br />
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
                            </div><br /><br />
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainTypeName}>
                                <input className="mdc-text-field__input" id="trainTypeName" type="text" />
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainTypeName" className="mdc-floating-label">Type personnalisé</label>
                                    </div>
                                    <div className="mdc-notched-outline__trailing"></div>
                                </div>
                            </div>
                            <hr />
                            <h2>Horaires et retard</h2>
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainHourDeparture}>
                                <input className="mdc-text-field__input" id="trainHourDeparture" type="time" />
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainHourDeparture" className="mdc-floating-label">Heure de départ</label>
                                    </div>
                                    <div className="mdc-notched-outline__trailing"></div>
                                </div>
                            </div><br /><br />
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainHourArrival}>
                                <input className="mdc-text-field__input" id="trainHourArrival" type="time" />
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainHourArrival" className="mdc-floating-label">Heure d'arrivée</label>
                                    </div>
                                    <div className="mdc-notched-outline__trailing"></div>
                                </div>
                            </div><br /><br />
                            <span>Type de retard</span><br />
                            <div className="mdc-form-field" ref={this.trainRetard1Ref}>
                                <div className='mdc-radio' ref={this.trainRetard1RadioRef}>
                                    <input type="radio" id="newTrainRetard1" name="newTrainRetards" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="newTrainRetard1" className="mdc-radio__label">À l'heure</label>
                            </div>
                            <div className="mdc-form-field" ref={this.trainRetard2Ref}>
                                <div className='mdc-radio' ref={this.trainRetard2RadioRef}>
                                    <input type="radio" id="newTrainRetard2" name="newTrainRetards" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="newTrainRetard2" className="mdc-radio__label">Retard</label>
                            </div>
                            <div className="mdc-form-field" ref={this.trainRetard3Ref}>
                                <div className='mdc-radio' ref={this.trainRetard3RadioRef}>
                                    <input type="radio" id="newTrainRetard3" name="newTrainRetards" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="newTrainRetard3" className="mdc-radio__label">Retard indeterminé</label>
                            </div>
                            <div className="mdc-form-field" ref={this.trainRetard4Ref}>
                                <div className='mdc-radio' ref={this.trainRetard4RadioRef}>
                                    <input type="radio" id="newTrainRetard4" name="newTrainRetards" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="newTrainRetard4" className="mdc-radio__label">Supprimé</label>
                            </div><br /><br />
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainDelayRef}>
                                <input className="mdc-text-field__input" id="trainDelay" type="number" defaultValue="0" />
                                <div className='mdc-text-field__affix mdc-text-field__affix--suffix'>min</div>
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainDelay" className="mdc-floating-label">Temps de retard</label>
                                    </div>
                                    <div className='mdc-notched-outline__trailing'></div>
                                </div>
                            </div>
                            <hr />
                            <h2>Gares desservies</h2>
                            <h5>Provenance</h5>
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainGaresProvenanceInputRef}>
                                <input className="mdc-text-field__input" id="trainGaresProvenance" type="text" onKeyUpCapture={(e) => { if (e.key === "Enter") { this.addChip(e.target.value, 'chips-provenance'); } }} />
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainGaresProvenance" className="mdc-floating-label">Ajouter une gare</label>
                                    </div>
                                    <div className='mdc-notched-outline__trailing'></div>
                                </div>
                            </div>
                            <button className='full-width mdc-button mdc-button--raised' ref={this.addGareProvenanceRef}>
                                <span className='mdc-button__label'>Ajouter</span>
                            </button><br /><br />
                            <span className="mdc-evolution-chip-set" role="grid" ref={this.trainGaresProvenanceRef}>
                                <span className="mdc-evolution-chip-set__chips" role="presentation" ref={this.trainGaresProvenanceChipsRef} id="chips-provenance"></span>
                            </span>
                            <h5>Destination</h5>
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainGaresDestinationInputRef}>
                                <input className="mdc-text-field__input" id="trainGaresDestination" type="text" onKeyUpCapture={(e) => { if (e.key === "Enter") { this.addChip(e.target.value, 'chips-destination'); } }} />
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainGaresDestination" className="mdc-floating-label">Ajouter une gare</label>
                                    </div>
                                    <div className='mdc-notched-outline__trailing'></div>
                                </div>
                            </div>
                            <button className='full-width mdc-button mdc-button--raised' ref={this.addGareDestinationRef}>
                                <span className='mdc-button__label'>Ajouter</span>
                            </button><br /><br />
                            <span className="mdc-evolution-chip-set" role="grid" ref={this.trainGaresDestinationRef}>
                                <span className="mdc-evolution-chip-set__chips" role="presentation" ref={this.trainGaresDestinationChipsRef} id="chips-destination"></span>
                            </span>
                            <hr />
                            <h2>Voie et hall</h2>
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainVoieRef}>
                                <input className="mdc-text-field__input" id="trainVoie" maxLength="2" type="text" />
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainVoie" className="mdc-floating-label">Voie</label>
                                    </div>
                                    <div className='mdc-notched-outline__trailing'></div>
                                </div>
                            </div><br /><br />
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainHallRef}>
                                <input className="mdc-text-field__input" id="trainHall" maxLength="1" type="text" />
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainHall" className="mdc-floating-label">Hall</label>
                                    </div>
                                    <div className='mdc-notched-outline__trailing'></div>
                                </div>
                            </div>
                            <hr />
                            <h2>Informations dynamiques</h2>
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainInfoRef}>
                                <input className="mdc-text-field__input" id="trainInfo" type="text" />
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainInfo" className="mdc-floating-label">Informations dynamiques</label>
                                    </div>
                                    <div className='mdc-notched-outline__trailing'></div>
                                </div>
                            </div><br /><br />
                            <span>Type d'informations dynamiques</span><br />
                            <div className="mdc-form-field" ref={this.trainInfoType1Ref}>
                                <div className='mdc-radio' ref={this.trainInfoType1RadioRef}>
                                    <input type="radio" id="newTrainInfoType1" name="newTrainInfoType" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="newTrainInfoType1" className="mdc-radio__label">Normal (blanc)</label>
                            </div>
                            <div className="mdc-form-field" ref={this.trainInfoType2Ref}>
                                <div className='mdc-radio' ref={this.trainInfoType2RadioRef}>
                                    <input type="radio" id="newTrainInfoType2" name="newTrainInfoType" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="newTrainInfoType2" className="mdc-radio__label">Important (jaune)</label>
                            </div>
                            <hr />
                            <h2>Composition du train</h2>
                            <button className='mdc-button' ref={this.trainCompoAddMotriceRef}>
                                <span className="mdc-button__ripple"></span>
                                <span className="mdc-button__label">Motrice</span>
                            </button>
                            <button className='mdc-button' ref={this.trainCompoAddTGVLeftRef}>
                                <span className="mdc-button__ripple"></span>
                                <span className="mdc-button__label">Motrice TGV gauche</span>
                            </button>
                            <button className='mdc-button' ref={this.trainCompoAddTGVRightRef}>
                                <span className="mdc-button__ripple"></span>
                                <span className="mdc-button__label">Motrice TGV droite</span>
                            </button>
                            <button className='mdc-button' ref={this.trainCompoAddWagonRef}>
                                <span className="mdc-button__ripple"></span>
                                <span className="mdc-button__label">Wagon</span>
                            </button>
                            <button className='mdc-button' ref={this.trainCompoAddWagonBarRef}>
                                <span className="mdc-button__ripple"></span>
                                <span className="mdc-button__label">Wagon bar</span>
                            </button>
                            <div style={{ border: '1px solid black', width: '100%', height: '100px', alignItems: 'center', backgroundColor: 'gray' }} id='train-compo' ref={this.trainCompoRef}></div>
                        </div>
                        <footer className="mdc-dialog__actions">
                            <button className="mdc-button mdc-dialog__button" data-mdc-dialog-action="close">Annuler</button>
                            <button className="mdc-button mdc-dialog__button" data-mdc-dialog-action="accept">Créer</button>
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

    addChip(chip, element) {
        const HTML = `<span class='mdc-evolution-chip__cell mdc-evolution-chip__cell--primary' role='gridcell'><button class='mdc-evolution-chip__action mdc-evolution-chip__action--primary' type='button' tabindex='-1'><span class='mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary'></span><span class='mdc-evolution-chip__text-label'>${chip}</span></button></span>`;
        const chipElem = document.createElement('span');
        chipElem.className = 'mdc-evolution-chip';
        chipElem.id = chip;
        chipElem.setAttribute('role', 'row');
        chipElem.onclick = () => {
            document.getElementById(chip).remove();
        }
        chipElem.innerHTML = HTML;
        document.getElementById(element).appendChild(chipElem);
        const trainGaresProvenanceInput = new MDCTextField(this.trainGaresProvenanceInputRef.current);
        const trainGaresDestinationInput = new MDCTextField(this.trainGaresDestinationInputRef.current);
        trainGaresProvenanceInput.value = '';
        trainGaresDestinationInput.value = '';
    }

    componentDidMount() {
        const dialog = new MDCDialog(this.dialogRef.current);
        const trainNumber = new MDCTextField(this.trainNumberRef.current);
        const trainDestination = new MDCTextField(this.trainDestinationRef.current);
        const trainProvenance = new MDCTextField(this.trainProvenanceRef.current);
        const selectType = new MDCTextField(this.selectTypeRef.current);
        const dropBtn = new MDCRipple(this.dropBtnRef.current);
        const typesMenu = new MDCMenu(this.typesMenu.current);
        const typeName = new MDCTextField(this.trainTypeName.current);
        const trainHourDeparture = new MDCTextField(this.trainHourDeparture.current);
        const trainHourArrival = new MDCTextField(this.trainHourArrival.current);
        const trainDelay = new MDCTextField(this.trainDelayRef.current);
        const trainGaresProvenance = new MDCChipSet(this.trainGaresProvenanceRef.current);
        const trainGaresProvenanceInput = new MDCTextField(this.trainGaresProvenanceInputRef.current);
        const trainGaresDestination = new MDCChipSet(this.trainGaresDestinationRef.current);
        const trainGaresDestinationInput = new MDCTextField(this.trainGaresDestinationInputRef.current);
        const trainVoie = new MDCTextField(this.trainVoieRef.current);
        const trainHall = new MDCTextField(this.trainHallRef.current);
        const trainCompoAddMotrice = new MDCRipple(this.trainCompoAddMotriceRef.current);
        const trainCompoAddTGVLeft = new MDCRipple(this.trainCompoAddTGVLeftRef.current);
        const trainCompoAddTGVRight = new MDCRipple(this.trainCompoAddTGVRightRef.current);
        const trainCompoAddWagon = new MDCRipple(this.trainCompoAddWagonRef.current);
        const trainCompoAddWagonBar = new MDCRipple(this.trainCompoAddWagonBarRef.current);
        const trainRetard1 = new MDCFormField(this.trainRetard1Ref.current);
        const trainRetard2 = new MDCFormField(this.trainRetard2Ref.current);
        const trainRetard3 = new MDCFormField(this.trainRetard3Ref.current);
        const trainRetard4 = new MDCFormField(this.trainRetard4Ref.current);
        const trainRetard1Radio = new MDCRadio(this.trainRetard1RadioRef.current);
        const trainRetard2Radio = new MDCRadio(this.trainRetard2RadioRef.current);
        const trainRetard3Radio = new MDCRadio(this.trainRetard3RadioRef.current);
        const trainRetard4Radio = new MDCRadio(this.trainRetard4RadioRef.current);
        const trainInfo = new MDCTextField(this.trainInfoRef.current);
        const trainInfoType1 = new MDCFormField(this.trainInfoType1Ref.current);
        const trainInfoType2 = new MDCFormField(this.trainInfoType2Ref.current);
        const trainInfoType1Radio = new MDCRadio(this.trainInfoType1RadioRef.current);
        const trainInfoType2Radio = new MDCRadio(this.trainInfoType2RadioRef.current);
        const addGareDestination = new MDCRipple(this.addGareDestinationRef.current);
        const addGareProvenance = new MDCRipple(this.addGareProvenanceRef.current);


        if (!navigator.userAgent.toLowerCase().match(/mobile/i)) {
            this.addGareDestinationRef.current.style.display = 'none';
            this.addGareProvenanceRef.current.style.display = 'none';
        }


        trainRetard1.input = trainRetard1Radio;
        trainRetard2.input = trainRetard2Radio;
        trainRetard3.input = trainRetard3Radio;
        trainRetard4.input = trainRetard4Radio;

        trainInfoType1.input = trainInfoType1Radio;
        trainInfoType2.input = trainInfoType2Radio;

        trainCompoAddMotrice.listen('click', () => {
            const wagon = document.createElement('div');
            wagon.className = 'train-wagons train-loco';
            wagon.onclick = () => {
                wagon.remove();
            }
            this.trainCompoRef.current.appendChild(wagon);
        });

        trainCompoAddTGVLeft.listen('click', () => {
            const wagon = document.createElement('div');
            wagon.className = 'train-wagons train-tgv-l';
            wagon.onclick = () => {
                wagon.remove();
            }
            this.trainCompoRef.current.appendChild(wagon);
        });

        trainCompoAddTGVRight.listen('click', () => {
            const wagon = document.createElement('div');
            wagon.className = 'train-wagons train-tgv-r';
            wagon.onclick = () => {
                wagon.remove();
            }
            this.trainCompoRef.current.appendChild(wagon);
        });

        trainCompoAddWagon.listen('click', () => {
            const wagon = document.createElement('div');
            wagon.className = 'train-wagons train-wagon';
            wagon.onclick = () => {
                wagon.remove();
            }
            this.trainCompoRef.current.appendChild(wagon);
        });

        trainCompoAddWagonBar.listen('click', () => {
            const wagon = document.createElement('div');
            wagon.className = 'train-wagons train-wagon-bar';
            wagon.onclick = () => {
                wagon.remove();
            }
            this.trainCompoRef.current.appendChild(wagon);
        });

        addGareDestination.listen('click', () => {
            this.addChip(trainGaresDestinationInput.value, 'chips-destination');
        });
        
        addGareProvenance.listen('click', () => {
            this.addChip(trainGaresProvenanceInput.value, 'chips-provenance');
        })

        trainGaresProvenance.listen('MDCChip:interaction', (event) => {
            console.log(event.target);
            const chip = event.target;
            chip.remove();
        });

        typesMenu.setAnchorElement(this.dropBtnRef.current);
        typesMenu.setAbsolutePosition(true);
        dropBtn.listen('click', () => {
            typesMenu.open = !typesMenu.open;
        });


        dialog.listen('MDCDialog:closing', (event) => {
            if (event.detail.action === 'accept') {
                if (trainProvenance.value === '' && trainDestination.value === '') {
                    alert('Vous devez entrer une provenance et/ou une destination');
                    return;
                }

                if (trainHourDeparture.value === '' && trainHourArrival.value === '') {
                    alert('Vous devez choisir une heure de départ et/ou d\'arrivée');
                    return;
                }

                var garesProv = [];
                for (var i = 0; i < document.getElementById('chips-provenance').childElementCount; i++) {
                    garesProv.push(document.getElementById('chips-provenance').children[i].children[0].children[0].children[1].innerText);
                }

                var garesDest = [];
                for (var j = 0; j < document.getElementById('chips-destination').childElementCount; j++) {
                    garesDest.push(document.getElementById('chips-destination').children[j].children[0].children[0].children[1].innerText);
                }

                var compo = [];
                for (var k = 0; k < document.getElementById('train-compo').childElementCount; k++) {
                    compo.push(document.getElementById('train-compo').children[k].classList[1]);
                }

                var retardType;
                if (trainRetard1Radio.checked) {
                    retardType = 'alheure';
                } else if (trainRetard2Radio.checked) {
                    retardType = 'ret';
                } else if (trainRetard3Radio.checked) {
                    retardType = 'retindet';
                } else if (trainRetard4Radio.checked) {
                    retardType = 'suppr';
                }

                var trainInfoType;
                if (trainInfoType2Radio.checked) {
                    trainInfoType = 'flashcircu';
                } else {
                    trainInfoType = 'normal';
                }

                const trainId = Math.floor(Math.random() * 1000000);
                const db = ref(getDatabase(), 'users/' + getAuth().currentUser.uid + '/gares/' + this.props.gid + '/trains/' + trainId);

                set(db, {
                    id: trainId,
                    number: trainNumber.value,
                    destination: trainDestination.value,
                    provenance: trainProvenance.value,
                    type: selectType.value,
                    typename: typeName.value,
                    hourdepart: trainHourDeparture.value,
                    hourarrive: trainHourArrival.value,
                    retardtime: trainDelay.value,
                    from: garesProv,
                    gares: garesDest,
                    voie: trainVoie.value,
                    hall: trainHall.value,
                    compo: compo,
                    retardtype: retardType,
                    retardtime: trainDelay.value,
                    alternance: trainInfo.value,
                    alternancetype: trainInfoType
                }).then(() => {
                    window.location.reload();
                }).catch((error) => {
                    console.log(error);
                });
            }
        });


        typesMenu.listen('MDCMenu:selected', (event) => {
            if (event.detail.index === 0) {
                selectType.getDefaultFoundation().setValue('TER');
            } else if (event.detail.index === 1) {
                selectType.getDefaultFoundation().setValue('TER Alsace');
            } else if (event.detail.index === 2) {
                selectType.getDefaultFoundation().setValue('TER Aquitaine');
            } else if (event.detail.index === 3) {
                selectType.getDefaultFoundation().setValue('TER Auvergne');
            } else if (event.detail.index === 4) {
                selectType.getDefaultFoundation().setValue('TER Basse-Normandie');
            } else if (event.detail.index === 5) {
                selectType.getDefaultFoundation().setValue('TER Bourgogne');
            } else if (event.detail.index === 6) {
                selectType.getDefaultFoundation().setValue('TER Bretagne');
            } else if (event.detail.index === 7) {
                selectType.getDefaultFoundation().setValue('TER Centre');
            } else if (event.detail.index === 8) {
                selectType.getDefaultFoundation().setValue('TER Franche Comte');
            } else if (event.detail.index === 9) {
                selectType.getDefaultFoundation().setValue('TER Fluo');
            } else if (event.detail.index === 10) {
                selectType.getDefaultFoundation().setValue('TER Hauts de France');
            } else if (event.detail.index === 11) {
                selectType.getDefaultFoundation().setValue('TER Languedoc Roussillon');
            } else if (event.detail.index === 12) {
                selectType.getDefaultFoundation().setValue('TER Metrolor');
            } else if (event.detail.index === 13) {
                selectType.getDefaultFoundation().setValue('TER Midi Pyrenees');
            } else if (event.detail.index === 14) {
                selectType.getDefaultFoundation().setValue('TER Nord Pas de Calais');
            } else if (event.detail.index === 15) {
                selectType.getDefaultFoundation().setValue('TER Occitanie');
            } else if (event.detail.index === 16) {
                selectType.getDefaultFoundation().setValue('TER Poitou Charentes');
            } else if (event.detail.index === 17) {
                selectType.getDefaultFoundation().setValue('TGV');
            } else if (event.detail.index === 18) {
                selectType.getDefaultFoundation().setValue('inOui');
            } else if (event.detail.index === 19) {
                selectType.getDefaultFoundation().setValue('Ouigo');
            } else if (event.detail.index === 20) {
                selectType.getDefaultFoundation().setValue('Ouigo Classique');
            } else if (event.detail.index === 21) {
                selectType.getDefaultFoundation().setValue('Intercité');
            } else if (event.detail.index === 22) {
                selectType.getDefaultFoundation().setValue('Teoz');
            } else if (event.detail.index === 23) {
                selectType.getDefaultFoundation().setValue('Lunea');
            } else if (event.detail.index === 24) {
                selectType.getDefaultFoundation().setValue('TGV Lyria');
            } else if (event.detail.index === 25) {
                selectType.getDefaultFoundation().setValue('Eurostar');
            } else if (event.detail.index === 26) {
                selectType.getDefaultFoundation().setValue('Thalys');
            } else if (event.detail.index === 27) {
                selectType.getDefaultFoundation().setValue('DB');
            } else if (event.detail.index === 28) {
                selectType.getDefaultFoundation().setValue('SBB');
            } else if (event.detail.index === 29) {
                selectType.getDefaultFoundation().setValue('SNCB');
            } else if (event.detail.index === 30) {
                selectType.getDefaultFoundation().setValue('ICE');
            } else if (event.detail.index === 31) {
                selectType.getDefaultFoundation().setValue('Renfe Ave');
            } else if (event.detail.index === 32) {
                selectType.getDefaultFoundation().setValue('Thello');
            } else if (event.detail.index === 33) {
                selectType.getDefaultFoundation().setValue('Trenitalia');
            } else if (event.detail.index === 34) {
                selectType.getDefaultFoundation().setValue('Frecciarossa');
            } else if (event.detail.index === 35) {
                selectType.getDefaultFoundation().setValue('Car TER');
            } else if (event.detail.index === 36) {
                selectType.getDefaultFoundation().setValue('Mobigo');
            } else if (event.detail.index === 37) {
                selectType.getDefaultFoundation().setValue('BreizhGo');
            } else if (event.detail.index === 38) {
                selectType.getDefaultFoundation().setValue('Aleop');
            } else if (event.detail.index === 39) {
                selectType.getDefaultFoundation().setValue('Lio');
            } else if (event.detail.index === 40) {
                selectType.getDefaultFoundation().setValue('Remi');
            } else if (event.detail.index === 41) {
                selectType.getDefaultFoundation().setValue('Zou');
            } else if (event.detail.index === 42) {
                selectType.getDefaultFoundation().setValue('Nomad');
            } else if (event.detail.index === 43) {
                selectType.getDefaultFoundation().setValue('SNCF (logo 1937)');
            } else if (event.detail.index === 44) {
                selectType.getDefaultFoundation().setValue('SNCF (logo 1972)');
            } else if (event.detail.index === 45) {
                selectType.getDefaultFoundation().setValue('SNCF (logo 1985)');
            } else if (event.detail.index === 46) {
                selectType.getDefaultFoundation().setValue('SNCF (logo 1992)');
            } else if (event.detail.index === 47) {
                selectType.getDefaultFoundation().setValue('SNCF (logo carmillon)');
            }
        });
    }
}

export default NewTrainDialog;