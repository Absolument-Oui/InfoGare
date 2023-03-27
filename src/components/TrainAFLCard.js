import React, { Component } from 'react';

import { MDCRipple } from '@material/ripple';
import { MDCDialog } from '@material/dialog';

import EditTrainAFLDialog from './EditTrainAFLDialog';
import DeleteTrainDialog from './DeleteTrainDialog';

class TrainAFLCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.mediaRef = React.createRef();
        this.showTrainBtn = React.createRef();
        this.editTrainBtn = React.createRef();
        this.deleteTrainBtn = React.createRef();
        this.cardRef = React.createRef();
    }

    render() {
        return (
            <div className="gare-card mdc-card mdc-card--outlined" ref={this.cardRef}>
                <div className="mdc-card__media mdc-card__media--16-9 train-card" ref={this.mediaRef}></div>
                <div className="mdc-card__primary-action">
                    <div className="gare-card__title">{this.props.dest}</div>
                    <div className="gare-card__subtitle">{this.props.time}</div>
                    <div className="gare-card__subtitle">{this.props.type} N° {this.props.number}</div>
                </div>
                <div className="mdc-card__ripple"></div>
                <div className="mdc-card__actions">
                    <div className="mdc-card__action-buttons">
                        <button className="gare-card__button mdc-button mdc-card__action mdc-card__action--button" style={{display: 'none'}} ref={this.showTrainBtn}>
                            <div className="mdc-button__ripple"></div>
                            <span className="mdc-button__label">Afficher</span>
                        </button>
                        <button className="gare-card__button mdc-button mdc-card__action mdc-card__action--button" ref={this.editTrainBtn}>
                            <div className="mdc-button__ripple"></div>
                            <span className="mdc-button__label">Editer</span>
                        </button>
                        <button className="gare-card__button mdc-button mdc-card__action mdc-card__action--button" ref={this.deleteTrainBtn}>
                            <div className="mdc-button__ripple"></div>
                            <span className="mdc-button__label">Supprimer</span>
                        </button>
                    </div>
                </div>
                <EditTrainAFLDialog gid={this.props.gid} id={this.props.id} componentRef={this.props.id} />
                <DeleteTrainDialog gid={this.props.gid} id={this.props.id} componentRef={this.props.id} />
            </div>
        );
    }

    componentDidMount() {
        const showGareBtn = new MDCRipple(this.showTrainBtn.current);
        showGareBtn.listen('click', () => {
            window.location.href += `/train/${this.props.id}`;
        });

        const editGareBtn = new MDCRipple(this.editTrainBtn.current);
        const deleteGareBtn = new MDCRipple(this.deleteTrainBtn.current);

        editGareBtn.listen('click', () => {
            const dialog = new MDCDialog(document.getElementById('edit-' + this.props.id));
            dialog.open();
        });

        deleteGareBtn.listen('click', () => {
            const dialog = new MDCDialog(document.getElementById('delete-' + this.props.id));
            dialog.open();
        });

        if (this.props.arrive) {
            this.cardRef.current.classList.add('arrive');
            this.showTrainBtn.current.className = 'gare-card__button arrive mdc-button mdc-card__action mdc-card__action--button';
            this.editTrainBtn.current.className = 'gare-card__button arrive mdc-button mdc-card__action mdc-card__action--button';
            this.deleteTrainBtn.current.className = 'gare-card__button arrive mdc-button mdc-card__action mdc-card__action--button';
        } else {
            this.showTrainBtn.current.className = 'gare-card__button depart mdc-button mdc-card__action mdc-card__action--button';
            this.editTrainBtn.current.className = 'gare-card__button depart mdc-button mdc-card__action mdc-card__action--button';
            this.deleteTrainBtn.current.className = 'gare-card__button depart mdc-button mdc-card__action mdc-card__action--button';
        }

        const type = this.props.type;
        if (type === 'TER') {
            this.mediaRef.current.classList.add('train-card-ter');
        } else if (type === 'SNCF (carmillon)') {
            this.mediaRef.current.classList.add('train-card-sncf');
        } else if (type === 'inOui') {
            this.mediaRef.current.classList.add('train-card-inoui');
        } else if (type === 'TGV') {
            this.mediaRef.current.classList.add('train-card-tgv');
        } else if (type === 'ICE') {
            this.mediaRef.current.classList.add('train-card-ice');
        } else if (type === 'TGV Lyria') {
            this.mediaRef.current.classList.add('train-card-lyria');
        } else if (type === 'OuiGo') {
            this.mediaRef.current.classList.add('train-card-ouigo');
        } else if (type === 'OuiGo Classique') {
            this.mediaRef.current.classList.add('train-card-ouigo-classique');
        } else if (type === 'Fluo Grand Est') {
            this.mediaRef.current.classList.add('train-card-fluo');
        } else if (type === 'TER Occitanie') {
            this.mediaRef.current.classList.add('train-card-occitanie');
        } else if (type === 'Intercité') {
            this.mediaRef.current.classList.add('train-card-intercite');
        } else if (type === 'Aléop') {
            this.mediaRef.current.classList.add('train-card-aleop');
        } else if (type === 'TER Auvergne Rhône Alpes') {
            this.mediaRef.current.classList.add('train-card-auvergne-rhone-alpes');
        } else if (type === 'BreizhGo') {
            this.mediaRef.current.classList.add('train-card-breizhgo');
        } else if (type === 'DB') {
            this.mediaRef.current.classList.add('train-card-db');
        } else if (type === 'TER Hauts de France') {
            this.mediaRef.current.classList.add('train-card-ter-hauts-de-france');
        } else if (type === 'Lio') {
            this.mediaRef.current.classList.add('train-card-lio');
        } else if (type === 'TER Metrolor') {
            this.mediaRef.current.classList.add('train-card-ter-metrolor');
        } else if (type === 'Mobigo') {
            this.mediaRef.current.classList.add('train-card-mobigo');
        } else if (type === 'Nomad') {
            this.mediaRef.current.classList.add('train-card-nomad');
        } else if (type === 'Rémi') {
            this.mediaRef.current.classList.add('train-card-remi');
        } else if (type === 'Renfe Ave') {
            this.mediaRef.current.classList.add('train-card-renfe-ave');
        } else if (type === 'SBB') {
            this.mediaRef.current.classList.add('train-card-sbb');
        } else if (type === 'SNCF (logo 1985)') {
            this.mediaRef.current.classList.add('train-card-sncf-1985');
        } else if (type === 'SNCF (logo 1992)') {
            this.mediaRef.current.classList.add('train-card-sncf-1992');
        } else if (type === 'TER Alsace') {
            this.mediaRef.current.classList.add('train-card-ter-alsace');
        } else if (type === 'TER Aquitaine') {
            this.mediaRef.current.classList.add('train-card-ter-aquitaine');
        } else if (type === 'TER Basse Normandie') {
            this.mediaRef.current.classList.add('train-card-ter-basse-normandie');
        } else if (type === 'TER Bourgogne') {
            this.mediaRef.current.classList.add('train-card-ter-bourgogne');
        } else if (type === 'TER Bretagne') {
            this.mediaRef.current.classList.add('train-card-ter-bretagne');
        } else if (type === 'TER Centre') {
            this.mediaRef.current.classList.add('train-card-ter-centre');
        } else if (type === 'TER Languedoc Roussillon') {
            this.mediaRef.current.classList.add('train-card-ter-languedoc-roussillon');
        } else if (type === 'TER Midi Pyrénées') {
            this.mediaRef.current.classList.add('train-card-ter-midi-pyrenees');
        } else if (type === 'TER Nord Pas de Calais') {
            this.mediaRef.current.classList.add('train-card-ter-nord-pas-de-calais');
        } else if (type === 'TER Poitou Charentes') {
            this.mediaRef.current.classList.add('train-card-ter-poitou-charentes');
        } else if (type === 'Thello') {
            this.mediaRef.current.classList.add('train-card-thello');
        } else if (type === 'Tram train') {
            this.mediaRef.current.classList.add('train-card-tram-train');
        } else if (type === 'Zou') {
            this.mediaRef.current.classList.add('train-card-zou');
        } else if (type === 'Eurostar') {
            this.mediaRef.current.classList.add('train-card-eurostar');
        } else if (type === 'Thalys') {
            this.mediaRef.current.classList.add('train-card-thalys');
        } else if (type === 'Lunea') {
            this.mediaRef.current.classList.add('train-card-lunea');
        } else if (type === 'Teoz') {
            this.mediaRef.current.classList.add('train-card-teoz');
        } else if (type === 'Frecciarossa') {
            this.mediaRef.current.classList.add('train-card-frecciarossa');
        } else if (type === 'Trenitalia') {
            this.mediaRef.current.classList.add('train-card-trenitalia');
        } else if (type === 'CFL') {
            this.mediaRef.current.classList.add('train-card-cfl');
        } else if (type === 'SNCB') {
            this.mediaRef.current.classList.add('train-card-sncb');
        } else if (type === 'RER A') {
            this.mediaRef.current.classList.add('train-card-rer-a');
        } else if (type === 'RER B') {
            this.mediaRef.current.classList.add('train-card-rer-b');
        } else if (type === 'RER C') {
            this.mediaRef.current.classList.add('train-card-rer-c');
        } else if (type === 'RER D') {
            this.mediaRef.current.classList.add('train-card-rer-d');
        } else if (type === 'RER E') {
            this.mediaRef.current.classList.add('train-acrd-rer-e');
        } else {
            this.mediaRef.current.classList.add('train-card-sncf');
        }
    }
}

export default TrainAFLCard;