import React, { Component } from 'react';

import { set, ref, getDatabase, update, get, child } from 'firebase/database';
import { getAuth } from 'firebase/auth';

import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';
import { MDCMenu } from '@material/menu';
import { MDCRadio } from '@material/radio';
import { MDCFormField } from '@material/form-field';
import { MDCDialog } from '@material/dialog';

class EditTrainRERDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.dialogRef = React.createRef();
        this.trainNumberRef = React.createRef();
        this.trainDestinationRef = React.createRef();
        this.trainMissionRef = React.createRef();
        this.selectTypeRef = React.createRef();
        this.dropBtnRef = React.createRef();
        this.trainLongueur1Ref = React.createRef();
        this.trainLongueur1RadioRef = React.createRef();
        this.trainLongueur2Ref = React.createRef();
        this.trainLongueur2RadioRef = React.createRef();
        this.selectAffichageRef = React.createRef();
        this.dropBtn2Ref = React.createRef();
        this.trainDepartRef = React.createRef();
        this.typesMenu = React.createRef();
        this.affichageMenu = React.createRef();
        this.trainGaresInputRef = React.createRef();
        this.trainRetard1Ref = React.createRef();
        this.trainRetard1RadioRef = React.createRef();
        this.trainRetard2Ref = React.createRef();
        this.trainRetard2RadioRef = React.createRef();
        this.trainRetard3Ref = React.createRef();
        this.trainRetard3RadioRef = React.createRef();
        this.trainRetard4Ref = React.createRef();
        this.trainRetard4RadioRef = React.createRef();
        this.trainRetardTimeRef = React.createRef();
    }

    render() {
        return (
            <div className="mdc-dialog mdc-dialog--fullscreen" id={"edit-" + this.props.id} ref={this.dialogRef}>
                <div className='mdc-dialog__container'>
                    <div className="mdc-dialog__surface" role="dialog" aria-modal="true" aria-labelledby='newTrainRERDialogTitle' aria-describedby='newTrainRERContent'>
                        <div className="mdc-dialog__header">
                            <h2 className="mdc-dialog__title" id="newTrainRERTitle">Nouveau train</h2>
                            <button className="mdc-icon-button material-icons mdc-dialog__close" data-mdc-dialog-action="close">close</button>
                        </div>
                        <div className="mdc-dialog__content" id="newTrainRERContent">
                            <br />
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainNumberRef}>
                                <input className="mdc-text-field__input" id="trainNumber" type="number" />
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainNumber" className="mdc-floating-label">Numéro du train</label>
                                    </div>
                                    <div className="mdc-notched-outline__trailing"></div>
                                </div>
                            </div><br /><br />
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainDestinationRef}>
                                <input className="mdc-text-field__input" id="trainDestination" type="text" />
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainDestination" className="mdc-floating-label">Destination</label>
                                    </div>
                                    <div className="mdc-notched-outline__trailing"></div>
                                </div>
                            </div><br /><br />
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainMissionRef}>
                                <input className="mdc-text-field__input" id="trainMission" type="text" />
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainMission" className="mdc-floating-label">Mission du train</label>
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
                            <span>Longueur du train</span><br />
                            <div className="mdc-form-field" ref={this.trainLongueur1Ref}>
                                <div className='mdc-radio' ref={this.trainLongueur1RadioRef}>
                                    <input type="radio" id="editTrainLongueur1" name="editTrainLongueurs" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="editTrainLongueur1" className="mdc-radio__label">Train court</label>
                            </div>
                            <div className="mdc-form-field" ref={this.trainLongueur2Ref}>
                                <div className='mdc-radio' ref={this.trainLongueur2RadioRef}>
                                    <input type="radio" id="editTrainLongueur2" name="editTrainLongueurs" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="editTrainLongueur2" className="mdc-radio__label">Train long</label>
                            </div>
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.selectAffichageRef}>
                                <input className="mdc-text-field__input" id="selectType" type="text" readOnly />
                                <i className="material-icons mdc-text-field__icon mdc-text-field__icon--trailing" tabIndex="0" role="button" ref={this.dropBtn2Ref}>arrow_drop_down</i>
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="selectType" className="mdc-floating-label">Type d'affichage</label>
                                    </div>
                                    <div className="mdc-notched-outline__trailing"></div>
                                </div>
                            </div><br /><br />
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainDepartRef}>
                                <input className="mdc-text-field__input" id="trainMission" type="time" />
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainMission" className="mdc-floating-label">Heure de départ</label>
                                    </div>
                                    <div className="mdc-notched-outline__trailing"></div>
                                </div>
                            </div><br /><br />
                            <span>Retard</span><br />
                            <div className="mdc-form-field" ref={this.trainRetard1Ref}>
                                <div className='mdc-radio' ref={this.trainRetard1RadioRef}>
                                    <input type="radio" id="editTrainRetard1" name="editTrainRetards" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="editTrainRetard1" className="mdc-radio__label">à l'heure</label>
                            </div>
                            <div className="mdc-form-field" ref={this.trainRetard2Ref}>
                                <div className='mdc-radio' ref={this.trainRetard2RadioRef}>
                                    <input type="radio" id="editTrainRetard2" name="ediTrainRetards" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="editTrainRetard2" className="mdc-radio__label">ret. indet.</label>
                            </div>
                            <div className="mdc-form-field" ref={this.trainRetard3Ref}>
                                <div className='mdc-radio' ref={this.trainRetard3RadioRef}>
                                    <input type="radio" id="editTrainRetard3" name="editTrainRetards" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="editTrainRetard3" className="mdc-radio__label">retard</label>
                            </div>
                            <div className="mdc-form-field" ref={this.trainRetard4Ref}>
                                <div className='mdc-radio' ref={this.trainRetard4RadioRef}>
                                    <input type="radio" id="editTrainRetard4" name="editTrainRetards" className="mdc-radio__native-control" />
                                    <div className="mdc-radio__background">
                                        <div className="mdc-radio__outer-circle"></div>
                                        <div className="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div className="mdc-radio__ripple"></div>
                                </div>
                                <label htmlFor="editTrainRetard4" className="mdc-radio__label">supprimé</label>
                            </div><br /><br />
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainRetardTimeRef}>
                                <input className="mdc-text-field__input" id="trainGares" type="number" defaultValue="0" />
                                <div className='mdc-text-field__affix mdc-text-field__affix--suffix'>min</div>
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainGares" className="mdc-floating-label">Temps de retard</label>
                                    </div>
                                    <div className='mdc-notched-outline__trailing'></div>
                                </div>
                            </div><br /><br />
                            <span>Gares desservies</span>
                            <div className="full-width mdc-text-field mdc-text-field--outlined" ref={this.trainGaresInputRef}>
                                <input className="mdc-text-field__input" id="trainGares" type="text" onKeyUpCapture={(e) => { if (e.key === "Enter") { this.addChip(e.target.value, 'chips-gares'); } }} />
                                <div className="mdc-notched-outline">
                                    <div className="mdc-notched-outline__leading"></div>
                                    <div className="mdc-notched-outline__notch">
                                        <label htmlFor="trainGares" className="mdc-floating-label">Ajouter une gare</label>
                                    </div>
                                    <div className='mdc-notched-outline__trailing'></div>
                                </div>
                            </div><br /><br />
                            <span className="mdc-evolution-chip-set" role="grid" ref={this.trainGaresRef}>
                                <span className="mdc-evolution-chip-set__chips" role="presentation" ref={this.trainGaresChipsRef} id="edit-chips-gares"></span>
                            </span>
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
                            <ul className='mdc-menu__selection-group'>
                                <li className='menu-item mdc-list-item' role='menuitem'>
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-rer-a"></span>
                                </li>
                                <li className='menu-item mdc-list-item' role='menuitem'>
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-rer-b"></span>
                                </li>
                                <li className='menu-item mdc-list-item' role='menuitem'>
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-rer-c"></span>
                                </li>
                                <li className='menu-item mdc-list-item' role='menuitem'>
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-rer-d"></span>
                                </li>
                                <li className='menu-item mdc-list-item' role='menuitem'>
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="menu-item-icon train-card-rer-e"></span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="mdc-menu mdc-menu-surface" id="affichageMenu" ref={this.affichageMenu} style={{ width: '200px' }}>
                    <ul className="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabIndex="-1">
                        <li>
                            <ul className='mdc-menu__selection-group'>
                                <li className='mdc-list-item' role='menuitem'>
                                    <span className='mdc-list-item__ripple'></span>
                                    <span className='mdc-list-item__graphic mdc-menu__selection-group-icon'></span>
                                    <span className='mdc-list-item__text'>Heure</span>
                                </li>
                                <li className='mdc-list-item' role='menuitem'>
                                    <span className='mdc-list-item__ripple'></span>
                                    <span className='mdc-list-item__graphic mdc-menu__selection-group-icon'></span>
                                    <span className='mdc-list-item__text'>A l'approche</span>
                                </li>
                                <li className='mdc-list-item' role='menuitem'>
                                    <span className='mdc-list-item__ripple'></span>
                                    <span className='mdc-list-item__graphic mdc-menu__selection-group-icon'></span>
                                    <span className='mdc-list-item__text'>A quai</span>
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
        const trainGaresProvenanceInput = new MDCTextField(this.trainGaresInputRef.current);
        trainGaresProvenanceInput.value = '';
    }

    componentDidMount() {
        const dialog = new MDCDialog(this.dialogRef.current);
        const trainNumber = new MDCTextField(this.trainNumberRef.current);
        const trainDestination = new MDCTextField(this.trainDestinationRef.current);
        const trainMission = new MDCTextField(this.trainMissionRef.current);
        const selectType = new MDCTextField(this.selectTypeRef.current);
        const dropBtn = new MDCRipple(this.dropBtnRef.current);
        const trainLongueur1 = new MDCFormField(this.trainLongueur1Ref.current);
        const trainLongueur1Radio = new MDCRadio(this.trainLongueur1RadioRef.current);
        const trainLongueur2 = new MDCFormField(this.trainLongueur2Ref.current);
        const trainLongueur2Radio = new MDCRadio(this.trainLongueur2RadioRef.current);
        const selectAffichage = new MDCTextField(this.selectAffichageRef.current);
        const dropBtn2 = new MDCRipple(this.dropBtn2Ref.current);
        const trainDepart = new MDCTextField(this.trainDepartRef.current);
        const typesMenu = new MDCMenu(this.typesMenu.current);
        const affichageMenu = new MDCMenu(this.affichageMenu.current);
        const trainGaresInput = new MDCTextField(this.trainGaresInputRef.current);
        const trainRetard1 = new MDCFormField(this.trainRetard1Ref.current);
        const trainRetard2 = new MDCFormField(this.trainRetard2Ref.current);
        const trainRetard3 = new MDCFormField(this.trainRetard3Ref.current);
        const trainRetard4 = new MDCFormField(this.trainRetard4Ref.current);
        const trainRetard1Radio = new MDCRadio(this.trainRetard1RadioRef.current);
        const trainRetard2Radio = new MDCRadio(this.trainRetard2RadioRef.current);
        const trainRetard3Radio = new MDCRadio(this.trainRetard3RadioRef.current);
        const trainRetard4Radio = new MDCRadio(this.trainRetard4RadioRef.current);
        const trainRetardTime = new MDCTextField(this.trainRetardTimeRef.current);
        const db = ref(getDatabase(), 'users/' + getAuth().currentUser.uid + '/gares/' + this.props.gid + '/trains/' + this.props.id);

        trainLongueur1.input = trainLongueur1Radio;
        trainLongueur2.input = trainLongueur2Radio;

        trainRetard1.input = trainRetard1Radio;
        trainRetard2.input = trainRetard2Radio;
        trainRetard3.input = trainRetard3Radio;
        trainRetard4.input = trainRetard4Radio;

        get(db).then((data) => {
            trainNumber.getDefaultFoundation().setValue(data.child('number').val());
            trainMission.getDefaultFoundation().setValue(data.child('mission').val());
            trainDepart.getDefaultFoundation().setValue(data.child('hourdepart').val());
            trainDestination.getDefaultFoundation().setValue(data.child('destination').val());
            selectType.getDefaultFoundation().setValue(data.child('type').val());
            selectAffichage.getDefaultFoundation().setValue(data.child('hourmode').val());
            trainLongueur1Radio.checked = data.child('length').val() === 'trainlong';
            trainLongueur2Radio.checked = data.child('length').val() === 'traincourt';
            trainRetard1Radio.checked = data.child('retardtype').val() === 'alheure';
            trainRetard2Radio.checked = data.child('retardtype').val() === 'retindet';
            trainRetard3Radio.checked = data.child('retardtype').val() === 'ret';
            trainRetard4Radio.checked = data.child('retardtype').val() === 'supprimé';
            var gares = data.child('gares').val();
            const elements = [];
            if (gares.constructor === String) {
                gares = gares.split('|').filter(function (el) {
                    return el.length > 0;
                });
            }

            gares.forEach(element => {
                this.addChip(element, 'edit-chips-gares');
            });
        });

        typesMenu.setAnchorElement(this.dropBtnRef.current);
        typesMenu.setAbsolutePosition(true);
        dropBtn.listen('click', () => {
            typesMenu.open = !typesMenu.open;
        });

        affichageMenu.setAnchorElement(this.dropBtn2Ref.current);
        affichageMenu.setAbsolutePosition(true);
        dropBtn2.listen('click', () => {
            affichageMenu.open = !affichageMenu.open;
        });

        typesMenu.listen('MDCMenu:selected', (event) => {
            if (event.detail.index === 0) {
                selectType.getDefaultFoundation().setValue('RER A');
            } else if (event.detail.index === 1) {
                selectType.getDefaultFoundation().setValue('RER B');
            } else if (event.detail.index === 2) {
                selectType.getDefaultFoundation().setValue('RER C');
            } else if (event.detail.index === 3) {
                selectType.getDefaultFoundation().setValue('RER D');
            } else if (event.detail.index === 4) {
                selectType.getDefaultFoundation().setValue('RER E');
            }
        });

        affichageMenu.listen('MDCMenu:selected', (event) => {
            if (event.detail.index === 0) {
                selectAffichage.getDefaultFoundation().setValue('Heure');
            } else if (event.detail.index === 1) {
                selectAffichage.getDefaultFoundation().setValue('A l\'approche');
            } else if (event.detail.index === 2) {
                selectAffichage.getDefaultFoundation().setValue('A quai');
            }
        });

        dialog.listen('MDCDialog:closing', (event) => {
            if (event.detail.action === 'accept') {
                if (trainDestination.value === '') {
                    alert("Vous devez entrer une destination !");
                    return;
                }

                if (trainMission.value === '') {
                    alert("Vous devez entrer une mission !");
                    return;
                }

                let retardType;
                if (trainRetard1Radio.checked) {
                    retardType = 'alheure';
                } else if (trainRetard2Radio.checked) {
                    retardType = 'retindet';
                } else if (trainRetard3Radio.checked) {
                    retardType = 'ret';
                } else {
                    retardType = 'supprimé';
                }

                let length;
                if (trainLongueur1Radio.checked) {
                    length = 'traincourt';
                } else {
                    length = 'trainlong';
                }

                var gares = [];
                for (var i = 0; i < document.getElementById('edit-chips-gares').childElementCount; i++) {
                    gares.push(document.getElementById('edit-chips-gares').children[i].children[0].children[0].children[1].innerText);
                }
                console.log(gares);


                update(db, {
                    id: this.props.id,
                    number: trainNumber.value,
                    destination: trainDestination.value,
                    type: selectType.value,
                    hourdepart: trainDepart.value,
                    gares: gares,
                    hourmode: selectAffichage.value,
                    mission: trainMission.value,
                    retardtype: retardType,
                    retardtime: trainRetardTime.value,
                    length: length
                }).then(() => {
                    window.location.reload();
                }).catch((error) => {
                    console.log(error);
                });
            }
        })
    }
}

export default EditTrainRERDialog;