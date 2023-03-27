import React, { Component } from "react";
import { createRoot } from "react-dom";
import { getAuth } from "firebase/auth";
import { getDatabase, child, ref, get } from "firebase/database";
import { MDCRipple } from "@material/ripple";
import { MDCMenu } from "@material/menu";
import { MDCList } from "@material/list";
import { MDCDialog } from "@material/dialog";

import GoogleAd from "./GoogleAd";
import TrainAFLCard from "./TrainAFLCard";
import NewTrainAflDialog from "./NewTrainAflDialog";

class GareAFL extends Component {
    render() {
        return(
            <div className='main-content'>
                <div className='center'>
                    <h1 id='gareName'></h1>
                    <button className='mdc-icon-button material-icons' id='showBtn'>visibility</button><button className='mdc-icon-button material-icons' id='addBtn'>add</button><button className='mdc-icon-button material-icons' id='editBtn'>edit</button><button className='mdc-icon-button material-icons' id='deleteBtn'>delete</button>
                    <div id='showMenu' className='mdc-menu mdc-menu-surface'>
                        <ul className='mdc-list' role='menu' aria-hidden='true' aria-orientation='vertical' tabIndex='0'>
                            <li className='menu-item mdc-list-item' role='menuitem'>
                                <span className='menu-item departs'></span>
                                <span className='menu-item-text mdc-list-item__text'>Départs</span>
                                <span className='mdc-list-item__ripple'></span>
                            </li>
                            <li className='menu-item mdc-list-item' role='menuitem'>
                                <span className='menu-item arrives'></span>
                                <span className='menu-item-text mdc-list-item__text'>Arrivées</span>
                                <span className='mdc-list-item__ripple'></span>
                            </li>
                            <li className='menu-item mdc-list-item' role='menuitem'>
                                <span className='menu-item infos'></span>
                                <span className='menu-item-text mdc-list-item__text'>Infos</span>
                                <span className='mdc-list-item__ripple'></span>
                            </li>
                        </ul>
                    </div>
                    <br /><br />
                    <GoogleAd slot="2159604102" />
                    <div id='trains'></div>
                </div>
                <NewTrainAflDialog gid={this.props.id} />
            </div>
        );
    }

    componentDidMount() {
        const uid = getAuth().currentUser.uid;
        const db = ref(getDatabase(), 'users/' + uid + '/gares/');

        get(child(db, this.props.id)).then(gare => {
            document.title = gare.child('name').val() + " - InfoGare";
            document.getElementById('gareName').innerText = gare.child('name').val();
            const elements = [];
            gare.child('trains').forEach(train => {
                if (train.child('hourdepart').val() !== "") {
                    elements.push(<TrainAFLCard key={train.key} id={train.key} gid={this.props.id} dest={train.child('destination').val()} number={train.child('number').val()} type={train.child('type').val()} time={train.child('hourdepart').val()} />);
                } else if (train.child('hourarrive').val() !== "") {
                    elements.push(<TrainAFLCard key={train.key} id={train.key} gid={this.props.id} dest={train.child('provenance').val()} number={train.child('number').val()} type={train.child('type').val()} time={train.child('hourarrive').val()} arrive={true} />);
                }
            });
            const root = createRoot(document.getElementById('trains'));
            root.render(elements);
        });

        const showBtn = new MDCRipple(document.querySelector('#showBtn'));
        showBtn.listen('click', () => {
            const showMenu = new MDCMenu(document.querySelector('#showMenu'));
            showMenu.setFixedPosition(true);
            showMenu.setAnchorElement(document.querySelector('#showBtn'));
            showMenu.open = true;
        });

        const addBtn = new MDCRipple(document.querySelector('#addBtn'));
        addBtn.listen('click', () => {
            const dialog = new MDCDialog(document.querySelector('#newTrainDialog'));
            dialog.open();
        });

        const editBtn = new MDCRipple(document.querySelector('#editBtn'));
        editBtn.listen('click', () => {
            const editDialog = new MDCDialog(document.querySelector('#edit-' + this.props.id));
            editDialog.open();
        });

        const deleteBtn = new MDCRipple(document.querySelector('#deleteBtn'));
        deleteBtn.listen('click', () => {
            const deleteDialog = new MDCDialog(document.getElementById('delete-'+ this.props.id));
            deleteDialog.open();
        });

        const showMenuList = new MDCList(document.querySelector('.mdc-list'));
        showMenuList.listen('MDCList:action', (event) => {
            console.log(event.detail.index);
            if (event.detail.index === 0) {
                window.location.href = "/gare/AFL/" + this.props.id + "/departs";
            } else if (event.detail.index === 1) {
                window.location.href = "/gare/AFL/" + this.props.id + "/arrives";
            } else if (event.detail.index === 2) {
                window.location.href = "/gare/AFL/" + this.props.id + "/infos";
            }
        });
    }
}

export default GareAFL;