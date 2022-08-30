import React, { Component } from 'react';

import { MDCRipple } from '@material/ripple';
import { MDCDialog } from '@material/dialog';
import EditTrainRERDialog from './EditTrainRERDialog';
import DeleteTrainRERDialog from './DeleteTrainRERDialog';

class TrainRERCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.mediaRef = React.createRef();
        this.showTrainBtn = React.createRef();
        this.editTrainBtn = React.createRef();
        this.deleteTrainBtn = React.createRef();
    }

    render() {
        return (
            <div className="gare-card mdc-card mdc-card--outlined">
                <div className="mdc-card__media mdc-card__media--16-9 train-card" ref={this.mediaRef}></div>
                <div className="mdc-card__primary-action">
                    <div className="gare-card__title">{this.props.dest}</div>
                    <div className="gare-card__subtitle">{this.props.time}</div>
                    <div className="gare-card__subtitle">{this.props.type} - {this.props.mission} N° {this.props.number}</div>
                </div>
                <div className="mdc-card__ripple"></div>
                <div className="mdc-card__actions">
                    <div className="mdc-card__action-buttons">
                        <button className="gare-card__button mdc-button mdc-card__action mdc-card__action--button" ref={this.showTrainBtn}>
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
                <EditTrainRERDialog gid={this.props.gid} id={this.props.id} />
                <DeleteTrainRERDialog gid={this.props.gid} id={this.props.id} componentRef={this.props.id} />
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
        })

        const type = this.props.type;
        if (type === 'RER A') {
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
            this.mediaRef.current.classList.add('train-card-ratp');
        }
    }
}

export default TrainRERCard;