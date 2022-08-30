import React, { Component } from 'react';
import $ from 'jquery';

import "../index.scss";
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

class QuaiPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.infosRef = React.createRef();
        this.trainLogoRef = React.createRef();
        this.trainTimeRef = React.createRef();
        this.timeHoursRef = React.createRef();
        this.timeOntimeRef = React.createRef();
        this.stationRef = React.createRef();
        this.typeRef = React.createRef();
        this.numberRef = React.createRef();
        this.stationsRef = React.createRef();
    }

    render() {
        return (
            <div className='rows rows-departures'>
                <div className='row-group row-group-bar quai'>
                    <div className='row'>
                        <div className='col-first'>
                            <div className='bar-informations text-scroll-x' ref={this.infosRef}></div>
                        </div>
                        <div className='col-second'>
                            <div className='bar-clock'>
                                <span id='clock-hours'></span>
                                <span className='animation-blink'>
                                    <span className='animation-blink-clock'>:</span>
                                </span>
                                <span id='clock-minutes'></span>
                                <small id='clock-seconds'></small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row-group row-group-train'>
                    <div className='row'>
                        <div className='col-first'>
                            <div className='row-background quai row-background-quai'></div>
                            <div className='quai train-logo' ref={this.trainLogoRef}></div>
                            <div className='train-time' ref={this.trainTimeRef}>
                                <div className='text-time-hours' ref={this.timeHoursRef}></div>
                                <div className='text-time-ontime' ref={this.timeOntimeRef}></div>
                            </div>
                            <div className='train-station text-station' ref={this.stationRef}></div>
                            <div className='train-informations'>
                                <div className='quai text-type' ref={this.typeRef}></div>
                                <div className='quai text-number' ref={this.numberRef}></div>
                            </div>
                        </div>
                        <div className='col-second'>
                            <div className='col-second-container'>
                                <table className='train-stations train-stations-solo scroll-y'>
                                    <tbody ref={this.stationsRef}>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    scrollX() {

        $('.text-scroll-x').each(function () {

            var distance = $(this).width() + $(this).parent().width() + 10;


            if ($(this).width() > $(this).parent().width()) {
                $(this).addClass('animation-scroll-x');
                $(this).css({
                    '-webkit-animation-duration': (distance / 150) + 's',
                    'animation-duration': (distance / 150) + 's',
                    'padding-left': '100%'
                });
            } else {
                $(this).css({
                    'padding-left': '0%'
                });
            }
        });
    }

    /* -- scrollY -- */

    scrollY(limit) {

        var elem = $('.scroll-y');
        var elemHeight = elem.height();
        var parentHeight = elem.parent().height();
        var elemHeightRelative = elemHeight / parentHeight * 100;

        if (elemHeightRelative > limit && limit < 100) {
            var distance = (elemHeight - (parentHeight / 1.1)) / $(window).height() * 100;
            var time = distance / 6 + 10;
            var delay = 5 / time * 100;

            $("<style type='text/css'> @keyframes scrollY{ 0%, " + delay + "%{ transform:translateY(0%); } " + (100 - delay) + "%, 100%{ transform:translateY(-" + distance + "vh); } } </style>").appendTo("head");
            $(elem).css({
                'animation': 'scrollY ' + time + 's linear infinite 0s'
            });
        } else {
            $(elem).css({
                'animation': 'none'
            });
        }
    }

    /* -- clock -- */

    clock() {
        var date = new Date();
        date.setHours(date.getHours() + (date.getTimezoneOffset() / -60));

        var h = date.getUTCHours();
        if (h < 10) {
            h = '0' + h;
        }
        $('#clock-hours').html(h);
        var m = date.getUTCMinutes();
        if (m < 10) {
            m = '0' + m;
        }
        $('#clock-minutes').html(m);
        var s = date.getUTCSeconds();
        if (s < 10) {
            s = '0' + s;
        }
        $('#clock-seconds').html(s);
        setInterval(this.clock, '1000');
        return true;
    }

    componentDidMount() {
        window.screen.orientation.lock('landscape').then(() => {
            if (document.body.requestFullscreen) {
                document.body.requestFullscreen();
            }
        }).catch((error) => {
            console.error(error);
        });

        const uid = getAuth().currentUser.uid;
        const db = ref(getDatabase(), 'users/' + uid + '/gares/' + this.props.gid + '/trains/' + this.props.id);

        get(db, '').then(snapshot => {
            if (snapshot.child('retardtype').val() === 'alheure') {
                this.timeHoursRef.current.innerHTML = snapshot.child('hourdepart').val().replace(':', 'h');
                this.timeOntimeRef.current.innerHTML = 'à l\'heure';
            } else if (snapshot.child('retardtype').val() === 'supprime') {
                const colMerged = document.createElement('div', { class: 'col-second-merged animation-blink' });
                const animationBlink1 = document.createElement('span', { class: 'animation-blink-1' });
                const textTimeHours = document.createElement('div', { class: 'text-time-hours' });
                textTimeHours.innerHTML = snapshot.child('hourdepart').val().replace(':', 'h');
                const animationBlink2 = document.createElement('span', { class: 'animation-blink-2' });
                const textTimeOntime = document.createElement('div', { class: 'text-time-ontime' });
                textTimeOntime.innerHTML = 'supprimé';
                animationBlink1.appendChild(textTimeHours);
                animationBlink2.appendChild(textTimeOntime);
                colMerged.appendChild(animationBlink1);
                colMerged.appendChild(animationBlink2);
                this.trainTimeRef.current.appendChild(colMerged);
            } else if (snapshot.child('retardtype').val() === 'retindet') {
                const colMerged = document.createElement('div', { class: 'col-second-merged animation-blink' });
                const animationBlink1 = document.createElement('span', { class: 'animation-blink-1' });
                const textTimeHours = document.createElement('div', { class: 'text-time-hours' });
                textTimeHours.innerHTML = snapshot.child('hourdepart').val().replace(':', 'h');
                const animationBlink2 = document.createElement('span', { class: 'animation-blink-2' });
                const textTimeOntime = document.createElement('div', { class: 'text-time-ontime' });
                textTimeOntime.innerHTML = 'ret. indet.';
                animationBlink1.appendChild(textTimeHours);
                animationBlink2.appendChild(textTimeOntime);
                colMerged.appendChild(animationBlink1);
                colMerged.appendChild(animationBlink2);
                this.trainTimeRef.current.appendChild(colMerged);
            } else {
                const colMerged = document.createElement('div');
                colMerged.classList.add('col-second-merged');
                colMerged.classList.add('animation-blink');
                const animationBlink1 = document.createElement('span');
                animationBlink1.classList.add('animation-blink-1');
                const textTimeHours = document.createElement('div');
                textTimeHours.classList.add('text-time-hours');
                textTimeHours.innerHTML = snapshot.child('hourdepart').val().replace(':', 'h');
                const animationBlink2 = document.createElement('span');
                animationBlink2.classList.add('animation-blink-2');
                const textTimeOntime = document.createElement('div');
                textTimeOntime.classList.add('text-time-ontime');
                textTimeOntime.innerHTML = 'ret. ' + snapshot.child('retardtime').val() + ' min.';
                animationBlink1.appendChild(textTimeHours);
                animationBlink2.appendChild(textTimeOntime);
                colMerged.appendChild(animationBlink1);
                colMerged.appendChild(animationBlink2);
                this.trainTimeRef.current.appendChild(colMerged);
            }
            this.stationRef.current.innerHTML = snapshot.child('destination').val();
            this.numberRef.current.innerHTML = snapshot.child('number').val();

            const gares = snapshot.child('gares').val();

            var i = 0;
            gares.forEach(gare => {
                const tr = document.createElement('tr');
                if (i === gares.length - 1) {
                    tr.className = 'train-stations-last-departures';
                }
                const stationColumn = document.createElement('td');
                stationColumn.className = 'trains-stations-column';
                const stationStation = document.createElement('td');
                stationStation.className = 'trains-stations-station';
                const stationSpan = document.createElement('span');
                stationSpan.innerHTML = gare;
                stationStation.appendChild(stationSpan);
                tr.appendChild(stationColumn);
                tr.appendChild(stationStation);
                this.stationsRef.current.appendChild(tr);
                i++;
            });

            const type = snapshot.child('type').val();
            this.typeRef.current.innerHTML = type;
            if (type === 'TER') {
                this.trainLogoRef.current.classList.add('train-logo-ter-color');
            } else if (type === 'SNCF (carmillon)') {
                this.trainLogoRef.current.classList.add('train-logo-sncf-color');
                this.typeRef.current.innerText = 'Train SNCF';
            } else if (type === 'inOui') {
                this.trainLogoRef.current.classList.add('train-logo-inoui-color');
            } else if (type === 'TGV') {
                this.trainLogoRef.current.classList.add('train-logo-tgv-color');
            } else if (type === 'ICE') {
                this.trainLogoRef.current.classList.add('train-logo-ice-color');
            } else if (type === 'TGV Lyria') {
                this.trainLogoRef.current.classList.add('train-logo-lyria-color');
            } else if (type === 'OuiGo') {
                this.trainLogoRef.current.classList.add('train-logo-ouigo-color');
            } else if (type === 'OuiGo Classique') {
                this.trainLogoRef.current.classList.add('train-logo-ouigo-classique-color');
            } else if (type === 'Fluo Grand Est') {
                this.trainLogoRef.current.classList.add('train-logo-fluo-color');
            } else if (type === 'TER Occitanie') {
                this.trainLogoRef.current.classList.add('train-logo-occitanie-color');
            } else if (type === 'Intercité') {
                this.trainLogoRef.current.classList.add('train-logo-intercite-color');
            } else if (type === 'Aléop') {
                this.trainLogoRef.current.classList.add('train-logo-aleop-color');
            } else if (type === 'TER Auvergne Rhône Alpes') {
                this.trainLogoRef.current.classList.add('train-logo-auvergne-rhone-alpes-color');
            } else if (type === 'BreizhGo') {
                this.trainLogoRef.current.classList.add('train-logo-breizhgo-color');
            } else if (type === 'DB') {
                this.trainLogoRef.current.classList.add('train-logo-db-color');
            } else if (type === 'TER Hauts de France') {
                this.trainLogoRef.current.classList.add('train-logo-ter-hauts-de-france-color');
            } else if (type === 'Lio') {
                this.trainLogoRef.current.classList.add('train-logo-lio-color');
            } else if (type === 'TER Metrolor') {
                this.trainLogoRef.current.classList.add('train-logo-ter-metrolor-color');
            } else if (type === 'Mobigo') {
                this.trainLogoRef.current.classList.add('train-logo-mobigo-color');
            } else if (type === 'Nomad') {
                this.trainLogoRef.current.classList.add('train-logo-nomad-color');
            } else if (type === 'Rémi') {
                this.trainLogoRef.current.classList.add('train-logo-remi-color');
            } else if (type === 'Renfe Ave') {
                this.trainLogoRef.current.classList.add('train-logo-renfe-ave-color');
            } else if (type === 'SBB') {
                this.trainLogoRef.current.classList.add('train-logo-sbb-color');
            } else if (type === 'SNCF (logo 1985)') {
                this.trainLogoRef.current.classList.add('train-logo-sncf-1985-color');
                this.typeRef.current.innerText = 'Train SNCF';
            } else if (type === 'SNCF (logo 1992)') {
                this.trainLogoRef.current.classList.add('train-logo-sncf-1992-color');
                this.typeRef.current.innerText = 'Train SNCF';
            } else if (type === 'TER Alsace') {
                this.trainLogoRef.current.classList.add('train-logo-ter-alsace-color');
            } else if (type === 'TER Aquitaine') {
                this.trainLogoRef.current.classList.add('train-logo-ter-aquitaine-color');
            } else if (type === 'TER Basse Normandie') {
                this.trainLogoRef.current.classList.add('train-logo-ter-basse-normandie-color');
            } else if (type === 'TER Bourgogne') {
                this.trainLogoRef.current.classList.add('train-logo-ter-bourgogne-color');
            } else if (type === 'TER Bretagne') {
                this.trainLogoRef.current.classList.add('train-logo-ter-bretagne-color');
            } else if (type === 'TER Centre') {
                this.trainLogoRef.current.classList.add('train-logo-ter-centre-color');
            } else if (type === 'TER Languedoc Roussillon') {
                this.trainLogoRef.current.classList.add('train-logo-ter-languedoc-roussillon-color');
            } else if (type === 'TER Midi Pyrénées') {
                this.trainLogoRef.current.classList.add('train-logo-ter-midi-pyrenees-color');
            } else if (type === 'TER Nord Pas de Calais') {
                this.trainLogoRef.current.classList.add('train-logo-ter-nord-pas-de-calais-color');
            } else if (type === 'TER Poitou Charentes') {
                this.trainLogoRef.current.classList.add('train-logo-ter-poitou-charentes-color');
            } else if (type === 'Thello') {
                this.trainLogoRef.current.classList.add('train-logo-thello-color');
            } else if (type === 'Tram train') {
                this.trainLogoRef.current.classList.add('train-logo-tram-train-color');
            } else if (type === 'Zou') {
                this.trainLogoRef.current.classList.add('train-logo-zou-color');
            } else if (type === 'Eurostar') {
                this.trainLogoRef.current.classList.add('train-logo-eurostar-color');
            } else if (type === 'Thalys') {
                this.trainLogoRef.current.classList.add('train-logo-thalys-color');
            } else if (type === 'Lunea') {
                this.trainLogoRef.current.classList.add('train-logo-lunea-color');
            } else if (type === 'Teoz') {
                this.trainLogoRef.current.classList.add('train-logo-teoz-color');
            } else if (type === 'Frecciarossa') {
                this.trainLogoRef.current.classList.add('train-logo-frecciarossa-color');
            } else if (type === 'Trenitalia') {
                this.trainLogoRef.current.classList.add('train-logo-trenitalia-color');
            } else if (type === 'CFL') {
                this.trainLogoRef.current.classList.add('train-logo-cfl-color');
            } else if (type === 'SNCB') {
                this.trainLogoRef.current.classList.add('train-logo-sncb-color');
            } else {
                this.trainLogoRef.current.classList.add('train-logo-sncf-color');
            }
        });

        this.clock();
        this.scrollX();
        this.scrollY(50);
    }
}

export default QuaiPage;