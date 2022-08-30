import React, {Component} from "react";

import {MDCRipple, MDCRippleFoundation} from "@material/ripple";
import {MDCDialog} from "@material/dialog";

import "../index.scss";
import EditGareDialog from "./EditGareDialog";
import DeleteGareDialog from "./DeleteGareDialog";
import { createRoot } from "react-dom/client";
import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";

class GareCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        const showBtn_ = new MDCRippleFoundation(document.querySelector('#showBtn'));
        const editBtn_ = new MDCRippleFoundation(document.querySelector('#editBtn'));
        const deleteBtn_ = new MDCRippleFoundation(document.querySelector('#deleteBtn'));
        
        this.showGareBtn = React.createRef();
        this.editGareBtn = React.createRef();
        this.deleteGareBtn = React.createRef();
        this.dialogRef = React.createRef();
        this.mediaRef = React.createRef();
    }

    render() {
        return (
            <div className="gare-card mdc-card mdc-card--outlined">
                <div className="mdc-card__media mdc-card__media--16-9"ref={this.mediaRef}></div>
                <div className="mdc-card__primary-action">
                    <div className="gare-card__title">{this.props.name}</div>
                    <div className="gare-card__subtitle">{this.props.type}</div>
                    <div className="gare-card__subtitle">{this.props.number} trains</div>
                </div>
                <div className="mdc-card__ripple"></div>
                <div className="mdc-card__actions">
                    <div className="mdc-card__action-buttons">
                        <button className="gare-card__button mdc-button mdc-card__action mdc-card__action--button" ref={this.showGareBtn}>
                            <div className="mdc-button__ripple"></div>
                            <span className="mdc-button__label">Afficher</span>
                        </button>
                        <button className="gare-card__button mdc-button mdc-card__action mdc-card__action--button" ref={this.editGareBtn}>
                            <div className="mdc-button__ripple"></div>
                            <span className="mdc-button__label">Editer</span>
                        </button>
                        <button className="gare-card__button mdc-button mdc-card__action mdc-card__action--button" ref={this.deleteGareBtn}>
                            <div className="mdc-button__ripple"></div>
                            <span className="mdc-button__label">Supprimer</span>
                        </button>
                    </div>
                </div>
                <div id="dialogPlace"></div>
                <EditGareDialog key={this.props.id} id={this.props.id} uid={this.props.uid} componentRef={this.props.id} />
                <DeleteGareDialog id={this.props.id} componentRef={this.props.id} />
            </div>
        );
    }

    componentDidMount() {
        const showBtn = new MDCRipple(this.showGareBtn.current);
        showBtn.listen('click', () => {
            if (this.props.type === 'Gare classique') {
                window.location.href = `/gare/${this.props.id}`;
            } else {
                window.location.href = `/gareRER/${this.props.id}`;
            }
        });
        const editBtn = new MDCRipple(this.editGareBtn.current);
        editBtn.listen('click', () => {
            const dialog = new MDCDialog(document.getElementById('edit-' + this.props.id));
            dialog.open();
        });
        const deleteBtn = new MDCRipple(this.deleteGareBtn.current);
        deleteBtn.listen('click', () => {
            const dialog = new MDCDialog(document.getElementById('delete-' + this.props.id));
            dialog.open();
        });
        if (this.props.type === 'Gare classique') {
            this.mediaRef.current.classList.add('gare-card-media-sncf');
        } else {
            this.mediaRef.current.classList.add('gare-card-media-ratp');
        }
    }
}

export default GareCard;