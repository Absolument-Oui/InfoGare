import React, { Component } from "react";
import { MDCRipple } from '@material/ripple';
import { get, getDatabase, ref, update } from "firebase/database";
import { getAuth } from "firebase/auth";


class ControlPanelRow extends Component {
    constructor(props) {
        super(props);

        this.rowRef = React.createRef();
        this.logoRef = React.createRef();

        this.showBtn = React.createRef();
        this.departBtn = React.createRef();
        this.statusBtn = React.createRef();
    }

    render() {
        return (
            <tr className="mdc-data-table__row control-panel-row" ref={this.rowRef}>
                <th className="mdc-data-table__cell" scope="row"><span style={{display: "block",color: "black", width: "90px", height: "45px", backgroundRepeat: "no-repeat", backgroundSize: "contain"}} ref={this.logoRef}></span></th>
                <td className="mdc-data-table__cell">{this.props.numero}</td>
                <td className="mdc-data-table__cell">{this.props.heure}</td>
                <td className="mdc-data-table__cell">
                    <button className="mdc-icon-button material-icons" aria-label="Afficher/Masquer" ref={this.showBtn}><div className="mdc-icon-button__ripple"></div>visibility</button>
                    <button className="mdc-icon-button material-icons" aria-label="Afficher l'écran `Départ en cours`" ref={this.departBtn}><div className="mdc-icon-button__ripple"></div>arrow_outward</button>
                    <button className="mdc-icon-button material-icons" aria-label="Modifier le statut du train" ref={this.statusBtn}><div className="mdc-icon-button__ripple"></div>departure_board</button>
                </td>
            </tr>
        );
    }

    componentDidMount() {
        if (this.props.mode === 'depart') {
            this.rowRef.current.classList.add('depart');
        } else if (this.props.mode === 'arrivee') {
            this.rowRef.current.classList.add('arrivee');
        } else {
            this.rowRef.current.classList.add('both');
        }

        if (this.props.show === false) {
            this.showBtn.current.innerHTML = 'visibility_off';
        } else {
            this.showBtn.current.innerHTML = 'visibility';
        }

        if (this.props.departed === true) {
            this.departBtn.current.innerHTML = 'train';
        } else {
            this.departBtn.current.innerHTML = 'arrow_outward';
        }

        const type = this.props.type;
        if (type === 'TER') {
            this.logoRef.current.classList.add('train-card-ter');
        } else if (type === 'SNCF (carmillon)') {
            this.logoRef.current.classList.add('train-card-sncf');
        } else if (type === 'inOui') {
            this.logoRef.current.classList.add('train-card-inoui');
        } else if (type === 'TGV') {
            this.logoRef.current.classList.add('train-card-tgv');
        } else if (type === 'ICE') {
            this.logoRef.current.classList.add('train-card-ice');
        } else if (type === 'TGV Lyria') {
            this.logoRef.current.classList.add('train-card-lyria');
        } else if (type === 'OuiGo') {
            this.logoRef.current.classList.add('train-card-ouigo');
        } else if (type === 'OuiGo Classique') {
            this.logoRef.current.classList.add('train-card-ouigo-classique');
        } else if (type === 'Fluo Grand Est') {
            this.logoRef.current.classList.add('train-card-fluo');
        } else if (type === 'TER Occitanie') {
            this.logoRef.current.classList.add('train-card-occitanie');
        } else if (type === 'Intercité') {
            this.logoRef.current.classList.add('train-card-intercite');
        } else if (type === 'Aléop') {
            this.logoRef.current.classList.add('train-card-aleop');
        } else if (type === 'TER Auvergne Rhône Alpes') {
            this.logoRef.current.classList.add('train-card-auvergne-rhone-alpes');
        } else if (type === 'BreizhGo') {
            this.logoRef.current.classList.add('train-card-breizhgo');
        } else if (type === 'DB') {
            this.logoRef.current.classList.add('train-card-db');
        } else if (type === 'TER Hauts de France') {
            this.logoRef.current.classList.add('train-card-ter-hauts-de-france');
        } else if (type === 'Lio') {
            this.logoRef.current.classList.add('train-card-lio');
        } else if (type === 'TER Metrolor') {
            this.logoRef.current.classList.add('train-card-ter-metrolor');
        } else if (type === 'Mobigo') {
            this.logoRef.current.classList.add('train-card-mobigo');
        } else if (type === 'Nomad') {
            this.logoRef.current.classList.add('train-card-nomad');
        } else if (type === 'Rémi') {
            this.logoRef.current.classList.add('train-card-remi');
        } else if (type === 'Renfe Ave') {
            this.logoRef.current.classList.add('train-card-renfe-ave');
        } else if (type === 'SBB') {
            this.logoRef.current.classList.add('train-card-sbb');
        } else if (type === 'SNCF (logo 1985)') {
            this.logoRef.current.classList.add('train-card-sncf-1985');
        } else if (type === 'SNCF (logo 1992)') {
            this.logoRef.current.classList.add('train-card-sncf-1992');
        } else if (type === 'TER Alsace') {
            this.logoRef.current.classList.add('train-card-ter-alsace');
        } else if (type === 'TER Aquitaine') {
            this.logoRef.current.classList.add('train-card-ter-aquitaine');
        } else if (type === 'TER Basse Normandie') {
            this.logoRef.current.classList.add('train-card-ter-basse-normandie');
        } else if (type === 'TER Bourgogne') {
            this.logoRef.current.classList.add('train-card-ter-bourgogne');
        } else if (type === 'TER Bretagne') {
            this.logoRef.current.classList.add('train-card-ter-bretagne');
        } else if (type === 'TER Centre') {
            this.logoRef.current.classList.add('train-card-ter-centre');
        } else if (type === 'TER Languedoc Roussillon') {
            this.logoRef.current.classList.add('train-card-ter-languedoc-roussillon');
        } else if (type === 'TER Midi Pyrénées') {
            this.logoRef.current.classList.add('train-card-ter-midi-pyrenees');
        } else if (type === 'TER Nord Pas de Calais') {
            this.logoRef.current.classList.add('train-card-ter-nord-pas-de-calais');
        } else if (type === 'TER Poitou Charentes') {
            this.logoRef.current.classList.add('train-card-ter-poitou-charentes');
        } else if (type === 'Thello') {
            this.logoRef.current.classList.add('train-card-thello');
        } else if (type === 'Tram train') {
            this.logoRef.current.classList.add('train-card-tram-train');
        } else if (type === 'Zou') {
            this.logoRef.current.classList.add('train-card-zou');
        } else if (type === 'Eurostar') {
            this.logoRef.current.classList.add('train-card-eurostar');
        } else if (type === 'Thalys') {
            this.logoRef.current.classList.add('train-card-thalys');
        } else if (type === 'Lunea') {
            this.logoRef.current.classList.add('train-card-lunea');
        } else if (type === 'Teoz') {
            this.logoRef.current.classList.add('train-card-teoz');
        } else if (type === 'Frecciarossa') {
            this.logoRef.current.classList.add('train-card-frecciarossa');
        } else if (type === 'Trenitalia') {
            this.logoRef.current.classList.add('train-card-trenitalia');
        } else if (type === 'CFL') {
            this.logoRef.current.classList.add('train-card-cfl');
        } else if (type === 'SNCB') {
            this.logoRef.current.classList.add('train-card-sncb');
        } else {
            this.logoRef.current.classList.add('train-card-sncf');
        }

        const show = new MDCRipple(this.showBtn.current);
        show.unbounded = true;
        show.listen('click', () => {
            var shown;
            get(ref(getDatabase(), `users/${getAuth().currentUser.uid}/gares/${this.props.gid}/trains/${this.props.id}`)).then((snapshot) => { 
                shown = snapshot.val().show;
                update(ref(getDatabase(), `users/${getAuth().currentUser.uid}/gares/${this.props.gid}/trains/${this.props.id}`), { show: !shown }).then(() => {
                    show.root.innerHTML = shown ? 'visibility_off' : 'visibility';
                    shown = !shown;
                }).catch((error) => {
                    console.log(error);
                });
            });
        });

        const departure = new MDCRipple(this.departBtn.current);
        departure.unbounded = true;
        departure.listen('click', () => {
            var departed;
            get(ref(getDatabase(), `users/${getAuth().currentUser.uid}/gares/${this.props.gid}/trains/${this.props.id}`)).then((snapshot) => { 
                departed = snapshot.val().departure;
                update(ref(getDatabase(), `users/${getAuth().currentUser.uid}/gares/${this.props.gid}/trains/${this.props.id}`), { departure: !departed }).then(() => {
                    departure.root.innerHTML = departed ? 'train' : 'arrow_outward';
                    departed = !departed;
                }).catch((error) => {
                    console.log(error);
                });
            });
        });
    }
}

export default ControlPanelRow;