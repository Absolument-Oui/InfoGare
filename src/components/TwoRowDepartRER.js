import React, { Component } from 'react';

import { createRoot } from 'react-dom/client';

class TwoRowDepartRER extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.logoRef = React.createRef();
        this.trainStations = React.createRef();
        this.textFeatures = React.createRef();
        this.timeRef = React.createRef();
        this.typeRef = React.createRef();
        this.trainLngRef = React.createRef();
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
                                <span className='text-type' ref={this.typeRef}>{this.props.mission}</span>
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
                    <div className='col-third'>
                        <div className='rer train-lng' ref={this.trainLngRef}></div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-first'></div>
                    <div className='col-second'>
                        <div className='train-stations text-scroll-x' ref={this.trainStations}></div>
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

        gares.forEach(element => {
            elements.push(<span>{element}</span>);
        });

        if (this.props.timing === 'à l\'heure') {
            this.textFeatures.current.classList.add('text-features-1');
        } else {
            this.textFeatures.current.classList.add('text-features-3');
        }

        if (this.props.timeMode === 'Heure') {
            this.timeRef.current.classList.add('text-time')
            this.timeRef.current.innerHTML = this.props.time.replace(':', 'h');
        } else if (this.props.timeMode === 'A quai') {
            this.timeRef.current.classList.add('animation-blink');
            const html = `<div class="rer-hour-mode animation-blink-1">à quai</div><div class="text-time animation-blink-2">${this.props.time}</div>`;
            const elem = document.createElement("div");
            elem.innerHTML = html;
            this.timeRef.current.appendChild(elem);
        } else if (this.props.timeMode === 'A l\'approche') {
            this.timeRef.current.classList.add('animation-blink');
            const html = `<div class="rer-hour-mode animation-blink-1">à l'approche</div><div class="text-time animation-blink-2">${this.props.time}</div>`;
            const elem = document.createElement("div");
            elem.innerHTML = html;
            this.timeRef.current.appendChild(elem);
        }

        if (this.props.trainLng === 'trainlong') {
            this.trainLngRef.current.classList.add('train-long');
        } else {
            this.trainLngRef.current.classList.add('train-court');
        }

        const stations = createRoot(this.trainStations.current);
        stations.render(elements);

        const type = this.props.type;
        if (type === 'RER A') {
            this.logoRef.current.classList.add('train-logo-rer-a');
        } else if (type === 'RER B') {
            this.logoRef.current.classList.add('train-logo-rer-b');
        } else if (type === 'RER C') {
            this.logoRef.current.classList.add('train-logo-rer-c');
        } else if (type === 'RER D') {
            this.logoRef.current.classList.add('train-logo-rer-d');
        } else if (type === 'RER E') {
            this.logoRef.current.classList.add('train-logo-rer-e');
        }
    }
}

export default TwoRowDepartRER;