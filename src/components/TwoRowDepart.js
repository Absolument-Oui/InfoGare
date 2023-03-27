import React, { Component } from 'react';

import { createRoot } from 'react-dom/client';

class TwoRowDepart extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.logoRef = React.createRef();
        this.trainStations = React.createRef();
        this.textFeatures = React.createRef();
        this.timeRef = React.createRef();
        this.typeRef = React.createRef();
        this.trackView = React.createRef();
    }

    render() {
        return (
            <div className='row-train row-group-2 row-group'>
                <div className='row'>
                    <div className='col-first'>
                        <div className='train-logo' ref={this.logoRef}></div>
                    </div>
                    <div className='col-second-first'>
                        <div className='animation-blink'>
                            <div className='animation-blink-1'>
                                <span className='text-type' ref={this.typeRef}>{this.props.type}</span>
                                <br />
                                <span className='text-number'>{this.props.number}</span>
                            </div>
                            <div className='animation-blink-2' ref={this.textFeatures}>{this.props.timing}</div>
                        </div>
                    </div>
                    <div className='col-second-second' ref={this.timeRef}></div>
                    <div className='col-second-third'>
                        <span>{this.props.gare}</span>
                    </div>
                    <div className='col-hide'></div>
                    <div className='col-third' ref={this.trackView}>
                        
                    </div>
                </div>
                <div className='row'>
                    <div className='col-first'></div>
                    <div className='col-second'>
                        <div className='text-scroll-x' ref={this.trainStations}></div>
                    </div>
                    <div className='col-third'></div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        var gares = this.props.gares;
        const elements = [];
        if (typeof(gares) === "string") {
            gares = gares.split('|').filter(function (el) {
                return el.length > 0;
            });
        }

        if (gares != null) {
            gares.forEach(element => {
                elements.push(<span>{element}</span>);
            });
        }

        if (this.props.timing === 'à l\'heure') {
            this.textFeatures.current.classList.add('text-features-1');
            this.timeRef.current.classList.add('text-time');
            this.timeRef.current.innerText = this.props.time.replace(':', 'h');
        } else if (this.props.timing.includes('retard')) {
            var hour = Math.floor(this.props.time.substr(0, 2) * 60);
            var minutes = Math.floor(this.props.time.substr(3, 4));
            var retard = Math.floor(this.props.retard)
            var timeWithRetard = Math.floor(hour + minutes + retard);

            var quotient = Math.floor(timeWithRetard / 60);
            var rest = timeWithRetard % 60;
            hour = quotient;
            timeWithRetard = rest;

            if (timeWithRetard < 10) {
                timeWithRetard = '0' + timeWithRetard;
            }

            this.textFeatures.current.classList.add('text-features-3');
            this.timeRef.current.classList.add('text-time-retard');
            this.timeRef.current.classList.add('animation-blink');
            const divRetard = document.createElement('div');
            divRetard.className = 'text-time retard animation-blink-2';
            divRetard.innerText = hour + 'h' + timeWithRetard;
            const divTime = document.createElement('div');
            divTime.className = 'text-time animation-blink-1';
            divTime.innerText = this.props.time.replace(':', 'h');
            this.timeRef.current.appendChild(divRetard);
            this.timeRef.current.appendChild(divTime);
        } else {
            this.textFeatures.current.classList.add('text-features-3');
            this.timeRef.current.classList.add('text-time-retard');
            this.timeRef.current.classList.add('animation-blink');
            const divRetard = document.createElement('div');
            divRetard.className = 'text-time retard animation-blink-2';
            divRetard.innerText = this.props.time.replace(':', 'h');
            const divTime = document.createElement('div');
            divTime.className = 'text-time animation-blink-1';
            divTime.innerText = this.props.time.replace(':', 'h');
            this.timeRef.current.appendChild(divRetard);
            this.timeRef.current.appendChild(divTime);
        }

        if (this.props.hall !== "" && this.props.hall !== undefined) {
            var anim1 = document.createElement('div');
            var anim2 = document.createElement('div');

            anim1.setAttribute('class', 'animation-blink-1');
            anim2.setAttribute('class', 'animation-blink-2');

            var hall = document.createElement('div');
            var hallText = document.createElement('small');
            var hallNumber = document.createElement('h1');
            var hallBr1 = document.createElement('br');
            var hallBr2 = document.createElement('br');

            hall.setAttribute('class', 'train-track train-track-h animation-blink-2');
            hallText.appendChild(document.createTextNode('hall'));
            hallNumber.appendChild(document.createTextNode(this.props.hall));

            hall.appendChild(hallText);
            hall.appendChild(hallBr1);
            hall.appendChild(hallBr2);
            hall.appendChild(hallNumber);

            var track = document.createElement('div');
            var trackNumber = document.createElement('span');

            track.setAttribute('class', 'train-track train-track-view voie animation-blink-1');
            trackNumber.appendChild(document.createTextNode(this.props.track));
            track.appendChild(trackNumber);

            this.trackView.current.classList.add('animation-blink');
            this.trackView.current.appendChild(track);
            this.trackView.current.appendChild(hall);
        } else {
            var track = document.createElement('div');
            var trackNumber = document.createElement('span');

            track.setAttribute('class', 'train-track train-track-view');
            trackNumber.appendChild(document.createTextNode(this.props.track));
            track.appendChild(trackNumber);
            this.trackView.current.appendChild(track);
        }

        const stations = createRoot(this.trainStations.current);
        stations.render(elements);

        const type = this.props.type;
        if (type === 'TER') {
            this.logoRef.current.classList.add('train-logo-ter');
        } else if (type === 'SNCF (carmillon)') {
            this.logoRef.current.classList.add('train-logo-sncf');
            this.typeRef.current.innerText = 'Train SNCF';
        } else if (type === 'inOui') {
            this.logoRef.current.classList.add('train-logo-inoui');
        } else if (type === 'TGV') {
            this.logoRef.current.classList.add('train-logo-tgv');
        } else if (type === 'ICE') {
            this.logoRef.current.classList.add('train-logo-ice');
        } else if (type === 'TGV Lyria') {
            this.logoRef.current.classList.add('train-logo-lyria');
        } else if (type === 'Ouigo') {
            this.logoRef.current.classList.add('train-logo-ouigo');
        } else if (type === 'Ouigo Classique') {
            this.logoRef.current.classList.add('train-logo-ouigo-classique');
        } else if (type === 'TER Fluo') {
            this.logoRef.current.classList.add('train-logo-fluo');
        } else if (type === 'TER Occitanie') {
            this.logoRef.current.classList.add('train-logo-occitanie');
        } else if (type === 'Intercité') {
            this.logoRef.current.classList.add('train-logo-intercite');
        } else if (type === 'Aleop') {
            this.logoRef.current.classList.add('train-logo-aleop');
        } else if (type === 'TER Auvergne') {
            this.logoRef.current.classList.add('train-logo-auvergne-rhone-alpes');
        } else if (type === 'BreizhGo') {
            this.logoRef.current.classList.add('train-logo-breizhgo');
        } else if (type === 'DB') {
            this.logoRef.current.classList.add('train-logo-db');
        } else if (type === 'TER Hauts de France') {
            this.logoRef.current.classList.add('train-logo-ter-hauts-de-france');
        } else if (type === 'Lio') {
            this.logoRef.current.classList.add('train-logo-lio');
        } else if (type === 'TER Metrolor') {
            this.logoRef.current.classList.add('train-logo-ter-metrolor');
        } else if (type === 'Mobigo') {
            this.logoRef.current.classList.add('train-logo-mobigo');
        } else if (type === 'Nomad') {
            this.logoRef.current.classList.add('train-logo-nomad');
        } else if (type === 'Remi') {
            this.logoRef.current.classList.add('train-logo-remi');
        } else if (type === 'Renfe Ave') {
            this.logoRef.current.classList.add('train-logo-renfe-ave');
        } else if (type === 'SBB') {
            this.logoRef.current.classList.add('train-logo-sbb');
        } else if (type === 'SNCF (logo 1937)') {
            this.logoRef.current.classList.add('train-logo-sncf-1937');
            this.typeRef.current.innerText = 'Train SNCF';
        } else if (type === 'SNCF (logo 1972)') {
            this.logoRef.current.classList.add('train-logo-sncf-1972');
            this.typeRef.current.innerText = 'Train SNCF';
        } else if (type === 'SNCF (logo 1985)') {
            this.logoRef.current.classList.add('train-logo-sncf-1985');
            this.typeRef.current.innerText = 'Train SNCF';
        } else if (type === 'SNCF (logo 1992)') {
            this.logoRef.current.classList.add('train-logo-sncf-1992');
            this.typeRef.current.innerText = 'Train SNCF';
        } else if (type === 'TER Alsace') {
            this.logoRef.current.classList.add('train-logo-ter-alsace');
        } else if (type === 'TER Aquitaine') {
            this.logoRef.current.classList.add('train-logo-ter-aquitaine');
        } else if (type === 'TER Basse-Normandie') {
            this.logoRef.current.classList.add('train-logo-ter-basse-normandie');
        } else if (type === 'TER Bourgogne') {
            this.logoRef.current.classList.add('train-logo-ter-bourgogne');
        } else if (type === 'TER Bretagne') {
            this.logoRef.current.classList.add('train-logo-ter-bretagne');
        } else if (type === 'TER Centre') {
            this.logoRef.current.classList.add('train-logo-ter-centre');
        } else if (type === 'TER Languedoc Roussillon') {
            this.logoRef.current.classList.add('train-logo-ter-languedoc-roussillon');
        } else if (type === 'TER Midi Pyrénées') {
            this.logoRef.current.classList.add('train-logo-ter-midi-pyrenees');
        } else if (type === 'TER Nord Pas de Calais') {
            this.logoRef.current.classList.add('train-logo-ter-nord-pas-de-calais');
        } else if (type === 'TER Poitou Charentes') {
            this.logoRef.current.classList.add('train-logo-ter-poitou-charentes');
        } else if (type === 'Thello') {
            this.logoRef.current.classList.add('train-logo-thello');
        } else if (type === 'Tram train') {
            this.logoRef.current.classList.add('train-logo-tram-train');
        } else if (type === 'Zou') {
            this.logoRef.current.classList.add('train-logo-zou');
        } else if (type === 'Eurostar') {
            this.logoRef.current.classList.add('train-logo-eurostar');
        } else if (type === 'Thalys') {
            this.logoRef.current.classList.add('train-logo-thalys');
        } else if (type === 'Lunea') {
            this.logoRef.current.classList.add('train-logo-lunea');
        } else if (type === 'Teoz') {
            this.logoRef.current.classList.add('train-logo-teoz');
        } else if (type === 'Frecciarossa') {
            this.logoRef.current.classList.add('train-logo-frecciarossa');
        } else if (type === 'Trenitalia') {
            this.logoRef.current.classList.add('train-logo-trenitalia');
        } else if (type === 'CFL') {
            this.logoRef.current.classList.add('train-logo-cfl');
        } else if (type === 'SNCB') {
            this.logoRef.current.classList.add('train-logo-sncb');
        } else {
            this.logoRef.current.classList.add('train-logo-sncf');
        }

        if (this.props.typename != null && this.props.typename !== "") {
            this.typeRef.current.innerText = this.props.typename;
        }
    }
}

export default TwoRowDepart;