import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

class RowDepartAFL extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.timingRef = React.createRef();
        this.garesRef = React.createRef();
        this.supplemRef = React.createRef();
    }

    render() {
        return (
            <div className='row'>
                <div className='row-first'>
                    <div className='col-first'>{this.props.time}</div>
                    <div className='col-second'>{this.props.type}</div>
                    <div className='col-third'>{this.props.destination}</div>
                    <div className='col-fourth' ref={this.timingRef}></div>
                </div>
                <div className='row-second'>
                    <div className='col-first'></div>
                    <div className='col-second'>{this.props.number}</div>
                    <div className='col-third'>
                        <div className='gares afl-text-scroll-x' ref={this.garesRef}>
                        </div>
                    </div>
                </div>
                <div className='row-third'>
                    <div className='col-first'></div>
                    <div className='col-second' ref={this.supplemRef}></div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (this.props.timing === 'retindet') {
            this.timingRef.current.innerHTML = 'retard indet.';
            this.supplemRef.current.innerHTML = this.props.retardreason;
        } else if (this.props.timing === 'ret') {
            this.timingRef.current.innerHTML = 'retardé ' + this.props.retardtime + ' min';
            this.supplemRef.current.innerHTML = this.props.retardreason;
        } else if (this.props.timing === 'suppr') {
            this.timingRef.current.innerHTML = 'supprimé';
            this.supplemRef.current.innerHTML = this.props.retardreason;
        } else {
            var compo = [];
            if (this.props.compo !== null) {
                this.props.compo.forEach(element => {
                    compo.push(<div className={'wagons wagon-' + element.substring(6)}></div>);
                });

                const root2 = createRoot(this.supplemRef.current);
                root2.render(compo);
            }
        }

        var gares = this.props.gares;
        var elements = [];

        if (typeof(gares) === "string") {
            gares = gares.split('|').filter(function (el) {
                return el.length > 0;
            });
        }

        if (gares != null) {
            gares.forEach(element => {
                elements.push(<div className='gare'>{element}</div>);
            });
        }

        const root = createRoot(this.garesRef.current);
        root.render(elements);
    }
}

export default RowDepartAFL;